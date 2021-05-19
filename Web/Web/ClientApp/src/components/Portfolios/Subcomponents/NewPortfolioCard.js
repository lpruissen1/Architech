import React from 'react';
import './NewPortfolioCard.css';
import { FaPlus } from 'react-icons/fa';
import { IconContext } from "react-icons";

export function NewPortfolioCard(props) {


	return (
		<div onClick={props.onClick} className='cardContainer'>
			<table className='table table-striped' aria-labelledby="tabelLabel">
				<thead></thead>
				<tbody>
					<IconContext.Provider value={{ style: { fontSize: '50px', color: "#003B46" } }}>
						<div className='plusIconContainer'>
							<FaPlus />
						</div>
						<div>
							<p className='blueprintText'>Create New Blueprint</p>
						</div>

					</IconContext.Provider>
				</tbody>
			</table>
		</div>
	);
} 
