import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import React, { useState } from 'react';
import NavLink from 'react-router-dom/NavLink';
import Logo from './ArchitechLogo.svg';
import LogoFont from './ArchitechLogoFont.svg';
import './NavMenu.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AuthClient from '../Clients/AuthClient';

const useStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: alpha(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: alpha(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '50%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		color: '#bcbcbc',
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: '#d0d0d0',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '50%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
	paper: {
		backgroundColor: '#f0f0f0'
	}
}));

export default function PrimarySearchAppBar(props) {

	const classes = useStyles()

	const [anchorEl, setAnchorEl] = useState(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
		setIsMenuOpen(true)
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		setIsMenuOpen(false)
	};

	const logout = () => {
		AuthClient.Logout()
		props.updateLoggedIn()
		handleMenuClose()
	}

	const renderMenu = (
		<Menu
			style={{ zIndex: 10001 }}
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
			classes={{paper: classes.paper}}
		>
			<MenuItem onClick={handleMenuClose}>
				<NavLink to='/profile' style={{ textDecoration: 'none', color: '#121212' }}>
					Profile
				</NavLink>
			</MenuItem>
			<MenuItem onClick={logout}>Log Out</MenuItem>
		</Menu>
	);

	return (
		<div>
				<AppBar position="fixed" style={{zIndex: 10000}}>
					<Box style={{ backgroundColor: '#121212' }} sx={{ height: 64, zIndex: 10000 }}>
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%', width: '100%' }}>
						<div style={{ width: '25%', display: 'flex', height: '100%', justifyContent: 'left', alignItems: 'center' }}>
							<NavLink to="/dashboard">
								<img
									style={{width: 32, height: 32, marginRight: 10, marginLeft: 24}}
									src={Logo}
									alt="Architech Logo" />
								<img style={{
									height: 32, marginLeft: 0
								}} src={LogoFont} alt="Architech Logo Font" />
							</NavLink>
						</div>
						<div style={{display: 'flex', width: '50%', alignItems: 'center', justifyContent: 'center'}}>
							<div className={classes.search} style={{ width: '50%' }}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase
									placeholder="Search Tickers…"
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput,
									}}
									inputProps={{ 'aria-label': 'search' }}
								/>
							</div>
						</div>
						<div style={{ display: 'flex', width: '25%', alignItems: 'center', justifyContent: 'right' }}>
							<IconButton
								style={{marginRight: 24, outline: 'none', color: '#f0f0f0'}}
								edge="end"
								aria-label="account of current user"
								aria-haspopup="true"
								onClick={handleProfileMenuOpen}
							>
								<AccountCircle />
							</IconButton>
						</div>
						</div>
					</Box>
				</AppBar>
				{renderMenu}
		</div>
	);
}
