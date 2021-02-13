import deepmerge from 'deepmerge';
import type { NextSeoProps } from 'next-seo';
import DefaultSeoProps from './DefaultSeoProps';

export const mergeSeoProps = (additionalSeoProps?: NextSeoProps) => deepmerge(additionalSeoProps ?? {}, DefaultSeoProps);
export default mergeSeoProps;
