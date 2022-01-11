import React from 'react'
import { useDispatch } from 'react-redux'
import { uiOpenGatewayModal } from '../../actions/ui'
import { GatewayCard } from './GatewayCard'

export const GatewaysList = ({ gateways }) => {
	const dispatch = useDispatch()

	// useEffect(() => {
	// 	dispatch(gatewayClearActive())
	// }, [dispatch])

	const handleOnClick = e => {
		dispatch(uiOpenGatewayModal())
	}

	return (
		<>
			<div className='card-columns'>
				{gateways.map(gateway => (
					<GatewayCard key={gateway.serial} gateway={gateway} />
				))}
			</div>
			<i
				className='fas fa-plus-circle fa-3x'
				style={{ cursor: 'pointer' }}
				onClick={handleOnClick}></i>
		</>
	)
}
