const API_URL = "https://localhost:9001/Positions/"; // this will eventually need to be config

class PositionsClient {

	async GetAllPositions(userId) {
		fetch(API_URL + 'create?userId=' + userId, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userId)
		})
			.then(function (response) {
				if (response.ok) {
					const data = response.json()

					return data
				}
			});
	}
}

export default new PositionsClient();
