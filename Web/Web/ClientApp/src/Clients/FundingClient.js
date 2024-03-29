﻿const API_URL = "https://localhost:9001/Funding/"; // this will eventually need to be config

class FundingClient {
	async CreateAchRelationship(userId, data) {
		fetch(API_URL + "create-ach-relationship/" + userId, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		.then(function (response) {
			if (response.ok) {
				const data = response.json()

				return data
			}
		});
	}

	async GetAchRelationship(userId) {
		const response = await fetch(API_URL + "get-ach-relationship/" + userId, {
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

	async ExecuteTransfer(data, userId) {
		const response = await fetch(API_URL + "transfer-funds/" + userId, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		return response.status
	}

	async CancelTransfer(userId, transferId) {
		const response = await fetch(API_URL + "cancel-transfer/" + userId + "/" + transferId, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (response.ok) {
			const data = await response.json()
			return data
		}
	}

	async GetTransfers(userId) {
		const response = await fetch(API_URL + "get-all-transfers/" + userId, {
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

export default new FundingClient();
