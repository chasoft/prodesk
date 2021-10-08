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

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarSubCategory = ({ title, active, handleOpen, targetDocItem, children }) => {
	return (
		<>
			<TocSideBarItemBase
				selected={active}
				onClick={handleOpen /* SubCategory, this action is the same as handleOpen */}
				handleOpen={handleOpen}
				additionalButton={
					<TocSideBarAddNew
						targetDocItem={targetDocItem}
						actions={[
							DOCS_ADD.CATEGORY,
							DOCS_ADD.DOC,
							DOCS_ADD.EXTERNAL,
						]}
					/>
				}
			>
				<Typography sx={{ color: "grey.500", fontWeight: "bold" }}>
					{title}
				</Typography>
			</TocSideBarItemBase>

			<Box sx={{
				borderLeft: "1px solid transparent",
				borderColor: "divider",
				pl: 2
			}}>

				{children}

			</Box>
		</>
	)
}
TocSideBarSubCategory.propTypes = {
	title: PropTypes.string,
	active: PropTypes.bool,
	onClick: PropTypes.func,
	handleOpen: PropTypes.func,
	targetDocItem: PropTypes.object,
	children: PropTypes.node
}

export default TocSideBarSubCategory