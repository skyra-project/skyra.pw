import { Box } from '@mui/material';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { memo, MouseEventHandler, useEffect, useRef, type FC } from 'react';
import { ChromePicker, ColorChangeHandler } from 'react-color';

interface PickerDialogProps {
	value?: string;
	onChange?: ColorChangeHandler;
	onClick?: MouseEventHandler<HTMLDivElement>;
}

const PickerDialog: FC<PickerDialogProps> = ({ value, onClick, onChange }) => {
	const scrollLockRef = useRef<ChromePicker>(null);

	useEffect(() => {
		if (scrollLockRef.current === null) {
			enableBodyScroll(scrollLockRef.current as unknown as HTMLElement);
		} else {
			disableBodyScroll(scrollLockRef.current as unknown as HTMLElement);
		}

		return () => {
			clearAllBodyScrollLocks();
		};
	});

	return (
		<Box component="div" position="relative">
			<Box component="div" position="absolute" sx={{ zIndex: 'modal' }}>
				<Box
					component="div"
					onClick={onClick}
					sx={{
						position: 'fixed',
						top: 0,
						right: 0,
						bottom: 0,
						left: 0
					}}
				/>
				<ChromePicker ref={scrollLockRef} color={value} onChange={onChange} disableAlpha />
			</Box>
		</Box>
	);
};

export default memo(PickerDialog);
