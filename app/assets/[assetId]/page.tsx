"use client";

import VideoDetails from '@/components/VideoDetails';
import type { NextPage } from 'next';

interface PageProps {
	params: {
		assetId: string
	}
}

export const AssetPage : NextPage<PageProps> = props => {
	const { params } = props;

	return (
		<main>
			<VideoDetails assetId={ params.assetId } />
		</main>
	);
};

export default AssetPage;