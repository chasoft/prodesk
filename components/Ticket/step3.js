/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.0     ║ *
 * ╠═══════════════════════════════════════════════════════════════════╣ *
 * ║                                                                   ║ *
 * ║   @author     A. Cao <cao@anh.pw>                                 ║ *
 * ║   @copyright  Chasoft Labs © 2021                                 ║ *
 * ║   @link       https://chasoft.net                                 ║ *
 * ║                                                                   ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║ @license This product is licensed and sold at CodeCanyon.net      ║ *
 * ║ If you have downloaded this from another site or received it from ║ *
 * ║ someone else than me, then you are engaged in an illegal activity.║ *
 * ║ You must delete this software immediately or buy a proper license ║ *
 * ║ from http://codecanyon.net/user/chasoft/portfolio?ref=chasoft.    ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║      THANK YOU AND DON'T HESITATE TO CONTACT ME FOR ANYTHING      ║ *
 * ╚═══════════════════════════════════════════════════════════════════╝ *
 ************************************************************************/

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React, { useCallback } from "react"

// MATERIAL-UI
import { Box } from "@mui/material"

//THIRD-PARTY
import { useSelector, useDispatch } from "react-redux"

//PROJECT IMPORT
import TextEditor from "./../common/TextEditor"
import { getNewTicket } from "./../../redux/selectors"
import { setMessage } from "./../../redux/slices/newTicket"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const NewTicketStep3 = () => {
	const dispatch = useDispatch()
	const { newTicket } = useSelector(getNewTicket)
	const { message } = newTicket

	const getEditorData = useCallback((data) => {
		dispatch(setMessage(data))
	}, [dispatch])

	return (
		<Box sx={{
			pl: 4, py: 1, my: 0,
			border: "1px solid #FAFAFA",
			minWidth: 120
		}}>
			<TextEditor
				defaultValue={message}
				pullEditorData={getEditorData}
				placeholder="Please describe your issue in details as much as possible."
			/>
		</Box>
	)
}

export default NewTicketStep3