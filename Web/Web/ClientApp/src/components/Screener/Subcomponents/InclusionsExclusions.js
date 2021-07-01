import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './InclusionsExclusions.css';
import Grid from '@material-ui/core/Grid';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';

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
		backgroundColor: '#949494',
		color: '#fff',
	},
	form: {
		maxWidth: '300px',
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

	const inclusionDelete = (ticker) => {
		debugger
		props.DeleteInclusion(ticker)
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
						<Autocomplete
							className={classes.form}
							disableClearable
							forcePopupIcon={false}
							size='small'
							value={currentInclusion}
							onChange={(event, newValue) => {
								setCurrentInclusion(newValue);
							}}
							options={['MMM', 'ABT', 'ABMD']}
							renderInput={(params) => (
								<TextField {...params} id="outlined" variant="outlined" placeholder="Search Tickers"
									InputLabelProps={{
										shrink: true,
									}}
									InputProps={{
										...params.InputProps,
										type: 'search',
										endAdornment: <Button
											variant='contained'
											className={classes.buttonLowMargin}
											onClick={updateInclusions}
											style={{ outline: 'none' }}
											disableElevation
											disableRipple
										>Include</Button>
									}} />)}
						/>
					</Grid>
						<Grid item xs={6} align="center">
						<Autocomplete
							className={classes.form}
							disableClearable
							forcePopupIcon={false}
							size='small'
							value={currentExclusion}
							onChange={(event, newValue) => {
								setCurrentExclusion(newValue);
							}}
							options={['MMM', 'ABT', 'ABMD']}
							renderInput={(params) => (
								<TextField {...params} id="outlined" variant="outlined" placeholder="Search Tickers" label="Exclude Tickers"
									InputLabelProps={{
										shrink: true,
									}}
									InputProps={{
										...params.InputProps,
										type: 'search',
										endAdornment: <Button
											variant='contained'
											className={classes.buttonLowMargin}
											onClick={updateExclusions}
											style={{ outline: 'none' }}
											disableElevation
											disableRipple
										>Exclude</Button>
									}} /> )}
								/>
						</Grid>
						<Grid item xs={6} align="left">
							<ul className="list">
							<h2> Inclusions: </h2>
							{props.inclusions && props.inclusions.map((ticker) => {
									return (
										<Chip
											key={ticker}
											label={ticker}
											variant='outlined'
											onDelete={() => inclusionDelete(ticker)}
									/>)
							})
							}
							</ul>
						</Grid>
						<Grid item xs={6} align="left">
						<p1 className="list"> Exclusions: {props.exclusions.join(", ")} </p1>
						</Grid>
					</Grid>
				</div>}
		</div>)
}
