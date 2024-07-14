import type { Primitive } from '@sapphire/utilities';

export type TextFieldPropsOmittable = 'label' | 'error' | 'helperText' | 'onChange' | 'onBlur' | 'value' | 'defaultValue';

export type FormikValues = Record<string, any>;

// All types below are taken from the React Hook Form source code because their types are far stricter and more verbose than Formik
/**
 * Type which eagerly collects all paths through a type
 * @typeParam T - type which should be introspected
 * @example
 * ```
 * Path<{foo: {bar: string}}> = 'foo' | 'foo.bar'
 * ```
 */
export type Path<T> =
	T extends ReadonlyArray<infer V>
		? IsTuple<T> extends true
			? {
					[K in TupleKeys<T>]-?: PathImpl<K & string, T[K]>;
				}[TupleKeys<T>]
			: PathImpl<number, V>
		: {
				[K in keyof T]-?: PathImpl<K & string, T[K]>;
			}[keyof T];

declare const $NestedValue: unique symbol;

export type NestedValue<TValue extends object = object> = {
	[$NestedValue]: never;
} & TValue;

export type UnpackNestedValue<T> =
	T extends NestedValue<infer U>
		? U
		: T extends Date | FileList | File | Blob
			? T
			: T extends object
				? {
						[K in keyof T]: UnpackNestedValue<T[K]>;
					}
				: T;

export type FieldPathValue<TFieldValues extends FormikValues, TFieldPath extends Path<TFieldValues>> = PathValue<TFieldValues, TFieldPath>;

/**
 * Type to evaluate the type which the given path points to.
 * @typeParam T - deeply nested type which is indexed by the path
 * @typeParam P - path into the deeply nested type
 * @example
 * ```
 * PathValue<{foo: {bar: string}}, 'foo.bar'> = string
 * PathValue<[number, string], '1'> = string
 * ```
 */
type PathValue<T, P extends Path<T> | ArrayPath<T>> = T extends any
	? P extends `${infer K}.${infer R}`
		? K extends keyof T
			? R extends Path<T[K]>
				? PathValue<T[K], R>
				: never
			: K extends `${number}`
				? T extends ReadonlyArray<infer V>
					? PathValue<V, R & Path<V>>
					: never
				: never
		: P extends keyof T
			? T[P]
			: P extends `${number}`
				? T extends ReadonlyArray<infer V>
					? V
					: never
				: never
	: never;

/**
 * Helper type for recursively constructing paths through a type.
 * See {@link Path}
 */
type PathImpl<K extends string | number, V> = V extends Primitive ? `${K}` : `${K}` | `${K}${'[' | ']'}${Path<V>}`;

/**
 * Type to query whether an array type T is a tuple type.
 * @typeParam T - type which may be an array or tuple
 * @example
 * ```
 * IsTuple<[number]> = true
 * IsTuple<number[]> = false
 * ```
 */
type IsTuple<T extends ReadonlyArray<any>> = number extends T['length'] ? false : true;

/**
 * Type which given a tuple type returns its own keys, i.e. only its indices.
 * @typeParam T - tuple type
 * @example
 * ```
 * TupleKeys<[number, string]> = '0' | '1'
 * ```
 */
type TupleKeys<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;

/**
 * Type which eagerly collects all paths through a type which point to an array
 * type.
 * @typeParam T - type which should be introspected
 * @example
 * ```
 * Path<{foo: {bar: string[], baz: number[]}}> = 'foo.bar' | 'foo.baz'
 * ```
 */
type ArrayPath<T> =
	T extends ReadonlyArray<infer V>
		? IsTuple<T> extends true
			? {
					[K in TupleKeys<T>]-?: ArrayPathImpl<K & string, T[K]>;
				}[TupleKeys<T>]
			: ArrayPathImpl<number, V>
		: {
				[K in keyof T]-?: ArrayPathImpl<K & string, T[K]>;
			}[keyof T];

/**
 * Helper type for recursively constructing paths through a type.
 * See {@link ArrayPath}
 */
type ArrayPathImpl<K extends string | number, V> = V extends Primitive
	? never
	: V extends ReadonlyArray<infer U>
		? U extends Primitive
			? never
			: `${K}` | `${K}${'[' | ']'}${ArrayPath<V>}`
		: `${K}${'[' | ']'}${ArrayPath<V>}`;
