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
				<AppBar position="static">
					<Box style={{ backgroundColor: 'black' }} sx={{ px: 2.5, py: 3 }}>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<img style={{
								width: 32, height: 32, marginRight: 10, marginLeft: 0, marginBottom: 2
							}} src={Logo} alt="Architech Logo" />
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
