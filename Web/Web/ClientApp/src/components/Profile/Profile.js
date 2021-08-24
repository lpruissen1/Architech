import React, { useEffect, useState, useCallback } from 'react';
import UserClient from '../../Clients/UserClient';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import PrimaryActionButton from '../Generic/PrimaryActionButton';

export function Profile() {
	const [userInfo, setUserInfo] = useState()
	const [modal, setModal] = useState(false)

	const history = useHistory();
	const handleOnClick = useCallback(() => history.push('/tradingRegistration'), [history]);

	useEffect(async () => setUserInfo(await UserClient.GetInfo()), [])

	return (
		<div style={{ width: '100%', height: '100%' }}>
		<Grid container spacing={1} style={{ color: '#fff', position: 'relative', paddingLeft: 50, paddingRight: 50, paddingTop: 20 }}>
			<Grid item xs={12} style={{ marginBottom: 30 }}>
				<Grid container justifyContent='center'>
					<Typography variant='h3'>Your Profile</Typography>
				</Grid>
			</Grid>
			<Grid item xs={12} align="flex-start">
				<Grid container>
					<Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end' }}>
						<Typography variant="h6" style={{ marginBottom: 10 }}>
							{userInfo ? 'Personal Information' : <Skeleton />}
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Grid container justifyContent='flex-end'>
							<PrimaryActionButton text="Start Trading" style={{ fontSize: 12 }} onClick={handleOnClick} />
						</Grid>
					</Grid>
				</Grid>
				<div style={{ height: 2, backgroundColor: '#d0d0d0' }}></div>
			</Grid>

			<Grid item xs={12} style={{ paddingTop: 10, paddingLeft: 20 }}>
				<Typography variant="body1">
					{userInfo ? 'Name:   ' + userInfo.firstName + ' ' + userInfo.lastName : <Skeleton />}
				</Typography>
			</Grid>
			<Grid item xs={12} style={{ paddingTop: 10, paddingLeft: 20, paddingBottom: 30 }}>
				<Typography variant="body1">
					{userInfo ? 'Email:   ' + userInfo.email : <Skeleton />}
				</Typography>
			</Grid>
			<Grid item xs={12} align="flex-start">
				<Typography variant="h6">
					{userInfo ? 'Account Information' : <Skeleton />}
				</Typography>
				<div style={{ height: 2, backgroundColor: '#d0d0d0' }}></div>
			</Grid>
			<Grid item xs={12} style={{ paddingTop: 10, paddingLeft: 20 }}>
				<Typography variant="body1">
					{userInfo ? 'Username:   ' + userInfo.username : <Skeleton />}
				</Typography>
			</Grid>
		</Grid>
		</div>
	)
}
