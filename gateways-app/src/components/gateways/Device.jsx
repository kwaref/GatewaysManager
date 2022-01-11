import React from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'
import { gatewayStartUpdate } from '../../actions/gateways'
import { uiStartLoading } from '../../actions/ui'
import { useGetGatewayById } from '../../selectors/useGetGatewayById'

export const Device = ({ UID, vendor, date, status }) => {
	const dispatch = useDispatch()
	const { gatewayId } = useParams()

	const gateway = useGetGatewayById(gatewayId)

	if (!gateway) {
		return <Navigate to='/' />
	}

	const { devices } = gateway

	const onDelete = () => {
		dispatch(
			gatewayStartUpdate({
				...gateway,
				devices: devices.filter(device => device.UID !== UID),
			}),
		)
		dispatch(uiStartLoading())
	}

	return (
		<div className='card ms-1' style={{ maxWidth: 240, height: 240 }}>
			<div className='row no-gutters'>
				<div className='card-body'>
					<h3 className='card-title'>{UID}</h3>
					<hr />
					<p className='card-text'>Vendor: {vendor}</p>
					<p className='card-text'>Date: {date}</p>
					<p className='card-text'>Status: {status ? 'online' : 'offline'}</p>
					<i
						className='fas fa-trash-alt float-right'
						style={{ cursor: 'pointer' }}
						onClick={onDelete}></i>
				</div>
			</div>
		</div>
	)
}
