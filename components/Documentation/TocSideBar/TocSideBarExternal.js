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
import { Box, Tooltip, Typography } from "@mui/material"

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
import LaunchIcon from "@mui/icons-material/Launch"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TocSideBarExternal({ url, handleOpen, targetDocItem, children }) {
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
		}),
	}), [
		targetDocItem.type,
		targetDocItem.position,
		targetDocItem.docId,
		targetDocItem?.categoryId,
		targetDocItem?.subCategoryId,
	])

	const [{ isDragging }, drag] = useDrag(() => ({
		type: DOC_TYPE.EXTERNAL,
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
				onClick={handleOpen}
				handleOpen={handleOpen}
				published={targetDocItem.status === DOC_STATUS.PUBLISHED}
				additionalButton={<Tooltip arrow title={url ? url : "Empty"} placement="top">
					<a href={url} target="_blank" rel="noopener noreferrer">
						<LaunchIcon
							sx={{
								mx: 0.5,
								color: "grey.500",
								fontSize: "1.2rem",
								":hover": {
									fill: (theme) => theme.palette.primary.main
								}
							}} />
					</a>
				</Tooltip>}
				sx={{
					border: "2px solid transparent",
					backgroundColor: (activeDocIdOfTocSideBarDetails === targetDocItem.docId)
						? "action.hover"
						: "transparent",
					opacity,
					...(isActive ? { backgroundColor: "primary.light" } : {}),
					...(isNotActive ? { backgroundColor: "error.light" } : {}),
				}}
			>
				<Box sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexGrow: 2,
					color: isActive
						? "primary.contrastText"
						: isNotActive
							? "error.contrastText"
							: (activeDocIdOfTocSideBarDetails === targetDocItem.docId)
								? "primary.main"
								: "initial",
					":hover": {
						"&>svg": {
							color: "grey.700"
						}
					}
				}}>
					<Typography>{targetDocItem.emoji} {children}</Typography>
				</Box>
			</TocSideBarItemBase>
		</div>
	)
}
TocSideBarExternal.propTypes = {
	url: PropTypes.string,
	handleOpen: PropTypes.func,
	targetDocItem: PropTypes.object,
	children: PropTypes.node
}

export default TocSideBarExternal