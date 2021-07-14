import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect  } from 'react';
import './InclusionsExclusions.css';
import StockPicker from '../../../Generic/StockPicker.js';
import StockInformationClient from '../../../../Clients/StockInformationClient';


const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
		marginTop: theme.spacing(2),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
	},
	inclusionButton: {
		margin: theme.spacing(0.25),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		color: '#fff',
		backgroundColor: theme.palette.success.dark,
		'&:hover': {
			backgroundColor: '#327f6d',
			boxShadow: 'none',
		},
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: theme.palette.success.dark
		},
	},
	exclusionButton: {
		margin: theme.spacing(0.25),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		color: '#fff',
		backgroundColor: theme.palette.warning.main,
		'&:hover': {
			backgroundColor: theme.palette.warning.dark,
			boxShadow: 'none',
		},
	},
	inclusionForm: {
		maxWidth: '300px',
		backgroundColor: '#545454',
		borderRadius: 4,
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: theme.palette.success.dark
		},
		"& .MuiInputBase-root": {
			color: '#d0d0d0',
		},
		"& .MuiPaper-root": {
			backgroundColor: "#545454"
		}
	},
	exclusionForm: {
		maxWidth: '300px',
		backgroundColor: '#545454',
		borderRadius: 4,
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: theme.palette.warning.main
		},
		"& .MuiInputBase-root": {
			color: '#d0d0d0',
		}
	},
	inclusionChip: {
		margin: theme.spacing(0.25),
		backgroundColor: theme.palette.success.dark
	},
	exclusionChip: {
		margin: theme.spacing(0.25),
		backgroundColor: theme.palette.warning.main
	}
}));


export default function InclusionExclusion(props) {
	const [renderFields, setRenderFields] = useState(false)
	const [options, setOptions] = useState([])

	const classes = useStyles()

	const GetOptions = async () => {
		let response = await StockInformationClient.GetAllTickers()
		setOptions(response)
	}

	const updateInclusions = (event) => {
		props.AddInclusion(event.currentTarget.value)
	}

	const updateExclusions = (event) => {
		props.AddExclusion(event.currentTarget.value)
	}

	const inclusionDelete = (ticker) => {
		props.DeleteInclusion(ticker)
	}

	const exclusionDelete = (ticker) => {
		props.DeleteExclusion(ticker)
	}

	useEffect(() => { GetOptions() }, []);

	return (
		<div style={{ color: '#fff' }} className='inclusion-exclusion-container'>
				<Typography variant='h6'>Manually Adjust Tickers</Typography>
			<div style={{ marginLeft: 40 }} className="inclusion-exclusion-contents">
				<Grid
					container
					spacing={1}
					justify="center">
					<Grid item xs={6} align="left">
						<StockPicker
							className={classes.inclusionForm}
							options={options.filter(option => !props.inclusions.includes(option) && !props.exclusions.includes(option))}
							onChange={updateInclusions}
							endAdornment={
								<Button
									variant='contained'
									className={classes.inclusionButton}
									style={{ outline: 'none' }}
									disableElevation
									color='primary'
									disableRipple
								>Include</Button>}
							/>
					</Grid>
						<Grid item xs={6} align="left">
							<StockPicker
								className={classes.exclusionForm}
								color='secondary'
								options={options.filter(option => !props.inclusions.includes(option) && !props.exclusions.includes(option))}
								onChange={updateExclusions}
								endAdornment={
									<Button
										variant='contained'
										className={classes.exclusionButton}
										style={{outline: 'none' }}
										disableElevation
										color='secondary'
										disableRipple
									>Exclude</Button>}
							/>
						</Grid>
						<Grid item xs={6} align="left">
							<div>
							<ul className="list" style={{ marginLeft: 0, paddingLeft: 0, maxWidth: 300 }}>
								<h2> Inclusions: </h2>
								{props.inclusions && props.inclusions.map((ticker) => {
										return (
											<Chip
												className={classes.inclusionChip}
												key={ticker}
												label={ticker}
												onDelete={() => inclusionDelete(ticker)}
										/>)
								})
								}
								</ul>
							</div>
						</Grid>
						<Grid item xs={6} align="left">
						<div>
							<ul className="list" style={{ marginLeft: 0, paddingLeft: 0, maxWidth: 300 }}>
								<h2> Exclusions: </h2>
								{props.exclusions && props.exclusions.map((ticker) => {
									return (
										<Chip
											color='warning'
											className={classes.exclusionChip}
											key={ticker}
											label={ticker}
											onDelete={() => exclusionDelete(ticker)}
										/>)
								})
								}
							</ul>
						</div>
						</Grid>
					</Grid>
				</div>
		</div>)
}
