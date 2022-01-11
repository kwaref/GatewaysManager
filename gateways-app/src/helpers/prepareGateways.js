import moment from 'moment'

export const prepareGateways = (gateways = []) => {
	return gateways.map(gateway => ({
		...gateway,
		devices: gateway.devices.map(d => ({
			...d,
			date: moment(d.date).format('MM/DD/YY'),
      
		})),
	}))
}
