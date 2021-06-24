import React, { useState } from 'react';
import './SectorSelector.css';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
	checkbox: {
		color: '#696969',
		'&$checked': {
			color: theme.palette.primary.main,
			backgroundColor: "transparent !important",
		'&:hover': {
			backgroundColor: 'transparent !important'
		}
	},
	iconButton: {
		"&:hover": {
			backgroundColor: "green"
		}
	},
	checked: {},
	},
}));

export default function IndustryCheckBox(props) {
	const classes = useStyles();
	const [state, setState] = useState({
		checkedA: true,
		checkedB: true,
		checkedF: true,
		checkedG: true,
	});

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	return (
		<div className='industryButtonsContainer'>
			<FormControl>
				<FormLabel className='industryLabel'>Healthcare</FormLabel>
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
							checked={state.checkedG}
							onChange={handleChange}
							className={classes.checkbox}
							name="checkedG"
							icon={
								<CheckBoxOutlineBlankIcon
								fontSize="small" />}
							checkedIcon={
								<CheckBoxIcon
								color='primary'
								fontSize="small"
							/>}
						/>}
						label="Hospital"
					/>
				</FormGroup>
			</FormControl>
		</div>
	);

}
