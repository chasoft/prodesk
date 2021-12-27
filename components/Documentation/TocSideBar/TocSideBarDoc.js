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

import React, { useRef } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Typography } from "@mui/material"

//THIRD-PARTY
import { isEqual } from "lodash"
import { useSelector } from "react-redux"
import { useDrag, useDrop } from "react-dnd"

//PROJECT IMPORT
import TocSideBarItemBase from "./TocSideBarItemBase"
import { isValidDnD, moveDocItem } from "@components/Documentation/TocSideBar"
import { useUpdateDocMutation } from "@redux/slices/firestoreApi"

import {
	DOC_STATUS,
	DOC_TYPE
} from "@helpers/constants"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TocSideBarDoc({ active, onClick, handleOpen, targetDocItem, children }) {
	const ref = useRef(null)
	const [updateDoc] = useUpdateDocMutation()
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)

	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: [DOC_TYPE.DOC, DOC_TYPE.EXTERNAL],
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
		})
	}), [
		targetDocItem.type,
		targetDocItem.position,
		targetDocItem.docId,
		targetDocItem?.categoryId,
		targetDocItem?.subCategoryId,
	])

	const [{ isDragging }, drag] = useDrag(() => ({
		type: DOC_TYPE.DOC,
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

	const activeDocIdOfTocSideBarDetails = useSelector(s => s.docsCenterState.activeDocIdOfTocSideBarDetails)

	drag(drop(ref))
	const isActive = canDrop && isOver
	const isNotActive = !canDrop && isOver
	const opacity = isDragging ? 0.4 : 1

	return (
		<div style={{ order: targetDocItem.position }}>
			<TocSideBarItemBase
				ref={ref}
				active={active}
				onClick={onClick}
				handleOpen={handleOpen}
				published={targetDocItem.status === DOC_STATUS.PUBLISHED}
				sx={{
					border: "2px solid transparent",
					color: (activeDocIdOfTocSideBarDetails === targetDocItem.docId || active)
						? "primary.main"
						: "initial",
					opacity,
					...(isActive ? { backgroundColor: "primary.light", color: "primary.contrastText" } : {}),
					...(isNotActive ? { backgroundColor: "error.light", color: "error.contrastText" } : {}),
				}}
			>
				<Typography> {targetDocItem.emoji} {children}</Typography>
			</TocSideBarItemBase>
		</div>
	)
}
TocSideBarDoc.propTypes = {
	active: PropTypes.bool,
	onClick: PropTypes.func,
	handleOpen: PropTypes.func,
	targetDocItem: PropTypes.object,
	children: PropTypes.node
}

export default TocSideBarDoc