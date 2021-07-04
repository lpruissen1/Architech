import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

export default function SectorAndIndustryTable(props) {

	return (
		<>
		<Typography variant="h6" gutterBottom component="div">
			Sectors and Industries
		</Typography>
		<Table size="small" aria-label="purchases">
			<TableHead>
				<TableRow>
					<TableCell>Sector</TableCell>
					<TableCell>Industries</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{props.getSectorAndIndustryDisplay().map((sector) => (
					<TableRow key={sector.name}>
						<TableCell component="th" scope="row">
							{sector.name}
						</TableCell>
						<TableCell>{sector.industries.join(', ')}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
		</>
	)
}
