export const API_URL = 'https://localhost:5001/Weighting';

export class WeightingClient {

	async postWeightingRequest(weightingOption, tickers) {

		const data = {
			Option: weightingOption,
			Tickers: tickers
		}

		const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
			body: JSON.stringify(data)
        });

        return response.json();
	}

}

export default new WeightingClient()
