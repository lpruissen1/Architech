import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './MarketSelector.css';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
	buttonUnchecked: {
		margin: theme.spacing(2),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
	},
	buttonChecked: {
		margin: theme.spacing(2),
		textTransform: 'none',
		fontSize: 14,
		variant: 'contained',
		fontWeight: 500,
	}
}));

export default function MarketSelector(props) {
	const classes = useStyles();

	const handleCheck = (event) => {
		props.markets.forEach(market => {
			if (market.value === event.currentTarget.value)
				market.isChecked = !market.isChecked
		})

		props.handleUpdate()
	}

	return (
		<div className='flex-market-container'>
			{props.markets && props.markets.map(market => {
				return (
					<div className="marketButtons">
						<Button
							onClick={handleCheck}
							value={market.value}
							style={{ outline: 'none' }}
							className={market.isChecked ? classes.buttonChecked : classes.buttonUnchecked}
							variant={market.isChecked ? 'contained' : 'outlined'}
							color={market.isChecked ? 'primary' : 'dimgray'}
							disableElevation
							disableRipple
						>
							{market.displayName}
						</Button>
						<p> Market description </p>
					</div>
				)
			})}
		</div>)
}
