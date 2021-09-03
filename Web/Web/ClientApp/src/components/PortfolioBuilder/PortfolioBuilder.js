import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { Screener } from './Screener/Screener';
import TickerTable from './TickerTable/TickerTable';
import { Weighter } from './Weighting/Weighter';
import { makeStyles } from '@material-ui/core/styles';
import RaisedCard from '../Generic/RaisedCard';

export const useStyles = makeStyles((theme) => ({
	indicator: {
		backgroundColor: 'rgba(255,215,100)'
	},
	root: {
		textTransform: 'none',
		fontSize: 15
	},
	appBar: {
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		height: 48,
		backgroundColor: '#404040',
		color: '#fff'
	}
}));

export function PortfolioBuilder(props) {
	const [value, setValue] = React.useState(0);
	const [tickers, setTickers] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [inclusions, setInclusions] = useState([])
	
	let { indexID } = useParams();

	const [indexId, setIndexId] = useState(indexID)

	const classes = useStyles()

	const handleInclusionAddition = (ticker) => {
		if (!inclusions.includes(ticker))
			setInclusions([...inclusions, ticker])
	}

	const handleInclusionDelete = (deletedTicker) => {
		const newInclusions = inclusions.filter(ticker => ticker !== deletedTicker)
		setInclusions(newInclusions)
	}

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Grid container spacing={3}>
				<Grid item xs={9}>
				<RaisedCard
					style={{ overflow: 'scroll'}}
					children={
						<>
							<AppBar className={classes.appBar} elevation={1} style={{ position: 'sticky', top: 0 }}>
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
								<Screener
									setLoading={setLoading}
									setTickers={setTickers}
									indexId={indexId}
									inclusions={inclusions}
									handleInclusionAddition={handleInclusionAddition}
									handleInclusionDelete={handleInclusionDelete}
								/>
							</TabPanel>
							<TabPanel value={value} index={1}>
								<Weighter
									tickers={tickers.ticker}
									setTickers={setTickers}
									inclusions={inclusions}
								/>
							</TabPanel>
							<TabPanel value={value} index={2}>
										Item Three
							</TabPanel>
						</>
					}
					/>
				</Grid>
			<Grid container item xs={3} justify="center">
				<RaisedCard
					style={{ position: 'fixed', height: 640, width: '22%' }}
					children={
						<TickerTable
							tickers={tickers}
							loading={loading}
							tickerInfo={tickers}
						/>}
					/>
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
