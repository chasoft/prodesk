import dynamic from "next/dynamic"
import React from "react"
import { Typography } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import Skeleton from "@material-ui/lab/Skeleton"
import { getNewTicket } from "./../../redux/selectors"
import { setMessage } from "./../../redux/slices/newTicket"

const TextEditor = dynamic(() => import("./../TextEditor"), {
	ssr: false,
	loading: function pleaseWait() { return <Skeleton variant="rect" width="100%" height={85} /> }
})

const NewTicketStep3 = () => {
	const dispatch = useDispatch()
	const { newTicket } = useSelector(getNewTicket)
	const { message } = newTicket

	return <form onSubmit={(e) => { e.preventDefault() }}>
		<TextEditor data={message} handleData={(data) => { dispatch(setMessage(data)) }} />
		<Typography variant="caption">Please describe your issue in detail.</Typography>
	</form>
}

export default NewTicketStep3