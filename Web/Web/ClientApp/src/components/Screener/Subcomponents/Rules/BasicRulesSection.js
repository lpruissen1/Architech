import React from "react";
import './Rules.css';
import RuleSelector from "./RuleSelector";
import RangedRule from "./RangedRule";
import TimedRangeRule from "./TimedRangeRule";
import { v4 } from 'uuid';

export default class BasicRulesSection extends React.Component {

	state = {
		// this shit should come from a config file of some sort kinda like the styling
		options: [
			{ displayName: "Market Capitalizaton", value: "MarketCap", type: "ranged", selectorMin : 1, selectorMax : 2000000000000 },
			{ displayName: "Dividend Yield", value: "DividendYield", type: "ranged", selectorMin: 0, selectorMax: 12 },
			{ displayName: "Price to Earnings Ratio (ttm)", value: "PriceToEarningsRatioTTM", type: "ranged", selectorMin: 0, selectorMax: 2000 },
			{ displayName: "Price to Sales Ratio (ttm)", value: "PriceToEarningsRatioTTM", type: "ranged", selectorMin: 0, selectorMax: 250 },
			{ displayName: "Revenue Growth (annualized)", value: "RevenueGrowthAnnualized", type: "timedRange", timePeriod: "Year", selectorMin: -100, selectorMax: 1000 },
			{ displayName: "EPS Growth (annualized)", value: "EPSGrowthAnnualized", type: "timedRange", timePeriod: "Year", selectorMin: -100, selectorMax: 1000 },
			{ displayName: "Trailing Performance (annualized)", value: "TrailingPerformanceAnnualized", type: "timedRange", timePeriod: "Year", selectorMin: -100, selectorMax: 2000 },
			{ displayName: "Coefficient of Variation", value: "CoefficientOfVariation", type: "timedRange", timePeriod: "Year", selectorMin: 0, selectorMax: 10 }
		]
	};

	// this should be abstracted out into some other type of functionality because this would be used for advanced rule selection as well
	handleAddNewRuleNew = (event) => {
		if ("ranged" === event.target.attributes.type.value) {
			const ruleType = event.target.attributes.value.value
			this.props.handleRangedRuleUpdate({
				id: v4(),
				ruleType: ruleType,
				upper: this.getSelectorMax(ruleType),
				lower: this.getSelectorMin(ruleType)
			})
		}

		if ("timedRange" === event.target.attributes.type.value) {
			const ruleType = event.target.attributes.value.value
			this.props.handleTimedRangeRuleUpdate({
				id: v4(),
				ruleType: ruleType,
				upper: this.getSelectorMax(ruleType),
				lower: this.getSelectorMin(ruleType),
				timePeriod: this.getTimePeriod(ruleType)
			})
		}
	};

	getSelectorMin(ruleType) {
		return this.state.options.find(option => option.value === ruleType).selectorMin
	}

	getSelectorMax(ruleType) {
		return this.state.options.find(option => option.value === ruleType ).selectorMax
	}

	getTimePeriod(ruleType) {
		return this.state.options.find(option => option.value === ruleType).timePeriod
	}

	// check this.props.rules (or ranged rules)
	getAppendedComponents() {
		let appendedComponents = []

		this.props.rangedRules && this.props.rangedRules.map((rule) =>
			appendedComponents.push(
				<>
					<RangedRule option={this.state.options.find(option => option.value === rule.ruleType)} rule={rule} handleUpdate={this.props.handleUpdate}/>
					<br />
				</>
			)
		)

		this.props.timedRangeRules && this.props.timedRangeRules.map((rule) =>
			appendedComponents.push(
				<>
					<TimedRangeRule option={this.state.options.find(option => option.value === rule.ruleType)} rule={rule} handleUpdate={this.props.handleUpdate}/>
					<br />
				</>
			)
		)

		return appendedComponents
	}

	render() {
		return (
			<>
				{this.getAppendedComponents()}
				<RuleSelector handleAddNewMetricClick={this.handleAddNewRuleNew} options={this.state.options} />
			</>
		);
	}
}

