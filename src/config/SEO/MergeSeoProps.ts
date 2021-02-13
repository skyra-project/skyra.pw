import deepmerge from 'deepmerge';
import DefaultSeoProps from './DefaultSeoProps';
import type { SeoProps } from './Seo';

export const mergeSeoProps = (additionalSeoProps?: SeoProps) => deepmerge(DefaultSeoProps, additionalSeoProps ?? {});
export default mergeSeoProps;
