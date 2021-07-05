import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Screener } from './Screener/Screener';
import { TickerTable } from './Screener/Subcomponents/TickerTable';
import { Weighter } from './Weighting/Weighter';

export function PortfolioBuilder(props) {
	const [value, setValue] = React.useState(0);
	const [tickers, setTickers] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	let { indexID } = useParams();

	const [indexId, setIndexId] = useState(indexID)


	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
			<Grid container spacing={3}>
				<Grid item xs={9}>
					<Paper>
						<AppBar position="static">
							<Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
								<Tab label="Screening" />
								<Tab label="Weighting" />
								<Tab label="BackTesting" />
							</Tabs>
						</AppBar>
						<TabPanel value={value} index={0}>
						<Screener setLoading={setLoading} setTickers={setTickers} indexId={indexId}/>
						</TabPanel>
						<TabPanel value={value} index={1}>
							<Weighter />
						</TabPanel>
						<TabPanel value={value} index={2}>
							Item Three
						</TabPanel>
					</Paper>
				</Grid>
				<Grid item xs={3}>
					<Paper>
						<TickerTable
							tickers={tickers}
							loading={loading}
						/>
					</Paper>
				</Grid>
			</Grid>
	);
}

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div>
			{value === index && props.children}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};
