import React, { Component } from 'react';
import { Stock } from '../../Stock';

export class TickerTable extends Component {
	static displayName = TickerTable.name;
	// contains
	//	* Ticker side table
	//	* Screening controls

	constructor(props) {
		super(props);
		this.state = { stockdata: [], loading: true };
	}

	componentDidMount() {
		this.populateTickers();
	}

	static renderStockDataTable(stockdata) {
		return (
			<table className='table table-striped' aria-labelledby="tabelLabel">
				<thead>
					<tr>
						<th>Ticker</th>
					</tr>
				</thead>
				<tbody>
					{stockdata.map(stockdatum =>
						<Stock ticker={stockdatum} />
					)}
				</tbody>
			</table>
		);
	}

	render() {
		let contents = this.state.loading
			? <p><em>Loading...</em></p>
			: TickerTable.renderStockDataTable(this.state.stockdata);

		return (
			<div>
				{contents}
			</div>
		);
	}

	populateTickers() {
		this.postScreeningRequest({
			markets: [
				"Sp500"
			]
		});
	}

	postScreeningRequest(data = {}) {
		const that = this;

		fetch("https://localhost:5001/Screening/FuckYourself", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(function (response) {
			response.json()
				.then(function (data) {
						that.setState({ stockdata: data, loading: false })
					})
		});
	}
}
