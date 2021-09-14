import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import NavLink from 'react-router-dom/NavLink';
import Logo from './ArchitechLogo.svg';
import LogoFont from './ArchitechLogoFont.svg';
import './NavMenu.css';

export default function PrimarySearchAppBar() {

	return (
		<div>
			<NavLink to="/dashboard">
				<AppBar position="fixed" style={{zIndex: 10000}}>
					<Box style={{ backgroundColor: '#121212' }} sx={{ height: 64, zIndex: 10000 }}>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%' }}>
							<img
								style={{width: 32, height: 32, marginRight: 10, marginLeft: 24}}
								src={Logo}
								alt="Architech Logo" />
							<img style={{
								height: 32, marginLeft: 0
							}} src={LogoFont} alt="Architech Logo Font" />
						</div>
					</Box>
				</AppBar>
			</NavLink>
		</div>
	);
}
