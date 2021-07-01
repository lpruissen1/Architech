import React, { Component } from 'react';
import SectorSelector from './SectorSelector';
import BasicRulesSection from "./Rules/BasicRulesSection";
import MarketSelector from './MarketSelector';
import Collapsible from 'react-collapsible';
import InclusionsExclusions from './InclusionsExclusions';
import "../Screener.css"

export default class ScreeningControls extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Collapsible
					className='Collapsible'
					trigger='Markets'
					open={this.props.collapseOpen}>
					<MarketSelector
						markets={this.props.markets}
						handleUpdate={this.props.handleUpdate}
					/>
				</Collapsible>
				<Collapsible
					className='Collapsible'
					trigger="Sectors"
					open={this.props.collapseOpen}>
					<SectorSelector
						sectors={this.props.sectors}
						handleUpdate={this.props.handleUpdate} />
				</Collapsible>
				<Collapsible
					className='Collapsible'
					trigger="Basic Metrics"
					open={this.props.collapseOpen}>
					<BasicRulesSection
						rangedRules={this.props.rangedRules}
						timedRangeRules={this.props.timedRangeRules}
						handleUpdate={this.props.handleUpdate}
						handleRangedRuleUpdate={this.props.handleRangedRuleUpdate}
						handleTimedRangeRuleUpdate={this.props.handleTimedRangeRuleUpdate}
						deleteRangedRule={this.props.deleteRangedRule}
						deleteTimedRangeRule={this.props.deleteTimedRangeRule}
						checkIfRangedRuleExists={this.props.checkIfRangedRuleExists}
						checkIfTimedRangeRuleExists={this.props.checkIfTimedRangeRuleExists}/>
				</Collapsible>
				<InclusionsExclusions
					inclusions={this.props.inclusions}
					exclusions={this.props.exclusions}
					handleUpdate={this.props.handleUpdate}
					AddInclusion={this.props.AddInclusion}
					AddExclusion={this.props.AddExclusion}
					DeleteInclusion={this.props.DeleteInclusion}
				/>
			</div>
		);
	}
}
