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


//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const TocSideBarKBCategory = ({ children }) => (
	<Box sx={{
		padding: 2,
		color: (theme) => theme.palette.grey[600],
	}}>
		<Typography variant="caption">
			{children}
		</Typography>
	</Box>
)
TocSideBarKBCategory.propTypes = { children: PropTypes.node }

const TocSideBarKBSubCategory = ({ selected, icon, onClick, children }) => {
	return (
		<ButtonBase sx={{ display: "block", width: "100%", textAlign: "left" }}>
			<Box
				onClick={onClick}
				sx={{
					padding: (theme) => theme.spacing(1, 3, 1),
					display: "flex",
					alignItems: "center",
					"&:hover": {
						backgroundColor: selected ? "#e8f0fe" : "action.hover",
						cursor: "pointer",
					},
					bgcolor: selected ? "#e8f0fe" : "",
					color: selected ? "#1967d2" : ""
				}}
			>
				{icon}
				<Typography variant="button" sx={{ ml: 2 }}>
					{children}
				</Typography>
			</Box>
		</ButtonBase>
	)
}
TocSideBarKBSubCategory.propTypes = {
	selected: PropTypes.bool,
	icon: PropTypes.node,
	onClick: PropTypes.func,
	children: PropTypes.node
}

const TocSideBarKBArticle = ({ selected, icon, onClick, children }) => {
	return (
		<ButtonBase sx={{ display: "block", width: "100%", textAlign: "left" }}>
			<Box
				onClick={onClick}
				sx={{
					padding: (theme) => theme.spacing(1, 3, 1),
					display: "flex",
					alignItems: "center",
					"&:hover": {
						backgroundColor: selected ? "#e8f0fe" : "action.hover",
						cursor: "pointer",
					},
					bgcolor: selected ? "#e8f0fe" : "",
					color: selected ? "#1967d2" : ""
				}}
			>
				{icon}
				<Typography variant="button" sx={{ ml: 2 }}>
					{children}
				</Typography>
			</Box>
		</ButtonBase>
	)
}
TocSideBarKBArticle.propTypes = {
	selected: PropTypes.bool,
	icon: PropTypes.node,
	onClick: PropTypes.func,
	children: PropTypes.node
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBar = ({ dataSource }) => {
	return (
		<Box sx={{
			display: { xs: "none", md: "flex" },
			minWidth: "300px",
			backgroundColor: "#FAFAFA",
			borderTopLeftRadius: "0.5rem",
			borderBottomLeftRadius: "0.5rem",
			padding: (theme) => theme.spacing(1, 0, 1),
			// display: { xs: "none", sm: "initial" },
			borderTopRightRadius: { xs: "0.5rem", md: 0 },
			borderBottomRightRadius: { xs: "0.5rem", md: 0 },
		}}>

			hello
			{/* {dataSource.map((item) => (

				TocSideBarKBCategory

				))} */}





		</Box>
	)
}
TocSideBar.propTypes = { dataSource: PropTypes.array }

export default TocSideBar