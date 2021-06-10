import React from 'react';
import './NewPortfolioCard.css';
import { FaPlus } from 'react-icons/fa';
import { IconContext } from "react-icons";
import Button from '@material-ui/core/Button';
import { useHistory, Route } from 'react-router-dom';

export function PortfolioCard(props) {
	const history = useHistory();
	const handleOnClick = () => {
		history.push({
			pathname: `/screener/${props.portfolio.indexId}`,
		});
	}

	return (
		<div onClick={props.onClick} className='cardContainer'>
			<table className='table table-striped' aria-labelledby="tabelLabel">
				<thead></thead>
				<tbody>
					<IconContext.Provider value={{ style: { fontSize: '50px', color: "#2E9B7F" } }}>
						<div className='plusIconContainer'>
							<FaPlus />
						</div>
						{
							props.portfolio.sectors && props.portfolio.sectors.map((sector) => {
								return (<>{sector}</>)
							})
						}
						<Button onClick={handleOnClick}>
							Click
						</Button>
					</IconContext.Provider>
				</tbody>
			</table>
		</div>
	);
}
