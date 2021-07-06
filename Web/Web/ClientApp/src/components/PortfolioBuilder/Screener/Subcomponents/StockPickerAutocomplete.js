import React, { useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function StockPickerAutocomplete(props) {
	const [value, setValue] = useState(null)

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
			renderInput={(params) => (
			<TextField {...params} id="outlined" variant="outlined" placeholder="Search Tickers"
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
