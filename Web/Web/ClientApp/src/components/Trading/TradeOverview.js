import React, { useState, useEffect } from 'react'
import CustomIndexClient from '../../Clients/CustomIndexClient';
import AuthClient from '../../Clients/AuthClient';
import Picker from '../Generic/Picker';

export default function TradeOverview(props) {
	const [portfolios, setPortfolios] = useState();
	const [selectedPortfolio, setSelectedPortfolio] = useState();

	const loadPortfolios = async () => {
		const activePortfolios = await CustomIndexClient.getCustomIndexByUserId(AuthClient.GetIdFromStoredJwt())
		setPortfolios(activePortfolios)
	}

	useEffect(() => { loadPortfolios() }, [])

	return (
		<Picker options={
			portfolios && portfolios.map((portfolio) => {
				return (
					portfolio.name)
			})} value={selectedPortfolio} setState={setSelectedPortfolio} label={"Portfolio"}/>
	)
}
