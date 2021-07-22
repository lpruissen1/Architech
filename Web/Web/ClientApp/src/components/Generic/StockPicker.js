import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
	paper: {
		backgroundColor: '#545454',
		color: '#d0d0d0'
	}
});

export default function StockPicker(props) {
	const [value, setValue] = useState(null)
	const classes = useStyles()

	const clickNClear = (event) => {
		value &&
			props.onChange(event)
			setValue(null)
	}

	return (
		<Autocomplete
			className={props.className}
			color={props.color}
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
				placeholder="Search Tickers"
				InputLabelProps={{
					shrink: true,
					}}
					color={props.color}
					InputProps={{
						...params.InputProps,
						type: 'search',
						endAdornment: React.cloneElement(props.endAdornment, {
							onClick: clickNClear, value: value
						})
					}
					}
				/>)}
		/>)
}

StockPicker.propTypes = {
	text: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	width: PropTypes.number,
	style: PropTypes.object
}
