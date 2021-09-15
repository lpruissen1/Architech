import React from 'react'
import TabPanel from '../Generic/TabPanel';
import PlaceTrade from './PlaceTrade';
import OrderHistory from './OrderHistory';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const StyledTabs = withStyles((theme) => ({
	indicator: {
		outline: 'none',
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: 'transparent',
		'& > span': {
			maxWidth: 60,
			width: '100%',
			backgroundColor: theme.palette.info.main,
		}
	},
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
	root: {
		outline: 'none',
		textTransform: 'none',
		color: '#fff',
		fontWeight: theme.typography.fontWeightRegular,
		fontSize: theme.typography.pxToRem(15),
		marginRight: theme.spacing(1),
		'&:focus': {
			opacity: 1,
		}
	},
}))((props) => <Tab disableRipple style={{ outline: 'none' }} {...props} />);

export default function TradeOverview() {
	const [step, setStep] = React.useState(0);


	const handleChange = (event, newValue) => {
		setStep(newValue);
	};

	return (
		<>
			<div>
				<StyledTabs value={step} onChange={handleChange} aria-label="styled tabs example">
					<StyledTab label="Place Trade" />
					<StyledTab label="Order History" />
				</StyledTabs>
			</div>
			<TabPanel value={step} index={0}>
				<PlaceTrade />
			</TabPanel>
			<TabPanel value={step} index={1}>
				<OrderHistory />
			</TabPanel>
		</>
	)
}
