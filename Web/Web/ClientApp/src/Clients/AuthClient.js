import Cookie from "js-cookie";

const API_URL = "https://localhost:9001/User/";

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
			const json = await response.json();
			Cookie.set("jwtToken", json.token)
			return [true, json.userID]
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
			const json = await response.json();
			Cookie.set("jwtToken", json.token)
			return [true, json.userID]
		}

		return false
	}

	getCurrentUser() {
		return Cookie.get("jwtToken")
	}
}

export default new AuthService();
