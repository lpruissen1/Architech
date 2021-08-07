import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import NumberFormatter from '../../../../Formatter/NumberFormatter.js'
import RuleTextFormatter from '../../../../Formatter/RuleTextFormatter.js'

export default function TickerInfoTable(props) {
	const fontColor = '#d0d0d0'

	return (
		<>
			<Table size="small">
			<TableBody>
				<TableRow>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11, borderBottom: '1px solid #545454', width: '50%' }}>Name</TableCell>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11, borderBottom: '1px solid #545454' }}>{props.tickerInfo[0].name}</TableCell>
				</TableRow>
				<TableRow>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11, borderBottom: '1px solid #545454', width: '50%' }}>Sector</TableCell>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11, borderBottom: '1px solid #545454' }}>{props.tickerInfo[0].sector}</TableCell>
				</TableRow>
				<TableRow>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11, borderBottom: '1px solid #545454', width: '50%' }}>Market Cap</TableCell>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11, borderBottom: '1px solid #545454' }}>{NumberFormatter(props.tickerInfo[0].marketCap, "MarketCap")}</TableCell>
				</TableRow>
				<TableRow>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11, borderBottom: '1px solid #545454', width: '50%' }}>Current Price</TableCell>
						<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11, borderBottom: '1px solid #545454' }}>${props.tickerInfo[0].currentPrice}</TableCell>
				</TableRow>
					{props.screeningRules && props.screeningRules.map(rule => {
						return (
							<TableRow>
								<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11, borderBottom: '1px solid #545454', width: '50%' }}>{RuleTextFormatter(rule.ruleType, rule.timePeriod)}</TableCell>
								<TableCell align='left' style={{ color: fontColor, borderBottom: 'none', fontSize: 11, borderBottom: '1px solid #545454' }}>{NumberFormatter(rule.value, rule.ruleType)}</TableCell>
							</TableRow>
						)
					})}
			</TableBody>
			</Table>
		</>
		)
}
