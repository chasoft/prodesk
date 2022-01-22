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

import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"

// MATERIAL-UI
import { Box, ClickAwayListener, Grow, Paper, Popper, Typography } from "@mui/material"

//THIRD-PARTY
import { isEqual } from "lodash"
import { useSelector } from "react-redux"

//PROJECT IMPORT
import { DOCS_ADD } from "@helpers/constants"
import { useAddDocMutation } from "@redux/slices/firestoreApi"

import {
	docItemNewCategory,
	docItemNewDoc,
	docItemNewExternal,
	docItemNewSubCategory
} from "@helpers/firebase/docs"

//ASSETS
// import { ExportPdfIcon } from "./../common/SvgIcons"
// import PostAddIcon from "@mui/icons-material/PostAdd"
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
// import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
// import { Import as BiImport } from "@styled-icons/boxicons-regular/Import"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function PopupMenuItemBase({
	callback, description, handleClose, MenuIcon, showSideBarDetails = false, title,
}) {
	return (
		<Box
			onClick={(e) => {
				e.stopPropagation()
				callback()
				if (!showSideBarDetails)
					handleClose(e)
			}}
			sx={{
				px: 3, py: 1,
				":hover": {
					cursor: "pointer",
					backgroundColor: "action.hover",
					"&>div>p": { color: "primary.main" },
					"&>div>svg": { fill: (theme) => theme.palette.primary.main },
				}
			}}
		>
			<Box sx={{
				display: "flex",
				alignItems: "center",
			}}>
				<Box component={MenuIcon}
					fontSize="small"
					sx={{ fill: (theme) => theme.palette.grey[500] }} />

				<Typography sx={{
					ml: 1,
					fontWeight: 500,
				}}>
					{title}
				</Typography>
			</Box>

			<Typography sx={{
				color: "grey.500",
				fontWeight: 500,
				fontSize: "0.8rem"
			}}>
				{description}
			</Typography>
		</Box>
	)
}
PopupMenuItemBase.propTypes = {
	callback: PropTypes.func,
	description: PropTypes.string,
	handleClose: PropTypes.func,
	MenuIcon: PropTypes.object,
	showSideBarDetails: PropTypes.bool,
	title: PropTypes.string,
}

export const Divider = () => (
	<Box sx={{
		borderTop: "1px solid transparent",
		mt: 1, pt: 1, mx: 3,
		borderColor: "divider"
	}} />
)

function PopupMenuItemAddCategory({ actionType, handleClose }) {
	const [addDoc] = useAddDocMutation()
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)

	const handleAddCategory = async () => {
		//Prepare skeleton category
		const docItem = docItemNewCategory(currentUser.username)

		handleClose()

		await addDoc({ docItem: docItem })
	}

	return (
		<PopupMenuItemBase
			callback={handleAddCategory}
			description={actionType.description}
			handleClose={handleClose}
			MenuIcon={DOCS_ADD.CATEGORY.icon}
			showSideBarDetails={true}
			title={actionType.title} />
	)
}
PopupMenuItemAddCategory.propTypes = {
	actionType: PropTypes.object,
	handleClose: PropTypes.func,
}

function PopupMenuItemAddSubCategory({ actionType, categoryId, handleClose }) {
	const [addDoc] = useAddDocMutation()
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)

	const handleAddSubCategory = async () => {
		//Prepare skeleton sub-category
		const docItem = docItemNewSubCategory(categoryId, currentUser.username)

		handleClose()

		await addDoc({ docItem: docItem })
	}

	return (
		<PopupMenuItemBase
			callback={handleAddSubCategory}
			description={actionType.description}
			handleClose={handleClose}
			MenuIcon={DOCS_ADD.SUB_CATEGORY.icon}
			showSideBarDetails={true}
			title={actionType.title} />
	)
}
PopupMenuItemAddSubCategory.propTypes = {
	actionType: PropTypes.object,
	categoryId: PropTypes.string,
	handleClose: PropTypes.func,
}

