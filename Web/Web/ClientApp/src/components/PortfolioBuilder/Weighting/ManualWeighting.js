import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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
}));

export default function ManualWeighting(props) {
	const [value, setValue] = useState(null)
	const classes = useStyles()
	const [weight, setWeight] = useState()

	const submitWeight = () => {
		props.handleManualWeight(value, weight)
	}

	return (
		<>
			<Grid container spacing={1}>
				<Grid item xs={5} align='center' justify='bottom' style={{ padding: 20 }}>
					<Autocomplete
						style={{marginTop: 30}}
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
								placeholder="Select A Ticker"
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
				<Grid item xs={3} align='left' justify='bottom'style={{ padding: 20 }}>
					<TextField
						style={{ marginTop: 20 }}
						width='43ch'
						label="Enter A Weight"
						onChange={(event) => {
							setWeight(event.target.value);
						}}
						error={weight > 100 ? true : false}
						helperText={weight > 100 ? "Weight must be less than 100%" : ""}
					/>
				</Grid>
				<Grid item xs={4} align='left' justifyContent='bottom' style={{ padding: 20 }}>
					<PrimaryActionButton
						disabled={value && weight ? false : true}
						style={{ fontSize: 12, marginTop: 34 }}
						onClick={submitWeight}
						text='Set Weight'
						/>
				</Grid>
			</Grid>
		</>
	)
}
