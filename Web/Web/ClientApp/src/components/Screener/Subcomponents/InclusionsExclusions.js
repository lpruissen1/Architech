import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect  } from 'react';
import './InclusionsExclusions.css';
import StockPicker from './StockPickerAutocomplete.js';
import StockInformationClient from '../../../Clients/StockInformationClient';


const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
		marginTop: theme.spacing(2),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
	},
	buttonLowMargin: {
		margin: theme.spacing(0.25),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		color: '#fff',
	},
	form: {
		maxWidth: '300px',
	},
	chip: {
		margin: theme.spacing(0.25),
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
	const onClick = (event) => {
		setRenderFields(!renderFields)
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

	useEffect(() => GetOptions(), []);

	return (
		<div className='inclusion-exclusion-container'>
			<Button
				className={classes.button}
				onClick={onClick}
				style={{ outline: 'none' }}
				color='primary'
				> Edit Tickers Manually </Button>
			{renderFields && 
				<div className="inclusion-exclusion-contents">
				<Grid
					container
					spacing={1}
					justify="center">
					<Grid item xs={6} align="center">
						<StockPicker
							className={classes.form}
							color='primary'
							options={options.filter(option => !props.inclusions.includes(option) && !props.exclusions.includes(option))}
							onChange={updateInclusions}
							endAdornment={
								<Button
									variant='contained'
									className={classes.buttonLowMargin}
									style={{ outline: 'none' }}
									disableElevation
									color='primary'
									disableRipple
								>Include</Button>}
							/>
					</Grid>
						<Grid item xs={6} align="center">
							<StockPicker
								className={classes.form}
								color='secondary'
								options={options.filter(option => !props.inclusions.includes(option) && !props.exclusions.includes(option))}
								onChange={updateExclusions}
								endAdornment={
									<Button
										variant='contained'
										className={classes.buttonLowMargin}
										style={{ outline: 'none' }}
										disableElevation
										color='secondary'
										disableRipple
									>Exclude</Button>}
							/>
						</Grid>
						<Grid item xs={6} align="left">
							<div className='chip-container'>
								<ul className="list">
								<h2> Inclusions: </h2>
								{props.inclusions && props.inclusions.map((ticker) => {
										return (
											<Chip
												color='primary'
												className={classes.chip}
												key={ticker}
												label={ticker}
												variant='contained'
												onDelete={() => inclusionDelete(ticker)}
										/>)
								})
								}
								</ul>
							</div>
						</Grid>
						<Grid item xs={6} align="left">
						<div className='chip-container'>
							<ul className="list">
								<h2> Exclusions: </h2>
								{props.exclusions && props.exclusions.map((ticker) => {
									return (
										<Chip
											color='secondary'
											className={classes.chip}
											key={ticker}
											label={ticker}
											variant='contained'
											onDelete={() => exclusionDelete(ticker)}
										/>)
								})
								}
							</ul>
						</div>
						</Grid>
					</Grid>
				</div>}
		</div>)
}
