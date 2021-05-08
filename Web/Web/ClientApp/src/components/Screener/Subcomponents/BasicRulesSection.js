import React from "react";
import './BasicRules.css';
import RuleSelector from "./RuleSelector";

export default class BasicRulesSection extends React.Component {
	state = {
		metricList: false,

		// this shit should come from a config file of some sort kinda like the styling
		options: [
			{ displayName: "Market Capitalizaton", value: "MarketCap", count: 0 },
			{ displayName: "Dividend Yield", value: "DividendYield", count: 0 }
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
				<RuleSelector handleAddNewMetricClick={this.handleAddNewRule} options={this.state.options} rangedRules={this.props.rangedRules} />
				{this.state.options.map((option) => {
					this.getAppendedComponents(option)
				})}
			</>
		);
	}
}

