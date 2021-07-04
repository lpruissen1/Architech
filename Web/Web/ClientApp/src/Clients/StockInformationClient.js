export const API_URL = 'https://localhost:5001/StockInformation/';

class ScreenerClient {

	async GetAllTickers() {
		const response = await fetch(API_URL + "GetAllTickers", {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		return response.json()
	}
}

export default new ScreenerClient();
