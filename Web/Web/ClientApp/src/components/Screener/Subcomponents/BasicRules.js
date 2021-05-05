import React, { Component } from "react";
import './BasicRules.css';

export default class BasicRules extends Component {

	state = {
		count: 0,
		metricList: false
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
				<div className="BasicRules">
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
				<button className="newMetricButton" onClick={this.handleAddNewMetricClick}>
					<i className="fa fa-plus-circle"></i>Add New Metric </button>
					{this.addMetricList()}
					{this.getAppendedComponents()}
				</div>
		);
	}
}

