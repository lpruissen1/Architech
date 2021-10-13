import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(0),
		textTransform: 'none',
		fontSize: 12,
		fontWeight: 600,
		color: theme.palette.info.light
	}
}));

export default function PortfolioTableRow(props) {

	const [open, setOpen] = useState(false)

	const classes = useStyles()

	return (
		<>
			<TableRow>
				<TableCell style={{ color: '#f0f0f0', borderTop: '1px solid #606060', borderBottom: 'none', width: 40 }}>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} style={{ outline: 'none', color: '#c0c0c0' }}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell style={{ color: '#f0f0f0', borderTop: '1px solid #606060', borderBottom: 'none' }}>
					{props.portfolio.portfolioId}
				</TableCell>
				<TableCell style={{ color: '#f0f0f0', borderTop: '1px solid #606060', borderBottom: 'none' }}>
					$2,395.42
				</TableCell>
				<TableCell style={{ color: '#f0f0f0', borderTop: '1px solid #606060', borderBottom: 'none' }}>
					$415.26 (21.21%)
				</TableCell>
				<TableCell style={{ color: '#f0f0f0', borderTop: '1px solid #606060', borderBottom: 'none', alignItems: 'center' }}>
					<Link to='/trade' style={{ textDecoration: 'none' }}>
						<Button className={classes.button}>Buy/Sell</Button>
					</Link>
				</TableCell>
				</TableRow>
				<TableRow>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none', borderTop: '1px solid #606060', backgroundColor: '#484848' }} colSpan={5}>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<Box margin={1}>
							<Table size="small" aria-label="holdings">
								<TableHead>
									<TableRow>
										<TableCell align='left' style={{ color: '#f0f0f0', borderBottom: 'none', fontWeight: 600 }}>Ticker</TableCell>
										<TableCell align='right' style={{ color: '#f0f0f0', borderBottom: 'none', fontWeight: 600 }}>Quantity</TableCell>
										<TableCell align='right' style={{ color: '#f0f0f0', borderBottom: 'none', fontWeight: 600 }}>Cost Basis</TableCell>
										<TableCell align='right' style={{ color: '#f0f0f0', borderBottom: 'none', fontWeight: 600 }}>Price</TableCell>
										<TableCell align='right' style={{ color: '#f0f0f0', borderBottom: 'none', fontWeight: 600 }}>Performance</TableCell>
										<TableCell style={{ color: '#f0f0f0', borderBottom: 'none', fontWeight: 600 }}></TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{props.portfolio.positions.map((position) => (
										<TableRow key={position.ticker}>
											<TableCell align='left' component="th" scope="row" style={{ color: '#c0c0c0', borderTop: '1px solid #606060', borderBottom: 'none' }}>
												{position.ticker}
											</TableCell>
											<TableCell align='right' component="th" scope="row" style={{ color: '#c0c0c0', borderTop: '1px solid #606060', borderBottom: 'none' }}>
												{position.quantity.toFixed(5)}
											</TableCell>
											<TableCell align='right' component="th" scope="row" style={{ color: '#c0c0c0', borderTop: '1px solid #606060', borderBottom: 'none' }}>
												${position.averagePurchasePrice.toFixed(2)}
											</TableCell>
											<TableCell align='right' component="th" scope="row" style={{ color: '#c0c0c0', borderTop: '1px solid #606060', borderBottom: 'none' }}>
												${position.currentPrice.toFixed(2)}
											</TableCell>
											<TableCell align='right' component="th" scope="row" style={{ color: '#c0c0c0', borderTop: '1px solid #606060', borderBottom: 'none' }}>
												{(((position.currentPrice - position.averagePurchasePrice) / position.averagePurchasePrice) * 100).toFixed(3)}%
											</TableCell>
											<TableCell align='center' style={{ color: '#c0c0c0', borderTop: '1px solid #606060', borderBottom: 'none' }}>
												<Link to='/trade' style={{ textDecoration: 'none' }}>
													<Button className={classes.button}>Buy/Sell</Button>
												</Link>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
							</Box>
						</Collapse>
					</TableCell>
			</TableRow>
		</>
	)
}
