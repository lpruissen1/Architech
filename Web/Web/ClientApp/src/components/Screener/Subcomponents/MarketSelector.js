import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './MarketSelector.css';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	buttonUnchecked: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
	},
	buttonChecked: {
		margin: theme.spacing(1),
		textTransform: 'none',
		fontSize: 14,
		variant: 'contained',
		fontWeight: 500,
	}
}));

export default function MarketSelector(props) {
	const classes = useStyles();
	const [buttons, setButtons] = useState([
		{ value: 'Market 1', isChecked: false },
		{ value: 'Market 2', isChecked: false },
		{ value: 'Market 3', isChecked: false },
		{ value: 'Market 4', isChecked: false}])

	const handleCheck = (event) => {
		let tempButton = []
		debugger
		buttons.forEach(button => {
			if (event.currentTarget.value === button.value) {
				tempButton.push({ value: button.value, isChecked: !button.isChecked })
			}

			else {
				tempButton.push({ value: button.value, isChecked: button.isChecked })
			}
		})

		setButtons(tempButton)
	}

	return (
		<div className='flex-market-container'>
			{buttons && buttons.map(button => {
				return (
					<div className="marketButtons">
						<Button
							onClick={handleCheck}
							value={button.value}
							className={button.isChecked ? classes.buttonChecked : classes.buttonUnchecked}
							variant={button.isChecked ? 'contained' : 'outlined'}
							color={button.isChecked ? 'primary' : 'dimgray'}
							disableElevation
							disableRipple
						>
							{button.value}
						</Button>
						<p> Market description </p>
					</div>
				)
			})}
		</div>)
}
