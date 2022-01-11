import { types } from '../types/types'

export const uiOpenGatewayModal = () => ({
	type: types.uiOpenGatewayModal,
})
export const uiCloseGatewayModal = () => ({
	type: types.uiCloseGatewayModal,
})
export const uiOpenDeviceModal = () => ({
	type: types.uiOpenDeviceModal,
})
export const uiCloseDeviceModal = () => ({
	type: types.uiCloseDeviceModal,
})

export const uiStartLoading = () => ({
	type: types.uiStartLoading,
})
export const uiStopLoading = () => ({
	type: types.uiStopLoading,
})
