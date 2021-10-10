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
import DetailsRightButton from "./DetailsRightButton"
import TocSideBarAddNew from "./TocSideBarAddNew"
import { DOCS_ADD } from "../../../helpers/constants"
import TocSideBarItemBase from "./TocSideBarItemBase"
import { getDocsCenter } from "../../../redux/selectors"
import { useSelector } from "react-redux"

//PROJECT IMPORT


//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarCategory = ({ title, handleOpen, targetDocItem, children }) => {
	const { activeDocIdOfTocSideBarDetails } = useSelector(getDocsCenter)
	return (
		<div>
			<TocSideBarItemBase
				onClick={handleOpen}
				handleOpen={handleOpen}
				additionalButton={
					<TocSideBarAddNew
						targetDocItem={targetDocItem}
						actions={[
							DOCS_ADD.CATEGORY,
							DOCS_ADD.SUB_CATEGORY,
							DOCS_ADD.DOC,
							DOCS_ADD.EXTERNAL,
						]}
					/>
				}
				showDetailsButton={false}
				sx={{ backgroundColor: (activeDocIdOfTocSideBarDetails === targetDocItem.docId) ? "action.hover" : "initial" }}
			>
				<Typography sx={{
					px: 2, py: 1,
					ml: -2, mr: 0,
					textTransform: "uppercase",
					color: (activeDocIdOfTocSideBarDetails === targetDocItem.docId) ? "primary.main" : "grey.500",
					fontWeight: "bold",
					":hover": { color: "primary.main" },
				}}>
					{title}
				</Typography>
			</TocSideBarItemBase>

			<Box sx={{
				borderLeft: "1px solid transparent",
				borderColor: "divider",
			}}>
				{children}
			</Box>
		</div>
	)
}
TocSideBarCategory.propTypes = {
	title: PropTypes.string,
	handleOpen: PropTypes.func,
	targetDocItem: PropTypes.object,
	children: PropTypes.node
}

export default TocSideBarCategory