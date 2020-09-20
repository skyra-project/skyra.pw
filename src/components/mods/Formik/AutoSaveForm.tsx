import { Time } from '@utils/skyraUtils';
import { Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import debounce from 'lodash/debounce';
import React, { Fragment, PropsWithChildren, useCallback, useEffect } from 'react';
import { ObjectSchema } from 'yup';

interface AutoSavingFormProps<T extends Record<string, unknown>> {
	/** The initial values for this form */
	initialValues: T;
	/** The `yup` validation schema for this form */
	validationSchema: ObjectSchema<T | undefined>;
	/** The timeout in milliseconds between submits, @default 1000 */
	submitDebounceMs?: number;
	/** The onSubmit handler for this form */
	onSubmit(values: T, formikHelpers: FormikHelpers<T>): void | Promise<any>;
}

function AutoSave<T extends Record<string, unknown>>({ submitDebounceMs = Time.Second }: Pick<AutoSavingFormProps<T>, 'submitDebounceMs'>) {
	const formik = useFormikContext<T>();

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
}

function AutoSavingForm<T extends Record<string, unknown>>({
	initialValues,
	onSubmit,
	validationSchema,
	children,
	submitDebounceMs = Time.Second,
	...props
}: PropsWithChildren<AutoSavingFormProps<T>>) {
	return (
		<Formik {...props} enableReinitialize initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{() => (
				<Form>
					<AutoSave submitDebounceMs={submitDebounceMs} />
					{children}
				</Form>
			)}
		</Formik>
	);
}

export default AutoSavingForm;
