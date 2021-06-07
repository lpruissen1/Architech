import React, { Component } from 'react';
import SectorSelector from './SectorSelector';
import BasicRulesSection from "./Rules/BasicRulesSection";
import Collapsible from 'react-collapsible';
import "../Screener.css"

export default class ScreeningControls extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Collapsible className='Collapsible' trigger="Sectors" open={this.props.collapseOpen}>
					<SectorSelector sectors={this.props.sectors} handleUpdate={this.props.handleUpdate} />
				</Collapsible>
				<Collapsible className='Collapsible' trigger="Basic Metrics" open={this.props.collapseOpen}>
					<BasicRulesSection rangedRules={this.props.rangedRules} timedRangeRules={this.props.timedRangeRules} handleUpdate={this.props.handleUpdate} handleRangedRuleUpdate={this.props.handleRangedRuleUpdate} handleTimedRangeRuleUpdate={this.props.handleTimedRangeRuleUpdate} />
				</Collapsible>
			</div>
		);
	}
}
