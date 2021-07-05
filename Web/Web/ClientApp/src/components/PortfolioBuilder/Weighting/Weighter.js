import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import WeightingClient from '../../../Clients/WeightingClient';

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
	const [weights, setWeights] = useState();

	const handleCheck = (event) => {
		setSelection(event.currentTarget.value)
	}

	const handleWeighting = () => {
		var result = WeightingClient.postWeightingRequest(selection, props.tickers)
		setWeights(result)
	}

	useEffect(() => { handleWeighting() }, [selection])

	return (
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
		</Grid>)
}


const GetWeightingOptions = () => {
	return ([{ displayName: "Equally", value: "Equal" }, { displayName: "By Market Capitalization", value: "MarketCap" }, { displayName: "By Dividend Yield", value: "DividendYield"}]);
}
