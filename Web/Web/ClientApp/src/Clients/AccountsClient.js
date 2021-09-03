import UserClient from './UserClient'
const API_URL = "https://localhost:9001/Accounts/"; // this will eventually need to be config

class AccountsClient {
	async CreateTradingAccount(data) {
		fetch(API_URL + "create", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(function (response) {
				return response.status
			});
	}

	async CreateAchRelationship(userId, data) {
		fetch(API_URL + "create-ach-relationship/" + userId, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(function (response) {
			if (response.ok) {
				const data = response.json()

				return data
			}
		});
	}

	async GetAchRelationship(userId) {
		const response = await fetch(API_URL + "get-ach-relationship/" + userId, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			const data = await response.json()
			return data
		}
	
	}

	async ExecuteTransfer(data, userId) {
		const response = await fetch(API_URL + "transfer-funds/" + userId, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)

		})

		if (response.ok) {
			const data = await response.json()
			return data
		}
	
	}
}

export default new AccountsClient();
