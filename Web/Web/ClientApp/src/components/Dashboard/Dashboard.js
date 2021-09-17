import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Chart from "react-apexcharts";
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

export const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(0),
		textTransform: 'none',
		fontSize: 12,
		fontWeight: 600,
		color: theme.palette.info.light
	}
}));

export function Dashboard(props) {

	const [open, setOpen] = useState(false)

	const classes = useStyles()

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
		<Grid container spacing={4}>
			<Grid item xs={12} style={{ paddingLeft: '10%', paddingRight: '10%' }}>
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
						<Grid item xs={12}>
							<Typography style={{color: '#fff', marginBottom: 20 }} variant='h5'>
								<strong>Account Overview</strong>
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
			<Grid item xs={12} style={{ paddingLeft: '10%', paddingRight: '10%' }}>
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
						<Grid item xs={12}>
							<Typography style={{ color: '#fff', marginBottom: 16 }} variant='h5'>
								<strong>Current Positions</strong>
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<TableContainer>
								<Table stickyHeader aria-label="sticky table" style={{backgroundColor: '#484848', borderRadius: 8}}>
									<TableHead>
										<TableRow>
											<TableCell colSpan={2} style={{ backgroundColor: '#505050', borderTopLeftRadius: 8, borderBottom: 'none' }}>
												<Typography variant='subtitle1' style={{ color: '#ffffff' }}>Portfolio Name</Typography>
											</TableCell>
											<TableCell style={{ backgroundColor: '#505050', borderBottom: 'none' }}>
												<Typography variant='subtitle1' style={{ color: '#ffffff' }}>Value</Typography>
											</TableCell>
											<TableCell style={{ backgroundColor: '#505050', borderBottom: 'none' }}>
												<Typography variant='subtitle1' style={{ color: '#ffffff' }}>Total Return</Typography>
											</TableCell>
											<TableCell style={{ backgroundColor: '#505050', borderBottom: 'none', borderTopRightRadius: 8 }}>
												
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow>
											<TableCell style={{ color: '#d0d0d0', borderTop: '1px solid #606060', borderBottom: 'none', width: 40 }}>
												<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)} style={{ outline: 'none', color: '#c0c0c0' }}>
													{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
												</IconButton>
											</TableCell>
											<TableCell style={{ color: '#d0d0d0', borderTop: '1px solid #606060', borderBottom: 'none' }}>
												Portfolio 1
											</TableCell>
											<TableCell style={{ color: '#d0d0d0', borderTop: '1px solid #606060', borderBottom: 'none' }}>
												$2,395.42
											</TableCell>
											<TableCell style={{ color: '#d0d0d0', borderTop: '1px solid #606060', borderBottom: 'none' }}>
												$415.26 (21.21%)
											</TableCell>
											<TableCell style={{ color: '#d0d0d0', borderTop: '1px solid #606060', borderBottom: 'none', alignItems: 'center' }}>
												<Link to='/trade' style={{ textDecoration: 'none' }}>
													<Button className={classes.button}>Buy/Sell</Button>
												</Link>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell style={{ paddingBottom: 0, paddingTop: 0, borderBottom: 'none', borderTop: '1px solid #606060', backgroundColor: '#484848'}} colSpan={5}>
												<Collapse in={open} timeout="auto" unmountOnExit>
													<Box margin={1}>
														Data Data Data
													</Box>
												</Collapse>
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Grid>
					</Grid>
				</div>
			</Grid>
		</Grid>
	)
}
