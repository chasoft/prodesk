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
import TocSideBarAddNew from "./TocSideBarAddNew"
import { DOCS_ADD } from "../../../helpers/constants"
import { useSelector } from "react-redux"
import { getDocsCenter } from "../../../redux/selectors"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarSubCategory = ({ title, handleOpen, targetDocItem, children }) => {
	const { activeDocIdOfTocSideBarDetails } = useSelector(getDocsCenter)
	return (
		<>
			<TocSideBarItemBase
				onClick={handleOpen}
				handleOpen={handleOpen}
				additionalButton={
					<TocSideBarAddNew
						targetDocItem={targetDocItem}
						actions={[
							DOCS_ADD.DOC,
							DOCS_ADD.EXTERNAL,
							DOCS_ADD.SUB_CATEGORY,
							DOCS_ADD.CATEGORY,
						]}
					/>
				}
				showDetailsButton={false}
				sx={{ backgroundColor: (activeDocIdOfTocSideBarDetails === targetDocItem.docId) ? "action.hover" : "initial" }}
			>
				<Typography sx={{
					color: (activeDocIdOfTocSideBarDetails === targetDocItem.docId) ? "primary.main" : "grey.500",
					fontWeight: "bold",
					":hover": { color: "primary.main" }
				}}>
					{title}
				</Typography>
			</TocSideBarItemBase>

			<Box sx={{
				borderLeft: "1px solid transparent",
				borderColor: "divider",
				ml: 2
			}}>

				{children}

			</Box>
		</>
	)
}
TocSideBarSubCategory.propTypes = {
	title: PropTypes.string,
	onClick: PropTypes.func,
	handleOpen: PropTypes.func,
	targetDocItem: PropTypes.object,
	children: PropTypes.node
}

export default TocSideBarSubCategory