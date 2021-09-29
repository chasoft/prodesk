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
import { Box, ButtonBase, ClickAwayListener, IconButton, Typography } from "@mui/material"

//THIRD-PARTY


//PROJECT IMPORT


//ASSETS
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarDetails = ({ open, handleClose, dataSource }) => {
	return (
		<Popper

		
		<ClickAwayListener onClickAway={() => {
			console.log("ClickAway activated")
			handleClose()
		}}>
			<Box sx={{
				position: "absolute",
				left: "301px",
				height: "100%",
				mb: 2,
				flexDirection: { flexDirection: "column" },
				minWidth: "385px",
				pl: 4,
				borderRight: "1px solid transparent",
				borderColor: "divider",
				backgroundColor: "#FFF",
				zIndex: 170,
				display: open ? "flex" : "none"
			}}>

				<Box sx={{ p: 5 }}>hello</Box>

			</Box>
		</ClickAwayListener>
	)
}
TocSideBarDetails.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
	dataSource: PropTypes.array
}

export default TocSideBarDetails