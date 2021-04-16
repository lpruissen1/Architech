import React, { Component } from 'react';

export class TestScreener extends Component {
	static displayName = TestScreener.name;

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
						<th>Date</th>
						<th>Temp. (C)</th>
						<th>Temp. (F)</th>
						<th>Summary</th>
					</tr>
				</thead>
				<tbody>
					{stockdata.Tickers.map(stockdatum =>
						<tr key={stockdatum}>
							<td>{stockdatum}</td>
						</tr>
					)}
				</tbody>
			</table>
		);
	}

	render() {
		let contents = this.state.loading
			? <p><em>Loading...</em></p>
			: TestScreener.renderStockDataTable(this.state.stockdata);

		return (
			<div>
				<h1 id="tabelLabel" >Stock Data</h1>
				<p>This component demonstrates fetching data from the server.</p>
				{contents}
			</div>
		);
	}

	populateTickers() {
		this.postScreeningRequest({
			markets: [
				"Sp500"
			],
			Sectors: [
				"Healthcare"
			]
		});
	}

	postScreeningRequest(data = {}) {
		fetch("https://localhost:6001/Screening/FuckYourself", {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Accept': '*/*',
				'Content-Type': 'application/json;charset=UTF-8'
			},
			body: JSON.stringify(data)
		})
		.then(function (response) {
			response.json()
				.then(function (data) {
						this.setState({ stockdata: data.Tickers, loading: false })
					})
		});
	}
}
