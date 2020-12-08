import { Time } from '#utils/skyraUtils';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { PropsWithChildren } from 'react';
import type { ObjectSchema } from 'yup';
import AutoSave from './AutoSave';

export interface AutoSavingFormProps<T extends Record<string, unknown>> {
	/** The initial values for this form */
	initialValues: T;
	/** The `yup` validation schema for this form */
	validationSchema: ObjectSchema<T | undefined>;
	/** The timeout in milliseconds between submits, @default 1000 */
	submitDebounceMs?: number;
	/** The onSubmit handler for this form */
	onSubmit(values: T, formikHelpers: FormikHelpers<T>): void | Promise<any>;
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
