import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import NumberFormatter from '../../../Formatter/NumberFormatter'
import RuleTextFormatter from '../../../Formatter/RuleTextFormatter'

export default function TickerInfoTable(props) {
	const fontColor = '#d0d0d0'

	const labelCellStyle = { color: fontColor, borderBottom: 'none', fontSize: 11, borderBottom: '1px solid #545454', width: '50%' }
	const dataCellStyle = { color: fontColor, borderBottom: 'none', fontSize: 11, borderBottom: '1px solid #545454', width: '50%' }

	return (
		<>
			<Table size="small">
			<TableBody>
				<TableRow>
						<TableCell align='left' style={labelCellStyle}>Name</TableCell>
						<TableCell align='left' style={dataCellStyle}>{props.tickerInfo[0].name}</TableCell>
				</TableRow>
				<TableRow>
						<TableCell align='left' style={labelCellStyle}>Sector</TableCell>
						<TableCell align='left' style={dataCellStyle}>{props.tickerInfo[0].sector}</TableCell>
				</TableRow>
				<TableRow>
						<TableCell align='left' style={labelCellStyle}>Market Cap</TableCell>
						<TableCell align='left' style={dataCellStyle}>{NumberFormatter.UnitFormatter(props.tickerInfo[0].marketCap, "MarketCap")}</TableCell>
				</TableRow>
				<TableRow>
						<TableCell align='left' style={labelCellStyle}>Current Price</TableCell>
						<TableCell align='left' style={dataCellStyle}>${props.tickerInfo[0].currentPrice}</TableCell>
				</TableRow>
					{props.screeningRules && props.screeningRules.map(rule => {
						return (
							<TableRow>
								<TableCell align='left' style={labelCellStyle}>{RuleTextFormatter(rule.ruleType, rule.timePeriod)}</TableCell>
								<TableCell align='left' style={dataCellStyle}>{NumberFormatter.UnitFormatter(rule.value, rule.ruleType)}</TableCell>
							</TableRow>
						)
					})}
			</TableBody>
			</Table>
		</>
		)
}
