import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

import Select from './Select';

const Container = styled.div`
	display: flex;
	align-items: center;
	align-content: center;
	margin-bottom: ${props => (props.error ? 40 : 30)}px;

	.MuiSelect-root {
		width: 90px;
	}

	.MuiTextField-root {
		width: 90px;
	}

	.MuiFormHelperText-root.Mui-error {
		position: absolute;
		bottom: -24px;
		left: -12px;
		width: 500px;
	}

	.MuiFormControl-root {
		border-color: white;

		&.MuiTextField-root fieldset {
			border-top-right-radius: 0px;
			border-bottom-right-radius: 0px;
		}

		&:not(.MuiTextField-root) fieldset {
			margin-left: -1px;
			border-top-left-radius: 0px;
			border-bottom-left-radius: 0px;
		}
	}
`;

const unitMap = {
	seconds: 1000,
	minutes: 1000 * 60,
	hours: 1000 * 60 * 60,
	days: 1000 * 60 * 60 * 24
};

const unitEntries = Object.entries(unitMap);

function determineUnit(ms) {
	for (let i = 0; i < unitEntries.length; i++) {
		const [, nextDuration] = unitEntries[i + 1];
		if (ms < nextDuration || i === 2) return [Math.floor(ms / unitEntries[i][1]), unitEntries[i][0]];
	}
}

const SelectDuration = ({ value, min, max, onChange }) => {
	const [inputDuration, inputUnit] = determineUnit(value);
	const [unit, setUnit] = useState(inputUnit);
	const [duration, setDuration] = useState(inputDuration);
	const [error, setError] = useState(null);

	function change(ms, cb) {
		if (typeof min === 'number' && ms < min) {
			return setError(`The minimum duration is ${determineUnit(min).join(' ')}.`);
		}

		if (typeof max === 'number' && ms > max) {
			return setError(`The maximum duration is ${determineUnit(max).join(' ')}.`);
		}

		// Only invoke setState callbacks if its within the min/max
		if (cb) cb();

		setError(null);
		onChange(ms);
	}

	function onChangeDuration(e) {
		change(e.target.value * unitMap[unit]);
		setDuration(e.target.value);
	}

	function onChangeUnit(e) {
		setUnit(e.target.value);
		change(unitMap[e.target.value] * duration);
	}

	return (
		<Container error={Boolean(error)}>
			<TextField
				helperText={error}
				error={Boolean(error)}
				variant="outlined"
				value={duration}
				type="number"
				label="Duration"
				onChange={onChangeDuration}
			/>
			<Select helperText={error} error={Boolean(error)} variant="outlined" value={unit} onChange={onChangeUnit}>
				<option value="seconds">Seconds</option>
				<option value="minutes">Minutes</option>
				<option value="hours">Hours</option>
				<option value="days">Day</option>
			</Select>
		</Container>
	);
};

export default SelectDuration;
