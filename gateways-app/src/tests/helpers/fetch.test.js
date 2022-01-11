import { fetchWithOutToken } from '../../helpers/fetch'

describe('Tests on Fetch helper', () => {
	it('fetch GET should work', async () => {
		const resp = await fetchWithOutToken('gateways')

		expect(resp instanceof Response).toBe(true)

		const body = await resp.json()
		expect(body.ok).toBe(true)
	})
})
