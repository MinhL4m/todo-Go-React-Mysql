import React from 'react';
import '../../../style/Header/LogoSVG.css';

interface LogoSVGProps {}

export const LogoSVG: React.FC<LogoSVGProps> = ({}) => {
	return (
		<svg width="30" height="40" viewBox="0 0 100 114" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g id="3-checks 1">
				<g id="logo">
					<path id="Vector3" d="M100 6.5L93.5 0L40.7 52.9L6.5 18.7L0 25.2L40.7 65.8L100 6.5Z" fill="white" />
					<path
						id="Vector2"
						d="M40.7 76.9L6.5 42.8L0 49.3L40.7 89.9L100 30.6L93.5 24.1L40.7 76.9Z"
						fill="white"
					/>
					<path
						id="Vector1"
						d="M40.7 101L6.5 66.9L0 73.4L40.7 114L100 54.7L93.5 48.2L40.7 101Z"
						fill="white"
					/>
				</g>
			</g>
		</svg>
	);
};
