import React from 'react';
import SectorSelector from './SectorSelector';
import BasicRulesSection from "./Rules/BasicRulesSection";
import Collapsible from 'react-collapsible';
import "../Screener.css"
import ManualSelection from './ManualSelection';

export default function ScreeningControls(props) {
	return (
		<div>
			<Collapsible className='Collapsible' trigger="Sectors" open={props.collapseOpen}>
				<SectorSelector
					sectors={props.sectors}
					handleUpdate={props.handleUpdate}
				/>
			</Collapsible>
			<Collapsible className='Collapsible' trigger="Basic Metrics" open={props.collapseOpen}>
				<BasicRulesSection
					rangedRules={props.rangedRules}
					timedRangeRules={props.timedRangeRules}
					handleUpdate={props.handleUpdate}
					handleRangedRuleUpdate={props.handleRangedRuleUpdate}
					handleTimedRangeRuleUpdate={props.handleTimedRangeRuleUpdate}
					deleteRangedRule={props.deleteRangedRule}
				/>
			</Collapsible>
			<Collapsible className='Collapsible' trigger="Manual Selection" open={props.collapseOpen}>
				<ManualSelection/>
			</Collapsible>
		</div>
	);
	
}

