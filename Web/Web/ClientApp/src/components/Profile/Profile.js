import React, { useEffect, useState } from 'react';
import RaisedCard from '../Generic/RaisedCard';
import UserClient from '../../Clients/UserClient';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export function Profile() {
	const [userInfo, setUserInfo ] = useState()

	useEffect( async () => setUserInfo(await UserClient.GetInfo()), [])

	return (
		<RaisedCard style={{ color: '#fff', height: 640, paddingLeft: 50, paddingRight: 50, paddingTop: 20 }}>
				<Grid container spacing={1}>
					<>
						<Grid item xs={12} align="center">
							<Grid container justifyContent='center'><Typography variant='h3'>Your Profile</Typography></Grid>
						</Grid>
						<Grid item xs={12} align="flex-start">
							<Typography variant="h6"> 
								{userInfo ? 'Personal Information' : <Skeleton />}
							</Typography>
							<div style={{height: 2, backgroundColor: '#d0d0d0'}}></div>
						</Grid>
						<Grid item xs={12} style={{ paddingTop: 10, paddingLeft: 20 }}>
							<Typography variant="body1">
								{userInfo ? 'Username:   ' + userInfo.username : <Skeleton />}
							</Typography>
						</Grid>
						<Grid item xs={12} style={{ paddingTop: 10, paddingLeft: 20 }}>
							<Typography variant="body1">
								{userInfo ? 'Name:   ' + userInfo.firstName + ' ' + userInfo.lastName : <Skeleton />}
							</Typography>
						</Grid>
						<Grid item xs={12} style={{ paddingTop: 10, paddingLeft: 20 }}>
							<Typography variant="body1">
								{userInfo ? 'Email:   ' + userInfo.email : <Skeleton />}
							</Typography>
						</Grid>
					</>
					</Grid>
		</RaisedCard>
	)
}
