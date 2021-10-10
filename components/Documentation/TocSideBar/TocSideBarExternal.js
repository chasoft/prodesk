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

//PROJECT IMPORT
import TocSideBarItemBase from "./TocSideBarItemBase"

//ASSETS
import LaunchIcon from "@mui/icons-material/Launch"
import { useSelector } from "react-redux"
import { getDocsCenter } from "../../../redux/selectors"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarExternal = ({ url, handleOpen, targetDocItem, children }) => {
	const { activeDocIdOfTocSideBarDetails } = useSelector(getDocsCenter)
	return (
		<TocSideBarItemBase
			onClick={() => window.open(url, "_blank")}
			handleOpen={handleOpen}
			sx={{
				backgroundColor: (activeDocIdOfTocSideBarDetails === targetDocItem.docId) ? "action.hover" : "transparent",
			}}
		>
			<Box sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				flexGrow: 2,
				color: (activeDocIdOfTocSideBarDetails === targetDocItem.docId) ? "primary.main" : "initial",
				":hover": {
					"&>svg": {
						color: "grey.700"
					}
				}
			}}>
				<Typography>{children}</Typography>
				<LaunchIcon sx={{
					fontSize: "1.2rem", color: "grey.500", mx: 1
				}} />
			</Box>
		</TocSideBarItemBase>
	)
}
TocSideBarExternal.propTypes = {
	url: PropTypes.string,
	handleOpen: PropTypes.func,
	targetDocItem: PropTypes.object,
	children: PropTypes.node
}

export default TocSideBarExternal