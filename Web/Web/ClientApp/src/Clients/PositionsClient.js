const API_URL = "https://localhost:9001/Positions/"; // this will eventually need to be config

class PositionsClient {

	async GetAllPositions(userId) {
		const response  = await fetch(API_URL + 'get-all?userId=' + userId, {
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

	async GetAllPositionsNew(userId) {
		const response  = await fetch(API_URL + 'get-all-new/' + userId, {
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
}

export default new PositionsClient();
