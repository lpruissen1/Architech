import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
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
	const [selection, setSelection] = useState("")
	const [manualWeights, setManualWeights] = useState([])

	const handleCheck = (event) => {
		setSelection(event.currentTarget.value)
	}

	const handleManualWeight = (ticker, weight) => {

		if (manualWeights.filter(entry => entry.ticker === ticker).length > 0) {
			let remainder = manualWeights.filter(entry => entry.ticker !== ticker)

			remainder.push({ ticker: ticker, weight: weight })

			setManualWeights(remainder)

			handleWeighting()

			return
		}

		let tempWeights = manualWeights
		tempWeights.push({ ticker: ticker, weight: weight })
		setManualWeights(tempWeights)

		handleWeighting()
	}

	const deleteManualWeight = (ticker) => {
		let tempWeights = manualWeights

		setManualWeights(tempWeights.filter(entry => entry.ticker !== ticker))
	}

	const handleWeighting = async () => {
		if (selection !== "") {
			var result = await WeightingClient.postWeightingRequest(selection, props.tickers.map(thing => { return thing.ticker }), manualWeights)
			props.setTickers(result.tickers)
		}
	}

	useEffect(() => { handleWeighting() }, [selection])

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
							variant={option.value === selection ? 'contained' : 'outlined'}
							color={option.value === selection ? 'primary' : 'default'}
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
				manualWeights={manualWeights}
				deleteManualWeight={deleteManualWeight}
			/>
		</div>
	)
}
