import { Time } from '@utils/skyraUtils';
import { Form, Formik } from 'formik';
import React, { PropsWithChildren } from 'react';
import AutoSave, { AutoSavingFormProps } from './AutoSave';

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
