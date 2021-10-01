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

const TocSideBarItemBase = React.forwardRef(({ active, onClick, handleOpen, sx, additionalButton, children, }, ref) => {
	return (
		<ButtonBase
			ref={ref}
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
						backgroundColor: "action.hover",
						color: "#000"
					},
					"&>div": {
						"&>#popper-trigger": { visibility: "hidden" },
						"&>#detailsRightButton": { visibility: "hidden" },
					},
					":hover>div": {
						"&>#popper-trigger": { visibility: "visible" },
						"&>#detailsRightButton": { visibility: "visible" },
					},
					...sx
				}}
			>
				<Typography sx={{ ml: 2 }}>
					{children}
				</Typography>

				<Box sx={{
					display: "flex",
					alignItems: "center",
				}}>
					{additionalButton}
					<DetailsRightButton handleOpen={handleOpen} />
				</Box>
			</Box>
		</ButtonBase>
	)
})

TocSideBarItemBase.displayName = "TocSideBarItemBase"

TocSideBarItemBase.propTypes = {
	active: PropTypes.bool,
	onClick: PropTypes.func,
	handleOpen: PropTypes.func,
	sx: PropTypes.object,
	additionalButton: PropTypes.node,
	children: PropTypes.node,
	otherProps: PropTypes.any
}

export default TocSideBarItemBase