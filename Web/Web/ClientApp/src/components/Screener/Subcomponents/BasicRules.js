import React, { Component } from "react";
import './BasicRules.css';

export default class BasicRules extends Component {

	state = {
		count: 0
	};

	handleClick = () => {
		// Use updater function when new state is derived from old
		this.setState(prev => ({ count: prev.count + 1 }));
	};

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
			<button className="block" onClick={this.handleClick}>
				<div className="BasicRules">
					<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
					<button className="newMetricButton">
						<i className="fa fa-plus-circle"></i>Add New Metric </button>
					{this.getAppendedComponents()}
				</div>
			</button>
		);
	}
}

