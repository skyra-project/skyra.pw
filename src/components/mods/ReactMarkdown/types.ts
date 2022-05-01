import type { ReactNode } from 'react';

export type WithReactMarkdownChildren<T> = Omit<T, 'children'> & {
	children: ReactNode & ReactNode[];
};
