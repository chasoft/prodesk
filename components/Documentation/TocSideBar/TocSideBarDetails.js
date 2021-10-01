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
import { Box, Button } from "@mui/material"

//THIRD-PARTY
import { useSelector } from "react-redux"


//PROJECT IMPORT
import { getUiSettings } from "./../../../redux/selectors"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarDetails = ({ open, handleClose }) => {
	const { sideBarLeft } = useSelector(getUiSettings)
	return (
		<Box sx={{
			position: "fixed",
			zIndex: 150,
			display: open ? "flex" : "none",
			flexDirection: { flexDirection: "column" },
			alignItems: "stretch",
			left: `${sideBarLeft + 556}px`,
			minWidth: "385px",
			height: "100%",
			pl: 4,
			backgroundColor: "#FFF",
			borderRight: "1px solid",
			borderColor: "divider",
		}}>
			<Box sx={{ mt: 3 }}>

				<Button variant="outlined" color="primary" sx={{ p: 5 }}>Hello world</Button>

			</Box>
		</Box>
	)
}
TocSideBarDetails.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
}

export default TocSideBarDetails