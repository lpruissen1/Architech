﻿const GET_ALL_URL = 'https://localhost:9001/CustomIndex?userID='
const GET_BY_ID_URL = 'https://localhost:9001/CustomIndex/GetCustomIndex?userID='
const POST_API_URL = 'https://localhost:9001/CustomIndex'
const DELETE_API_URL = 'https://localhost:9001/CustomIndex/DeleteIndex?userId='
const PUT_API_URL = 'https://localhost:9001/CustomIndex/UpdateIndex?userId='

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

			return data
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

	CreateCustomIndex(data = {}) {
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

	async deleteCustomIndexRequest(userId, indexId) {
		await fetch(DELETE_API_URL + userId + '&indexId=' + indexId, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
		})
			.then(function (response) {
				return response.status
			});
	}

	UpdateCustomIndex(userId, data = {}) {
		fetch(PUT_API_URL + userId, {
			method: 'PUT',
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
