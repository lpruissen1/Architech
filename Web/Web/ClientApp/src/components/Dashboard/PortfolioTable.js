import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PositionsClient from '../../Clients/PositionsClient';
import AuthClient from '../../Clients/AuthClient';

export const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(0),
		textTransform: 'none',
		fontSize: 12,
		fontWeight: 600,
		color: theme.palette.info.light
	}
}));

export default function PortfolioTable(props) {

	const [open, setOpen] = useState(false)

	const classes = useStyles()

	useEffect(() => { PositionsClient.GetAllPositions(AuthClient.GetIdFromStoredJwt()) }, []);

	return (
		<div
			style={{
				backgroundColor: '#404040',
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 40,
				borderRadius: 4,
				paddingTop: 20
			}}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography style={{ color: '#fff', marginBottom: 16 }} variant='h5'>
						<strong>Current Positions</strong>
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<TableContainer>
						<Table stickyHeader aria-label="sticky table" style={{ backgroundColor: '#484848', borderRadius: 8 }}>
							<TableHead>
								<TableRow>
									<TableCell colSpan={2} style={{ backgroundColor: '#505050', borderTopLeftRadius: 8, borderBottom: 'none' }}>
										<Typography variant='subtitle1' style={{ color: '#ffffff' }}>Portfolio Name</Typography>
									</TableCell>
									<TableCell style={{ backgroundColor: '#505050', borderBottom: 'none' }}>
										<Typography variant='subtitle1' style={{ color: '#ffffff' }}>Value</Typography>
									</TableCell>
									<TableCell style={{ backgroundColor: '#505050', borderBottom: 'none' }}>
										<Typography variant='subtitle1' style={{ color: '#ffffff' }}>Total Return</Typography>
									</TableCell>
									<TableCell style={{ backgroundColor: '#505050', borderBottom: 'none', borderTopRightRadius: 8 }}>

									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell style={{ color: '#d0d0d0', borderTop: '1px solid #606060', borderBottom: 'none', width: 40 }}>
										<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} style={{ outline: 'none', color: '#c0c0c0' }}>
											{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
										</IconButton>
									</TableCell>
									<TableCell style={{ color: '#d0d0d0', borderTop: '1px solid #606060', borderBottom: 'none' }}>
										Portfolio 1
											</TableCell>
									<TableCell style={{ color: '#d0d0d0', borderTop: '1px solid #606060', borderBottom: 'none' }}>
										$2,395.42
											</TableCell>
									<TableCell style={{ color: '#d0d0d0', borderTop: '1px solid #606060', borderBottom: 'none' }}>
										$415.26 (21.21%)
											</TableCell>
									<TableCell style={{ color: '#d0d0d0', borderTop: '1px solid #606060', borderBottom: 'none', alignItems: 'center' }}>
										<Link to='/trade' style={{ textDecoration: 'none' }}>
											<Button className={classes.button}>Buy/Sell</Button>
										</Link>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none', borderTop: '1px solid #606060', backgroundColor: '#484848' }} colSpan={5}>
										<Collapse in={open} timeout="auto" unmountOnExit>
											<Box margin={1}>
												Data Data Data
													</Box>
										</Collapse>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</div>
		)
}
