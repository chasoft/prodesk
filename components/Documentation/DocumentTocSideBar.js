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

import React, { useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, List, ListItemButton, Typography, ListItemAvatar, ListItemText } from "@mui/material"

//THIRD-PARTY
import { filter } from "lodash"
import { useSnackbar } from "notistack"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { deleteFile, STORAGE_DESTINATION } from "@helpers/storageApi"
import { useGetDoc } from "@helpers/useGetDocs"
import { docItemNewDoc } from "@helpers/firebase/docs"
import { setShowTocSideBarDetails } from "@redux/slices/uiSettings"
import ConfirmDialog from "@components/common/ConfirmDialog"
import { CircularProgressBox } from "@components/common"

import {
	DOC_TYPE,
	DOCS_ADD,
	RESERVED_KEYWORDS
} from "@helpers/constants"

import {
	getAuth,
	getDocsCenter,
	getTextEditor,
	getUiSettings
} from "@redux/selectors"

import {
	setActiveDocId,
	setActiveDocIdOfTocSideBarDetails
} from "@redux/slices/docsCenter"

import {
	useAddDocMutation,
	useGetDocsQuery,
	useDeleteDocMutation,
	useGetDocContentQuery
} from "@redux/slices/firestoreApi"

//ASSETS
import DeleteIcon from "@mui/icons-material/Delete"
import PostAddIcon from "@mui/icons-material/PostAdd"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function TocItem({ sx, anchor, active, children }) {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				px: 2, py: 0.5,
				cursor: "pointer",
				":hover": {
					color: "primary.main",
					"&>svg": {
						fill: (theme) => theme.palette.primary.main
					}
				},
				color: active ? "primary.main" : "grey.500",
				...sx
			}}
			onClick={(e) => {
				e.preventDefault()
				const offsetTop = document.querySelector(`#${anchor}`).offsetTop + 150
				scroll({
					top: offsetTop,
					behavior: "smooth"
				})
			}}
		>
			<Typography sx={{ fontSize: "0.80rem" }} noWrap>
				{children}
			</Typography>
		</Box>
	)
}

TocItem.propTypes = {
	sx: PropTypes.object,
	anchor: PropTypes.string,
	active: PropTypes.bool,
	children: PropTypes.node
}

export function RightMenuItemBase({ sx, Icon, children, ...otherProps }) {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				px: 2, py: 1,
				cursor: "pointer",
				"&>svg": {
					width: "1.25rem",
					height: "1.25rem",
					marginRight: "8px",
					fill: "#9e9e9e",
				},
				":hover": {
					backgroundColor: "action.hover",
					"&>p": { color: "primary.main" },
					"&>svg": { fill: (theme) => theme.palette.primary.main }
				},
				...sx
			}}
			{...otherProps}
		>
			{Icon}
			<Typography sx={{ fontSize: "0.80rem", fontWeight: "bold", color: "grey.700" }} noWrap>{children}</Typography>
		</Box>
	)
}
RightMenuItemBase.propTypes = {
	sx: PropTypes.object,
	Icon: PropTypes.object,
	onClick: PropTypes.func,
	children: PropTypes.node
}

export function RightMenuItemAddNewDoc({ categoryId, subCategoryId, sx }) {
	const [addDoc] = useAddDocMutation()
	const { currentUser } = useSelector(getAuth)

	const handleAddNewDoc = async () => {
		//Prepare skeleton document
		const docItem = docItemNewDoc(categoryId, subCategoryId, currentUser.username)
		//add new document to DB
		//dispatch actions are all moved to inside addDoc() function
		await addDoc({ docItem: docItem })
	}

	return (
		<RightMenuItemBase
			Icon={<PostAddIcon />} sx={{ ...sx }}
			onClick={handleAddNewDoc}
		>
			New Document
		</RightMenuItemBase>
	)
}
RightMenuItemAddNewDoc.propTypes = {
	categoryId: PropTypes.string,
	subCategoryId: PropTypes.string,
	sx: PropTypes.object
}

// export const RightMenuItemImport = ({ targetDocItem, sx }) => {
// 	return (
// 		<RightMenuItemBase
// 			Icon={<BiImport />} sx={{ ...sx }}
// 			onClick={() => {
// 				console.log("Import function not yet implemented")
// 			}}
// 		>
// 			Import
// 		</RightMenuItemBase>
// 	)
// }
// RightMenuItemImport.propTypes = {
// 	targetDocItem: PropTypes.object,
// 	sx: PropTypes.object
// }

