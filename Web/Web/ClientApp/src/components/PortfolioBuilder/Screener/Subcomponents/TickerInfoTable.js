import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function TickerInfoTable(props) {
	const fontColor = '#d0d0d0'

	return (
		<>
			<Table size="small">
			<TableBody>
				<TableRow>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11 }}>Name</TableCell>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11 }}>{props.tickerInfo[0].name}</TableCell>
				</TableRow>
				<TableRow>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11 }}>Sector</TableCell>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11 }}>{props.tickerInfo[0].sector}</TableCell>
				</TableRow>
				<TableRow>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11 }}>Market Cap</TableCell>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11 }}>{props.tickerInfo[0].marketCap}</TableCell>
				</TableRow>
				<TableRow>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11 }}>Current Price</TableCell>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11 }}>{props.tickerInfo[0].currentPrice}</TableCell>
				</TableRow>
			</TableBody>
			</Table>
		</>
		)
}
