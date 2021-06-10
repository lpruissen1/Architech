import React, { useCallback, useState, useEffect } from 'react';
import { NewPortfolioCard } from './Subcomponents/NewPortfolioCard';
import { PortfolioCard } from './Subcomponents/PortfolioCard';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom';
import './Portfolios.css';

export function Portfolios(props) {

	const history = useHistory();
	const handleOnClick = useCallback(() => history.push('/screener'), [history]);
	const [createNew, setCreateNew] = useState(false)
	const [portfolios, setPortfolios] = useState([])
	const clickie = () => setCreateNew(!createNew)	
	const API_URL = 'https://localhost:7001/CustomIndex?userID=' + props.userID

	// Pass ID to screener, map there to see if sector matches any on list 

	const getCustomIndexRequest = () => {
		fetch(API_URL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(function (response) {
			return response.json().then(function (data) {
				console.log(data)

				const activePortfolios = data.map((portfolio) => {
					return {
						indexId: portfolio.indexId,
						markets: portfolio.markets,
						sectors: portfolio.sectors,
						rangedRules: portfolio.rangedRule,
						timedRangeRules: portfolio.timedRangeRule
					}
				})

				setPortfolios(activePortfolios)
			})
		});
	}

	useEffect(() => {getCustomIndexRequest()}, [])

	return (
		<div>
			<h1>Your Blueprints</h1>
			{
				portfolios && portfolios.map((portfolioooo) => {
					return (<Card className='portfoliosCard'> <PortfolioCard key={portfolioooo.indexId} portfolio={portfolioooo} /> </Card>)
				})
			}
			<Card className='portfoliosCard'>
					<NewPortfolioCard onClick={clickie} />
			</Card>
			{createNew && (
				<>
					<div className="centeredModal" onClick={clickie}>
						<div className="centered">
							<Card onClick={handleOnClick} className="createNew">Create New</Card>
							<Card className="createNew">Create from Template</Card>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
