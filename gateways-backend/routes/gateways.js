/**
 * Gateways Routes
 * /api/gateways
 */
const { Router } = require('express')
const { check } = require('express-validator')
const {
	getGateways,
	createGateway,
	updateGateway,
	deleteGateway,
} = require('../controllers/gateways')
const {
	isArrayOrNull,
	isLessThan10,
	isDeviceArray,
} = require('../helpers/isDeviceArray')
const { validateFields } = require('../middlewares/validateFields')
const router = Router()

router.get('/', getGateways)

router.post(
	'/',
	[
		check('name', 'Field name is mandatory').isAlpha(),
		check('serial', 'Field serial is mandatory').notEmpty(),
		check('ipAddress', 'A correct ipAddress is mandatory').isIP(4),
		check('devices', 'devices must be an array or null').custom(isArrayOrNull),
		check('devices', 'Can not have more than 10 devices').custom(isLessThan10),
		check('devices', 'all items must be well formed devices').custom(
			isDeviceArray,
		),
		validateFields,
	],
	createGateway,
)

router.put('/:id', updateGateway)

router.delete('/:id', deleteGateway)

module.exports = router
