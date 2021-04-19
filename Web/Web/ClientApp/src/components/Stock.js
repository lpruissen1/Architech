import React, { Component } from 'react';

export class Stock extends Component {
	render() {
		return (
			<tr key={this.props.ticker}>
				<td>{this.props.ticker}</td>
			</tr>
		);
	}
}
