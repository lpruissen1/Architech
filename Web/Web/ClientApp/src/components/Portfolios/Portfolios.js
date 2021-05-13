import React, { Component } from 'react';
import { PortfoliosCard } from './Subcomponents/PortfoliosCard';
import Card from 'react-bootstrap/Card';
//import './Portfolios.css';

export class Portfolios extends Component {
	render() {
		return (
			<div>
				<h1>My Blueprints</h1>
				<Card className='portfoliosCard'>
					<div className='cardContainer'>
						<PortfoliosCard portfolios={this.portfolios} />
					</div>
				</Card>
			</div>
			);
	}
}
