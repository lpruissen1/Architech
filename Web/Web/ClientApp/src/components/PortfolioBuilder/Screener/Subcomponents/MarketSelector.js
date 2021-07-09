import React from 'react';
import PrimaryToggleButton from '../../../GeneralComponents/PrimaryToggleButton';
import './MarketSelector.css';

export default function MarketSelector(props) {

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
						<PrimaryToggleButton
							onClick={handleCheck}
							value={market.value}
							checked={market.isChecked}
							text={market.displayName}
						/>
					</div>
				)
			})}
		</div>)
}
