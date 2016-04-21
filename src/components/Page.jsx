import React from 'react';
import Auth from './Auth';
import Feedback from './Feedback';
import Articles from './Articles';

const Page = () => {
	return (
		<div>
			<Auth />
			<Feedback />
			<Articles />
		</div>
	);
};

export default Page;
