const API_URL = 'https://localhost:7001/CustomIndex?userID='

class CustomIndexClient {

	async getCustomIndexRequest(userID) {
		const response = await fetch(API_URL + userID, {
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


	async getCustomIndexByIdRequest(userID, indexID) {
		const response = await fetch(API_URL + userID + '&indexId=' + indexID, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if(response.ok)
			const data = await response.json()
			return data
	}
}


export default new CustomIndexClient();
