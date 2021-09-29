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
import { Box, Typography } from "@mui/material"

//THIRD-PARTY
import DetailsRightButton from "./DetailsRightButton"

//PROJECT IMPORT


//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarKBCategory = ({ title, handleOpen, children }) => (
	<Box sx={{
		display: "flex",
		flexDirection: "column",
		pb: 4,
	}}>
		<Box sx={{
			display: "flex",
			justifyContent: "space-between",
			"& > #detailsRightButton": { visibility: "hidden", },
			":hover>#detailsRightButton": { visibility: "visible" }
		}}>
			<Typography sx={{
				px: 2, py: 1,
				ml: -2, mr: 0,
				textTransform: "uppercase",
				color: "grey.500",
				fontWeight: "bold",
			}}>
				{title}
			</Typography>
			<DetailsRightButton handleOpen={handleOpen} />
		</Box>

		{children}
	</Box>
)
TocSideBarKBCategory.propTypes = {
	title: PropTypes.string,
	handleOpen: PropTypes.func,
	children: PropTypes.node
}

export default TocSideBarKBCategory