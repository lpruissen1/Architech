import Cookie from "js-cookie";

const API_URL = "https://localhost:9001/User/";

class AuthService {
	login(username, password) {
		fetch(API_URL + "login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"username" : username, "passwordhash": password})
		}).then(function (response) {
			response.text().then(function (data) {
				Cookie.set("jwtToken", data)
			})
		});
	}

	logout() {
		Cookie.remove("jwtToken")
	}

	register(registrationData) {
		fetch(API_URL + "create", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(registrationData)
		}).then(function (response) {
			response.text().then(function (data) {
				Cookie.set("jwtToken", data)
			})
		});
	}
}

export default new AuthService();
