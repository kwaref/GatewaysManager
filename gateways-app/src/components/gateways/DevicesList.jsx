import React from 'react'
import { Device } from './Device'

export const DevicesList = ({ devices }) => {
	return (
		<div className='card-columns'>
			{devices.map(device => (
				<Device key={device.UID} {...device} />
			))}
		</div>
	)
}
