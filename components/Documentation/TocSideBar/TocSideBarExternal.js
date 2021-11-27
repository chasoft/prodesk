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
import LaunchIcon from "@mui/icons-material/Launch"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarExternal = ({ url, handleOpen, targetDocItem, children }) => {
	const ref = useRef(null)
	const [updateDoc] = useUpdateDocMutation()
	const { currentUser } = useSelector(getAuth)

	const [{ canDrop, isOver }, drop] = useDrop(() => ({
		accept: [DOC_TYPE.DOC, DOC_TYPE.EXTERNAL],
		drop: () => targetDocItem,
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		}),
	}))

	const [{ isDragging }, drag] = useDrag(() => ({
		type: DOC_TYPE.EXTERNAL,
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
			onClick={handleOpen}
			handleOpen={handleOpen}
			published={targetDocItem.status === DOC_STATUS.PUBLISHED}
			additionalButton={
				<Tooltip arrow title={url ? url : "Empty"} placement="top">
					<a href={url} target="_blank" rel="noopener noreferrer">
						<LaunchIcon
							sx={{
								mx: 0.5,
								color: "grey.500",
								fontSize: "1.2rem",
								":hover": {
									fill: (theme) => theme.palette.primary.main
								}
							}}
						/>
					</a>
				</Tooltip>
			}
			sx={{
				border: "2px solid transparent",
				backgroundColor:
					(activeDocIdOfTocSideBarDetails === targetDocItem.docId)
						? "action.hover"
						: "transparent",
				opacity,
				...(isActive ? { border: "2px solid #1976d2", borderTop: "2px solid #004aab" } : {})
			}}
		>
			<Box sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				flexGrow: 2,
				color: (activeDocIdOfTocSideBarDetails === targetDocItem.docId) ? "primary.main" : "initial",
				":hover": {
					"&>svg": {
						color: "grey.700"
					}
				}
			}}>
				<Typography>{children}</Typography>
			</Box>
		</TocSideBarItemBase >
	)
}
TocSideBarExternal.propTypes = {
	url: PropTypes.string,
	handleOpen: PropTypes.func,
	targetDocItem: PropTypes.object,
	children: PropTypes.node
}

export default TocSideBarExternal