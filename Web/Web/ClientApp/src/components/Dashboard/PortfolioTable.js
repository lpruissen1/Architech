import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import AuthClient from '../../Clients/AuthClient';
import PositionsClient from '../../Clients/PositionsClient';
import PortfolioTableRow from './PortfolioTableRow';

export default function PortfolioTable(props) {

	const [portfolios, setPortfolios] = useState()

	const loadPortfolios = async () => {
		const activePortfolios = await PositionsClient.GetAllPositions(AuthClient.GetIdFromStoredJwt())
		setPortfolios(activePortfolios)
	}

	useEffect(() => { loadPortfolios() }, [])

	return (
		<div
			style={{
				backgroundColor: '#404040',
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 40,
				borderRadius: 4,
				paddingTop: 20
			}}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Typography style={{ color: '#fff', marginBottom: 16 }} variant='h5'>
						<strong>Current Portfolios</strong>
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<TableContainer>
						<Table stickyHeader aria-label="sticky table" style={{ backgroundColor: '#484848', borderRadius: 8 }}>
							<TableHead>
								<TableRow>
									<TableCell colSpan={2} style={{ backgroundColor: '#505050', borderTopLeftRadius: 8, borderBottom: 'none' }}>
										<Typography variant='subtitle1' style={{ color: '#ffffff' }}>Portfolio Name</Typography>
									</TableCell>
									<TableCell style={{ backgroundColor: '#505050', borderBottom: 'none' }}>
										<Typography variant='subtitle1' style={{ color: '#ffffff' }}>Value</Typography>
									</TableCell>
									<TableCell style={{ backgroundColor: '#505050', borderBottom: 'none' }}>
										<Typography variant='subtitle1' style={{ color: '#ffffff' }}>Total Return</Typography>
									</TableCell>
									<TableCell style={{ backgroundColor: '#505050', borderBottom: 'none', borderTopRightRadius: 8 }}>
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									portfolios && portfolios.portfolios.map((portfolio) => {
										return (
											<PortfolioTableRow portfolio={portfolio} />
										)
									})
								}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</div>
		)
}
