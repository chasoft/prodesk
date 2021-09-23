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

//PROJECT IMPORT

import React from "react"
import PropTypes from "prop-types"

import makeStyles from "@mui/styles/makeStyles"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from "@mui/material"
import { useTheme } from "@mui/styles"

//THIRD-PARTY
// import { getUiSettings } from "../../redux/selectors"
// import { useSelector, useDispatch } from "react-redux"
// import { setRedirect } from "../../redux/slices/redirect"

//PROJECT IMPORT


//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

// const useStyles = makeStyles({
// 	root: {
// 		flexGrow: 1,
// 		marginTop: "1rem",
// 		marginBottom: "2rem"
// 	},
// })

const TicketDepartmentDetailsDialog = ({ department, children }) => {
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
			<div onClick={handleClickOpen}>{children}</div>
			<Dialog
				open={open}
				onClose={handleClose}
				fullScreen={fullScreen}
			>
				<DialogTitle>{"Department Details"}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Let Google help apps determine location. This means sending anonymous location data to
						Google, even when no apps are running. {department.note}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} color="primary">
						Disagree
					</Button>
					<Button onClick={handleClose} color="primary" autoFocus>
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