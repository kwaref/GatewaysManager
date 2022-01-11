import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { gatewaySetActive } from '../../actions/gateways'
import { uiOpenDeviceModal } from '../../actions/ui'
import { useGetGatewayById } from '../../selectors/useGetGatewayById'
import { DeviceModal } from './DeviceModal'
import { DevicesList } from './DevicesList'

export const Gateway = () => {
	const dispatch = useDispatch()
	const { gatewayId } = useParams()
	const handleClick = e => {
		dispatch(uiOpenDeviceModal())
	}
	const gateway = useGetGatewayById(gatewayId)
	useEffect(() => {
		dispatch(gatewaySetActive(gateway))
	}, [dispatch, gateway])
	if (!gateway) {
		return <Navigate to='/' />
	}

	const { devices } = gateway

	return (
		<div>
			<h1>{gateway.name}</h1>
			<hr />
			<h3>Serial: {gateway.serial}</h3>
			<h3>IP Address: {gateway.ipAddress}</h3>
			<hr />
			<h3>Devices:</h3>
			{devices && <DevicesList devices={gateway.devices} />}

			{devices.length < 10 && (
				<i
					className='fas fa-plus-circle fa-3x'
					style={{ cursor: 'pointer' }}
					onClick={handleClick}></i>
			)}

			<DeviceModal />
		</div>
	)
}
