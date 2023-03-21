import React from 'react';
import { css } from '@emotion/react';
import Mail from '@mui/icons-material/Mail';

const footerStyle = css`
	padding: 40px 16px;

	& > nav {
		margin: 0 auto;
		max-width: 1280px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		svg {
			width: 2rem;
			height: 2rem;
		}
	}
`;

const Footer = () => {
	return (
		<footer css={[footerStyle]}>
			<nav>
				<div>{new Date().getFullYear()} &copy; Copyright Cristian Rodriguez Zaninovic</div>
				<div>
					<a href="mailto:chrodriguez34@gmail.com" rel="noopener noreferrer" target="_blank">
						<Mail />
					</a>
				</div>
			</nav>
		</footer>
	);
};

export default Footer;
