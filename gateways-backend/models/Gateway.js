const { Schema, model } = require('mongoose')

const GatewaySchema = Schema({
	name: {
		type: String,
		required: true,
	},
	serial: {
		type: String,
		required: true,
		unique: true,
	},
	ipAddress: {
		type: String,
		required: true,
	},
	devices: [
		{
			UID: Number,
			vendor: String,
			date: Date,
			status: Boolean,
		},
	],
})

module.exports = model('Gateway', GatewaySchema)
