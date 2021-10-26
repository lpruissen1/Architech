
const API_URL = "https://localhost:9001/Accounts/"; // this will eventually need to be config

class PriceDataClient {

	static eventClient = null;

	GetPriceData(tickers, updateFunction) {
		const queryString = tickers && tickers.map((item) => {
			return "tickers=" + item + "&";
		}).join('').slice(0, -1);

		debugger

		PriceDataClient.eventClient = new EventSource("https://localhost:42069/Data?" + queryString)
		PriceDataClient.eventClient.onmessage = e => updateFunction(e.data)
	}

	Close(){
		if (PriceDataClient.eventClient)
			PriceDataClient.eventClient.close();
	}
}

export default new PriceDataClient();
