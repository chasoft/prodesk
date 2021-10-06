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
import DetailsRightButton from "./DetailsRightButton"
import TocSideBarAddNew from "./TocSideBarAddNew"
import { DOCS_ADD } from "../../../helpers/constants"

//PROJECT IMPORT


//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarCategory = ({ title, handleOpen, targetDocItem, children }) => (
	<Box sx={{
		display: "flex",
		flexDirection: "column",
		pb: 4,
	}}>
		<Box sx={{
			display: "flex",
			justifyContent: "space-between",
			"&>div": {
				"&>#popper-trigger": { visibility: "hidden" },
				"&>#detailsRightButton": { visibility: "hidden" },
			},
			":hover>p": { color: "#000" },
			":hover>div": {
				"&>#popper-trigger": { visibility: "visible" },
				"&>#detailsRightButton": { visibility: "visible" },
			},
		}}>
			<Typography sx={{
				px: 2, py: 1,
				ml: -2, mr: 0,
				textTransform: "uppercase",
				color: "grey.500",
				fontWeight: "bold",
			}}>
				{title}
			</Typography>

			<Box sx={{
				display: "flex",
				alignItems: "center",
			}}>
				<TocSideBarAddNew
					targetDocItem={targetDocItem}
					actions={[
						DOCS_ADD.CATEGORY,
						DOCS_ADD.SUB_CATEGORY,
						DOCS_ADD.DOC,
						DOCS_ADD.EXTERNAL,
					]}
				/>
				<DetailsRightButton handleOpen={handleOpen} />
			</Box>
		</Box>

		{children}
	</Box>
)
TocSideBarCategory.propTypes = {
	title: PropTypes.string,
	handleOpen: PropTypes.func,
	targetDocItem: PropTypes.object,
	children: PropTypes.node
}

export default TocSideBarCategory