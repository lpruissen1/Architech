import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React from 'react';

export default function PurchaseOrderTableRow(props) {
	return (
		<>
			<TableRow>
				<TableCell component="th" scope="row" style={{ color: '#d0d0d0', borderBottomColor: '#545454' }}>
					<Typography style={{ fontWeight: 600, marginLeft: 2 }}>{props.ticker}</Typography>
				</TableCell>
				<TableCell style={{ color: '#d0d0d0', borderBottomColor: '#545454' }} align="left">
					<Typography style={{ color: props.direction == 'Buy' ? '#64ffda' : '#FF644C' }}>{props.direction}</Typography>
				</TableCell>
				<TableCell style={{ color: '#d0d0d0', borderBottomColor: '#545454' }} align="right">
					<Typography>${props.amount.toFixed(2)}</Typography>
				</TableCell>
			</TableRow>
		</>
	)
}
