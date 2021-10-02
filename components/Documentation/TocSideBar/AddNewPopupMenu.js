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
import { nanoid } from "nanoid"
import { isArray } from "lodash"
import { batch as ReduxBatch, useDispatch } from "react-redux"

//PROJECT IMPORT
import { DOCS_ADD, DOC_STATUS, DOC_TYPE, LOCALUPDATE_DOCSLIST_ACTION } from "./../../../helpers/constants"
import { docsAddCategory, docsAddDoc, docsAddExternalLink, docsAddSubCategory } from "../../../helpers/firebase/docs"
import { setActiveDoc, setActiveDocId, setActiveDocIdOfTocSideBarDetails, updateDocsList } from "../../../redux/slices/docsCenter"
import { setShowTocSideBarDetails } from "../../../redux/slices/uiSettings"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

// const ActionMenuItem = React.forwardRef((props, ref) => {
// 	const { ItemIcon, onClick, children } = props
// 	return (
// 		<ButtonBase
// 			ref={ref}
// 			onClick={() => { onClick() }}
// 			sx={{ display: "block", width: "100%", textAlign: "left" }}
// 		>
// 			<Box
// 				sx={{
// 					display: "flex",
// 					alignItems: "center",
// 					justifyContent: "space-between",
// 					fontWeight: 500,
// 					"&:hover": {
// 						backgroundColor: "action.hover",
// 						cursor: "pointer",
// 					},
// 				}}
// 			>

// 				<Typography sx={{ ml: 2, color: "grey.500", fontWeight: "bold" }}>
// 					{children}
// 				</Typography>

// 				{<ItemIcon
// 					id="detailsRightButton" size="small"
// 					fontSize="small"
// 					sx={{
// 						fill: (theme) => theme.palette.grey[500],
// 						my: 1, mr: 2,
// 						cursor: "pointer"
// 					}}
// 					onClick={(e) => {
// 						e.stopPropagation()
// 						console.log("action clicked")
// 					}}
// 				/>}

// 			</Box>
// 		</ButtonBase>
// 	)
// })

// ActionMenuItem.displayName = "ActionMenuItem"

// ActionMenuItem.propTypes = {
// 	ItemIcon: PropTypes.object,
// 	onClick: PropTypes.func,
// 	children: PropTypes.node
// }

const PopupMenuItem = ({ actionType, targetDocItem }) => {
	const dispatch = useDispatch()

	const executeAction = useCallback(async () => {

		//Not require any information
		if (actionType.code === DOCS_ADD.CATEGORY.code) {
			//Prepare data
			const docId = nanoid(7)
			const docItem = {
				docId: docId,
				type: DOC_TYPE.CATEGORY,
				category: "Untitled Category " + docId,
				slug: "untitled-category-" + docId,
				description: "",
				createdAt: "",
				createdBy: "",
				updatedAt: "",
				updatedBy: "",
			}

			//Add to DB
			await docsAddCategory(docItem)

			ReduxBatch(() => {
				dispatch(updateDocsList({
					type: LOCALUPDATE_DOCSLIST_ACTION.ADD_NEW_CAT,
					docItem: docItem
				}))
				dispatch(setActiveDocIdOfTocSideBarDetails(docId))
				dispatch(setShowTocSideBarDetails(true))
			})
		}

		//Require parent category
		if (actionType.code === DOCS_ADD.SUB_CATEGORY.code) {

			if (!targetDocItem.category) throw new Error("Can not determined parent item!")

			//Prepare data
			const docId = nanoid(7)
			const docItem = {
				docId: docId,
				type: DOC_TYPE.SUBCATEGORY,
				category: targetDocItem.category,
				subcategory: "Untitled SubCategory " + docId,
				slug: "untitled-subcategory-" + docId,
				description: "",
				createdAt: "",
				createdBy: "",
				updatedAt: "",
				updatedBy: "",
			}

			//Add to DB
			await docsAddSubCategory(docItem)

			ReduxBatch(() => {
				dispatch(updateDocsList({
					type: LOCALUPDATE_DOCSLIST_ACTION.ADD_NEW_SUBCAT,
					docItem: docItem
				}))
				dispatch(setActiveDocIdOfTocSideBarDetails(docId))
				dispatch(setShowTocSideBarDetails(true))
			})
		}

		//Require parent category
		if (actionType.code === DOCS_ADD.EXTERNAL.code) {

			if (!targetDocItem.category) throw new Error("Can not determined parent item!")

			//Prepare data
			const docId = nanoid(7)
			const docItem = {
				docId: docId,
				type: DOC_TYPE.EXTERNAL,
				category: targetDocItem.category,
				subcategory: targetDocItem.subcategory ?? "000000",
				url: "",
				description: "",
				createdAt: "",
				createdBy: "",
				updatedAt: "",
				updatedBy: "",
			}

			//Add to DB
			await docsAddExternalLink(docItem)

			ReduxBatch(() => {
				dispatch(updateDocsList({
					type: LOCALUPDATE_DOCSLIST_ACTION.ADD_NEW_EXTERNAL,
					docItem: docItem
				}))
				dispatch(setActiveDocIdOfTocSideBarDetails(docId))
				dispatch(setShowTocSideBarDetails(true))
			})
		}

		if (actionType.code === DOCS_ADD.DOC.code) {

			if (!targetDocItem.category) throw new Error("Can not determined parent item!")

			//Prepare data
			//Please note that content of DOC would be stored in sub-Collection of its document
			const docId = nanoid(7)
			const docItem = {
				docId: docId,
				type: DOC_TYPE.DOC,
				category: targetDocItem.category,
				subcategory: targetDocItem.subcategory ?? "000000",
				title: "",
				description: "",
				slug: "",
				tags: [],
				status: DOC_STATUS.DRAFT,
				createdAt: "",
				createdBy: "",
				updatedAt: "",
				updatedBy: "",
			}

			//Add to DB
			await docsAddDoc(docItem)

			//For document, not show details, but show the TextEditor
			ReduxBatch(() => {
				dispatch(updateDocsList({
					type: LOCALUPDATE_DOCSLIST_ACTION.ADD_NEW_DOC,
					docItem: docItem
				}))
				dispatch(setActiveDocId(docId))
				dispatch(setActiveDoc(docItem))
			})
		}

	}, [dispatch, actionType.code, targetDocItem])

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