import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Gateway } from '../components/gateways/Gateway'
import { GatewaysScreen } from '../components/gateways/GatewaysScreen'
import { Navbar } from '../components/ui/Navbar'

export const AppRouter = () => {
	return (
		<>
			<Navbar />
			<div className='container mt-3'>
				<Routes>
					<Route path='/' element={<GatewaysScreen />} />
					<Route path='/gateway/:gatewayId' element={<Gateway />} />
				</Routes>
			</div>
		</>
	)
}
