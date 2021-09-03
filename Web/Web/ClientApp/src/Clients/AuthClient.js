import Cookie from "js-cookie";
import jwt from 'jwt-decode';

const API_URL = "https://localhost:9001/Auth/"; // this will eventually need to be config

class AuthClient {
	async Login(username, password) {

		const response = await fetch(API_URL + "login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "username": username, "password": password })
		});

		if (response.ok) {
			const json = await response.json()
			const id = this.GetUserIdFromJwt(json.token)

			Cookie.set("jwtToken", json.token, { expires: 1 / 24  })
			return id
		}
	}

	Logout() {
		Cookie.remove("jwtToken")
	}

	async Register(registrationData) {
		const response = await fetch(API_URL + "create", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(registrationData)
		});

		if (response.ok) {
			const json = await response.json();
			Cookie.set("jwtToken", json.token, { expires: 1 / 24 })

			return this.GetUserIdFromJwt(json.token)
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

export default new AuthClient();
