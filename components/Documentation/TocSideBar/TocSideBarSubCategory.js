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

import React, { useRef, useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Collapse, Typography } from "@mui/material"

//THIRD-PARTY
import { useSelector } from "react-redux"
import { useDrag, useDrop } from "react-dnd"

//PROJECT IMPORT
import TocSideBarAddNew from "./TocSideBarAddNew"
import TocSideBarItemBase from "./TocSideBarItemBase"

import { moveDocItem } from "@components/Documentation/TocSideBar"
import { CollapseIconButton } from "@components/Documentation/TocSideBar/TocSideBarCategory"
import useAddNewDocumentationPopupMenu from "@components/Documentation/TocSideBar/useAddNewDocumentationPopupMenu"

import { useUpdateDocMutation } from "@redux/slices/firestoreApi"

import {
	getAuth,
	getDocsCenter
} from "@redux/selectors"

import {
	DOCS_ADD,
	DOC_TYPE
} from "@helpers/constants"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarSubCategory = ({ title, handleOpen, targetDocItem, children }) => {
	const ref = useRef(null)
	const [updateDoc] = useUpdateDocMutation()
	const { currentUser } = useSelector(getAuth)

	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: [DOC_TYPE.DOC, DOC_TYPE.EXTERNAL, DOC_TYPE.SUBCATEGORY],
		drop: () => targetDocItem,
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}))

	const [{ isDragging }, drag] = useDrag(() => ({
		type: DOC_TYPE.SUBCATEGORY,
		item: targetDocItem,
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult()
			if (item && dropResult) {
				//item => sourceItem
				//dropResult => targetItem
				moveDocItem(item, dropResult, updateDoc, currentUser.username)
			}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			handlerId: monitor.getHandlerId(),
		}),
	}))

	const [expanded, setExpanded] = useState(true)
	const { activeDocIdOfTocSideBarDetails } = useSelector(getDocsCenter)

	const [
		AddNewPopupMenu,
		open,
		anchorRef,
		{
			handleToggle,
			handleClose
		}
	] = useAddNewDocumentationPopupMenu()

	drag(drop(ref))
	const isActive = canDrop && isOver
	const opacity = isDragging ? 0.4 : 1

	return (
		<div id={targetDocItem.slug}>
			<TocSideBarItemBase
				ref={ref}
				id={targetDocItem.slug + "-button"}
				onClick={() => {
					setExpanded(p => !p)
					handleOpen()
				}}
				handleOpen={handleOpen}
				showDetailsButton={false}
				additionalButton={
					<>
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
								DOCS_ADD.DOC,
								DOCS_ADD.EXTERNAL,
								DOCS_ADD.SUB_CATEGORY,
								DOCS_ADD.CATEGORY,
							]}
						/>
						<CollapseIconButton
							expanded={expanded}
							onClick={(e) => { e.stopPropagation(); setExpanded(p => !p) }}
						/>
					</>
				}
				sx={{
					border: "2px solid transparent",
					backgroundColor:
						(activeDocIdOfTocSideBarDetails === targetDocItem.docId)
							? "action.hover"
							: "initial",
					opacity,
					...(isActive ? { border: "2px solid #1976d2", borderTop: "2px solid #004aab" } : {})
				}}
			>
				<Typography sx={{
					color: (activeDocIdOfTocSideBarDetails === targetDocItem.docId) ? "primary.main" : "grey.500",
					fontWeight: "bold",
					":hover": { color: "primary.main" }
				}}>
					{title}
				</Typography>
			</TocSideBarItemBase>

			<Box id={targetDocItem.slug + "-children"} sx={{
				borderLeft: "1px solid transparent",
				borderColor: "divider",
				ml: 2
			}}>
				<Collapse in={expanded}>
					{children}
				</Collapse>
			</Box>
		</div>
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