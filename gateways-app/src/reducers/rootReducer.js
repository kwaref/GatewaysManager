import { combineReducers } from 'redux'
import { gatewayReducer } from './gatewayReducer'
import { uiReducer } from './uiReducer'

export const rootReducer = combineReducers({
	ui: uiReducer,
	gateway: gatewayReducer,
})
