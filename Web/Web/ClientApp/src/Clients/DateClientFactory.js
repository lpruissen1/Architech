const API_URL = "https://localhost:42069/Date/"; // this will eventually need to be config

class DateClientFactory {
	async GetDateStream() {
		var eventSource = new EventSource(API_URL);
		eventSource.onmessage = e => {
			() => { return e } };

		return eventSource
	}
}

export default new DateClientFactory();
