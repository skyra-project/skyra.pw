import Head from 'next/head';
import React, { FC } from 'react';
import mergeSeoProps from './MergeSeoProps';
import type { SeoProps } from './Seo';
import BuildSeoTags from './SeoGenerator';

interface Props {
	additionalSeoProps: SeoProps;
}

const SeoHead: FC<Props> = ({ additionalSeoProps }) => {
	return <Head>{BuildSeoTags(mergeSeoProps(additionalSeoProps))}</Head>;
};

export default SeoHead;
