import Swal from 'sweetalert2'
import { fetchWithOutToken } from '../helpers/fetch'
import { prepareGateways } from '../helpers/prepareGateways'
import { types } from '../types/types'
import { uiStopLoading } from './ui'

export const gatewayStartAddNew = gateway => {
	return async dispatch => {
		try {
			const resp = await fetchWithOutToken('gateways', gateway, 'POST')
			const body = await resp.json()

			if (body.ok) {
				dispatch(gatewayAddNew(gateway))
				dispatch(gatewayStartLoading())
				dispatch(uiStopLoading())
			}
		} catch (error) {
			dispatch(uiStopLoading())
			console.log(error)
			Swal.fire('', error, 'error')
		}
	}
}

export const gatewayAddNew = gateway => ({
	type: types.gatewayAddNew,
	payload: gateway,
})
export const gatewaySetActive = gateway => ({
	type: types.gatewaySetActive,
	payload: gateway,
})
export const gatewayClearActive = () => ({
	type: types.gatewayClearActive,
})

export const gatewayStartUpdate = gateway => {
	return async dispatch => {
		try {
			const resp = await fetchWithOutToken(
				`gateways/${gateway._id}`,
				gateway,
				'PUT',
			)

			const body = await resp.json()
			if (body.ok) {
				dispatch(gatewayUpdated(gateway))
				dispatch(uiStopLoading())
			} else {
				dispatch(uiStopLoading())
				Swal.fire('Error', body.msg, 'error')
			}
		} catch (error) {
			dispatch(uiStopLoading())
			console.log(error)
			Swal.fire('', error, 'error')
		}
	}
}

export const gatewayUpdated = gateway => ({
	type: types.gatewayUpdated,
	payload: gateway,
})
export const gatewayStartLoading = () => {
	return async dispatch => {
		try {
			const resp = await fetchWithOutToken('gateways')
			const body = await resp.json()

			const gateways = prepareGateways(body.gateways)

			dispatch(gatewayLoaded(gateways))
			dispatch(uiStopLoading())
		} catch (error) {
			dispatch(uiStopLoading())
			console.log(error)
			Swal.fire('', error, 'error')
		}
	}
}

export const gatewayLoaded = gateways => ({
	type: types.gatewayLoaded,
	payload: gateways,
})

export const gatewayDeleted = gateway => ({
	type: types.gatewayDeleted,
	payload: gateway,
})

export const gatewayStartDelete = gateway => {
	return async dispatch => {
		try {
			const resp = await fetchWithOutToken(
				`gateways/${gateway._id}`,
				{},
				'DELETE',
			)

			const body = await resp.json()
			if (body.ok) {
				dispatch(gatewayDeleted(gateway))
				dispatch(uiStopLoading())
			} else {
				dispatch(uiStopLoading())
				Swal.fire('Error', body.msg, 'error')
			}
		} catch (error) {
			dispatch(uiStopLoading())
			console.log(error)
			Swal.fire('', error, 'error')
		}
	}
}
