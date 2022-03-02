import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import WeightingClient from '../../../Clients/WeightingClient';
import GetWeightingOptions from "./WeightingOptionsRepo";
import ManualWeighting from './ManualWeighting'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		width: '100%',
		borderRadius: 8
	},
	buttonInactive: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		width: '100%',
		color: '#d0d0d0',
		borderColor: '#d0d0d0',
		borderRadius: 8
	}
}));

export function Weighter(props) {
	const classes = useStyles();
	const [options, _] = useState(GetWeightingOptions())

	const handleCheck = (event) => {
		props.setWeightingOption(event.currentTarget.value)
	}

	const handleManualWeight = (ticker, weight) => {
		if (props.manualWeights.filter(entry => entry.ticker === ticker).length > 0) {
			let remainder = props.manualWeights.filter(entry => entry.ticker !== ticker)

			remainder.push({ ticker: ticker, weight: weight })

			props.setManualWeights(remainder)

			handleWeighting()

			return
		}

		let tempWeights = props.manualWeights
		tempWeights.push({ ticker: ticker, weight: weight })
		props.setManualWeights(tempWeights)

		handleWeighting()
	}

	const deleteManualWeight = (ticker) => {
		let tempWeights = props.manualWeights

		props.setManualWeights(tempWeights.filter(entry => entry.ticker !== ticker))
	}

	const handleWeighting = async () => {
		if (props.weightingOption !== "" && props.tickers) {
			var tickers = props.tickers.map(thing => { return thing.ticker })

			var result = await WeightingClient.postWeightingRequest(props.weightingOption, tickers, props.manualWeights)
			props.setTickers(result.tickers)
		}
	}

	useEffect(() => { handleWeighting() }, [props.weightingOption])

	return (
		<div>
			<Grid container spacing={1}>
				<Grid item xs={12} style={{ color: '#fffff', maxHeight: 100, marginTop: 20, marginLeft: 20 }}>
					<Typography style={{ marginTop: 8, color: '#fff' }} variant='h6'>Select Weighing Option</Typography>
				</Grid>
				<Grid item xs={12} style={{ paddingLeft: '10%', paddingRight: '10%', marginTop: 30 }}>
					<Grid container spacing={4}>
					{options.map(option => {
						return (
							<Grid item xs={4} key={option.value}>
								<Button
									onClick={handleCheck}
									value={option.value}
									style={{ outline: 'none' }}
									className={option.value === props.weightingOption ? classes.button : classes.buttonInactive}
									variant={option.value === props.weightingOption ? 'contained' : 'outlined'}
									color={option.value === props.weightingOption ? 'primary' : 'default'}
									disableElevation
									disableRipple
								>
									{option.displayName}
								</Button>
							</Grid>)})}
					</Grid>
				</Grid>
				<Grid item xs={12} style={{ color: '#fffff', maxHeight: 100, marginTop: 20, marginLeft: 20 }}>
					<Typography style={{ marginTop: 8, color: '#fff' }} variant='h6'>Set Weights Manually</Typography>
				</Grid>
				<Grid item xs={12}>
					<ManualWeighting
						options={props.inclusions}
						handleManualWeight={handleManualWeight}
						manualWeights={props.manualWeights}
						deleteManualWeight={deleteManualWeight}
					/>
				</Grid>
		</Grid>
		</div>
	)
}
