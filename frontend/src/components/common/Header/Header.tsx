import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../../style/Header/Header.css';
import { LogoSVG } from './LogoSVG';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
	return (
		<div className="header">
			<div className="header--logo">
				<LogoSVG />
				<h1>Todo</h1>
			</div>
			<div className="header--nav">
				<NavLink to="/" exact>
					Todo
				</NavLink>
				<NavLink to="/summary" exact>
					Summary
				</NavLink>
			</div>
		</div>
	);
};
