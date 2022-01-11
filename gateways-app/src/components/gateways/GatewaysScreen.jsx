import React, { Fragment, useEffect } from 'react'
import { GatewaysList } from './GatewaysList'
import { GatewayModal } from './GatewayModal'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { gatewayStartLoading } from '../../actions/gateways'
import { uiStartLoading } from '../../actions/ui'

export const GatewaysScreen = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(gatewayStartLoading())
		dispatch(uiStartLoading())
	}, [dispatch])

	const { gateways } = useSelector(state => state.gateway)

	return (
		<>
			<h1>Gateways List</h1>
			<hr />
			<GatewaysList gateways={gateways} />
			<GatewayModal />
		</>
	)
}
