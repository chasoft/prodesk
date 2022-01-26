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

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import PropTypes from "prop-types"
import React, { forwardRef } from "react"

// MATERIAL-UI
// import { Box, ButtonBase, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import AddIcon from "@mui/icons-material/Add"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarAddNew = forwardRef(({ handleToggle }, ref) => {
	return (
		<AddIcon
			ref={ref}
			id="detailsRightButton" size="small"
			fontSize="small"
			sx={{
				fill: (theme) => theme.palette.grey[500],
				my: 0.5, mr: 1,
				cursor: "pointer",
				":hover": {
					fill: (theme) => theme.palette.primary.main
				}
			}}
			onClick={(e) => {
				e.stopPropagation()
				handleToggle()
			}}
		/>
	)
})

TocSideBarAddNew.displayName = "TocSideBarAddNew"

TocSideBarAddNew.propTypes = {
	handleToggle: PropTypes.func,
}

export default TocSideBarAddNew