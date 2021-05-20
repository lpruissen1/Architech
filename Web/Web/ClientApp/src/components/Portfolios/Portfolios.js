import React, { useCallback, useState } from 'react';
import { NewPortfolioCard } from './Subcomponents/NewPortfolioCard';
import Card from 'react-bootstrap/Card';
import styled, { css } from "styled-components";
import { useHistory } from 'react-router-dom';
//import './Portfolios.css';

export function Portfolios() {

	const history = useHistory();
	const handleOnClick = useCallback(() => history.push('/screener'), [history]);
	const [createNew, setCreateNew] = useState(false)
	const clickie = () => setCreateNew(!createNew)

	// MOVE THIS TO .CSS AND REMOVE STYLED-COMPOENTS
	const ModalContainer = styled.div`
		position: absolute;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.5);
		`;		

	return (
		<div>
			<h1>My Blueprints</h1>
			<Card className='portfoliosCard'>
					<NewPortfolioCard onClick={clickie} />
			</Card>
			{createNew && (
				<>
					<ModalContainer>
						<div className="centered">
							<Card onClick={handleOnClick} className="createNew">Create New</Card>
							<Card className="createNew">Create from Template</Card>
						</div>
					</ModalContainer>
				</>
			)}
		</div>
	);
}
