import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

export default function BasicMetricTable(props) {

	return (
		<>
		<Typography variant="h6" gutterBottom component="div">
			Basic Metrics
		</Typography>
		<Table size="small" aria-label="purchases">
			<TableHead>
				<TableRow>
					<TableCell>Metric Type</TableCell>
					<TableCell align='right'>Min</TableCell>
					<TableCell align='right'>Max</TableCell>
					<TableCell align='right'>Time Period</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{props.getMetricDisplayInfo().map((metric) => (
					<TableRow key={metric.displayName}>
						<TableCell component="th" scope="row">
							{metric.displayName}
						</TableCell>
						<TableCell align='right'>{metric.min}</TableCell>
						<TableCell align='right'>{metric.max}</TableCell>
						<TableCell align='right'>{metric.timePeriod}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
		</>
	)
}
