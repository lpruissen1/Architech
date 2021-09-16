import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chart from "react-apexcharts";
import Typography from '@material-ui/core/Typography';

export function Dashboard(props) {

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
				data: [
					[1486684800000, 35],
					[1486771200000, 38],
					[1486857600000, 41],
					[1486944000000, 44],
					[1487030400000, 44],
					[1487116800000, 47]
				],
				type: "line"
			},
			{
				name: "Account Value",
				data: [
					[1486684800000, 39],
					[1486771200000, 40],
					[1486857600000, 36],
					[1486944000000, 50],
					[1487030400000, 33],
					[1487116800000, 59]
				],
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
		<Grid container spacing={1}>
			<Grid item xs={12} style={{ paddingLeft: '10%', paddingRight: '10%' }}>
				<div style={{ backgroundColor: '#404040', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, borderRadius: 4, paddingTop: 20  }}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<Typography style={{color: '#fff', marginBottom: 20 }} variant='h5'>
								Account Overview
							</Typography>
						</Grid>
						<Grid item xs={9}>
							<Chart
								options={options}
								series={options.series}
								type="area"
								width="100%"
							/>
						</Grid>
						<Grid item xs={3}>
							<div style={{backgroundColor: '#464646', borderRadius: 6, paddingBottom: 30, paddingTop: 10, paddingLeft: 10}}>
								<Grid container spacing={1}>
									<Grid item xs={12}>
										<Typography style={{ color: '#f0f0f0', marginLeft: 10}} variant='subtitle1'><strong>Performance</strong></Typography>
									</Grid>
									<Grid item xs={12} style={{ paddingLeft: '10%', color: '#d0d0d0'}}>
										<Typography style={{ fontSize: 14 }}><strong>YTD</strong> - 4.45%</Typography>
									</Grid>
									<Grid item xs={12} style={{ paddingLeft: '10%', color: '#d0d0d0' }}>
										<Typography style={{ fontSize: 14 }}><strong>1 Year</strong> - 7.24%</Typography>
									</Grid>
									<Grid item xs={12} style={{ paddingLeft: '10%', color: '#d0d0d0' }}>
										<Typography style={{ fontSize: 14 }}><strong>3 Year</strong> - 27.91%</Typography>
									</Grid>
									<Grid item xs={12} style={{ paddingLeft: '10%', color: '#d0d0d0'}}>
										<Typography style={{ fontSize: 14 }}><strong>5 Year</strong> - 14.65%</Typography>
									</Grid>
								</Grid>
							</div>
						</Grid>
					</Grid>
				</div>
			</Grid>
		</Grid>
	)
}
