import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import React, { useState, useEffect } from 'react';
import NavLink from 'react-router-dom/NavLink';
import Logo from './ArchitechLogo.svg';
import LogoFont from './ArchitechLogoFont.svg';
import PrimaryLinkButton from './Generic/PrimaryLinkButton';
import Typography from '@material-ui/core/Typography';

import './NavMenu.css';

export default function PrimarySearchAppBar() {
	const [date, setDate] = useState("Hi")

	useEffect(() => {
		let eventSource = new EventSource("https://localhost:5001/Date")
		eventSource.onmessage = e => updateDate(e.data)
	}, [])

	const updateDate = (newDate) => {
		debugger
		setDate(newDate)
	}

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
							<Typography variant='h3' style={{ color: '#f0f0f0' }}>{date}</Typography>
						</div>
						<div style={{ display: 'flex', width: '75%', alignItems: 'center', justifyContent: 'right' }}>
							<PrimaryLinkButton to="/login" text="Login" />
						</div>
					</div>
				</Box>
			</AppBar>
		</div>
	);
}
