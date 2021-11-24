import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import NavLink from 'react-router-dom/NavLink';
import Logo from './ArchitechLogo.svg';
import LogoFont from './ArchitechLogoFont.svg';
import PrimaryLinkButton from './Generic/PrimaryLinkButton';
import './NavMenu.css';

export default function PrimarySearchAppBar() {
	return (
		<div>
			<AppBar position="fixed" style={{ zIndex: 10000 }}>
				<Box style={{ backgroundColor: '#121212' }} sx={{ height: 64, zIndex: 10000 }}>
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%', width: '100%' }}>
						<div style={{ width: '25%', display: 'flex', height: '100%', justifyContent: 'left', alignItems: 'center' }}>
							<NavLink to="/">
								<img
									style={{ width: 32, height: 32, marginRight: 10, marginLeft: 24 }}
									src={Logo}
									alt="Architech Logo" />
								<img style={{
									height: 32, marginLeft: 0
								}} src={LogoFont} alt="Architech Logo Font" />
							</NavLink>
						</div>
						<div style={{ display: 'flex', width: '75%', alignItems: 'center', justifyContent: 'right' }}>
							<PrimaryLinkButton style={{ fontSize: 14 }} to="/login" text="Login" />
						</div>
					</div>
				</Box>
			</AppBar>
		</div>
	);
}
