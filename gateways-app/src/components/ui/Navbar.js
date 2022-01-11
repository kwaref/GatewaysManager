import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
			<Link className='navbar-brand' to='/'>
				<i className='fas fa-microchip'></i>
				Gateways
			</Link>

			<div className='navbar-collapse'>
				{/* <div className='navbar-nav'>
					<NavLink
						activeClassName='active'
						className='nav-item nav-link'
						exact
						to='/marvel'>
						Marvel
					</NavLink>

					<NavLink
						activeClassName='active'
						className='nav-item nav-link'
						exact
						to='/dc'>
						DC
					</NavLink>
				</div> */}
			</div>
		</nav>
	)
}
