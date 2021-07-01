import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './InclusionsExclusions.css';
import Grid from '@material-ui/core/Grid';

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
	}
}));


export default function InclusionExclusion(props) {
	const [renderFields, setRenderFields] = useState(false)
	const [currentInclusion, setCurrentInclusion] = useState()
	const [currentExclusion, setCurrentExclusion] = useState()

	const classes = useStyles()

	const onClick = (event) => {
		setRenderFields(!renderFields)
	}

	const updateInclusions = (event) => {
		props.AddInclusion(currentInclusion)
	}

	const updateExclusions = (event) => {
		props.AddExclusion(currentExclusion)
	}

	const displayList = (tickers) => {

	}

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
						<TextField id="outlined" variant="outlined" placeholder="Include Ticker" label="Include Tickers"
							InputLabelProps={{
								shrink: true,
							}}
							onChange={(event) => {
								setCurrentInclusion(event.target.value);
							}}
							autoComplete='off'
							InputProps={{
								endAdornment: <Button
									variant='contained'
									color='primary'
									className={classes.buttonLowMargin}
									onClick={updateInclusions}
									style={{ outline: 'none' }}
									disableElevation
									disableRipple
								>Include</Button>
							}} />
					</Grid>
						<Grid item xs={6} align="center">
							<TextField id="outlined" variant="outlined" placeholder="Exclude Ticker" label="Exclude Tickers"
								InputLabelProps={{
									shrink: true,
								}}
								onChange={(event) => {
									setCurrentExclusion(event.target.value);
								}}
							autoComplete='off'
							InputProps={{
								endAdornment: <Button
									variant='contained'
									color='primary'
									className={classes.buttonLowMargin}
									onClick={updateExclusions}
									style={{ outline: 'none' }}
									disableElevation
									disableRipple
								>Exclude</Button>
							}} />
						</Grid>
						<Grid item xs={6} align="left">
						<p1 className="list"> Inclusions: {props.inclusions.join(", ")} </p1>
						</Grid>
						<Grid item xs={6} align="left">
						<p1 className="list"> Exclusions: {props.exclusions.join(", ")} </p1>
						</Grid>
					</Grid>
				</div>}
		</div>)
}
