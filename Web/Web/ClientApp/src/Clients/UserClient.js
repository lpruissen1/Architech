import Cookie from "js-cookie";
import jwt from 'jwt-decode';

const API_URL = "https://localhost:9001/User/"; // this will eventually need to be config

class UserClient {
	async GetInfo() {
		const userId = this.GetIdFromStoredJwt()
		const response = await fetch(API_URL + "Info?userId=" + userId, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
		});

		if (response.ok) {
			const json = await response.json()

			return json
		}
	}

	GetCurrentUser() {
		return Cookie.get("jwtToken")
	}

	GetUserIdFromJwt(token) {
		return jwt(token).nameid
	}

	GetIdFromStoredJwt() {
		var token = this.GetCurrentUser()

		if(token)
			return this.GetUserIdFromJwt(token)

		return ""
	}
}

export default new UserClient();
