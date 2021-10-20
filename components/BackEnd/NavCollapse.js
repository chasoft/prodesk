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

import React, { useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Collapse, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const NavCollapse = ({ title, description, children, isExpanded = false }) => {
	const [expanded, setExpanded] = useState(isExpanded)
	return (
		<Box
			sx={{
				borderBottom: "1px solid #2A4257",
				...(expanded && {
					backgroundColor: "#47628233"
				})
			}}
		>

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					cursor: "pointer",
					padding: (theme) => theme.spacing(3, 1, 3, 3),
					"&:hover": {
						backgroundColor: (theme) => theme.navbar.hoverColor
					},
					"& .rightIcon .MuiSvgIcon-root": {
						visibility: "hidden"
					},
					"&:hover .rightIcon .MuiSvgIcon-root": {
						visibility: "visible",
						color: "#669df6"
					},
					width: "256px",
				}}
				onClick={(e) => {
					e.stopPropagation()
					setExpanded(p => !p)
				}}
			>
				<div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
					<div style={{ display: "flex", alignItems: "center" }}>
						<Typography
							sx={{
								fontFamily: "\"Google Sans\", Roboto, sans-serif",
								fontSize: "1rem",
								color: "#fff",
								flexGrow: 1,
								...(expanded && {/* currently, empty styled */ })
							}}
						>
							{title}
						</Typography>
						<div className="rightIcon">
							{expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
						</div>
					</div>
					<Typography
						sx={{
							fontSize: "0.75rem",
							color: "#ffffff80",
							width: "90%",
							display: expanded ? "none" : "block"
						}}
						variant="caption"
						noWrap
					>{description}</Typography>
				</div>
			</Box>

			<Collapse in={expanded} timeout="auto" style={{ color: "#ffffffcc" }} unmountOnExit>
				{children}
			</Collapse>
		</Box>
	)
}
NavCollapse.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	isExpanded: PropTypes.bool,
	children: PropTypes.any,
}

export default NavCollapse