import React from 'react';
import { css } from '@emotion/react';
import Functions from '../components/Functions';

const HomePageStyle = css`
	h1 {
		font-size: 5rem;
		font-weight: 600;
		text-align: center;
	}
`;

const HomePage = () => {
	return (
		<div css={[HomePageStyle]}>
			<h1 className="title">Welcome to Simple Spa!</h1>
			<Functions />
		</div>
	);
};

export default HomePage;
