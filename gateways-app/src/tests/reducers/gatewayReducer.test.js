import {
	gatewayAddNew,
	gatewayClearActive,
	gatewayDeleted,
	gatewaySetActive,
} from '../../actions/gateways'
import { gatewayReducer } from '../../reducers/gatewayReducer'
//import { gatewayAddNew } from '../../types/types'

const initialState = {
	activeGateway: null,
	gateways: [],
}

describe('Tests on gatewayReducer', () => {
	test('should return the default state', () => {
		const action = {}
		const state = gatewayReducer(initialState, action)

		expect(state).toEqual(initialState)
	})

	it('should set an active gateway and set it back to null', () => {
		const gateway = {
			serial: '123',
			name: 'testGateway',
			ipAddress: '192.168.1.1',
			devices: [],
		}
		const action = gatewaySetActive(gateway)
		const state = gatewayReducer(initialState, action)

		expect(state).toEqual({
			activeGateway: {
				serial: '123',
				name: 'testGateway',
				ipAddress: '192.168.1.1',
				devices: [],
			},
			gateways: [],
		})

		const clearActive = gatewayClearActive()
		const newState = gatewayReducer(state, clearActive)

		expect(newState).toEqual(initialState)
	})

	it('should add and delete a gateway', () => {
		const gateway = {
			serial: '123',
			name: 'testGateway',
			ipAddress: '192.168.1.1',
			devices: [],
		}

		const action = gatewayAddNew(gateway)
		const state = gatewayReducer(initialState, action)

		expect(state).toEqual({ ...initialState, gateways: [gateway] })

		const gatewayDelete = gatewayDeleted(gateway)
		const newState = gatewayReducer(state, gatewayDelete)
		expect(newState).toEqual(initialState)
	})
})
