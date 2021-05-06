import React from "react";
import './BasicRules.css';
import RuleSelector from "./RuleSelector";

export default class BasicRulesSection extends React.Component {
	state = {
		count: 0,
		metricList: false,

		// this shit should come from a config file of some sort kinda like the styling
		options: [
			{ displayName: "Market Capitalizaton", value: "MarketCap" },
			{ displayName: "Dividend Yield", value: "DividendYield" }
		]
	};

	handleAddNewMetricClick = () => {
		this.setState(prev => ({ metricList: !prev.metricList }));
	};

	addMetricList = () => {
		if (this.state.metricList === true) {
			return (
				<ul>
					<li><button onClick={this.handleClick}>Market Capitalizaton</button></li>
					<li><button onClick={this.handleClick}>Dividend Yield</button></li>
				</ul>
			)
		}
	};

	handleClick = () => {
		this.setState(prev => ({ count: prev.count + 1 }));
		this.setState(prev => ({ metricList: !prev.metricList }));
	};

	// check this.props.rules (or ranged rules)
	getAppendedComponents = () => {
		let appendedComponents = [];
		for (let i = 0; i < this.state.count; i++) {
			appendedComponents.push(
				<button>click</button>
			)
		}
		return appendedComponents;
	}

	render() {
		return (
			<RuleSelector options={this.state.options} />
		);
	}
}

