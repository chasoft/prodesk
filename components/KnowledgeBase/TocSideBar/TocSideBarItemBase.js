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
import { Box, ButtonBase, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import DetailsRightButton from "./DetailsRightButton"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarItemBase = ({ active, onClick, handleOpen, sx, children }) => {
	return (
		<ButtonBase
			onClick={() => { onClick() }}
			sx={{
				display: "block", width: "100%", textAlign: "left",
			}}
		>
			<Box
				sx={{
					ml: -2,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					backgroundColor: active ? "#FFF" : "transparent",
					borderTop: "1px solid transparent",
					borderBottom: "1px solid transparent",
					borderColor: active ? "divider" : "transparent",
					":hover": {
						backgroundColor: "action.hover"
					},
					"& > #detailsRightButton": { visibility: "hidden", },
					":hover>#detailsRightButton": { visibility: "visible" },
					...sx
				}}
			>
				<Typography sx={{ ml: 2 }}>
					{children}
				</Typography>

				<DetailsRightButton handleOpen={handleOpen} />
			</Box>
		</ButtonBase>
	)
}
TocSideBarItemBase.propTypes = {
	active: PropTypes.bool,
	onClick: PropTypes.func,
	handleOpen: PropTypes.func,
	sx: PropTypes.object,
	children: PropTypes.node
}

export default TocSideBarItemBase