export const API_URL = 'https://localhost:5001/';

class ScreenerClient {

	async postScreeningRequest(data = {}) {
		const response = await fetch(API_URL + "Screening/FuckYourself", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
		})

		return response.json()
	}

	async postPurchaseOrderRequest(data = {}) {
		const response = await fetch(API_URL + "PurchaseOrder", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
		})

		return response.json()
	}
}

export default new ScreenerClient();
