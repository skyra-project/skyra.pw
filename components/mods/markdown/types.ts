import type { VNode } from 'vue';

// Define a type that represents the possible types of children in Vue
type VueNode = VNode | string | number | boolean | null | undefined | VueNode[];

// Create a generic type similar to WithReactMarkdownChildren
export type WithVueMarkdownChildren<T> = Omit<T, 'default'> & {
	default: () => VueNode | VueNode[];
};

// If you need a more specific type for functional components
export type VueMarkdownFC<P = {}> = (props: P) => VueNode | VueNode[];
