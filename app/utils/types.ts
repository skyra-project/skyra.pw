export type RefType<T extends Ref> = T extends Ref<infer V> ? V : never;
