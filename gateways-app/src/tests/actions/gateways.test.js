import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import { gatewayStartAddNew, gatewayStartLoading } from '../../actions/gateways'
import { types } from '../../types/types'
import * as fetchModule from '../../helpers/fetch'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}
let store = mockStore(initState)

describe('Tests on gateways actions', () => {
	beforeEach(() => {
		store = mockStore(initState)
	})

	it('should load correctly', async () => {
		await store.dispatch(gatewayStartLoading())
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: types.gatewayLoaded,
			payload: expect.any(Array),
		})
	})

	it('should startAddNew correctly', async () => {
		fetchModule.fetchWithOutToken = jest.fn(() => ({
			json() {
				return { ok: true }
			},
		}))

		const gateway = {
			name: 'newGateway',
			serial: '12345',
			ipAddress: '192.168.25.25',
			devices: [],
		}
		await store.dispatch(gatewayStartAddNew(gateway))

		const actions = store.getActions()

		expect(actions[0]).toEqual({
			type: types.gatewayAddNew,
			payload: {
				name: 'newGateway',
				serial: '12345',
				ipAddress: '192.168.25.25',
				devices: [],
			},
		})
	})
})
