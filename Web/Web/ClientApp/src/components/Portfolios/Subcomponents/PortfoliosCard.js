import React, { Component } from 'react';
import './PortfoliosCard.css';
import { FaPlus } from 'react-icons/fa';
import { IconContext } from "react-icons";

export class PortfoliosCard extends Component {


	render() {
		return (
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
		);
	}
} 
