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

import React from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { TextField } from "@mui/material"

//THIRD-PARTY
import { useSelector, useDispatch } from "react-redux"

//PROJECT IMPORT
import { setSubject } from "@redux/slices/newTicket"
import { getNewTicket } from "@redux/selectors"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function NewTicketStep1({ goNextStep }) {
	const dispatch = useDispatch()
	const { subject } = useSelector(getNewTicket)

	return (
		<form onSubmit={(e) => {
			e.preventDefault()
			if (subject.length > 10)
				goNextStep()
		}}>
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
				InputLabelProps={{ shrink: true }} />
		</form>
	)
}
NewTicketStep1.propTypes = { goNextStep: PropTypes.func }


export default NewTicketStep1