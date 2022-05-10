import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import type { InputProps } from '@mui/material/Input';
import type { PaperProps } from '@mui/material/Paper';
import type { Theme } from '@mui/material/styles';
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

import { Box, IconButton, Input, Paper } from '@mui/material';

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
			<Paper
				className={className}
				style={style}
				{...PaperProps}
				sx={{
					height: (theme) => theme.spacing(6),
					zIndex: (theme) => theme.zIndex.appBar - 1,
					backgroundColor: (theme) => theme.palette.secondary.light,
					mb: 1,
					display: 'flex',
					justifyContent: 'space-between',
					position: 'sticky',
					top: {
						md: (theme) => theme.spacing(9),
						xs: (theme) => theme.spacing(8.5)
					}
				}}
			>
				<Box
					sx={{
						margin: 'auto 16px',
						width: (theme) => `calc(100% - ${theme.spacing(6 + 4)})` // 6 button + 4 margin
					}}
				>
					<Input
						placeholder={placeholder}
						inputRef={inputRef}
						onBlur={handleBlur}
						value={innerValue}
						onChange={handleInput}
						onKeyUp={handleKeyUp}
						onFocus={handleFocus}
						fullWidth
						disableUnderline
						disabled={disabled}
						sx={{
							width: '100%',
							color: (theme) => theme.palette.common.white
						}}
					/>
				</Box>
				<IconButton
					onClick={handleRequestSearch}
					disabled={disabled}
					size="large"
					sx={{
						color: (theme) => theme.palette.action.active,
						transform: value === '' ? 'scale(0,0)' : 'scale(1, 1)',
						opacity: value === '' ? 0 : 1,
						mr: -1,
						transition: (theme) =>
							theme.transitions.create(['transform', 'color'], {
								duration: theme.transitions.duration.shorter,
								easing: theme.transitions.easing.easeInOut
							})
					}}
				>
					{React.cloneElement(<SearchIcon />, {
						sx: (theme: Theme) => ({
							color: theme.palette.common.white,
							transition: theme.transitions.create(['opacity'], {
								duration: theme.transitions.duration.shorter,
								easing: theme.transitions.easing.easeInOut
							})
						})
					})}
				</IconButton>
				<IconButton
					onClick={handleCancel}
					sx={{
						color: (theme) => theme.palette.action.active,
						transform: value === '' ? 'scale(0,0)' : 'scale(1, 1)',
						opacity: value === '' ? 0 : 1,
						transition: (theme) =>
							theme.transitions.create(['transform', 'color'], {
								duration: theme.transitions.duration.shorter,
								easing: theme.transitions.easing.easeInOut
							})
					}}
					disabled={disabled}
					size="large"
				>
					{React.cloneElement(<ClearIcon />, {
						sx: (theme: Theme) => ({
							color: theme.palette.common.white,
							transition: theme.transitions.create(['opacity'], {
								duration: theme.transitions.duration.shorter,
								easing: theme.transitions.easing.easeInOut
							})
						})
					})}
				</IconButton>
			</Paper>
		);
	}
);

export default memo(UiSearchBar);
