/**
 * MIT License
 *
 * Copyright (c) 2017-2020 Wertarbyte and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Input, { InputProps } from '@mui/material/Input';
import Paper, { PaperProps } from '@mui/material/Paper';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React, {
	forwardRef,
	memo,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
	type ChangeEvent as ReactChangeEvent,
	type CSSProperties,
	type FocusEvent as ReactFocusEvent,
	type KeyboardEvent as ReactKeyboardEvent
} from 'react';

interface SearchBarProps extends Omit<InputProps, 'onChange'> {
	/**
	 * Whether to clear search on escape.
	 */
	cancelOnEscape?: boolean;
	/**
	 * Custom top-level class.
	 */
	className?: string;
	/**
	 * Disables text field.
	 */
	disabled?: boolean;
	/**
	 * Fired when the text value changes.
	 */
	onChange?(query: string): void;
	/**
	 * Fired when the search is cancelled.
	 */
	onCancelSearch?(): void;
	/**
	 * Fired when the search icon is clicked.
	 */
	onRequestSearch?(value?: string): void;
	/**
	 * Override the inline-styles of the root element.
	 */
	style?: CSSProperties;
	/**
	 * The value of the text field.
	 */
	value?: string;
	/**
	 * Additional props to apply to the Paper component
	 */
	PaperProps?: PaperProps;
}

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			height: theme.spacing(6),
			display: 'flex',
			justifyContent: 'space-between',
			backgroundColor: theme.palette.secondary.light
		},
		iconButton: {
			color: theme.palette.action.active,
			transform: 'scale(1, 1)',
			transition: theme.transitions.create(['transform', 'color'], {
				duration: theme.transitions.duration.shorter,
				easing: theme.transitions.easing.easeInOut
			})
		},
		iconButtonHidden: {
			transform: 'scale(0, 0)',
			'& > $icon': {
				opacity: 0
			}
		},
		searchIconButton: {
			marginRight: theme.spacing(-6)
		},
		icon: {
			color: theme.palette.common.white,
			transition: theme.transitions.create(['opacity'], {
				duration: theme.transitions.duration.shorter,
				easing: theme.transitions.easing.easeInOut
			})
		},
		input: {
			width: '100%',
			color: theme.palette.common.white
		},
		searchContainer: {
			margin: 'auto 16px',
			width: `calc(100% - ${theme.spacing(6 + 4)})` // 6 button + 4 margin
		}
	})
);

interface SearchBarHandle {
	focus(): void;
	blur(): void;
}

const UiSearchBar = forwardRef<SearchBarHandle, SearchBarProps>(
	(
		{
			cancelOnEscape,
			className = '',
			disabled = false,
			onCancelSearch,
			onRequestSearch,
			style,
			onFocus,
			onBlur,
			onChange,
			onKeyUp,
			value = '',
			PaperProps,
			placeholder
		},
		ref
	) => {
		const classes = useStyles();
		const inputRef = useRef<HTMLInputElement>();
		const [innerValue, setInnerValue] = useState<string>(value ?? '');

		useEffect(() => {
			setInnerValue(value);
		}, [value]);

		const handleFocus = useCallback(
			(e: ReactFocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
				if (onFocus) {
					onFocus(e);
				}
			},
			[onFocus]
		);

		const handleBlur = useCallback(
			(e: ReactFocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
				setInnerValue((v) => v.trim());
				if (onBlur) {
					onBlur(e);
				}
			},
			[onBlur]
		);

		const handleInput = useCallback(
			(e: ReactChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				setInnerValue(e.target.value);
				if (onChange) {
					onChange(e.target.value);
				}
			},
			[onChange]
		);

		const handleCancel = useCallback(() => {
			setInnerValue('');
			if (onCancelSearch) {
				onCancelSearch();
			}
		}, [onCancelSearch]);

		const handleRequestSearch = useCallback(() => {
			if (onRequestSearch) {
				onRequestSearch(innerValue);
			}
		}, [onRequestSearch, innerValue]);

		const handleKeyUp = useCallback(
			(e: ReactKeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				if (e.charCode === 13 || e.key === 'Enter') {
					handleRequestSearch();
				} else if (cancelOnEscape && (e.charCode === 27 || e.key === 'Escape')) {
					handleCancel();
				}
				if (onKeyUp) {
					onKeyUp(e);
				}
			},
			[handleRequestSearch, cancelOnEscape, handleCancel, onKeyUp]
		);

		useImperativeHandle(ref, () => ({
			focus: () => {
				inputRef.current!.focus();
			},
			blur: () => {
				inputRef.current!.blur();
			}
		}));

		return (
			<Paper className={clsx(classes.root, className)} style={style} {...PaperProps}>
				<div className={classes.searchContainer}>
					<Input
						placeholder={placeholder}
						inputRef={inputRef}
						onBlur={handleBlur}
						value={innerValue}
						onChange={handleInput}
						onKeyUp={handleKeyUp}
						onFocus={handleFocus}
						fullWidth
						className={classes.input}
						disableUnderline
						disabled={disabled}
					/>
				</div>
				<IconButton
					onClick={handleRequestSearch}
					className={clsx(classes.iconButton, classes.searchIconButton, {
						[classes.iconButtonHidden]: value !== ''
					})}
					disabled={disabled}
					size="large"
				>
					{React.cloneElement(<SearchIcon />, {
						classes: { root: classes.icon }
					})}
				</IconButton>
				<IconButton
					onClick={handleCancel}
					className={clsx(classes.iconButton, {
						[classes.iconButtonHidden]: value === ''
					})}
					disabled={disabled}
					size="large"
				>
					{React.cloneElement(<ClearIcon />, {
						classes: { root: classes.icon }
					})}
				</IconButton>
			</Paper>
		);
	}
);

export default memo(UiSearchBar);
