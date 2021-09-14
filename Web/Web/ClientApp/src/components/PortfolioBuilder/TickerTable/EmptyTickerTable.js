import React from "react";
import './EmptyTickerTable.css';
import Grid from '@material-ui/core/Grid';


// Temporary text for demo video
export default function EmptyTickerTable() {
	return (
		<div className="emptyTickerTable" style={{alignItems: 'center', justifyContent: 'center', display: 'flex', width: '100%'}}>
			<div className="text-container" style={{ display: 'flex', width:'100%', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
				<Grid container spacing={1}>
					<Grid item xs={12}><h2 style={{ color: '#ffffff' }}> Loading Tickers... </h2></Grid>
					<Grid item xs={12}><p style={{ color: '#f0f0f0' }}> Please wait while we find tickers matching your criteria </p></Grid>
				</Grid>
			</div>
		</div>
		)
}
