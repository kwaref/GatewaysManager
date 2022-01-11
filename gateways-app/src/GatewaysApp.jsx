import React from 'react'
import { Provider } from 'react-redux'
import { LoaderModal } from './components/ui/LoaderModal'
import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'
import './styles.css'

export const GatewaysApp = () => {
	return (
		<Provider store={store}>
			<AppRouter />
			<LoaderModal />
		</Provider>
	)
}
