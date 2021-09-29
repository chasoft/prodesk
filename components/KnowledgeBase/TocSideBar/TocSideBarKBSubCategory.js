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
import { Box } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import TocSideBarItemBase from "./TocSideBarItemBase"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarKBSubCategory = ({ title, active, onClick, handleOpen, children }) => {
	return (
		<>
			<TocSideBarItemBase
				selected={active}
				onClick={onClick}
				handleOpen={handleOpen}
			>
				{title}
			</TocSideBarItemBase>

			<Box sx={{
				borderLeft: "1px solid transparent",
				borderColor: "divider",
				pl: 2
			}}>
				{children}
			</Box>
		</>
	)
}
TocSideBarKBSubCategory.propTypes = {
	title: PropTypes.string,
	active: PropTypes.bool,
	onClick: PropTypes.func,
	handleOpen: PropTypes.func,
	children: PropTypes.node
}

export default TocSideBarKBSubCategory