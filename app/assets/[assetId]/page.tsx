"use client";

import VideoDetails from '@/components/VideoDetails';
import type { NextPage } from 'next';

interface Props {
	params: {
		assetId: string
	}
}

const AssetPage : NextPage<Props> = props => {
	const { params } = props;

	return (
		<main>
			<VideoDetails assetId={ params.assetId } />
		</main>
	);
};

export default AssetPage;