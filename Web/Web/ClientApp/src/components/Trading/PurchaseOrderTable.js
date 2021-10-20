﻿import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import PurchaseOrderTableRow from './PurchaseOrderTableRow';
import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
	tableHead: {
		backgroundColor: '#404040',
	},
	table: {
		color: '#d0d0d0'
	}
}));

export default function PurchaseOrderTable(props) {

	const classes = useStyles();

	return (
		<div className='tickerTable'>
			<TableContainer style={{ borderRadius: 8, height: 640 }}>
				<Table className={classes.table} style={{ backgroundColor: '#464646' }} stickyHeader aria-label="collapsible table" size="small">
					<TableHead className={classes.tableHead}>
						<TableRow className={classes.tableHead} style={{ height: 48 }}>
							<TableCell className={classes.tableHead} style={{ color: '#fff', borderBottom: 'none' }}>
								<Typography variant='h6' style={{ color: '#fff', fontSize: 15, fontWeight: 550 }}>Ticker</Typography>
							</TableCell>
							<TableCell style={{ borderBottom: 'none' }} className={classes.tableHead}>
								<Typography variant='h6' style={{ color: '#fff', fontSize: 15, fontWeight: 550 }}>Amount</Typography>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.tickers && props.tickers.map(stockdatum =>
							<PurchaseOrderTableRow
								key={stockdatum.ticker}
								ticker={stockdatum.ticker}
								amount={stockdatum.amount}
							/>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

