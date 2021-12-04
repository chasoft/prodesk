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
import { useDrag, useDrop } from "react-dnd"
import { useSelector } from "react-redux"

//PROJECT IMPORT
import TocSideBarAddNew from "./TocSideBarAddNew"
import TocSideBarItemBase from "./TocSideBarItemBase"
import useAddNewDocumentationPopupMenu from "./useAddNewDocumentationPopupMenu"
import { useUpdateDocMutation } from "@redux/slices/firestoreApi"
import { isValidDnD, moveDocItem } from "@components/Documentation/TocSideBar"

import {
	getAuth,
	getDocsCenter
} from "@redux/selectors"

import {
	DOCS_ADD,
	DOC_STATUS,
	DOC_TYPE
} from "@helpers/constants"

//ASSETS
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function CollapseIconButton({ expanded, onClick }) {
	if (expanded) {
		return (
			<KeyboardArrowDownIcon
				sx={{
					mr: 1.5, p: 0.25,
					fill: (theme) => theme.palette.grey[500],
					cursor: "pointer",
					":hover": {
						fill: (theme) => theme.palette.primary.main
					},
				}}
				onClick={onClick} />
		)
	}

	return (
		<ChevronRightIcon
			sx={{
				mr: 1.5, p: 0.25,
				fill: (theme) => theme.palette.grey[500],
				cursor: "pointer",
				":hover": {
					fill: (theme) => theme.palette.primary.main
				}
			}}
			onClick={onClick} />
	)
}
CollapseIconButton.propTypes = {
	expanded: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TocSideBarCategory({ handleOpen, targetDocItem, children }) {
	const ref = useRef(null)
	const [updateDoc] = useUpdateDocMutation()
	const { currentUser } = useSelector(getAuth)

	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: [DOC_TYPE.DOC, DOC_TYPE.EXTERNAL, DOC_TYPE.CATEGORY],
		canDrop: (item) => isValidDnD(item, targetDocItem),
		drop: () => ({
			type: targetDocItem.type,
			position: targetDocItem.position,
			docId: targetDocItem.docId,
			categoryId: targetDocItem?.categoryId,
			subCategoryId: targetDocItem?.subCategoryId,
		}),
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}), [
		targetDocItem.type,
		targetDocItem.position,
		targetDocItem.docId,
		targetDocItem?.categoryId,
		targetDocItem?.subCategoryId,
	])

	const [{ isDragging }, drag] = useDrag(() => ({
		type: DOC_TYPE.CATEGORY,
		item: () => ({
			type: targetDocItem.type,
			position: targetDocItem.position,
			docId: targetDocItem.docId,
			categoryId: targetDocItem?.categoryId,
			subCategoryId: targetDocItem?.subCategoryId,
		}),
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
	}), [
		targetDocItem.type,
		targetDocItem.position,
		targetDocItem.docId,
		targetDocItem?.categoryId,
		targetDocItem?.subCategoryId,
	])

	const [expanded, setExpanded] = useState(true)
	const { activeDocIdOfTocSideBarDetails } = useSelector(getDocsCenter)

	const [
		AddNewPopupMenu, open, anchorRef, {
			handleToggle, handleClose
		}
	] = useAddNewDocumentationPopupMenu()

	drag(drop(ref))

	const isActive = canDrop && isOver
	const opacity = isDragging ? 0.4 : 1

	return (
		<div id={targetDocItem.slug} style={{ order: targetDocItem.position, marginTop: "30px" }}>
			<TocSideBarItemBase
				ref={ref}
				id={targetDocItem.slug + "-button"}
				onClick={() => {
					handleOpen()
				}}
				handleOpen={handleOpen}
				showDetailsButton={false}
				published={targetDocItem.status === DOC_STATUS.PUBLISHED}
				additionalButton={<>
					<TocSideBarAddNew
						ref={anchorRef}
						handleToggle={handleToggle} />
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
						]} />
					<CollapseIconButton
						expanded={expanded}
						onClick={(e) => { e.stopPropagation(); setExpanded(p => !p) }} />
				</>}
				sx={{
					border: "2px solid transparent",
					backgroundColor: (activeDocIdOfTocSideBarDetails === targetDocItem.docId)
						? "action.hover"
						: "initial",
					opacity,
					...(isActive ? { backgroundColor: "primary.light", color: "primary.contrastText" } : {})
				}}
			>
				<Typography sx={{
					px: 2, py: 1,
					ml: -2, mr: 0,
					textTransform: "uppercase",
					color: isActive
						? "primary.contrastText"
						: (activeDocIdOfTocSideBarDetails === targetDocItem.docId)
							? "primary.main"
							: "grey.500",
					fontWeight: "bold",
					":hover": { color: "primary.main" },
				}}>
					{targetDocItem.emoji} {targetDocItem.title}
				</Typography>
			</TocSideBarItemBase>

			<Box id={targetDocItem.slug + "-children"} sx={{
				borderLeft: "2px solid transparent",
				borderColor: "divider",
			}}>
				<Collapse in={expanded}>
					<div style={{ display: "flex", flexDirection: "column", }}>
						{children}
					</div>
				</Collapse>
			</Box>
		</div>
	)
}
TocSideBarCategory.propTypes = {
	handleOpen: PropTypes.func,
	targetDocItem: PropTypes.object,
	children: PropTypes.node
}

export default TocSideBarCategory