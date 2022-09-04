import { Box, MenuItem, TextField } from '@mui/material';
import { ChangeEvent, memo, useState, type FC } from 'react';
import Select from './Select';

const unitMap: Record<string, number> = {
	seconds: 1000,
	minutes: 1000 * 60,
	hours: 1000 * 60 * 60,
	days: 1000 * 60 * 60 * 24
};

const unitEntries = Object.entries(unitMap);

// @ts-ignore this needs to be properly worked out
function determineUnit(ms: number) {
	for (let i = 0; i < unitEntries.length; i++) {
		const [, nextDuration] = unitEntries[i + 1];
		if (ms < nextDuration || i === 2) return [Math.floor(ms / unitEntries[i][1]), unitEntries[i][0]] as const;
	}
}

interface SelectDurationProps {
	value: number | null;
	min: number;
	max?: number;
	onChange: (value: number) => void;
}

const SelectDuration: FC<SelectDurationProps> = ({ value, min, max, onChange }) => {
	const [inputDuration, inputUnit] = determineUnit(value ?? 0)!;
	const [unit, setUnit] = useState(inputUnit);
	const [duration, setDuration] = useState(inputDuration);
	const [error, setError] = useState<string>('');

	function change(ms: number, cb?: any) {
		if (typeof min === 'number' && ms < min) {
			return setError(`The minimum duration is ${determineUnit(min)!.join(' ')}.`);
		}

		if (typeof max === 'number' && ms > max) {
			return setError(`The maximum duration is ${determineUnit(max)!.join(' ')}.`);
		}

		// Only invoke setState callbacks if its within the min/max
		if (cb) cb();

		setError('');
		onChange(ms);
	}

	function onChangeDuration(e: ChangeEvent<HTMLInputElement>) {
		change(parseInt(e.target.value, 10) * unitMap[unit]);
		setDuration(parseInt(e.target.value, 10));
	}

	function onChangeUnit(e: ChangeEvent<HTMLInputElement>) {
		setUnit(e.target.value);
		change(unitMap[e.target.value] * duration);
	}

	return (
		<Box mb={3}>
			<TextField
				sx={{
					pl: {
						md: 2,
						xs: 'unset'
					},
					width: {
						md: (theme) => theme.spacing(28),
						xs: (theme) => theme.spacing(10)
					},
					mt: {
						md: 'inherit',
						xs: 2
					}
				}}
				variant="standard"
				helperText={error}
				error={Boolean(error)}
				value={isNaN(duration) ? '' : duration}
				type="tel"
				label="Duration"
				onChange={onChangeDuration}
				InputLabelProps={{
					sx: {
						pl: {
							md: 2,
							xs: 'unset'
						}
					}
				}}
				FormHelperTextProps={{
					sx: (theme) => ({
						position: 'absolute',
						bottom: theme.spacing(-3),
						left: theme.spacing(-1.5),
						width: theme.spacing(62.5),
						pl: 2
					})
				}}
			/>
			<Select
				sx={{
					width: (theme) => theme.spacing(20)
				}}
				FormControlProps={{
					sx: {
						mt: {
							md: 'inherit',
							xs: 2
						}
					}
				}}
				title={error ? '' : 'Duration unit'}
				error={Boolean(error)}
				value={unit}
				onChange={onChangeUnit}
			>
				<MenuItem value="seconds">Seconds</MenuItem>
				<MenuItem value="minutes">Minutes</MenuItem>
				<MenuItem value="hours">Hours</MenuItem>
				<MenuItem value="days">Day</MenuItem>
			</Select>
		</Box>
	);
};

export default memo(SelectDuration);
