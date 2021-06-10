import Cookie from "js-cookie";
import jwt from 'jwt-decode';

const API_URL = "https://localhost:9001/User/"; // this will eventually need to be config

class AuthService {
	async login(username, password) {

		const response = await fetch(API_URL + "login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "username": username, "password": password })
		});

		if (response.ok) {
			const json = await response.json()
			const id = this.getUserIdFromJwt(json.token)

			Cookie.set("jwtToken", json.token, { expires: 1 / 24  })
			return [true, id]
		}

		return false
	}

	logout() {
		Cookie.remove("jwtToken")
	}

	async register(registrationData) {
		const response = await fetch(API_URL + "create", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(registrationData)
		});

		if (response.ok) {
			const json = await response.json()
			Cookie.set("jwtToken", json.token, { expires: 1 / 24 })

			return [true, json.userId]
		}

		return false
	}

	getCurrentUser() {
		return Cookie.get("jwtToken")
	}

	getUserIdFromJwt(token) {
		return jwt(token).nameid;
	}
}

export default new AuthService();
