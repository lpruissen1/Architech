import { Drawer, MenuItem } from '@material-ui/core';
import React from 'react';
import NavLink from 'react-router-dom/NavLink';
import './NavMenu.css';

export default function LeftNav() {

	const renderContent = (
		<>
			<NavLink to="/dashboard">
				<MenuItem>Dashboard</MenuItem>
			</NavLink>
			<NavLink to="/portfolioBuilder">
				<MenuItem>Portfolio Builder</MenuItem>
			</NavLink>
			<NavLink to="/portfolios">
				<MenuItem>Portfolios</MenuItem>
			</NavLink>
			<NavLink to="/research">
				<MenuItem>Research</MenuItem>
			</NavLink>
			<NavLink to="/education">
				<MenuItem>Education</MenuItem>
			</NavLink>
			<NavLink to="/profile">
				<MenuItem>Profile</MenuItem>
			</NavLink>
		</>
	);

	return (
		<div>
			<Drawer
				width={200}
				variant="persistent"
				anchor="left"
				open={true} >
				{renderContent}
			</Drawer>
		</div>
	);
}

