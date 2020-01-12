import MSlider, { SliderProps } from '@material-ui/core/Slider';
import React, { FC } from 'react';
import scss from 'stylesheets/modules/Slider.module.scss';

const Slider: FC<SliderProps> = ({ value, onChange, 'aria-labelledby': ariaLabel, min = 0, max = 100 }) => (
	<MSlider
		value={value}
		onChange={onChange}
		aria-labelledby={ariaLabel}
		min={min}
		max={max}
		valueLabelDisplay="auto"
		classes={{
			root: scss.slider,
			thumb: scss.thumb,
			track: scss.track,
			rail: scss.rail
		}}
	/>
);

export default Slider;
