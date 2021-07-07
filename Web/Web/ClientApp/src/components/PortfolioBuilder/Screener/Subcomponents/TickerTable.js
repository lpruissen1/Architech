import React, { Component } from 'react';
import EmptyTickerTable from './EmptyTickerTable';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TickerTableRow from './TickerTableRow';
import { makeStyles } from '@material-ui/core/styles';
import './TickerTable.css';


export const useStyles = makeStyles((theme) => ({
	tableHead: {
		backgroundColor: theme.palette.primary.main,
	}
}));

export default function TickerTable(props) {

	const classes = useStyles();

		return (
			<div className='tickerTable'>
				<TableContainer style={{ borderRadius: 8, height: 640 }}>
					{props.tickers.length === 0
						? <EmptyTickerTable />
						: <Table stickyHeader aria-label="collapsible table" size="small">
							<TableHead className={classes.tableHead}>
								<TableRow className={classes.tableHead} style={{ height: 48 }}>
									<TableCell className={classes.tableHead} style={{ width: 10 }}>
									</TableCell>
									<TableCell className={classes.tableHead} style={{ color: '#fff' }}>
										<Typography variant='h6' style={{ color: '#fff', fontSize: 15 }}>Ticker</Typography>
									</TableCell>
									<TableCell className={classes.tableHead}>
										<Typography variant='h6' style={{ color: '#fff', fontSize: 15 }}>Weight</Typography>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{props.tickers && props.tickers.map(stockdatum =>
									<TickerTableRow
										key={stockdatum.ticker}
										ticker={stockdatum.ticker}
										weight={stockdatum.weight}
									/>
								)}
							</TableBody>
						</Table>}
				</TableContainer>
			</div>
		);
}

