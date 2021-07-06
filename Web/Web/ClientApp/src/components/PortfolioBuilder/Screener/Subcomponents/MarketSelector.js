import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import './MarketSelector.css';

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(2),
		textTransform: 'none',
		fontSize: 14,
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
					<div className="marketButtons" key={market.value}>
						<Button
							onClick={handleCheck}
							value={market.value}
							style={{ outline: 'none' }}
							className={classes.button}
							variant={market.isChecked ? 'contained' : 'outlined'}
							color={market.isChecked ? 'primary' : 'default'}
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
