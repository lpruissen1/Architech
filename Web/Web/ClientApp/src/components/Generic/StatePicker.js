import { makeStyles, alpha  } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import React, { useState } from 'react';

export const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		'& label.Mui-focused': {
			color: '#c0c0c0',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: '#848484',
			},
			'&:hover fieldset': {
				borderColor: '#969696',
			},
			'&.Mui-focused fieldset': {
				borderColor: '#969696',
				boxShadow: `${alpha(theme.palette.info.main, 0.25)} 0 0 0 2px`,
				borderColor: theme.palette.info.main,
			},
		},
	},
	multilineColor: {
		color: '#f0f0f0',
	},
	paper: {
		backgroundColor: '#545454',
		color: '#d0d0d0'
	},
	inputRoot: {
		color: '#f0f0f0'
	}
}));

export default function StatePicker(props) {
	const [value, setValue] = useState(props.value)
	const classes = useStyles()

	const options = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

	return (
		<Autocomplete
			className={props.className}
			color={props.color}
			disableClearable
			closeIcon={null}
			forcePopupIcon={false}
			value={value}
			onChange={(event, newValue) => {
				props.setState(newValue);
				setValue(newValue);
			}}
			options={options}
			classes={{
				paper: classes.paper,
				inputRoot: classes.inputRoot
			}}
			renderInput={(params) => (
				<TextField {...params} id="outlined" variant="outlined"
					InputLabelProps={{
						shrink: true,
						style: { color: '#f0f0f0', backgroundColor: '#363636', paddingRight: 10 },

					}}
					style={{ borderRadius: 4, color: '#fff', width: props.width }}
					className={classes.root}
					label={props.label}
					color={props.color}
					
				/>)}
		/>)
}

StatePicker.propTypes = {
	width: PropTypes.number,
	style: PropTypes.object
}
