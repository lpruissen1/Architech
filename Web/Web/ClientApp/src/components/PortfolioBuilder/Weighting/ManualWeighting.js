import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import PrimaryActionButton from '../../Generic/PrimaryActionButton';

const useStyles = makeStyles({
	paper: {
		backgroundColor: '#545454',
		color: '#d0d0d0'
	}
});

export default function ManualWeighting(props) {
	const [value, setValue] = useState(null)
	const classes = useStyles()
	const [weight, setWeight] = useState()

	const submitWeight = () => {
		props.handleManualWeight(value, weight)
	}

	return (
		<>
			<Autocomplete
				className='gyhh'
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
			<TextField
				width='43ch'
				label="Enter A Weight"
				onChange={(event) => {
					setWeight(event.target.value);
				}}
			/>
			<PrimaryActionButton
				onClick={submitWeight}
				text='Set Weight'
			/> 
		</>
	)
}
