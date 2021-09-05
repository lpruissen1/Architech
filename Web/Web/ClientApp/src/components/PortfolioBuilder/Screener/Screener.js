import React, { useEffect } from 'react';
import ScreenerClient from '../../../Clients/ScreenerClient';
import ScreeningControls from './Subcomponents/ScreeningControls';

export function Screener(props) {

	const screen = async () => {
		if (validate()) {

			props.setLoading(true)

			const response = await ScreenerClient.postScreeningRequest({
				markets: props.getActiveMarkets(),
				industries: props.getActiveIndustries(),
				rangedRule: props.rangedRules,
				timedRangeRule: props.timedRangeRules,
				inclusions: props.inclusions,
				exclusions: props.exclusions
			})

			props.setTickers(response.securities)
			props.setLoading(false)
		}
	}

	// Create function to validate custom index then call in screener, if valid do the screening request
	const validate = () => {

		for (let i = 0; i < props.timedRangeRules.length; i++) {
			if (props.timedRangeRules[i].timePeriod === "") {
				return false
			}
		}
		return true
	}

	useEffect(() => { screen() }, [props.markets, props.rangedRules, props.sectors, props.timedRangeRules, props.inclusions, props.exclusions]);

	return (
		<div style={{padding: 10}}>
			<ScreeningControls
				sectors={props.sectors}
				rangedRules={props.rangedRules}
				timedRangeRules={props.timedRangeRules}
				handleUpdate={screen} // asdfsadfasdf
				handleRangedRuleUpdate={props.handleRangedRuleUpdate}
				handleTimedRangeRuleUpdate={props.handleTimedRangeRuleUpdate}
				deleteRangedRule={props.deleteRangedRule}
				deleteTimedRangeRule={props.deleteTimedRangeRule}
				checkIfRangedRuleExists={props.checkIfRangedRuleExists}
				checkIfTimedRangeRuleExists={props.checkIfTimedRangeRuleExists}
				inclusions={props.inclusions}
				exclusions={props.exclusions}
				markets={props.markets}
				AddInclusion={props.AddInclusion}
				DeleteInclusion={props.DeleteInclusion}
				AddExclusion={props.AddExclusion}
				DeleteExclusion={props.DeleteExclusion}
				name={props.name}
				setName={props.setName}
			/>
			<br/>
		</div>
	)
}
