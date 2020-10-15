import { reactStringReplace } from '@utils/reactStringReplace';
import React, { forwardRef } from 'react';

const InlineCode = forwardRef<HTMLSpanElement>(({ children }, ref) => (
	<code>
		{reactStringReplace(children as string | string[], /(.{15})/g, (match, index) => (
			<span ref={ref} key={index}>
				<wbr />
				{match}
			</span>
		))}
	</code>
));

export default InlineCode;
