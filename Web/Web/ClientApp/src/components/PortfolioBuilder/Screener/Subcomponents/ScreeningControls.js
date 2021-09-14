import Grid from '@material-ui/core/Grid';
import React from 'react';
import InclusionsExclusions from './InclusionsExclusions';
import MarketSelector from './MarketSelector';
import BasicRulesSection from "./Rules/BasicRulesSection";
import SectorSelector from './SectorSelector';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import OutlinedTextInput from '../../../Generic/OutlinedTextInput'

export default function ScreeningControls(props) {

	return (
		<Grid container spacing={1}>
			<Grid item xs={12}>
				<Typography style={{ marginTop: 20, marginLeft: 10, color: '#fff', marginBottom: 20 }} variant='h6'>Portfolio Name</Typography>
				<OutlinedTextInput value={props.name} onChange={(event) => props.setName(event.target.value)}/>
			</Grid>
			<Grid item xs={12}>
				<Typography style={{ marginTop: 20, marginLeft: 10, color:'#fff' }} variant='h6'>Choose Your Markets</Typography>
				<MarketSelector
					markets={props.markets}
					handleUpdate={props.handleUpdate}
					/>
			</Grid>
			<Grid item xs={12}>
				<Typography style={{ marginLeft: 10, color: '#fff' }} variant='h6'>Choose Your Sectors</Typography>
				<SectorSelector
					sectors={props.sectors}
					handleUpdate={props.handleUpdate}
					/>
			</Grid>
			<Grid item xs={12}>
				<Typography style={{ marginTop: 20, marginLeft: 10, color: '#fff' }} variant='h6'>Add Metrics</Typography>
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
				<Box className="inclusion-selector-container">
					<InclusionsExclusions
						inclusions={props.inclusions}
						exclusions={props.exclusions}
						handleUpdate={props.handleUpdate}
						AddInclusion={props.AddInclusion}
						AddExclusion={props.AddExclusion}
						DeleteInclusion={props.DeleteInclusion}
						DeleteExclusion={props.DeleteExclusion}
					/>
				</Box>
			</Grid>
		</Grid>
	)
}

