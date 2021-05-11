import React from "react";
import './BasicRules.css';
import RuleSelector from "./RuleSelector";

export default class BasicRulesSection extends React.Component {

	state = {
		// this shit should come from a config file of some sort kinda like the styling
		options: [
			{ displayName: "Market Capitalizaton", value: "MarketCap", type: "ranged" },
			{ displayName: "Dividend Yield", value: "DividendYield", type: "ranged" },
			{ displayName: "Coefficient of Variation", value: "CoefficientOfVariation", type: "timedRange" }
		]
	};

	// this should be abstracted out into some other type of functionality because this would be used for advanced rule selection as well
	handleAddNewRuleNew = (event) => {
		if ("ranged" === event.target.attributes.type.value) {
			this.props.handleRangedRuleUpdate({
				ruleType: event.target.attributes.value.value,
				upper: 1,
				lower: 20000
			})
		}

		if ("timedRange" === event.target.attributes.type.value) {
			this.props.handleTimedRangeRuleUpdate({
				ruleType: event.target.attributes.value.value,
				upper: 1,
				lower: 20000
			})
		}

		this.props.handleUpdate()
	};

	// check this.props.rules (or ranged rules)
	getAppendedComponents = (props) => {
		let appendedComponents = [];

		for (let i = 0; i < props.count; i++) {
			appendedComponents.push(
				<button>click</button>
			)
		}

		return appendedComponents;
	}

	render() {
		return (
			<>
				<RuleSelector handleAddNewMetricClick={this.handleAddNewRuleNew} options={this.state.options} rangedRules={this.props.rangedRules} />
			</>
		);
	}
}

