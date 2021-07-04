﻿import React, { useCallback, useState, useEffect } from 'react';
import CustomIndexClient from '../../Clients/CustomIndexClient';
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

	const loadPortfolios = async () => {
		const activePortfolios =  await CustomIndexClient.getCustomIndexByUserId(props.userID)
		setPortfolios(activePortfolios)
	}

	const deletePortfolio = async (userId, indexId) => {
		await CustomIndexClient.deleteCustomIndexRequest(userId, indexId)

		let temp = portfolios.filter(x => x.indexId != indexId);

		setPortfolios(temp)
	}

	useEffect(() => { loadPortfolios() }, [])

	return (
		<div>
			<h1>Your Blueprints</h1>
			<NewPortfolioCard onClick={clickie} />
			{
				portfolios && portfolios.map((portfolio) => {
					return (
						<PortfolioCard key={portfolio.indexId}
							portfolio={portfolio}
							deletePortfolio={deletePortfolio}
							userId={props.userID}/>)
				})
			}
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
