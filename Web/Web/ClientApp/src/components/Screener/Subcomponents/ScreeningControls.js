import React from 'react';
import SectorSelector from './SectorSelector';
import BasicRules from './BasicRules';
import Collapsible from 'react-collapsible';
import "../Screener.css"

export default function ScreeningControls(props){
	return (
		<div>
			<Collapsible className='Collapsible' trigger="Sectors">
				<SectorSelector sectors={props.sectors} handleUpdate={props.handleUpdate} />
			</Collapsible>
			<Collapsible className='Collapsible' trigger="Basic Metrics">
				<BasicRules />
			</Collapsible>
		</div>
	);
}
