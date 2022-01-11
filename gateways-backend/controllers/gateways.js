const { response } = require('express')
const Gateway = require('../models/Gateway')

const getGateways = async (req, res = response) => {
	const gateways = await Gateway.find()
	res.status(201).json({
		ok: true,
		gateways,
		msg: 'Gateways listed',
	})
}
const createGateway = async (req, res = response) => {
	const { name, serial, ipAddress, devices } = req.body

	try {
		let gateway = await Gateway.findOne({ serial })
		if (gateway) {
			return res.status(400).json({
				ok: false,
				msg: 'There is already a gateway with that serial',
			})
		}
		gateway = new Gateway(req.body)

		await gateway.save()
		return res.status(201).json({
			ok: true,
			name,
			serial,
			ipAddress,
			devices,
			msg: 'Gateway created',
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			ok: false,
			msg: 'Talk to the admin',
		})
	}
}
const updateGateway = async (req, res = response) => {
	const gatewayId = req.params.id

	try {
		const gateway = await Gateway.findById(gatewayId)

		if (!gateway) {
			return res.status(404).json({
				ok: false,
				msg: 'There is not a gateway with that id',
			})
		}
		const newGateway = {
			...req.body,
		}
		const updatedGateway = await Gateway.findByIdAndUpdate(
			gatewayId,
			newGateway,
			{ new: true },
		)

		return res.status(201).json({
			ok: true,
			gateway: updatedGateway,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			ok: false,
			msg: 'Talk to the admin',
		})
	}
}
const deleteGateway = async (req, res = response) => {
	const gatewayId = req.params.id

	try {
		const gateway = await Gateway.findById(gatewayId)

		if (!gateway) {
			return res.status(404).json({
				ok: false,
				msg: 'There is not a gateway with that id',
			})
		}

		await Gateway.findByIdAndDelete(gatewayId)

		res.status(201).json({
			ok: true,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			ok: false,
			msg: 'Talk to the admin',
		})
	}
}

module.exports = {
	createGateway,
	deleteGateway,
	updateGateway,
	getGateways,
}
