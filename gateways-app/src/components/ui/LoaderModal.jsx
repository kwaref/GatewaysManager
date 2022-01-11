import React from 'react'
import Modal from 'react-modal'
import { useSelector } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import { Dots } from 'react-activity'

const customStyles = {
	content: {
		border: '0',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
}
Modal.setAppElement('#root')

export const LoaderModal = () => {
	const { isLoading } = useSelector(state => state.ui)

	return (
		<Modal isOpen={isLoading} style={customStyles}>
			<Dots />
		</Modal>
	)
}
