import MSlider, { SliderProps as MSliderProps } from '@material-ui/core/Slider';
import React, { ChangeEvent, PropsWithChildren } from 'react';
import scss from 'stylesheets/modules/Slider.module.scss';

interface SliderProps extends Omit<MSliderProps, 'onChange'> {
	onChange: (event: ChangeEvent<unknown>, value: number) => void;
}

export default ({ value, onChange, 'aria-labelledby': ariaLabel, min = 0, max = 100 }: PropsWithChildren<SliderProps>) => {
	const handleChange = () => {
		return onChange as (event: ChangeEvent<{}>, value: number | number[]) => void;
	};

	return (
		<MSlider
			value={value}
			onChange={handleChange}
			aria-labelledby={ariaLabel}
			min={min}
			max={max}
			valueLabelDisplay="auto"
			classes={{
				root: scss.slider,
				thumb: scss.thumb,
				track: scss.track,
				rail: scss.rail,
				valueLabel: scss.valueLabel
			}}
		/>
	);
};
