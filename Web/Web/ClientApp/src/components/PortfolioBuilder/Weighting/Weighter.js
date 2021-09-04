import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import WeightingClient from '../../../Clients/WeightingClient';
import GetWeightingOptions from './WeightingOptionsRepo'
import ManualWeighting from './ManualWeighting'

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(2),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		minWidth: 200
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
			{options.map(option => {
				return (
					<Grid item xs={12/options.length} key={option.value}>
						<Button
							onClick={handleCheck}
							value={option.value}
							style={{ outline: 'none' }}
							className={classes.button}
							variant={option.value === props.weightingOption ? 'contained' : 'outlined'}
							color={option.value === props.weightingOption ? 'primary' : 'default'}
							disableElevation
							disableRipple
						>
							{option.displayName}
						</Button>
					</Grid>
				)
			})}
		</Grid>
			<ManualWeighting
				options={props.inclusions}
				handleManualWeight={handleManualWeight}
				manualWeights={props.manualWeights}
				deleteManualWeight={deleteManualWeight}
			/>
		</div>
	)
}
