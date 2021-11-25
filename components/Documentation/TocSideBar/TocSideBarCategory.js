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
import { useSelector } from "react-redux"

//PROJECT IMPORT
import TocSideBarAddNew from "./TocSideBarAddNew"
import TocSideBarItemBase from "./TocSideBarItemBase"
import useAddNewDocumentationPopupMenu from "./useAddNewDocumentationPopupMenu"

import { DOCS_ADD } from "@helpers/constants"
import { getDocsCenter } from "@redux/selectors"

//ASSETS
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const CollapseIconButton = ({ expanded, onClick }) => {
	if (expanded) {
		return (
			<ArrowDropDownIcon
				id="detailsRightButton"
				sx={{
					fill: (theme) => theme.palette.grey[500],
					cursor: "pointer",
					":hover": {
						fill: (theme) => theme.palette.primary.main
					}
				}}
				onClick={onClick}
			/>
		)
	}

	return (
		<ArrowDropUpIcon
			id="detailsRightButton"
			sx={{
				fill: (theme) => theme.palette.grey[500],
				cursor: "pointer",
				":hover": {
					fill: (theme) => theme.palette.primary.main
				}
			}}
			onClick={onClick}
		/>
	)
}
CollapseIconButton.propTypes = {
	expanded: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarCategory = ({ title, handleOpen, targetDocItem, children }) => {
	const [expanded, setExpanded] = useState(false)

	const [
		AddNewPopupMenu,
		open,
		anchorRef,
		{
			handleToggle,
			handleClose
		}
	] = useAddNewDocumentationPopupMenu()

	const { activeDocIdOfTocSideBarDetails } = useSelector(getDocsCenter)

	return (
		<div id={targetDocItem.slug}>
			<TocSideBarItemBase
				id={targetDocItem.slug + "-button"}
				onClick={() => {
					setExpanded(p => !p)
					handleOpen()
				}}
				handleOpen={handleOpen}
				showDetailsButton={false}
				additionalButton={
					<>
						<CollapseIconButton
							expanded={expanded}
							onClick={(e) => { e.stopPropagation(); setExpanded(p => !p) }}
						/>
						<TocSideBarAddNew
							ref={anchorRef}
							handleToggle={handleToggle}
						/>
						<AddNewPopupMenu
							open={open}
							anchorRef={anchorRef}
							handleClose={handleClose}
							targetDocItem={targetDocItem}
							placement="bottom-start"
							actions={[
								DOCS_ADD.CATEGORY,
								DOCS_ADD.SUB_CATEGORY,
								DOCS_ADD.DOC,
								DOCS_ADD.EXTERNAL,
							]}
						/>
					</>
				}
				sx={{
					backgroundColor:
						(activeDocIdOfTocSideBarDetails === targetDocItem.docId)
							? "action.hover"
							: "initial"
				}}
			>
				<Typography sx={{
					px: 2, py: 1,
					ml: -2, mr: 0,
					textTransform: "uppercase",
					color:
						(activeDocIdOfTocSideBarDetails === targetDocItem.docId)
							? "primary.main"
							: "grey.500",
					fontWeight: "bold",
					":hover": { color: "primary.main" },
				}}>
					{title}
				</Typography>
			</TocSideBarItemBase>

			<Box id={targetDocItem.slug + "-children"} sx={{
				borderLeft: "1px solid transparent",
				borderColor: "divider",
			}}>
				<Collapse in={expanded}>
					{children}
				</Collapse>
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