function PopupMenuItemAddExternalLink({ actionType, categoryId, subCategoryId, handleClose }) {
	const [addDoc] = useAddDocMutation()
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)

	const handleAddExternalLink = async () => {
		//Prepare skeleton external link
		const docItem = docItemNewExternal(categoryId, subCategoryId, currentUser.username)
		handleClose()
		await addDoc({ docItem: docItem })
	}

	return (
		<PopupMenuItemBase
			callback={handleAddExternalLink}
			description={actionType.description}
			handleClose={handleClose}
			MenuIcon={DOCS_ADD.EXTERNAL.icon}
			showSideBarDetails={true}
			title={actionType.title} />
	)
}
PopupMenuItemAddExternalLink.propTypes = {
	actionType: PropTypes.object,
	categoryId: PropTypes.string,
	subCategoryId: PropTypes.string,
	handleClose: PropTypes.func,
}

function PopupMenuItemAddDoc({ actionType, categoryId, subCategoryId, handleClose }) {
	const [addDoc] = useAddDocMutation()
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)

	const handleAddDoc = async () => {
		//Prepare skeleton document
		const docItem = docItemNewDoc(categoryId, subCategoryId, currentUser.username)

		handleClose()

		await addDoc({ docItem: docItem })
	}
	return (
		<PopupMenuItemBase
			callback={handleAddDoc}
			description={actionType.description}
			handleClose={handleClose}
			MenuIcon={DOCS_ADD.DOC.icon}
			showSideBarDetails={true}
			title={actionType.title} />
	)
}
PopupMenuItemAddDoc.propTypes = {
	actionType: PropTypes.object,
	categoryId: PropTypes.string,
	subCategoryId: PropTypes.string,
	handleClose: PropTypes.func,
}

function AddNewPopupMenu({ open, anchorRef, handleClose, targetDocItem, actions, placement }) {
	return (
		<Popper
			id="popup-addmore"
			anchorEl={anchorRef.current}
			open={open}
			placement={placement ?? "right"}
			transition
			style={{ zIndex: 200 }}
		>
			{({ TransitionProps }) => (
				<ClickAwayListener onClickAway={handleClose}>
					<Grow in={open} {...TransitionProps}>
						<Paper elevation={4} sx={{ py: 2 }}>

							{actions.map((actionType, idx) => (
								<div key={actionType.title}>

									{(actionType.code === DOCS_ADD.CATEGORY.code) &&
										<PopupMenuItemAddCategory
											actionType={actionType}
											handleClose={handleClose} />}

									{(actionType.code === DOCS_ADD.SUB_CATEGORY.code) &&
										<PopupMenuItemAddSubCategory
											actionType={actionType}
											categoryId={targetDocItem.categoryId}
											handleClose={handleClose} />}

									{(actionType.code === DOCS_ADD.EXTERNAL.code) &&
										<PopupMenuItemAddExternalLink
											actionType={actionType}
											categoryId={targetDocItem.categoryId}
											subCategoryId={targetDocItem.subCategoryId}
											handleClose={handleClose} />}


									{(actionType.code === DOCS_ADD.DOC.code) &&
										<PopupMenuItemAddDoc
											actionType={actionType}
											categoryId={targetDocItem.categoryId}
											subCategoryId={targetDocItem.subCategoryId}
											handleClose={handleClose} />}

									{(idx !== actions.length - 1) && <Divider />}
								</div>
							))}

						</Paper>
					</Grow>
				</ClickAwayListener>
			)}
		</Popper>
	)
}
AddNewPopupMenu.propTypes = {
	open: PropTypes.bool,
	anchorRef: PropTypes.any,
	handleClose: PropTypes.func,
	targetDocItem: PropTypes.object,
	actions: PropTypes.array,
	placement: PropTypes.string,
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function useAddNewDocumentationPopupMenu() {
	const anchorRef = useRef(null)
	const [open, setOpen] = useState(false)

	const handlers = React.useMemo(
		() => ({
			handleToggle: () => {
				setOpen((prevOpen) => !prevOpen)
			},
			handleClose: (e) => {
				if (anchorRef.current && anchorRef.current.contains(e?.target)) {
					return
				}
				setOpen(false)
			},
		}),
		[]
	)

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = useRef(open)
	useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus()
		}
		prevOpen.current = open
	}, [open])

	return [AddNewPopupMenu, open, anchorRef, handlers]
}

export default useAddNewDocumentationPopupMenu