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
import { Box, ClickAwayListener, Grow, Paper, Popper, Typography } from "@mui/material"

//THIRD-PARTY
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getAuth } from "../../../redux/selectors"
import { DOCS_ADD } from "./../../../helpers/constants"

//ASSETS
// import { ExportPdfIcon } from "./../common/SvgIcons"
import PostAddIcon from "@mui/icons-material/PostAdd"
// import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
// import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
// import { Import as BiImport } from "@styled-icons/boxicons-regular/Import"
import { useAddDocMutation } from "../../../redux/slices/firestoreApi"
import { docItemNewCategory, docItemNewDoc, docItemNewExternal, docItemNewSubCategory } from "../../../helpers/firebase/docs"
import { setActiveDocId, setActiveDocIdOfTocSideBarDetails } from "../../../redux/slices/docsCenter"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const PopupMenuItemBase = ({ MenuIcon, title, description, callback, handleClose, showSideBarDetails = false }) => {
	return (
		<Box
			onClick={() => {
				callback()
				if (!showSideBarDetails) handleClose()
			}}
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
				{<MenuIcon fontSize="small" sx={{ fill: (theme) => theme.palette.grey[500] }} />}
				<Typography sx={{
					ml: 1,
					fontWeight: 500,
				}}>{title}</Typography>
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
	MenuIcon: PropTypes.object,
	title: PropTypes.string,
	description: PropTypes.string,
	callback: PropTypes.func,
	handleClose: PropTypes.func,
	showSideBarDetails: PropTypes.bool
}

export const Divider = () => (
	<Box sx={{
		borderTop: "1px solid transparent",
		mt: 1, pt: 1, mx: 3,
		borderColor: "divider"
	}} />
)

const PopupMenuItemAddCategory = ({ actionType, handleClose }) => {
	const { currentUser } = useSelector(getAuth)
	const [addDoc] = useAddDocMutation()
	const dispatch = useDispatch()
	const handleAddCategory = async () => {
		const docItem = docItemNewCategory(currentUser.username)
		const res = await addDoc({ docItem: docItem }).unwrap()
		//Open new created Category
		dispatch(setActiveDocIdOfTocSideBarDetails(res.id))
		handleClose()
	}
	return (
		<PopupMenuItemBase
			MenuIcon={DOCS_ADD.CATEGORY.icon}
			title={actionType.title}
			description={actionType.description}
			callback={handleAddCategory}
			handleClose={handleClose}
			showSideBarDetails={true}
		/>
	)
}
PopupMenuItemAddCategory.propTypes = {
	actionType: PropTypes.object,
	handleClose: PropTypes.func,
}

const PopupMenuItemAddSubCategory = ({ actionType, targetDocItem, handleClose }) => {
	const { currentUser } = useSelector(getAuth)
	const [addDoc] = useAddDocMutation()
	const dispatch = useDispatch()
	const handleAddSubCategory = async () => {
		const docItem = docItemNewSubCategory(targetDocItem, currentUser.username)
		const res = await addDoc({ docItem: docItem }).unwrap()
		//Open new created Sub-Category
		dispatch(setActiveDocIdOfTocSideBarDetails(res.id))
		handleClose()
	}
	return (
		<PopupMenuItemBase
			MenuIcon={DOCS_ADD.SUB_CATEGORY.icon}
			title={actionType.title}
			description={actionType.description}
			callback={handleAddSubCategory}
			handleClose={handleClose}
			showSideBarDetails={true}
		/>
	)
}
PopupMenuItemAddSubCategory.propTypes = {
	actionType: PropTypes.object,
	targetDocItem: PropTypes.object,
	handleClose: PropTypes.func,
}

const PopupMenuItemAddExternalLink = ({ actionType, targetDocItem, handleClose }) => {
	const { currentUser } = useSelector(getAuth)
	const [addDoc] = useAddDocMutation()
	const dispatch = useDispatch()
	const handleAddExternalLink = async () => {
		const docItem = docItemNewExternal(targetDocItem, currentUser.username)
		const res = await addDoc({ docItem: docItem }).unwrap()
		//Open new created External link
		dispatch(setActiveDocIdOfTocSideBarDetails(res.id))
		handleClose()
	}
	return (
		<PopupMenuItemBase
			MenuIcon={DOCS_ADD.EXTERNAL.icon}
			title={actionType.title}
			description={actionType.description}
			callback={handleAddExternalLink}
			handleClose={handleClose}
			showSideBarDetails={true}
		/>
	)
}
PopupMenuItemAddExternalLink.propTypes = {
	actionType: PropTypes.object,
	targetDocItem: PropTypes.object,
	handleClose: PropTypes.func,
}

const PopupMenuItemAddDoc = ({ actionType, targetDocItem, handleClose }) => {
	const { currentUser } = useSelector(getAuth)
	const [addDoc] = useAddDocMutation()
	const dispatch = useDispatch()
	const handleAddDoc = async () => {
		const docItem = docItemNewDoc(targetDocItem, currentUser.username)
		const res = await addDoc({ docItem: docItem }).unwrap()
		//Open new created document
		reduxBatch(() => {
			dispatch(setActiveDocId(res.id))
			dispatch(setActiveDocIdOfTocSideBarDetails(null))
		})
		handleClose()
	}
	return (
		<PopupMenuItemBase
			MenuIcon={DOCS_ADD.DOC.icon}
			title={actionType.title}
			description={actionType.description}
			callback={handleAddDoc}
			handleClose={handleClose}
			showSideBarDetails={true}
		/>
	)
}
PopupMenuItemAddDoc.propTypes = {
	actionType: PropTypes.object,
	targetDocItem: PropTypes.object,
	handleClose: PropTypes.func,
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const AddNewPopupMenu = ({ targetDocItem, actions, placement, children }) => {
	const ref = useRef(null)
	const [open, setOpen] = useState(false)

	return (
		<>
			<div ref={ref} id="popper-trigger" onClick={(e) => {
				e.stopPropagation()
				setOpen(true)
			}}>
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

										{(actionType.code === DOCS_ADD.CATEGORY.code) &&
											<PopupMenuItemAddCategory
												actionType={actionType}
												handleClose={() => setOpen(false)}
											/>}

										{(actionType.code === DOCS_ADD.SUB_CATEGORY.code) &&
											<PopupMenuItemAddSubCategory
												actionType={actionType}
												targetDocItem={targetDocItem}
												handleClose={() => setOpen(false)}
											/>}

										{(actionType.code === DOCS_ADD.EXTERNAL.code) &&
											<PopupMenuItemAddExternalLink
												actionType={actionType}
												targetDocItem={targetDocItem}
												handleClose={() => setOpen(false)}
											/>}


										{(actionType.code === DOCS_ADD.DOC.code) &&
											<PopupMenuItemAddDoc
												actionType={actionType}
												targetDocItem={targetDocItem}
												handleClose={() => setOpen(false)}
											/>}

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