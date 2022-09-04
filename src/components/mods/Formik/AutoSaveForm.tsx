import { Time } from '@utils/skyraUtils';
import { Form, Formik, FormikHelpers } from 'formik';
import type { PropsWithChildren } from 'react';
import type { ObjectShape, OptionalObjectSchema, TypeOfShape } from 'yup/lib/object';
import AutoSave from './AutoSave';

export interface AutoSavingFormProps<T extends ObjectShape> {
	/** The initial values for this form */
	initialValues: T;
	/** The `yup` validation schema for this form */
	validationSchema: OptionalObjectSchema<T, T, TypeOfShape<T>>;
	/** The timeout in milliseconds between submits, @default 1000 */
	submitDebounceMs?: number;
	/** The onSubmit handler for this form */
	// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
	onSubmit(values: T, formikHelpers: FormikHelpers<T>): Promise<any> | void;
}

function AutoSavingForm<T extends ObjectShape>({
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
