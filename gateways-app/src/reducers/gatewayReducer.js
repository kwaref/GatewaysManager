import { types } from '../types/types'

const initialState = {
	gateways: [],
	activeGateway: null,
}

export const gatewayReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.gatewaySetActive:
			return {
				...state,
				activeGateway: action.payload,
			}
		case types.gatewayAddNew:
			return {
				...state,
				gateways: [...state.gateways, action.payload],
			}
		case types.gatewayClearActive:
			return {
				...state,
				activeGateway: null,
			}
		case types.gatewayUpdated:
			return {
				...state,
				gateways: state.gateways.map(g =>
					g.serial === action.payload.serial ? action.payload : g,
				),
			}
		case types.gatewayDeleted:
			return {
				...state,
				gateways: state.gateways.filter(g => g._id !== action.payload._id),
			}
		case types.gatewayLoaded:
			return {
				...state,
				gateways: [...action.payload],
			}
		default:
			return state
	}
}
