import { Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BarChartIcon from '@material-ui/icons/BarChart';
import BuildIcon from '@material-ui/icons/Build';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import PieChartIcon from '@material-ui/icons/PieChart';
import SchoolIcon from '@material-ui/icons/SchoolRounded';
import React from 'react';
import NavMenuItem from './Generic/NavMenuItem';
import './NavMenu.css';

const useStyles = makeStyles((theme) => ({
	paper: {
		background: "#242424"
	}
}))

export default function LeftNav() {

	const classes = useStyles()

	const renderContent = (
		<>
			<div style={{ height: 64, marginBottom: 20 }}></div>
			<NavMenuItem to='/dashboard' label='Dashboard' icon={<DashboardIcon />} />
			<NavMenuItem to='/portfolioBuilder' label='Portfolio Builder' icon={<BuildIcon />} />
			<NavMenuItem to='/portfolio' label='Portfolios' icon={<PieChartIcon />} />
			<NavMenuItem to='/research' label='Research' icon={<BarChartIcon />} />
			<NavMenuItem to='/education' label='Education' icon={<SchoolIcon />} />
			<NavMenuItem to='/profile' label='Profile' icon={<PersonIcon />} />
		</>
	);

	return (
		<div>
			<Drawer
				classes={{paper: classes.paper}}
				variant="persistent"
				anchor="left"
				open={true}
			>
				{renderContent}
			</Drawer>
		</div>
	);
}

