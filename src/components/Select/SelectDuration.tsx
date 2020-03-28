import React, { useState, FC, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';

import Select from './Select';
import scss from 'stylesheets/modules/SelectDuration.module.scss';

const unitMap: Record<string, number> = {
	seconds: 1000,
	minutes: 1000 * 60,
	hours: 1000 * 60 * 60,
	days: 1000 * 60 * 60 * 24
};

const unitEntries = Object.entries(unitMap);

/* eslint-disable @typescript-eslint/no-non-null-assertion */
function determineUnit(ms: number) {
	for (let i = 0; i < unitEntries.length; i++) {
		const [, nextDuration] = unitEntries[i + 1];
		if (ms < nextDuration || i === 2) return [Math.floor(ms / unitEntries[i][1]), unitEntries[i][0]] as const;
	}
}

interface SelectDurationProps {
	value: number;
	min: number;
	max: number;
	onChange: (...args: unknown[]) => void;
}

const SelectDuration: FC<SelectDurationProps> = ({ value, min, max, onChange }) => {
	const [inputDuration, inputUnit] = determineUnit(value)!;
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
		<Box className={scss.box}>
			<TextField
				className={scss.textField}
				helperText={error}
				error={Boolean(error)}
				value={isNaN(duration) ? '' : duration}
				type="tel"
				label="Duration"
				onChange={onChangeDuration}
				InputLabelProps={{
					classes: {
						root: scss.label
					}
				}}
				FormHelperTextProps={{
					classes: {
						error: scss.textFieldHelperText
					}
				}}
			/>
			<Select
				customClasses={scss.selectBox}
				customFormControlClasses={scss.selectBoxMargin}
				title="Duration unit"
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

export default SelectDuration;
