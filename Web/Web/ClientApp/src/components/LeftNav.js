import React from 'react';
import Logo from './ArchitechLogo.svg';
import LogoFont from './ArchitechLogoFont.svg';
import { Box, Drawer, Typography, MenuItem, Link } from '@material-ui/core';
import './NavMenu.css';

export default function LeftNav() {

	const renderContent = (
		<>
			<Box style={{backgroundColor: 'black' }} sx={{ px: 2.5, py: 3 }}>
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<img style={{
						width: 32, height: 32, marginRight: 10, marginLeft: 0, marginBottom: 2
					}} src={Logo} alt="Architech Logo" />
					<img style={{
						height: 32, marginLeft: 0
					}} src={LogoFont} alt="Architech Logo Font" />
				</div>
			</Box>

			<Box sx={{ mb: 5, mx: 2.5 }}>
						<Box sx={{ ml: 2 }}>
							<Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
								Blahhhhhhhhhhhh
							</Typography>
							<Typography variant="body2" sx={{ color: 'text.secondary' }}>
								Blahhhhhhhhhhhhh
							</Typography>
						</Box>
			</Box>

			<Link to="/profile"><MenuItem>Profile</MenuItem></Link>
			<MenuItem>Menu Item 2</MenuItem>

			<Box sx={{ flexGrow: 1 }} />

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

