import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { gatewayStartDelete } from '../../actions/gateways'
import { uiStartLoading } from '../../actions/ui'

export const GatewayCard = ({ gateway }) => {
	//const { gateways } = useSelector(state => state.gateway)
	const dispatch = useDispatch()

	const onDelete = e => {
		dispatch(gatewayStartDelete(gateway))
		dispatch(uiStartLoading())
	}

	return (
		<div className='card ms-3' style={{ maxWidth: 240, height: 220 }}>
			<div className='row no-gutters'>
				<div className='card-body'>
					<h3 className='card-title truncate'>{gateway.name}</h3>
					<hr />
					<p className='card-text'>Serial: {gateway.serial}</p>
					<p className='card-text'>IP Address: {gateway.ipAddress}</p>
					<Link to={`./gateway/${gateway.serial}`}>
						<small>
							<i>More...</i>
						</small>
					</Link>
					<i
						className='fas fa-trash-alt float-right'
						style={{ cursor: 'pointer' }}
						onClick={onDelete}></i>
				</div>
			</div>
		</div>
	)
}
