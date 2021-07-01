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
		color: '#fff',
	},
	form: {
		maxWidth: '300px',
		borderColor: '#949494'
	},
	chip: {
		margin: theme.spacing(0.25),
	}
}));


export default function InclusionExclusion(props) {
	const [renderFields, setRenderFields] = useState(false)
	const [currentInclusion, setCurrentInclusion] = useState()
	const [currentExclusion, setCurrentExclusion] = useState()

	const options = ['MMM', 'ABT', 'ABMD']

	const classes = useStyles()

	const onClick = (event) => {
		setRenderFields(!renderFields)
	}

	const updateInclusions = (event) => {
		props.AddInclusion(currentInclusion)
		setCurrentInclusion()
	}

	const updateExclusions = (event) => {
		props.AddExclusion(currentExclusion)
		setCurrentExclusion()
	}

	const inclusionDelete = (ticker) => {
		props.DeleteInclusion(ticker)
	}

	const exclusionDelete = (ticker) => {
		props.DeleteExclusion(ticker)
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
							closeIcon={null}
							forcePopupIcon={false}
							size='small'
							value={currentInclusion && currentInclusion}
							inputValue={currentInclusion && currentInclusion}
							onChange={(event, newValue) => {
								setCurrentInclusion(newValue);
							}}
							options={options.filter(option => !props.inclusions.includes(option) && !props.exclusions.includes(option))}
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
											color='primary'
											disableRipple
										>Include</Button>
									}} />)}
						/>
					</Grid>
						<Grid item xs={6} align="center">
						<Autocomplete
							color='secondary'
							className={classes.form}
							disableClearable
							forcePopupIcon={false}
							size='small'
							value={currentExclusion && currentExclusion}
							inputValue={currentExclusion && currentExclusion}
							onChange={(event, newValue) => {
								setCurrentExclusion(newValue);
							}}
							options={options.filter(option => !props.inclusions.includes(option) && !props.exclusions.includes(option))}
							renderInput={(params) => (
								<TextField {...params} id="outlined" variant="outlined" placeholder="Search Tickers" color='secondary'
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
											color='secondary'
											disableRipple
										>Exclude</Button>
									}} /> )}
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
