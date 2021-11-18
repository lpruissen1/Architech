import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import PurchaseOrderTableRow from './PurchaseOrderTableRow';
import { makeStyles } from '@material-ui/core/styles';
import PrimaryActionButton from '../Generic/PrimaryActionButton';


export const useStyles = makeStyles((theme) => ({
	tableHead: {
		backgroundColor: '#606060',
	},
	table: {
		color: '#d0d0d0'
	}
}));

export default function PurchaseOrderTable(props) {

	const classes = useStyles();

	return (
		<div className='tickerTable'>
			<TableContainer style={{ borderRadius: 8, height: 500, backgroundColor: '#545454' }}>
				<Table className={classes.table} stickyHeader aria-label="collapsible table" size="small">
					<TableHead className={classes.tableHead}>
						<TableRow className={classes.tableHead} style={{ height: 48 }}>
							<TableCell className={classes.tableHead} style={{ color: '#fff', borderBottom: '1px solid #404040' }} colSpan={2}>
								<Typography variant='h6' style={{ color: '#fff', fontSize: 15, fontWeight: 550 }}>Order Summary</Typography>
							</TableCell>
							<TableCell className={classes.tableHead} style={{ color: '#fff', borderBottom: '1px solid #404040' }}>
								{props.tickers
									? <div style={{
										width: '100%',
										height: '100%',
										display: 'flex',
										alignItems: 'flex-end',
										justifyContent: 'flex-end',
									}}>
										< PrimaryActionButton text='Send Order' style={{ fontSize: 10, margin: 0 }} onClick={() => props.sendBulkOrder()} />
									</div>
									: <></>
								}
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.tickers && props.tickers.map(stockdatum =>
							<PurchaseOrderTableRow
								direction={props.direction}
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

