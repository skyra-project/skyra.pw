import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

import Select from './Select';

const Container = styled.div`
	display: flex;
	align-items: center;
	align-content: center;
	margin: 10px 0px;

	.MuiSelect-root {
		min-width: 90px;
	}

	.MuiFormControl-root {
		min-width: 90px;
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

const SelectDuration = ({ value, label, min, max, onChange }) => {
	const [inputDuration, inputUnit] = determineUnit(value);
	const [unit, setUnit] = useState(inputUnit);
	const [duration, setDuration] = useState(inputDuration);

	function onChangeDuration(e) {
		setDuration(e.target.value);
		onChange(duration * unitMap[unit]);
	}

	function onChangeUnit(e) {
		setUnit(e.target.value);
		onChange(unitMap[e.target.value] * duration);
	}

	return (
		<Container>
			<TextField
				variant="filled"
				value={duration}
				type="number"
				label="Duration"
				inputProps={{ min, max }}
				onChange={onChangeDuration}
			/>
			<Select variant="filled" title="Unit" value={unit} onChange={onChangeUnit}>
				<option value="seconds">Seconds</option>
				<option value="minutes">Minutes</option>
				<option value="hours">Hours</option>
				<option value="days">Day</option>
			</Select>
		</Container>
	);
};

export default SelectDuration;
