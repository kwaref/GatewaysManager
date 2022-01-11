import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import Modal from 'react-modal'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { gatewayStartUpdate } from '../../actions/gateways'
import { uiCloseDeviceModal, uiStartLoading } from '../../actions/ui'
import { useGetGatewayById } from '../../selectors/useGetGatewayById'
//import { ToggleSwitch } from '../ui/ToggleSwitch'
import 'react-datepicker/dist/react-datepicker.css'
import Swal from 'sweetalert2'
import { uidIsInDB } from '../../helpers/searchers'

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

const initDevice = {
	UID: '',
	vendor: '',
	date: moment().toDate(),
	status: true,
}

export const DeviceModal = () => {
	const { modalDeviceOpen } = useSelector(state => state.ui)
	const { gateways } = useSelector(state => state.gateway)

	const { gatewayId } = useParams()
	const gateway = useGetGatewayById(gatewayId)
	const { devices } = gateway

	const dispatch = useDispatch()

	const [formValues, setFormValues] = useState(initDevice)
	const { UID, vendor, status } = formValues
	const [startDate, setStartDate] = useState(moment().toDate())

	const [validUID, setValidUID] = useState(0)
	const [validVendor, setValidVendor] = useState(0)
	const [validDate, setValidDate] = useState(0)

	const handleSelectChange = ({ target }) => {
		const st = target.value === 'true' ? true : false

		setFormValues({
			...formValues,
			status: st,
		})
	}

	const handleInputChange = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value,
		})
	}

	const onDateChange = e => {
		setStartDate(e)

		setFormValues({
			...formValues,
			date: moment(e).format('MM/DD/YYYY'),
		})
	}

	useEffect(() => {
		if (!uidIsInDB(UID, gateways) && UID.trim().length > 0) {
			setValidUID(1)
		}
		if (UID.trim().length === 0) {
			setValidUID(0)
		}
		if (uidIsInDB(UID, gateways)) {
			setValidUID(-1)
		}
		if (vendor.trim().length > 0) {
			setValidVendor(1)
		} else {
			setValidVendor(0)
		}
		if (!startDate) {
			setValidDate(-1)
		} else {
			setValidDate(0)
		}
	}, [UID, vendor, startDate, gateways])

	const closeModal = () => {
		dispatch(uiCloseDeviceModal())
		setFormValues(initDevice)
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (UID.trim().length < 1) {
			Swal.fire('', 'UID is required!', 'error')
			return setValidUID(-1)
		}
		if (uidIsInDB(UID, gateways)) {
			Swal.fire('', 'That UID is already in the DB!', 'error')
			return setValidUID(-1)
		}
		if (vendor.trim().length < 1) {
			Swal.fire('', "You must enter a Vendor's name", 'error')
			return setValidVendor(-1)
		}
		if (!startDate) {
			Swal.fire('', 'You must select a correct Date', 'error')
			return setValidDate(-1)
		}

		dispatch(
			gatewayStartUpdate({
				...gateway,
				devices: [
					...devices,
					{ ...formValues, date: moment(startDate).format('MM/DD/YYYY') },
				],
			}),
		)

		dispatch(uiStartLoading())

		setValidUID(0)
		setValidVendor(0)
		setValidDate(0)

		closeModal()
	}

	return (
		<Modal
			isOpen={modalDeviceOpen}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}>
			<h1> New Device </h1>
			<hr />
			<form className='container' onSubmit={handleSubmit}>
				<div className='form-group'>
					<label>UID</label>
					<input
						type='text'
						className={`form-control ${validUID === 1 && 'is-valid'} ${
							validUID === -1 && 'is-invalid'
						}`}
						placeholder='UID'
						name='UID'
						autoComplete='off'
						value={UID}
						onChange={handleInputChange}
					/>
				</div>

				<div className='form-group'>
					<label>Vendor</label>
					<input
						className={`form-control ${validVendor === 1 && 'is-valid'} ${
							validVendor === -1 && 'is-invalid'
						}`}
						placeholder='Vendor'
						name='vendor'
						autoComplete='off'
						value={vendor}
						onChange={handleInputChange}
					/>
				</div>
				<div className='form-group'>
					<label>Date</label>
					<br />
					<DatePicker
						selected={startDate}
						onChange={date => onDateChange(date)}
						value={startDate}
						className={`form-control ${validDate === 1 && 'is-valid'} ${
							validDate === -1 && 'is-invalid'
						}`}
					/>
				</div>
				<div className='form-group'>
					<label>Status</label>
					<select
						className='form-control'
						name='status'
						value={status}
						onChange={handleSelectChange}>
						<option value={true}>online</option>
						<option value={false}>offline</option>
					</select>
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