// export const RightMenuItemExportPDF = ({ targetDocItem, sx }) => {
// 	return (
// 		<RightMenuItemBase
// 			Icon={<ExportPdfIcon />} fontSize="small" sx={{ ...sx }}
// 			onClick={() => {
// 				console.log("Export function not yet implemented")
// 			}}
// 		>
// 			Export as PDF
// 		</RightMenuItemBase>
// 	)
// }
// RightMenuItemExportPDF.propTypes = {
// 	targetDocItem: PropTypes.object,
// 	sx: PropTypes.object
// }

export function RightMenuItemDelete({ title = "Delete", targetDocItem, sx }) {
	const dispatch = useDispatch()
	const allDocsRaw = useGetDocsQuery(undefined)
	const [deleteDoc] = useDeleteDocMutation()
	const { enqueueSnackbar } = useSnackbar()
	const { isSmallScreen } = useSelector(getUiSettings)

	const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

	const {
		data: docItemContent = {}, isLoading: isLoadingDocItemContent
	} = useGetDocContentQuery(targetDocItem.docId)

	const {
		data: catItem, isLoading: isLoadingCatItem
	} = useGetDoc(targetDocItem?.categoryId)

	const {
		data: subCatItem, isLoading: isLoadingSubCatItem
	} = useGetDoc(targetDocItem?.subCategoryId)

	const handleDeleteDocItem = async (confirmed) => {
		if (confirmed === false)
			return

		if (targetDocItem.type === DOC_TYPE.CATEGORY) {
			const affectedItems = filter(allDocsRaw.data, { categoryId: targetDocItem?.categoryId })
			if (affectedItems.length > 1) {
				enqueueSnackbar("Can not delete selected category! Please delete/move all data out of it first!", { variant: "error" })
				return
			}

			try {
				//update Redux first
				reduxBatch(() => {
					dispatch(setActiveDocId(null))
					dispatch(setShowTocSideBarDetails(false))
					dispatch(setActiveDocIdOfTocSideBarDetails(null))
				})

				//update DB
				await deleteDoc({ docItem: targetDocItem })
			} catch (e) {
				throw new Error("Something wrong when trying to delete your selected category!")
			}
		}

		if (targetDocItem.type === DOC_TYPE.SUBCATEGORY) {

			const affectedItems = filter(
				allDocsRaw.data,
				{
					categoryId: targetDocItem.categoryId,
					subCategoryId: targetDocItem.subCategoryId
				}
			)

			if (affectedItems.length > 1) {
				enqueueSnackbar("Can not delete selected sub-category! Please delete/move all data out of it first!", { variant: "error" })
				return
			}

			try {
				//update Redux first
				reduxBatch(() => {
					dispatch(setActiveDocId(null))
					dispatch(setShowTocSideBarDetails(false))
					dispatch(setActiveDocIdOfTocSideBarDetails(null))
				})

				//update DB
				await deleteDoc({ docItem: targetDocItem })
			} catch (e) {
				throw new Error("Something wrong when trying to delete your selected sub-category!")
			}
		}

		if (targetDocItem.type === DOC_TYPE.EXTERNAL) {
			try {
				//update Redux first
				reduxBatch(() => {
					dispatch(setActiveDocId(null))
					dispatch(setShowTocSideBarDetails(false))
					dispatch(setActiveDocIdOfTocSideBarDetails(null))
				})

				//update DB
				await deleteDoc({ docItem: targetDocItem })
			} catch (e) {
				throw new Error("Something wrong when trying to delete your selected external link!")
			}
		}

		if (targetDocItem.type === DOC_TYPE.DOC) {
			try {
				//update Redux first
				reduxBatch(() => {
					dispatch(setActiveDocId(null))
					dispatch(setShowTocSideBarDetails(false))
					dispatch(setActiveDocIdOfTocSideBarDetails(null))
				})

				//update DB
				await deleteDoc({ docItem: targetDocItem })
			} catch (e) {
				throw new Error("Something wrong when trying to delete your selected document!")
			}
		}

		//related photo if existed
		if (targetDocItem.photo) {
			await deleteFile(`/${STORAGE_DESTINATION.DOCS}/${targetDocItem.docId}.png`)
		}
	}

	return (
		<>
			<RightMenuItemBase
				Icon={<DeleteOutlinedIcon />}
				sx={{ ...sx }}
				onClick={() => setOpenConfirmDialog(true)}
			>
				{title}
			</RightMenuItemBase>

			<ConfirmDialog
				okButtonText="Delete"
				color="warning"
				open={openConfirmDialog}
				setOpen={setOpenConfirmDialog}
				callback={handleDeleteDocItem}
			>
				<Box sx={{ display: "flex" }}>
					<DeleteIcon color="warning" sx={{
						width: 60,
						height: 60,
						mr: 2,
						display: { xs: "none", sm: "block" }
					}} />
					<Box sx={{
						display: "flex",
						flexDirection: "column"
					}}>
						<Box sx={{
							display: "flex",
							alignItems: "center",
							mb: 2
						}}>
							<DeleteIcon color="warning" sx={{
								width: 60,
								height: 60,
								mr: 2,
								display: { xs: "block", sm: "none" }
							}} />
							<Typography variant="body2" sx={{ lineHeight: isSmallScreen ? 1.5 : 2 }}>
								Are you sure you want to delete this {targetDocItem.type.toLowerCase()}?
							</Typography>
						</Box>

						<List sx={{
							width: "100%",
							bgcolor: "background.paper",
							mb: 2,
						}}>

							{(targetDocItem.type === DOC_TYPE.CATEGORY) &&
								<ListItemButton
									alignItems="flex-start"
									sx={{
										borderTop: "1px solid transparent",
										borderBottom: "1px solid transparent",
										borderColor: "warning.main",
									}}
								>
									<ListItemAvatar>
										<DOCS_ADD.CATEGORY.icon />
									</ListItemAvatar>
									<ListItemText
										primary={<Typography variant="h3" sx={{
											my: 0,
											fontWeight: 500,
											color: "grey.800"
										}}>
											{targetDocItem.title}
										</Typography>} />
								</ListItemButton>}

							{(targetDocItem.type === DOC_TYPE.SUBCATEGORY) &&
								<ListItemButton
									alignItems="flex-start"
									sx={{
										borderTop: "1px solid transparent",
										borderBottom: "1px solid transparent",
										borderColor: "warning.main",
									}}
								>
									<ListItemAvatar>
										<DOCS_ADD.SUB_CATEGORY.icon />
									</ListItemAvatar>
									<ListItemText
										primary={<Typography variant="h3" sx={{
											my: 0,
											fontWeight: 500,
											color: "grey.800"
										}}>
											{targetDocItem.title}
										</Typography>}
										secondary={<Typography sx={{
											fontWeight: 500,
											color: "grey.700"
										}}>
											{(!isLoadingCatItem && !!catItem?.title)
												? "a member of " + catItem.title
												: null}
										</Typography>} />
								</ListItemButton>}

							{(targetDocItem.type === DOC_TYPE.EXTERNAL) &&
								<ListItemButton
									alignItems="flex-start"
									sx={{
										borderTop: "1px solid transparent",
										borderBottom: "1px solid transparent",
										borderColor: "warning.main",
									}}
								>
									<ListItemAvatar>
										<DOCS_ADD.EXTERNAL.icon />
									</ListItemAvatar>
									<ListItemText
										primary={<Typography variant="h3" sx={{
											my: 0,
											fontWeight: 500,
											color: "grey.800"
										}}>
											{targetDocItem.title}
										</Typography>}
										secondary={<Typography sx={{
											fontWeight: 500,
											color: "grey.700"
										}}>
											{(targetDocItem.subCategoryId !== RESERVED_KEYWORDS.CAT_CHILDREN)
												? (!isLoadingSubCatItem && !!subCatItem?.title)
													? "a member of " + subCatItem.title
													: null
												: (!isLoadingCatItem && !!catItem?.title)
													? "a member of " + catItem.title
													: null}
										</Typography>} />
								</ListItemButton>}

							{(targetDocItem.type === DOC_TYPE.DOC) &&
								<ListItemButton
									alignItems="flex-start"
									sx={{
										borderTop: "1px solid transparent",
										borderBottom: "1px solid transparent",
										borderColor: "warning.main",
									}}
								>
									<ListItemAvatar>
										<DOCS_ADD.DOC.icon />
									</ListItemAvatar>
									<ListItemText
										primary={<>
											<Typography variant="h3" sx={{
												my: 0,
												fontWeight: 500,
												color: "grey.800"
											}}>
												{targetDocItem?.title}
											</Typography>
											<Typography sx={{
												mb: 1.5,
												fontWeight: 500,
												color: "grey.700"
											}}>
												{(targetDocItem.subCategoryId !== RESERVED_KEYWORDS.CAT_CHILDREN)
													? (!isLoadingSubCatItem && !!subCatItem?.title)
														? "a member of " + subCatItem.title
														: null
													: (!isLoadingCatItem && !!catItem?.title)
														? "a member of " + catItem.title
														: null}
											</Typography>
										</>}
										secondary={isLoadingDocItemContent
											? <CircularProgressBox minHeight="32px" />
											: <Typography
												component="span"
												variant="body2"
												color="text.primary"
												sx={{ display: "inline" }}
											>
												{docItemContent?.text?.substring(0, 100)}
											</Typography>} />
								</ListItemButton>}

						</List>

						<Typography sx={{ lineHeight: 2 }}>
							Please note that this action can not be undo.
						</Typography>
					</Box>
				</Box>
			</ConfirmDialog>
		</>
	)
}
RightMenuItemDelete.propTypes = {
	title: PropTypes.string,
	targetDocItem: PropTypes.object,
	sx: PropTypes.object
}

