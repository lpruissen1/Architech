import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Screener } from './Screener/Screener';
import TickerTable from './Screener/Subcomponents/TickerTable';
import { Weighter } from './Weighting/Weighter';
import { makeStyles } from '@material-ui/core/styles';
import './PortfolioBuilder.css';

export const useStyles = makeStyles((theme) => ({
	indicator: {
		backgroundColor: '#fff'
	},
	root: {
		textTransform: 'none',
	},
	appBar: {
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		height: 48
	}
}));

export function PortfolioBuilder(props) {
	const [value, setValue] = React.useState(0);
	const [tickers, setTickers] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	let { indexID } = useParams();

	const [indexId, setIndexId] = useState(indexID)

	const classes = useStyles()


	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
			<Grid container spacing={3}>
				<Grid item xs={9}>
					<Paper>
					<AppBar className={classes.appBar} elevation={1} position="static">
						<Tabs
							classes={{
								indicator: classes.indicator
							}}
							style={{ outline: 'none' }}
							value={value}
							onChange={handleChange}
							aria-label="simple tabs example">
							<Tab className={classes.root} style={{ outline: 'none' }} label="Screening" />
							<Tab className={classes.root} style={{ outline: 'none' }} label="Weighting" />
							<Tab className={classes.root} style={{ outline: 'none' }} label="Backtesting" />
							</Tabs>
						</AppBar>
						<TabPanel value={value} index={0}>
							<Screener setLoading={setLoading} setTickers={setTickers} indexId={indexId}/>
						</TabPanel>
						<TabPanel value={value} index={1}>
							<Weighter tickers={tickers} setTickers={setTickers} />
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
