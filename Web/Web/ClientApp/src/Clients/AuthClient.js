import Cookie from "js-cookie";

const API_URL = "https://localhost:9001/User/";

class AuthService {
	login(username, password) {
		// return something if failure/success
		fetch(API_URL + "login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"username" : username, "passwordhash": password})
		}).then(function (response) {
			if (!response.ok) return false;
			response.json().then(function (data) {
				Cookie.set("jwtToken", data.token)
				return true
			})
		});
	}

	logout() {
		Cookie.remove("jwtToken")
	}

	register(registrationData) {
		// return something if failure/success
		fetch(API_URL + "create", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(registrationData)
		}).then(function (response) {
			if (!response.ok) return false;
			response.json().then(function (data) {
				Cookie.set("jwtToken", data.token)
				return true
			})
		});

		return true
	}

	getCurrentUser() {
		return Cookie.get("jwtToken")
	}
}

export default new AuthService();
