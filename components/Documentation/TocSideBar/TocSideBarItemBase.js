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
import { Box, ButtonBase } from "@mui/material"

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

const TocSideBarItemBase = React.forwardRef(
	(
		{
			active,
			additionalButton,
			children,
			handleOpen,
			onClick,
			showDetailsButton = true,
			published = true,
			sx,
			...otherProps

		},
		ref
	) => {
		return (
			<ButtonBase
				ref={ref}
				onClick={(e) => {
					e.stopPropagation()
					onClick()
				}}
				sx={{
					display: "block",
					width: "100%",
					textAlign: "left",
				}}
				{...otherProps}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						backgroundColor: active ? "#FFF" : "transparent",
						borderTop: "1px solid transparent",
						borderBottom: "1px solid transparent",
						borderColor: active ? "divider" : "transparent",
						color: active ? "primary.main" : "initial",
						":hover": {
							backgroundColor: "action.hover",
							color: "primary.main"
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
					<Box sx={{
						ml: 2,
						flexGrow: 1,
						...(published ? {} : { textDecoration: "underline silver dotted" })
					}}>
						{children}
					</Box>

					<Box sx={{
						display: "flex",
						alignItems: "center",
					}}>
						{additionalButton}
						{showDetailsButton && <DetailsRightButton handleOpen={handleOpen} />}
					</Box>
				</Box>
			</ButtonBase>
		)
	}
)

TocSideBarItemBase.displayName = "TocSideBarItemBase"

TocSideBarItemBase.propTypes = {
	active: PropTypes.bool,
	additionalButton: PropTypes.node,
	children: PropTypes.node,
	handleOpen: PropTypes.func,
	onClick: PropTypes.func,
	otherProps: PropTypes.any,
	showDetailsButton: PropTypes.bool,
	published: PropTypes.bool,
	sx: PropTypes.object
}

export default TocSideBarItemBase