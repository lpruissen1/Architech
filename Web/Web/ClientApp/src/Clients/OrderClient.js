const API_URL = "https://localhost:9001/Orders/"; // this will eventually need to be config

class OrderClient {
	async GetOrders(userId) {
		const response = await fetch(API_URL + "get-orders/" + userId, {
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

	async CancelOrder(userId, transferId) {
		const response = await fetch(API_URL + "cancel-transfer/" + userId + "/" + transferId, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			return true
		}

		return false
	}
}

export default new OrderClient();
