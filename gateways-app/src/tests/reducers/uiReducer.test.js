import {
	uiCloseDeviceModal,
	uiCloseGatewayModal,
	uiOpenDeviceModal,
	uiOpenGatewayModal,
	uiStartLoading,
	uiStopLoading,
} from '../../actions/ui'
import { uiReducer } from '../../reducers/uiReducer'

const initState = {
	modalGatewayOpen: false,
	modalDeviceOpen: false,
	isLoading: true,
}

describe('Tests on uiReducer', () => {
	it('should return the default state', () => {
		const state = uiReducer(initState, {})
		expect(state).toEqual(initState)
	})

	it('should open and close GatewayModal', () => {
		const openGatewayModal = uiOpenGatewayModal()

		const state = uiReducer(initState, openGatewayModal)
		expect(state).toEqual({
			modalGatewayOpen: true,
			modalDeviceOpen: false,
			isLoading: true,
		})

		const closeGatewayModal = uiCloseGatewayModal()

		const newState = uiReducer(initState, closeGatewayModal)
		expect(newState).toEqual({
			modalGatewayOpen: false,
			modalDeviceOpen: false,
			isLoading: true,
		})
	})

	it('should open and close DeviceModal', () => {
		const openDeviceModal = uiOpenDeviceModal()

		const state = uiReducer(initState, openDeviceModal)
		expect(state).toEqual({
			modalGatewayOpen: false,
			modalDeviceOpen: true,
			isLoading: true,
		})

		const closeDeviceModal = uiCloseDeviceModal()

		const newState = uiReducer(initState, closeDeviceModal)
		expect(newState).toEqual({
			modalGatewayOpen: false,
			modalDeviceOpen: false,
			isLoading: true,
		})
	})

	it('should toggle isLoading', () => {
		const stopLoading = uiStopLoading()

		const state = uiReducer(initState, stopLoading)
		expect(state).toEqual({
			modalGatewayOpen: false,
			modalDeviceOpen: false,
			isLoading: false,
		})

		const startLoading = uiStartLoading()

		const newState = uiReducer(initState, startLoading)
		expect(newState).toEqual({
			modalGatewayOpen: false,
			modalDeviceOpen: false,
			isLoading: true,
		})
	})
})
