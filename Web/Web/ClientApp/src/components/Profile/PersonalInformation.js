import React, { useState, useEffect } from 'react';
import UserClient from '../../Clients/UserClient';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import PrimaryLinkButton from '../Generic/PrimaryLinkButton';
import CreateAchRelationship from './CreateAchRelationship';
import TransferRequests from './TransferRequests';

export default function PersonalInformation() {

	const [userInfo, setUserInfo] = useState()
	//const [achRelationship, setAchRelationship] = useState()

	useEffect(() => {
		const loadInfo = async () => {
			const info = await UserClient.GetInfo()
			setUserInfo(info)
		}

		loadInfo();
	}, []);

	return (
		<div style={{width: '100%', minHeight: 480}}>
		<Grid container spacing={1} style={{ paddingLeft: 40, paddingRight: 40, width: '100%', height: '100%', justifyContent: 'flex-start'}}>
			<Grid item xs={4}>
				<Typography variant='subtitle1' style={{fontWeight: 600, color: '#bcbcbc' }}>
					Name
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography variant='subtitle1' style={{ fontWeight: 600, color: '#bcbcbc' }}>
					Username
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<></>
			</Grid>
			<Grid item xs={4}>
				<Typography variant='subtitle1' style={{ fontWeight: 500, color: '#ffffff' }}>
					{userInfo && userInfo.firstName + ' ' + userInfo.lastName}
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography variant='subtitle1' style={{ fontWeight: 500, color: '#ffffff' }}>
					{userInfo && userInfo.username}
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<></>
			</Grid>
			<Grid item xs={4} style={{ marginTop: 20}}>
				<Typography variant='subtitle1' style={{ fontWeight: 600, color: '#bcbcbc' }}>
					Email
				</Typography>
			</Grid>
			<Grid item xs={4} style={{ marginTop: 20 }}>
				<Typography variant='subtitle1' style={{ fontWeight: 600, color: '#bcbcbc' }}>
					Membership
				</Typography>
			</Grid>
			<Grid item xs={4} style={{ marginTop: 20 }}>
				<></>
			</Grid>
			<Grid item xs={4}>
				<Typography variant='subtitle1' style={{ fontWeight: 500, color: '#ffffff' }}>
					{userInfo && userInfo.email}
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<Typography variant='subtitle1' style={{ fontWeight: 500, color: '#ffffff' }}>
					Premium
				</Typography>
			</Grid>
			<Grid item xs={4}>
				<></>
			</Grid>
		</Grid>
		</div>
	)
}
