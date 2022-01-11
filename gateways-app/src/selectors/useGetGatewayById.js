import { useSelector } from 'react-redux'

export const useGetGatewayById = id => {
	const { gateways } = useSelector(state => state.gateway)
	return gateways.find(gateway => gateway.serial === id)
}
