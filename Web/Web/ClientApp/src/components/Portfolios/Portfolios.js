import React, { useCallback, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useHistory } from 'react-router-dom';
import CustomIndexClient from '../../Clients/CustomIndexClient';
import PrimaryActionButton from '../Generic/PrimaryActionButton';
import './Portfolios.css';
import { PortfolioCard } from './Subcomponents/PortfolioCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@mui/icons-material/Add';


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

		let temp = portfolios.filter(x => x.indexId !== indexId);

		setPortfolios(temp)
	}

	useEffect(() => { loadPortfolios() }, [])

	return (
		<Grid align='center' justify='center' container xs={12}>
			<Grid container style={{ width: '90%', height: '100%', background: '#404040', borderRadius: 4, paddingLeft: '5%', paddingRight: '5%', paddingTop: 30, paddingBottom: 30 }}>
				<Grid container style={{ marginBottom: 36 }}>
					<Grid
						item
						xs={6}
						style={{
							width: '100%',
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start',
						}}
					>
						<Typography style={{ color: '#ffffff' }} variant='h4'>Portfolios</Typography>
					</Grid>
					<Grid
						item
						xs={6}
						style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'flex-end',
					}}>
						<PrimaryActionButton
							style={{ margin: 0, borderRadius: 100 }}
							onClick={clickie}
							width='30%'
							text='Create New'
							startIcon={<AddIcon />}
						/>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					{
						portfolios && portfolios.map((portfolio) => {
							return (
								<PortfolioCard key={portfolio.indexId}
									portfolio={portfolio}
									deletePortfolio={deletePortfolio}
									userId={props.userID}/>)
						})
					}
				</Grid>
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
			</Grid>
		</Grid>
	);
}
