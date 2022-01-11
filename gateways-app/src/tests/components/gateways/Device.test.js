import React from 'react'
import { shallow } from 'enzyme'
import { Device } from '../../../components/gateways/Device'
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}
const store = mockStore(initState)
store.dispatch = jest.fn()

const props = { UID: '123', vendor: 'hp', status: true }

const wrapper = shallow(
	<Provider store={store}>
		<Device {...props} />
	</Provider>,
)

describe('Tests on Device component', () => {
	it('should be correctly rendered', () => {
		expect(wrapper).toMatchSnapshot()
	})
})
