import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";
import AccountsClient from '../../Clients/AccountsClient';
import AuthClient from '../../Clients/AuthClient';

export default function GraphArea(props) {

	const [accountHistory, setAccountHistory] = useState()
	const [netContributions, setNetContributions] = useState()

	const loadAccountHistory = async () => {
		const response = await AccountsClient.GetAccountHistory(AuthClient.GetIdFromStoredJwt())
		setAccountHistory(response.accountHistory)
		setNetContributions(response.netContributions)
	}

	useEffect(() => { loadAccountHistory() }, [])

	const options = {
		chart: {
			height: 380,
			width: "100%",
			type: "area",
			foreColor: "#ccc",
			animations: {
				initialAnimation: {
					enabled: true
				}
			},
			toolbar: {
				autoSelected: "pan",
				show: false
			}
		},
		legend: {
			position: 'top',
			horizontalAlign: 'right',
		},
		colors: ['#f0f0f0', '#92ffe5'],
		grid: {
			borderColor: "#555",
			clipMarkers: false,
			yaxis: {
				lines: {
					show: false
				}
			}
		},
		tooltip: {
			theme: "dark"
		},
		dataLabels: {
			enabled: false
		},
		series: [
			{
				name: "Contributions",
				data: netContributions && Object.entries(netContributions).map(([key, value]) => [parseInt(key) * 1000, value]),
				type: "line",
			},
			{
				name: "Account Value",
				data: accountHistory && Object.entries(accountHistory).map(([key, value]) => [parseInt(key) * 1000, value]),
				type: "area",
			},
		],
		xaxis: {
			type: 'datetime',
			labels: {
				trim: false,
				style: {
					fontSize: '12px',
					fontWeight: 400,
				},
				offsetX: 0,
				offsetY: 2,
			}
		},
		yaxis: {
			labels: {
				formatter: function (value) {
					return '$' + value;
				}
			},
		},
	};

	return (
		<div
			style={{
				backgroundColor: '#404040',
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 40,
				borderRadius: 4,
				paddingTop: 20
			}}>
			<Grid container spacing={3}>
				<Grid item xs={9}>
					<Chart
						options={options}
						series={options.series}
						type="area"
						width="100%"
					/>
				</Grid>
				<Grid item xs={3}>
					<div style={{ backgroundColor: '#464646', borderRadius: 6, paddingBottom: 30, paddingTop: 10, paddingLeft: 10 }}>
						<Grid container spacing={1}>
							<Grid item xs={12}>
								<Typography style={{ color: '#f0f0f0', marginLeft: 10 }} variant='subtitle1'><strong>Performance</strong></Typography>
							</Grid>
							<Grid item xs={12} style={{ paddingLeft: '10%', color: '#d0d0d0' }}>
								<Typography style={{ fontSize: 14 }}><strong>YTD</strong> - 4.45%</Typography>
							</Grid>
							<Grid item xs={12} style={{ paddingLeft: '10%', color: '#d0d0d0' }}>
								<Typography style={{ fontSize: 14 }}><strong>1 Year</strong> - 7.24%</Typography>
							</Grid>
							<Grid item xs={12} style={{ paddingLeft: '10%', color: '#d0d0d0' }}>
								<Typography style={{ fontSize: 14 }}><strong>3 Year</strong> - 27.91%</Typography>
							</Grid>
							<Grid item xs={12} style={{ paddingLeft: '10%', color: '#d0d0d0' }}>
								<Typography style={{ fontSize: 14 }}><strong>5 Year</strong> - 14.65%</Typography>
							</Grid>
						</Grid>
					</div>
				</Grid>
			</Grid>
		</div>
	)
}
