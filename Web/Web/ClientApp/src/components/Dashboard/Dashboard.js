import Grid from '@material-ui/core/Grid';
import React from 'react';
import GraphArea from './GraphArea';
import PortfolioTable from './PortfolioTable';

export function Dashboard(props) {

	return (
		<Grid container spacing={4}>
			<Grid item xs={12} style={{ paddingLeft: '5%', paddingRight: '5%' }}>
				<GraphArea />
			</Grid>
			<Grid item xs={12} style={{ paddingLeft: '5%', paddingRight: '5%' }}>
				<PortfolioTable />
			</Grid>
		</Grid>
	)
}
