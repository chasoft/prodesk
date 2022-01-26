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

import React from "react"

// MATERIAL-UI
import { InputBase } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import SearchIcon from "@mui/icons-material/Search"
import { useSelector } from "react-redux"
import { FRONT_PAGE_TABS_NAME } from "@layout/EntryLayout"
import { styled } from "@mui/system"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.action.hover,
	"&:hover": {
		backgroundColor: "white",
		border: "1px solid",
		borderColor: theme.palette.divider
	},
	marginLeft: 0,
	marginRight: theme.spacing(2),
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
		[theme.breakpoints.up("md")]: {
			width: "20ch",
			"&:focus": {
				width: "27ch",
			},
		},
		[theme.breakpoints.up("lg")]: {
			width: "25ch",
			"&:focus": {
				width: "35ch",
			},
		}
	},
}))

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function SearchBox() {
	const activeSettingTab = useSelector(s => s.uiSettingsState.activeSettingTab)

	//Only show this SearchBox when not at HOME!
	//(that means... user would be at Docs || troubleshoot page)
	if (activeSettingTab === FRONT_PAGE_TABS_NAME.HOME) { return null }

	return (
		<Search>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search…"
				inputProps={{ "aria-label": "search" }} />
		</Search>
	)
}

export default SearchBox