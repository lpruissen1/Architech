import React, { useState } from 'react';
import RaisedCard from '../Generic/RaisedCard';
import './FundingModal.css';
import TransferForm from './TransferForm';
import TransferComplete from './TransferComplete';

export default function FundingModal(props) {
	const [transferInitiated, setTransferInitiated] = useState(false)

	return (
		<div className='funding-modal' style={{ height: '100%' }}>
			<RaisedCard style={{ boxShadow: 'none', width: '35%', height: '75%', margin: 'auto', padding: 40 }}>
				{!transferInitiated
					? <TransferForm setTransferInitiated={setTransferInitiated} fundMeDaddy={props.fundMeDaddy} />
					: <TransferComplete fundMeDaddy={props.fundMeDaddy} /> 
				}
			</RaisedCard>
		</div>
	)
}
