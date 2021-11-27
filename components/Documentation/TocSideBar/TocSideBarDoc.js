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
import { useDrag, useDrop } from "react-dnd"
import { useSelector } from "react-redux"

//PROJECT IMPORT
import TocSideBarItemBase from "./TocSideBarItemBase"
import { moveDocItem } from "@components/Documentation/TocSideBar"

import { useUpdateDocMutation } from "@redux/slices/firestoreApi"

import {
	getAuth,
	getDocsCenter
} from "@redux/selectors"

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

const TocSideBarDoc = ({ active, onClick, handleOpen, targetDocItem, children }) => {
	const ref = useRef(null)
	const [updateDoc] = useUpdateDocMutation()
	const { currentUser } = useSelector(getAuth)

	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: [DOC_TYPE.DOC, DOC_TYPE.EXTERNAL],
		drop: () => targetDocItem,
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		})
	}))

	const [{ isDragging }, drag] = useDrag(() => ({
		type: DOC_TYPE.DOC,
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

	const { activeDocIdOfTocSideBarDetails } = useSelector(getDocsCenter)

	drag(drop(ref))
	const isActive = canDrop && isOver
	const opacity = isDragging ? 0.4 : 1

	return (
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
				...(isActive ? { border: "2px solid #1976d2", borderTop: "2px solid #004aab" } : {})
			}}
		>
			<Typography>{children}</Typography>
		</TocSideBarItemBase>
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