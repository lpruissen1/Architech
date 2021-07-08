import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import './MarketSelector.css';

const useStyles = makeStyles((theme) => ({
	buttonChecked: {
		margin: theme.spacing(2),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		backgroundColor: theme.palette.primary.main,
		color: 'rgba(100, 255, 215)',
		minWidth: 140,
		border: '2px solid',
		borderColor: 'rgba(100, 255, 215)'
	},
	buttonUnchecked: {
		margin: theme.spacing(2),
		textTransform: 'none',
		fontSize: 14,
		fontWeight: 500,
		paddingLeft: 10,
		paddingRight: 10,
		borderRadius: 10,
		color: '#d0d0d0',
		minWidth: 140,
		borderColor: '#d0d0d0',
		border: '2px solid'
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
							className={market.isChecked ? classes.buttonChecked : classes.buttonUnchecked}
							variant={market.isChecked ? 'contained' : 'outlined'}
							color={market.isChecked ? 'primary' : 'default'}
							disableElevation
							disableRipple
						>
							{market.displayName}
						</Button>
					</div>
				)
			})}
		</div>)
}
