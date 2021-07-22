import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PrimaryActionButton from '../../Generic/PrimaryActionButton';

const useStyles = makeStyles((theme) => ({
	paper: {
		backgroundColor: '#545454',
		color: '#d0d0d0'
	},
	tickerSelector: {
		maxWidth: '300px',
		backgroundColor: '#545454',
		borderRadius: 4,
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			border: '1px solid'
		},
		"& .MuiInputBase-root": {
			color: '#d0d0d0',
		},
		"& .MuiPaper-root": {
			backgroundColor: "#545454"
		}
	},
	chip: {
		margin: theme.spacing(0.25),
		fontSize: 12,
		border: '1px solid #545454'
	},
}));

export default function ManualWeighting(props) {
	const [value, setValue] = useState(null)
	const classes = useStyles()
	const [weight, setWeight] = useState(null)

	const submitWeight = () => {
		props.handleManualWeight(value, weight)
		setValue(null)
		setWeight(null)
	}

	const getHelperText = () => {
		let weightSum = 0

		debugger

		for (let i = 0; i < props.manualWeights.length; i++) {
			weightSum += props.manualWeights[i].weight
		}

		if (weight > 100) {
			return 'Weight must be less than 100%'
		}

		else if (weightSum + weight > 100) {
			return 'Total weight can not exceeed 100%'
		}

		return ''
	}

	return (
		<>
			<Grid container spacing={1}>
				<Grid item xs={2} align='center' justify='bottom' style={{ padding: 20 }}>
					<Autocomplete
						style={{marginTop: 30, width: '18ch'}}
						className={classes.tickerSelector}
						disableClearable
						closeIcon={null}
						forcePopupIcon={false}
						size='small'
						value={value}
						onChange={(event, newValue) => {
							setValue(newValue);
						}}
						options={props.options}
						classes={{ paper: classes.paper }}
						renderInput={(params) => (
							<TextField {...params} id="outlined" variant="outlined"
								placeholder="Select Ticker"
								InputLabelProps={{
									shrink: true,
								}}
								InputProps={{
									...params.InputProps,
									type: 'search',
								}}
							/>)}
					/>
				</Grid>
				<Grid item xs={2} align='left' style={{ padding: 20 }}>
					<TextField
						style={{ marginTop: 20, width: '18ch'}}
						label="Enter Weight"
						onChange={(event) => {
							setWeight(Number(event.target.value));
						}}
						value={weight ? weight : '' }
						error={getHelperText() !== '' ? true : false}
						helperText={getHelperText()}
					/>
				</Grid>
				<Grid item xs={2} align='left' style={{ padding: 20 }}>
					<PrimaryActionButton
						disabled={value && weight && getHelperText() === '' ? false : true}
						style={{ fontSize: 12, marginTop: 34 }}
						onClick={submitWeight}
						text='Set Weight'
						/>
				</Grid>
				<Grid item xs={6} align='left' style={{ padding: 20 }}>
					<>
						<ul className="list" style={{ marginLeft: 0, paddingLeft: 0, maxWidth: 300 }}>
							<Typography style={{ color: '#d0d0d0' }}>Manual Weights: </Typography>
							{props.manualWeights && props.manualWeights.map((entry) => {
								return (
									<Chip
										className={classes.chip}
										key={entry.ticker}
										label={entry.ticker + '      ' + entry.weight + '%'}
										onDelete={() => props.deleteManualWeight(entry.ticker)}
									/>)
							})}
						</ul>
					</>
				</Grid>
			</Grid>
		</>
	)
}
