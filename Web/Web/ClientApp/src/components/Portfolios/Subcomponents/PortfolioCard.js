import React, { useState } from 'react';
import './NewPortfolioCard.css';
import './PortfolioCard.css';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	deleteButton: {
		color: 'white',
	},
	editButton: {
		color: 'white',
		marginLeft: 'auto'
	}
}));

export function PortfolioCard(props) {
	const [modal, setModal] = useState(false)
	const history = useHistory();
	const handleOnClick = () => {
		history.push({
			pathname: `/screener/${props.portfolio.indexId}`,
		});
	}

	const classes = useStyles();

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
			<div className="portfolioCard">
				<table>
					<tr>
						<th colSpan="2">
							<div className="header">
								<h2>Blueprint Name</h2>
								<Button className={classes.editButton} onClick={handleOnClick}>
									Edit
								</Button>
								<IconButton className={classes.deleteButton} onClick={renderModal} color="white" aria-label="delete">
									<DeleteIcon />
								</IconButton>
							</div>
						</th>
					</tr>
					<tr>
						<td>Sectors:</td>
						<td>{props.portfolio.sectors}</td>
					</tr>
					<tr>
						<td>Industries:</td>
						<td>{props.portfolio.industries}</td>
					</tr>
					<tr>
						<td>Basic Metrics:</td>
						<td></td>
					</tr>
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
