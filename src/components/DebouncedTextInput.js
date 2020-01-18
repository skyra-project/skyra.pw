import React from 'reactn';
import TextField from '@material-ui/core/TextField';
// import AwesomeDebouncePromise from 'awesome-debounce-promise';

// TODO(gc): This thing is more faulty than a null access in C++, let's explore a better solution
export default function CustomizedDialogs({ title, currentValue, maxLength, onChange }) {
	const [content, setContent] = React.useState(currentValue || '');

	// const onChangeDebounced = AwesomeDebouncePromise(value => {
	// 	onChange(value || null);
	// }, 500);

	const onChangeValue = event => {
		setContent(event.target.value);
		onChange(event.target.value || null);
		// onChangeDebounced(event.target.value);
	};

	return (
		<TextField
			autoComplete="off"
			autoCorrect="off"
			autoCapitalize="off"
			spellCheck="true"
			label={title}
			value={content}
			onChange={onChangeValue}
			multiline
			fullWidth
			maxLength={maxLength}
		/>
	);
}
