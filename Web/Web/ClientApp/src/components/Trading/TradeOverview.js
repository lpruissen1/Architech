import React from 'react'
import TabPanel from '../Generic/TabPanel';
import BuyOrders from './BuyOrders';
import SellOrders from './SellOrders';
import OrderHistory from './OrderHistory';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

export const useStyles = makeStyles((theme) => ({
	indicator: {
		backgroundColor: theme.palette.info.main
	},
	root: {
		textTransform: 'none',
		fontSize: 15
	},
	appBar: {
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		height: 48,
		backgroundColor: '#484848',
		color: '#fff'
	}
}));

export default function TradeOverview() {
	const [step, setStep] = React.useState(0);


	const handleChange = (event, newValue) => {
		setStep(newValue);
	};

	const classes = useStyles();

	return (
		<>
			<Grid container style={{
				width: '100%',
				height: '100%',
				maxWidth: 1200,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: 4,
				backgroundColor: '#404040'
			}}>
				<AppBar className={classes.appBar} elevation={1} style={{ position: 'sticky', top: 0 }}>
					<Tabs
						classes={{
							indicator: classes.indicator
						}}
						style={{ outline: 'none' }}
						value={step}
						onChange={handleChange}
						aria-label="simple tabs example">
						<Tab className={classes.root} style={{ outline: 'none' }} label="Buy" />
						<Tab className={classes.root} style={{ outline: 'none' }} label="Sell" />
						<Tab className={classes.root} style={{ outline: 'none' }} label="Orders" />
					</Tabs>
				</AppBar>
				<TabPanel value={step} index={0}>
					<div style={{padding: 40, paddingLeft: 20, paddingRight: 10}}>
						<BuyOrders />
					</div>
				</TabPanel>
				<TabPanel value={step} index={1}>
					<div style={{ padding: 40, paddingLeft: 20, paddingRight: 10 }}>
						<SellOrders />
					</div>
				</TabPanel>
				<TabPanel value={step} index={2}>
					<div style={{ padding: 40, paddingLeft: 20, paddingRight: 10 }}>
						<OrderHistory />
					</div>
				</TabPanel>
			</Grid>
		</>
	)
}
