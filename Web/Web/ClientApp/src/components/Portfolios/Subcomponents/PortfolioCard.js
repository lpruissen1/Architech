import React, { useState } from 'react';
import './NewPortfolioCard.css';
import { FaPlus } from 'react-icons/fa';
import { IconContext } from "react-icons";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';

export function PortfolioCard(props) {
	const [modal, setModal] = useState(false)
	const history = useHistory();
	const handleOnClick = () => {
		history.push({
			pathname: `/screener/${props.portfolio.indexId}`,
		});
	}

	const handleDelete = () => {
		const userId = props.userId
		const indexId = props.portfolio.indexId
		props.deletePortfolio(userId, indexId)
	}

	const renderModal = () => {
		setModal(true)
	}

	const closeModal = () => {
		setModal(false)
	}

	return (
		<>
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
							<IconButton onClick={renderModal} color="dimgrey" aria-label="delete">
								<DeleteIcon />
							</IconButton>
						</IconContext.Provider>
					</tbody>
				</table>
			</div>
			{modal && (
				<div color="white" className="deleteModal">
					<h2> Are you sure you would like to delete this portfolio? </h2>
					<p> Deleting an active portfolio will result in all holdings being sold. </p>
					<Button onClick={handleDelete}
						color="primary"
						variant='contained'> Yes, delete portfolio </Button>
					<Button onClick={closeModal}> No, take me back </Button>
				</div>)}
		</>

	);
}
