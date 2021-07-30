import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function TickerInfoTable(props) {
	const fontColor = '#d0d0d0'

	return (
		<>
		<Typography variant="h6" gutterBottom component="div">
				{props.tickerInfo[0].ticker}
		</Typography>
		<Table size="small" aria-label="purchases">
			<TableBody>
				<TableRow>
					<TableCell align='right' style={{ color: fontColor }}>Name:</TableCell>
					<TableCell align='right' style={{ color: fontColor }}>{props.tickerInfo[0].name}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell align='right' style={{ color: fontColor }}>Sector:</TableCell>
					<TableCell align='right' style={{ color: fontColor }}>{props.tickerInfo[0].sector}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell align='right' style={{ color: fontColor }}>Market Cap:</TableCell>
					<TableCell align='right' style={{ color: fontColor }}>{props.tickerInfo[0].marketCap}</TableCell>
				</TableRow>
				<TableRow>
					<TableCell align='right' style={{ color: fontColor }}>Current Price: </TableCell>
					<TableCell align='right' style={{ color: fontColor }}>{props.tickerInfo[0].currentPrice}</TableCell>
				</TableRow>
			</TableBody>
			</Table>
		</>
		)
}
