import React, { useEffect, useState } from 'react'
import UserClient from '../../Clients/UserClient';

export function Profile() {
	const [userInfo, setUserInfo ] = useState()

	useEffect( async () => setUserInfo(await UserClient.GetInfo()), [])

	return (
		<h1> {userInfo && userInfo.firstName} </h1>
	)
}
