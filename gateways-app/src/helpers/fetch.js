const baseUrl = 'http://localhost:4000/api'

const fetchWithOutToken = (endpoint, data, method = 'GET') => {
	const url = `${baseUrl}/${endpoint}`

	if (method === 'GET') {
		return fetch(url)
	} else {
		return fetch(url, {
			method,
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		})
	}
}

export { fetchWithOutToken }