export function RightMenuItemMore({ sx }) {
	const dispatch = useDispatch()
	const { activeDocId } = useSelector(getDocsCenter)
	return (
		<RightMenuItemBase
			Icon={<MoreHorizIcon />} sx={{ ...sx }}
			onClick={() => {
				/* This is to show TocSideBarDetails of current Doc */
				reduxBatch(() => {
					dispatch(setShowTocSideBarDetails(true))
					console.log("RightMenuItemMore => activeDocId = ", activeDocId)
					dispatch(setActiveDocIdOfTocSideBarDetails(activeDocId))
				})
			}}
		>
			More
		</RightMenuItemBase>
	)
}
RightMenuItemMore.propTypes = {
	sx: PropTypes.object
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function DocumentTocSideBar() {
	const { activeDocId } = useSelector(getDocsCenter)
	const { editorDataHeadings } = useSelector(getTextEditor)

	const {
		data: activeDoc, isLoading: isLoadingActiveDoc
	} = useGetDoc(activeDocId)

	return (
		<Box id="DocumentTocSideBar" sx={{
			position: "sticky",
			display: { xs: "none", lg: "flex" },
			flexDirection: "column",
			width: "224px",
			backgroundColor: "#FFF",
		}}>

			{isLoadingActiveDoc && <CircularProgressBox />}

			{(activeDocId !== null && !isLoadingActiveDoc) &&
				<div style={{ position: "sticky", top: "80px" }}>

					<Box sx={{
						borderLeft: "1px solid transparent",
						borderColor: "divider",
					}}>

						<RightMenuItemAddNewDoc
							categoryId={activeDoc?.categoryId}
							subCategoryId={activeDoc?.subCategoryId} />
						{/* <RightMenuItemImport targetDocItem={activeDoc} /> */}
						{/* <RightMenuItemExportPDF targetDocItem={activeDoc} /> */}
						<RightMenuItemMore />

					</Box>

					<Box sx={{
						borderLeft: "1px solid transparent",
						borderColor: "divider",
						color: "grey.500",
						mt: 5, mb: 3
					}}>
						<Typography sx={{
							px: 2, pb: 1,
							textTransform: "uppercase",
							fontWeight: "bold",
							fontSize: "0.70rem"
						}}>
							Contents
						</Typography>

						<nav>
							{editorDataHeadings.map((item) => {
								if (item.level > 2)
									return null
								return (
									<TocItem
										key={item.id}
										anchor={item.id}
										sx={{
											py: 0.5,
											ml: (item.level === 2) ? 2 : 0
										}}
									>
										{item.title}
									</TocItem>
								)
							})}
						</nav>

					</Box>

				</div>}
		</Box>
	)
}
DocumentTocSideBar.propTypes = { children: PropTypes.node }

export default DocumentTocSideBar