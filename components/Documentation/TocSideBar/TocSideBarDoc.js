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

import React, { useCallback, useRef } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Typography } from "@mui/material"

//THIRD-PARTY
import { isEqual } from "lodash"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"
import { useDrag, useDrop } from "react-dnd"

//PROJECT IMPORT
import TocSideBarItemBase from "./TocSideBarItemBase"
import { isValidDnD, moveDocItem } from "@components/Documentation/TocSideBar"
import { useUpdateDocMutation } from "@redux/slices/firestoreApi"

import {
	setActiveDocId,
	setActiveDocIdOfTocSideBarDetails
} from "@redux/slices/docsCenter"

import { setShowTocSideBarDetails } from "@redux/slices/uiSettings"

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

function TocSideBarDoc({ targetDocItem }) {
	const ref = useRef(null)
	const dispatch = useDispatch()
	const [updateDoc] = useUpdateDocMutation()
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const activeDocId = useSelector(s => s.docsCenterState.activeDocId)

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

	drag(drop(ref))
	const isActive = canDrop && isOver
	const isNotActive = !canDrop && isOver
	const opacity = isDragging ? 0.4 : 1

	console.log("TocSideBarDoc => ", targetDocItem.docId)

	const loadDocContent = useCallback((e) => {
		e.stopPropagation()
		reduxBatch(() => {
			dispatch(setActiveDocId(targetDocItem.docId))
			dispatch(setShowTocSideBarDetails(false))
			dispatch(setActiveDocIdOfTocSideBarDetails(null))
		})
	}, [dispatch, targetDocItem.docId])

	return (
		<div style={{ order: targetDocItem.position }}>
			<TocSideBarItemBase
				ref={ref}
				docId={targetDocItem.docId}
				handleOpen={loadDocContent}
				activeDocId={activeDocId}
				published={targetDocItem.status === DOC_STATUS.PUBLISHED}
				sx={{
					border: "2px solid transparent",
					opacity,
					...(isActive ? { backgroundColor: "primary.light", color: "primary.contrastText" } : {}),
					...(isNotActive ? { backgroundColor: "error.light", color: "error.contrastText" } : {}),
				}}
			>
				<Typography> {targetDocItem.emoji} {targetDocItem.title}</Typography>
			</TocSideBarItemBase>
		</div>
	)
}
TocSideBarDoc.propTypes = {
	onClick: PropTypes.func,
	targetDocItem: PropTypes.object,
}

export default TocSideBarDoc