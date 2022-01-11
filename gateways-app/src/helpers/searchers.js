export const serialIsInDB = (serial, gateways = []) => {
	const gateway = gateways.find(g => g.serial === serial)
	if (gateway) {
		return true
	}
	return false
}

export const uidIsInDB = (UID, gateways = []) => {
	let result = false
	gateways.forEach(gateway => {
		const { devices } = gateway
		const device = devices.find(d => d.UID.toString() === UID)
		if (device) {
			result = true
		}
	})
	return result
}
