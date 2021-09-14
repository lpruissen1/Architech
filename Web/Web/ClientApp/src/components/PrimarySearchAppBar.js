import { Box } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import React from 'react';
import NavLink from 'react-router-dom/NavLink';
import Logo from './ArchitechLogo.svg';
import LogoFont from './ArchitechLogoFont.svg';
import './NavMenu.css';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { alpha, makeStyles } from '@material-ui/core/styles';

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
	}
}));

export default function PrimarySearchAppBar() {

	const classes = useStyles()

	return (
		<div>
			<NavLink to="/dashboard">
				<AppBar position="fixed" style={{zIndex: 10000}}>
					<Box style={{ backgroundColor: '#121212' }} sx={{ height: 64, zIndex: 10000 }}>
						<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%', width: '100%' }}>
							<div style={{width: '25%', display: 'flex', height: '100%', justifyContent: 'left', alignItems: 'center'}}>
								<img
									style={{width: 32, height: 32, marginRight: 10, marginLeft: 24}}
									src={Logo}
									alt="Architech Logo" />
								<img style={{
									height: 32, marginLeft: 0
								}} src={LogoFont} alt="Architech Logo Font" />
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
						</div>
					</Box>
				</AppBar>
			</NavLink>
		</div>
	);
}
