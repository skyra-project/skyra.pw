import { Time } from '#utils/skyraUtils';
import { useFormikContext } from 'formik';
import debounce from 'lodash/debounce';
import React, { FC, Fragment, memo, useCallback, useEffect } from 'react';

export interface AutoSaveProps {
	/** The timeout in milliseconds between submits, @default 1000 */
	submitDebounceMs?: number;
}

const AutoSave: FC<AutoSaveProps> = ({ submitDebounceMs = Time.Second }) => {
	const formik = useFormikContext();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSubmit = useCallback(
		debounce(async () => {
			// Validate the form
			await formik.validateForm();

			// If the form is valid then submit it
			if (formik.isValid) {
				await formik.submitForm();
			}
		}, submitDebounceMs),
		[submitDebounceMs, formik.submitForm]
	);

	useEffect(() => {
		if (formik.dirty) {
			debouncedSubmit();
		}
	}, [debouncedSubmit, formik.dirty, formik.values]);

	return <Fragment />;
};

export default memo(AutoSave);
