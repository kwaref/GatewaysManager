import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { gatewayStartAddNew } from '../../actions/gateways'
import { uiCloseGatewayModal, uiStartLoading } from '../../actions/ui'
import { isIP } from '../../helpers/isIP'
import { serialIsInDB } from '../../helpers/searchers'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
}
if (process.env.NODE_ENV !== 'test') Modal.setAppElement('#root')

const initGateway = {
	name: '',
	serial: '',
	ipAddress: '',
}

export const GatewayModal = () => {
	const { modalGatewayOpen } = useSelector(state => state.ui)
	const { gateways } = useSelector(state => state.gateway)
	const dispatch = useDispatch()
	const [validName, setValidName] = useState(0)
	const [validSerial, setValidSerial] = useState(0)
	const [validIP, setValidIP] = useState(0)
	const [formValues, setFormValues] = useState(initGateway)
	const { name, serial, ipAddress } = formValues

	const handleInputChange = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value,
		})
	}

	useEffect(() => {
		if (isIP(ipAddress)) {
			setValidIP(1)
		}
		if (!serialIsInDB(serial, gateways) && serial.trim().length > 0) {
			setValidSerial(1)
		}
		if (serial.trim().length === 0) {
			setValidSerial(0)
		}
		if (serialIsInDB(serial, gateways)) {
			setValidSerial(-1)
		}
		if (name.trim().length > 0) {
			setValidName(1)
		} else {
			setValidName(0)
		}
	}, [name, ipAddress, serial, gateways])

	const closeModal = () => {
		dispatch(uiCloseGatewayModal())
		setFormValues(initGateway)
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (serial.trim().length < 1) {
			Swal.fire('', 'The serial is required', 'error')
			return setValidSerial(-1)
		}
		if (serialIsInDB(serial, gateways)) {
			Swal.fire('', 'That serial already exists in DB', 'error')
			return setValidSerial(-1)
		}
		if (name.trim().length < 2) {
			Swal.fire('', 'You must enter a name.', 'error')
			return setValidName(-1)
		}
		if (!isIP(ipAddress)) {
			Swal.fire('', 'You must enter a valid IP address', 'error')
			return setValidIP(-1)
		}

		dispatch(
			gatewayStartAddNew({
				...formValues,
				devices: [],
			}),
		)
		dispatch(uiStartLoading())

		setValidSerial(0)
		setValidName(0)
		setValidIP(0)

		closeModal()
	}

	return (
		<Modal
			isOpen={modalGatewayOpen}
			// onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}>
			<h1> New Gateway </h1>
			<hr />
			<form className='container' onSubmit={handleSubmit}>
				<div className='form-group'>
					<label>Serial number</label>
					<input
						type='text'
						className={`form-control ${validSerial === 1 && 'is-valid'} ${
							validSerial === -1 && 'is-invalid'
						}`}
						placeholder='Serial number'
						name='serial'
						autoComplete='off'
						value={serial}
						onChange={handleInputChange}
					/>
				</div>

				<div className='form-group'>
					<label>Name</label>
					<input
						className={`form-control ${validName === 1 && 'is-valid'} ${
							validName === -1 && 'is-invalid'
						}`}
						placeholder='Name'
						name='name'
						autoComplete='off'
						value={name}
						onChange={handleInputChange}
					/>
				</div>
				<div className='form-group'>
					<label>IP Address</label>
					<input
						className={`form-control ${validIP === 1 && 'is-valid'} ${
							validIP === -1 && 'is-invalid'
						}`}
						placeholder='IP Address'
						name='ipAddress'
						autoComplete='off'
						value={ipAddress}
						onChange={handleInputChange}
					/>
				</div>

				<hr />

				<button type='submit' className='btn btn-outline-primary btn-block'>
					<i className='far fa-save'></i>
					<span> Save</span>
				</button>
			</form>
		</Modal>
	)
}
