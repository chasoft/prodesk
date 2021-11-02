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

import React, { useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function ConfirmDialogYesNo({ title, open, setOpen, setAgreed, children }) {

	const handleCancel = () => {
		setOpen(false)
		setAgreed(false)
	}

	const handleOk = () => {
		setOpen(false)
		setAgreed(true)
	}

	return (
		<Dialog maxWidth="xs" open={open}>
			<DialogTitle sx={{ fontSize: "1.5em", fontWeight: 500 }}>{title}</DialogTitle>
			<DialogContent>
				{children}
			</DialogContent>
			<DialogActions sx={{ mr: 2 }}>
				<Button onClick={handleOk}>Ok</Button>
				<Button onClick={handleCancel}>Cancel</Button>
			</DialogActions>
		</Dialog>
	)
}
ConfirmDialogYesNo.propTypes = {
	title: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	setAgreed: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

//This is used for ask for YES or NO (no input request to user)
//If you want to request any input, please use `useConfirmDialog` instead

const useConfirmDialogYesNo = () => {
	const [open, setOpen] = useState(false)
	const [agreed, setAgreed] = useState(false)

	return { ConfirmDialogYesNo, open, setOpen, agreed, setAgreed }
}

export default useConfirmDialogYesNo