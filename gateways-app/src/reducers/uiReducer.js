import { types } from '../types/types'

const initialState = {
	modalGatewayOpen: false,
	modalDeviceOpen: false,
	isLoading: true,
}

export const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.uiOpenGatewayModal:
			return {
				...state,
				modalGatewayOpen: true,
			}
		case types.uiCloseGatewayModal:
			return {
				...state,
				modalGatewayOpen: false,
			}
		case types.uiOpenDeviceModal:
			return {
				...state,
				modalDeviceOpen: true,
			}
		case types.uiCloseDeviceModal:
			return {
				...state,
				modalDeviceOpen: false,
			}
		case types.uiStartLoading:
			return {
				...state,
				isLoading: true,
			}
		case types.uiStopLoading:
			return {
				...state,
				isLoading: false,
			}

		default:
			return state
	}
}
