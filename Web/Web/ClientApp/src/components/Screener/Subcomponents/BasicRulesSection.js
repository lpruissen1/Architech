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

	// Here we need to access the value of options, then create an element equal to the count and append that to the list of components (In getAppendedComponents). 
	// If you click "Add new metric" it brings up the list, clicking an element of the list will up the count for part of the state by 1
	// Upping the state tells this piece how many blocks to render of each type. 
	// Eventually we also need to have that button click revert the state of the metric list to bring back the add new metric button. 
	handleAddNewRule = (event) => {
		let options = this.state.options
		options.forEach(prev => {
			if (prev.value === event.target.option.value)
				prev.count ++
		})
		this.setState({ options: options })
		this.props.handleUpdate()
	};

	// this should be abstracted out into some other type of functionality because this would be used for advanced rule selection as well
	handleAddNewRuleNew = (event) => {
		debugger;
		if ("ranged" === event.target.attributes.type.value) {
			this.props.handleRangedRuleUpdate({
				ruleType: event.target.attributes.value.value,
				upper: 1,
				lower: 20000
			})
		}

		if ("timedRange" === event.target.attributes.type.value) {
			let rules = this.props.rangedRules
			this.props.rangedRules = [...this.props.timedRangeRules, {
				ruleType: event.target.attributes.type.value,
				upper: 1,
				lower: 20000
			}]
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

