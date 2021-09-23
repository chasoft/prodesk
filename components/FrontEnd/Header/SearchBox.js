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

// MATERIAL-UI
import { alpha } from "@mui/material/styles"
import { Box, InputBase } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import SearchIcon from "@mui/icons-material/Search"
import { useSelector } from "react-redux"
import { getUiSettings } from "../../../redux/selectors"
import { FRONT_PAGE_TABS_NAME } from "../../../layout/EntryLayout"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const SearchBox = () => {
	const { activeSettingTab } = useSelector(getUiSettings)

	//Only show this SearchBox when not at HOME!
	//(that means... user would be at Docs || troubleshoot page)
	if (activeSettingTab === FRONT_PAGE_TABS_NAME.HOME) {
		return null
	}

	return (
		<Box
			sx={{
				position: "relative",
				borderRadius: (theme) => theme.shape.borderRadius,
				backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
				"&:hover": {
					backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
				},
				mr: 2, ml: { xs: 0, sm: 3 },
				width: { xs: "100%", sm: "auto" },
			}}
		>
			<Box
				sx={{
					padding: (theme) => theme.spacing(0, 2),
					height: "100%",
					position: "absolute",
					pointerEvents: "none",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<SearchIcon />
			</Box>
			<InputBase
				placeholder="Search…"
				sx={{
					padding: 1,
					paddingLeft: "3rem",
					transition: (theme) => theme.transitions.create("width"),
					width: { xs: "100%", md: "20ch" },
				}}
				inputProps={{ "aria-label": "search" }}
			/>
		</Box>
	)
}

export default SearchBox