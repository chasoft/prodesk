/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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

//PROJECT IMPORT

import React from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { useTheme } from "@mui/styles"
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function TicketDepartmentDetailsDialog({ department, children }) {
	// const classes = useStyles()
	const [open, setOpen] = React.useState(false)
	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down("lg"))

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
	return (
		<div>
			<Box onClick={handleClickOpen}>{children}</Box>
			<Dialog
				open={open}
				onClose={handleClose}
				fullScreen={fullScreen}
			>
				<DialogTitle>{"Department Details"}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Let Google help apps determine location. This means sending anonymous location data to
						Google, even when no apps are running.{department.note}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Disagree
					</Button>
					<Button onClick={handleClose} color="primary">
						Agree
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
TicketDepartmentDetailsDialog.propTypes = {
	department: PropTypes.node,
	children: PropTypes.node
}

export default TicketDepartmentDetailsDialog