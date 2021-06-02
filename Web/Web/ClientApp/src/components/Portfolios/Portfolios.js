import React, { useCallback, useState } from 'react';
import { NewPortfolioCard } from './Subcomponents/NewPortfolioCard';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom';
import './Portfolios.css';

export function Portfolios(props) {

	const history = useHistory();
	const handleOnClick = useCallback(() => history.push('/screener'), [history]);
	const [createNew, setCreateNew] = useState(false)
	const clickie = () => setCreateNew(!createNew)	
	const API_URL = 'https://localhost:7001/CustomIndex?userID=' + props.userID

	const getCustomIndexRequest = () => {
		debugger
		fetch(API_URL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(function (response) {
				return response.status
			});
	}

	return (
		<div>
			<button onClick={getCustomIndexRequest}> make request </button>
			<h1>My Blueprints</h1>
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
