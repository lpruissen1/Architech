import React from 'react';
import './NewPortfolioCard.css';
import { FaPlus } from 'react-icons/fa';
import { IconContext } from "react-icons";
import Button from '@material-ui/core/Button';
import { useHistory, Link } from 'react-router-dom';

export function PortfolioCard(props) {
	const history = useHistory();
	const handleOnClick = () => {
		history.push({
			pathname: '/screener',
			state: {
				rangedRule: props.portfolio.rangedRule,
				timedRangeRule: props.portfolio.timedRangeRule,
				taint: 'taint'
			}
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
						<Button>
							<Link to={{
								pathname: "/screener",
								taint: { taint: 'Taint'}
							}}> Taint</Link>
						</Button>

					</IconContext.Provider>
				</tbody>
			</table>
		</div>
	);
}
