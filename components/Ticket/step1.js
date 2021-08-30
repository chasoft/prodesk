import PropTypes from "prop-types"
import React from "react"
import { TextField } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { getNewTicket } from "./../../redux/selectors"
import { setSubject } from "./../../redux/slices/newTicket"

const NewTicketStep1 = ({ callback }) => {
	const dispatch = useDispatch()
	const { newTicket } = useSelector(getNewTicket)
	const { subject, isReadyNextStep } = newTicket

	const handleSubmit = (e) => {
		e.preventDefault()
		if (isReadyNextStep) callback()
	}

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				id="outlined-helperText"
				label="My question"
				placeholder="Subject Title Goes Here (Please put long-form question in Describe &amp; post section below)"
				helperText="10 characters required"
				variant="outlined"
				value={subject}
				onChange={(e) => {
					dispatch(setSubject(e.target.value))
				}}
				fullWidth
				InputLabelProps={{ shrink: true }}
				autoFocus={true}
			/>
		</form>
	)
}
NewTicketStep1.propTypes = { callback: PropTypes.func }


export default NewTicketStep1