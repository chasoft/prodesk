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

import React, { useRef, useState, useCallback } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, ClickAwayListener, Grow, Paper, Popper, Typography } from "@mui/material"

//THIRD-PARTY
import { isArray } from "lodash"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getAuth } from "../../../redux/selectors"
import { DOCS_ADD } from "./../../../helpers/constants"
import { docsAddCategory, docsAddSubCategory, docsAddExternal, docsAddDoc } from "./../../Documentation/DocumentTocSideBar"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const PopupMenuItem = ({ actionType, targetDocItem }) => {
	const dispatch = useDispatch()
	const { currentUser } = useSelector(getAuth)

	const executeAction = useCallback(async () => {

		//Not require any information
		if (actionType.code === DOCS_ADD.CATEGORY.code) {
			docsAddCategory(dispatch, currentUser.username)
		}

		//Require parent category
		if (actionType.code === DOCS_ADD.SUB_CATEGORY.code) {
			docsAddSubCategory(dispatch, currentUser.username, targetDocItem)
		}

		//Require parent category
		if (actionType.code === DOCS_ADD.EXTERNAL.code) {
			docsAddExternal(dispatch, currentUser.username, targetDocItem)
		}

		if (actionType.code === DOCS_ADD.DOC.code) {
			docsAddDoc(dispatch, currentUser.username, targetDocItem)
		}

	}, [dispatch, actionType.code, targetDocItem, currentUser.username])

	return (
		<Box
			onClick={() => { executeAction() }}
			sx={{
				px: 3, py: 1,
				":hover": {
					cursor: "pointer",
					backgroundColor: "action.hover",
					"&>div>svg": {
						fill: (theme) => theme.palette.primary.main
					},
					"&>div>p": {
						color: "primary.main"
					}
				}
			}}
		>
			<Box sx={{
				display: "flex",
				alignItems: "center",
			}}>
				{<actionType.icon fontSize="small" sx={{ fill: (theme) => theme.palette.grey[500] }} />}
				<Typography sx={{
					ml: 1,
					fontWeight: 500,
				}}>{actionType.title}</Typography>
			</Box>
			<Typography sx={{
				color: "grey.500",
				fontWeight: 500,
				fontSize: "0.8rem"
			}}>
				{actionType.description}
			</Typography>
		</Box>
	)
}
PopupMenuItem.propTypes = {
	actionType: PropTypes.object,
	targetDocItem: PropTypes.object,
}

export const Divider = () => (
	<Box sx={{
		borderTop: "1px solid transparent",
		mt: 1, pt: 1, mx: 3,
		borderColor: "divider"
	}} />
)

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const AddNewPopupMenu = ({ targetDocItem, actions, placement, children }) => {
	const ref = useRef(null)
	const [open, setOpen] = useState(false)

	return (
		<>
			<div ref={ref} id="popper-trigger" onClick={() => { setOpen(true) }}>
				{children}
			</div>
			<Popper
				id="popup-addmore"
				anchorEl={ref.current}
				open={open}
				placement={placement ?? "right"}
				transition
				style={{ zIndex: 200 }}
			>
				{({ TransitionProps }) => (
					<ClickAwayListener onClickAway={() => { setOpen(false) }}>
						<Grow in={open} {...TransitionProps}>
							<Paper elevation={4} sx={{ py: 2 }}>

								{actions.map((actionType, idx) => (
									<div key={actionType.title}>
										<PopupMenuItem
											actionType={actionType}
											targetDocItem={isArray(targetDocItem) ? targetDocItem[0] : targetDocItem}
										/>
										{(idx !== actions.length - 1) && <Divider />}
									</div>
								))}

							</Paper>
						</Grow>
					</ClickAwayListener>
				)}
			</Popper>
		</>
	)
}

AddNewPopupMenu.propTypes = {
	targetDocItem: PropTypes.object,
	actions: PropTypes.array,
	placement: PropTypes.string,
	children: PropTypes.node,
}

export default AddNewPopupMenu