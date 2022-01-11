import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { GatewaysApp } from './GatewaysApp'
import "react-activity/dist/Dots.css";

ReactDOM.render(
	<BrowserRouter>
		<GatewaysApp />
	</BrowserRouter>,
	document.getElementById('root'),
)
