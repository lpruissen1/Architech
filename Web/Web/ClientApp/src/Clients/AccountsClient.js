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

	async ExecuteBulkOrder(data, userId) {
		const response = await fetch(API_URL + "execute-bulk-market-order/" + userId, {
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
