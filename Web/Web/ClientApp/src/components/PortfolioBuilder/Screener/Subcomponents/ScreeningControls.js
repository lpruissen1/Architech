import React from 'react';
import SectorSelector from './SectorSelector';
import BasicRulesSection from "./Rules/BasicRulesSection";
import MarketSelector from './MarketSelector';
import Collapsible from 'react-collapsible';
import InclusionsExclusions from './InclusionsExclusions';
import "../Screener.css"

export default function ScreeningControls(props) {

	return (
		<>
			<Collapsible
				className='Collapsible'
				trigger='Markets'
				open={props.collapseOpen}>
				<MarketSelector
					markets={props.markets}
					handleUpdate={props.handleUpdate}
				/>
			</Collapsible>
			<Collapsible
				className='Collapsible'
				trigger="Sectors"
				open={props.collapseOpen}>
				<SectorSelector
					sectors={props.sectors}
					handleUpdate={props.handleUpdate} />
			</Collapsible>
			<Collapsible
				className='Collapsible'
				trigger="Basic Metrics"
				open={props.collapseOpen}>
				<BasicRulesSection
					rangedRules={props.rangedRules}
					timedRangeRules={props.timedRangeRules}
					handleUpdate={props.handleUpdate}
					handleRangedRuleUpdate={props.handleRangedRuleUpdate}
					handleTimedRangeRuleUpdate={props.handleTimedRangeRuleUpdate}
					deleteRangedRule={props.deleteRangedRule}
					deleteTimedRangeRule={props.deleteTimedRangeRule}
					checkIfRangedRuleExists={props.checkIfRangedRuleExists}
					checkIfTimedRangeRuleExists={props.checkIfTimedRangeRuleExists} />
			</Collapsible>
			<InclusionsExclusions
				inclusions={props.inclusions}
				exclusions={props.exclusions}
				handleUpdate={props.handleUpdate}
				AddInclusion={props.AddInclusion}
				AddExclusion={props.AddExclusion}
				DeleteInclusion={props.DeleteInclusion}
				DeleteExclusion={props.DeleteExclusion}
			/>
		</>
	)
}

