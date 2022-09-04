import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('@pages/HomePage'), { ssr: false });

const Index: NextPage = () => {
	return (
		<>
			<HomePage />
		</>
	);
};

export default Index;
