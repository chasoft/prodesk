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
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"

//THIRD-PARTY
import { isMobile } from "react-device-detect"

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ConfirmDialog({
	title,
	okButtonText,
	color,
	open,
	setOpen,
	callback,
	maxWidth,
	children
}) {

	const handleCancel = () => {
		setOpen(false)
		callback(false)
	}

	const handleOk = () => {
		setOpen(false)
		callback(true)
	}

	return (
		<Dialog
			maxWidth={maxWidth ?? "xs"}
			open={open}
			fullScreen={isMobile}
		>

			<DialogTitle sx={{ fontSize: "1.5em", fontWeight: 500 }}>
				{title ?? "Confirmation"}
			</DialogTitle>

			<DialogContent>
				{children}
			</DialogContent>

			<DialogActions sx={{ mr: 2, mb: 2 }}>
				<Button onClick={handleCancel} sx={{ mr: 1, px: 2 }}>
					Cancel
				</Button>
				<Button
					onClick={handleOk}
					variant="contained"
					color={color ?? "primary"}
					sx={{ px: 2 }}
				>
					{okButtonText ?? "OK"}
				</Button>
			</DialogActions>

		</Dialog >
	)
}
ConfirmDialog.propTypes = {
	title: PropTypes.string,
	okButtonText: PropTypes.string,
	color: PropTypes.string,
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	callback: PropTypes.func.isRequired,
	maxWidth: PropTypes.string,
	fullScreen: PropTypes.bool,
	children: PropTypes.node.isRequired,
}

export default ConfirmDialog