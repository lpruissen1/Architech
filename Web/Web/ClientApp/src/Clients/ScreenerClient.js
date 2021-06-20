const API_URL = 'https://localhost:5001/Screening/FuckYourself';

class ScreenerClient {

	async postScreeningRequest(data = {}) {
		const response = await fetch(API_URL, {
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
