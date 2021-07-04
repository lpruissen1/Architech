import Grid from '@material-ui/core/Grid';
import React from 'react';
import InclusionsExclusions from './InclusionsExclusions';
import MarketSelector from './MarketSelector';
import BasicRulesSection from "./Rules/BasicRulesSection";
import SectorSelector from './SectorSelector';

export default function ScreeningControls(props) {

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<MarketSelector
					markets={props.markets}
					handleUpdate={props.handleUpdate}
				/>
			</Grid>
			<Grid item xs={12}>
				<SectorSelector
					sectors={props.sectors}
					handleUpdate={props.handleUpdate}
				/>
			</Grid>
			<Grid item xs={12}>
				<BasicRulesSection
					rangedRules={props.rangedRules}
					timedRangeRules={props.timedRangeRules}
					handleUpdate={props.handleUpdate}
					handleRangedRuleUpdate={props.handleRangedRuleUpdate}
					handleTimedRangeRuleUpdate={props.handleTimedRangeRuleUpdate}
					deleteRangedRule={props.deleteRangedRule}
					deleteTimedRangeRule={props.deleteTimedRangeRule}
					checkIfRangedRuleExists={props.checkIfRangedRuleExists}
					checkIfTimedRangeRuleExists={props.checkIfTimedRangeRuleExists}
				/>
			</Grid>
			<Grid item xs={12}>
				<InclusionsExclusions
					inclusions={props.inclusions}
					exclusions={props.exclusions}
					handleUpdate={props.handleUpdate}
					AddInclusion={props.AddInclusion}
					AddExclusion={props.AddExclusion}
					DeleteInclusion={props.DeleteInclusion}
					DeleteExclusion={props.DeleteExclusion}
				/>
			</Grid>
		</Grid>
	)
}

