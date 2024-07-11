"use client";

import type { NextPage } from 'next';
import VideoPicker from "@/components/VideoPicker";

const HomePage : NextPage = props => {
	return (
		<main>
			<VideoPicker />
		</main>
	);
};

export default HomePage;