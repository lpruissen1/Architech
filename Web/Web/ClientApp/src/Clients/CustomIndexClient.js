const GET_ALL_URL = 'https://localhost:7001/CustomIndex?userID='
const GET_BY_ID_URL = 'https://localhost:7001/CustomIndex/GetCustomIndex?userID='
const POST_API_URL = 'https://localhost:7001/CustomIndex'


class CustomIndexClient {

	async getCustomIndexByUserId(userID) {
		const response = await fetch(GET_ALL_URL + userID, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			const data = await response.json()

			const activePortfolios = data.map((portfolio) => {
				return {
					indexId: portfolio.indexId,
					markets: portfolio.markets,
					sectors: portfolio.sectors,
					rangedRules: portfolio.rangedRule,
					timedRangeRules: portfolio.timedRangeRule
				}
			})

			return activePortfolios
		}
	}


	async getCustomIndexByIndexId(userID, indexID) {
		const response = await fetch(GET_BY_ID_URL + userID + '&indexId=' + indexID, {
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

	postCustomIndexRequest(data = {}) {
		fetch(POST_API_URL, {
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
}


export default new CustomIndexClient();
