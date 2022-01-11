const { isDate } = require('./isDate')

const isArrayOrNull = value => {
	if (!value) {
		return true
	} else {
		return Array.isArray(value)
	}
}

const isLessThan10 = value => {
	if (!value) {
		return true
	} else {
		if (Array.isArray(value)) {
			return value.length <= 10
		}
		return false
	}
}

const isDevice = item => {
	if (item.length > 4 || item.length < 3) {
		return false
	}
	const { vendor, date, status } = item
	return (
		typeof vendor === 'string' && typeof status === 'boolean' && isDate(date)
	)
}

const isDeviceArray = value => {
	if (!value) {
		return true
	}
	if (Array.isArray(value)) {
		for (let index = 0; index < value.length; index++) {
			if (!isDevice(value[index])) {
				return false
			}
		}
		return true
	}
	return false
}

module.exports = { isArrayOrNull, isLessThan10, isDeviceArray }
