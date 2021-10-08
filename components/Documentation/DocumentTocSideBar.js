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

import React, { forwardRef } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Typography } from "@mui/material"

//THIRD-PARTY
import { filter } from "lodash"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { DOC_TYPE } from "./../../helpers/constants"
import { getTextEditor, getDocsCenter, getAuth } from "./../../redux/selectors"
import { setShowTocSideBarDetails } from "../../redux/slices/uiSettings"
import { docItemNewDoc } from "./../../helpers/firebase/docs"
import { setActiveDocId, setActiveDocIdOfTocSideBarDetails } from "./../../redux/slices/docsCenter"

//ASSETS
import { ExportPdfIcon } from "./../common/SvgIcons"
import PostAddIcon from "@mui/icons-material/PostAdd"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"
import { Import as BiImport } from "@styled-icons/boxicons-regular/Import"
import { useSnackbar } from "notistack"
import { useAddDocMutation, useGetDocsQuery, useDeleteDocMutation } from "../../redux/slices/firestoreApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const TocItem = forwardRef(({ sx, anchor, active, children }, ref) => {
	return (
		<a ref={ref} href={`#${anchor}`}>
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
			>
				<Typography sx={{ fontSize: "0.80rem" }} noWrap>
					{children}
				</Typography>
			</Box>
		</a>
	)
})

TocItem.displayName = "TocItem"

TocItem.propTypes = {
	sx: PropTypes.object,
	anchor: PropTypes.string,
	active: PropTypes.bool,
	children: PropTypes.node
}

export const RightMenuItemBase = ({ sx, Icon, children, ...otherProps }) => {
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

export const RightMenuItemAddNewDoc = ({ targetDocItem, sx }) => {
	const { currentUser } = useSelector(getAuth)
	const [addDoc] = useAddDocMutation()
	return (
		<RightMenuItemBase
			Icon={<PostAddIcon />} sx={{ ...sx }}
			onClick={async () => {
				const docItem = docItemNewDoc(targetDocItem, currentUser.username)
				await addDoc({ docItem: docItem }).unwrap()
			}}
		>
			New Document
		</RightMenuItemBase >
	)
}
RightMenuItemAddNewDoc.propTypes = {
	targetDocItem: PropTypes.object,
	sx: PropTypes.object
}

export const RightMenuItemImport = ({ targetDocItem, sx }) => {
	return (
		<RightMenuItemBase
			Icon={<BiImport />} sx={{ ...sx }}
			onClick={() => {
				console.log("Import function not yet implemented")
			}}
		>
			Import
		</RightMenuItemBase>
	)
}
RightMenuItemImport.propTypes = {
	targetDocItem: PropTypes.object,
	sx: PropTypes.object
}

export const RightMenuItemExportPDF = ({ targetDocItem, sx }) => {
	return (
		<RightMenuItemBase
			Icon={<ExportPdfIcon />} fontSize="small" sx={{ ...sx }}
			onClick={() => {
				console.log("Export function not yet implemented")
			}}
		>
			Export as PDF
		</RightMenuItemBase>
	)
}
RightMenuItemExportPDF.propTypes = {
	targetDocItem: PropTypes.object,
	sx: PropTypes.object
}

export const RightMenuItemDelete = ({ title = "Delete", targetDocItem, sx }) => {
	const allDocsRaw = useGetDocsQuery(undefined)
	const [deleteDoc] = useDeleteDocMutation()
	const { enqueueSnackbar } = useSnackbar()
	const dispatch = useDispatch()
	return (
		<RightMenuItemBase
			Icon={<DeleteOutlinedIcon />} sx={{ ...sx }}
			onClick={async () => {
				if (targetDocItem.type === DOC_TYPE.CATEGORY) {
					const affectedItems = filter(allDocsRaw.data, { category: targetDocItem.category })
					if (affectedItems.length > 1) {
						enqueueSnackbar("Can not delete selected category! Please delete/move all data out of it first!", { variant: "error" })
						return
					}

					try {
						//update Redux first
						reduxBatch(() => {
							dispatch(setActiveDocId(null))
							dispatch(setActiveDocIdOfTocSideBarDetails(null))
						})

						//update DB
						await deleteDoc({ docItem: targetDocItem })
					} catch (e) {
						throw new Error("Something wrong when trying to delete your selected category!")
					}
				}

				if (targetDocItem.type === DOC_TYPE.SUBCATEGORY) {
					const affectedItems = filter(allDocsRaw.data, { category: targetDocItem.category, subcategory: targetDocItem.subcategory })
					if (affectedItems.length > 1) {
						enqueueSnackbar("Can not delete selected sub-category! Please delete/move all data out of it first!", { variant: "error" })
						return
					}

					try {
						//update Redux first
						reduxBatch(() => {
							dispatch(setActiveDocId(null))
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
							dispatch(setActiveDocIdOfTocSideBarDetails(null))
						})

						//update DB
						await deleteDoc({ docItem: targetDocItem })
					} catch (e) {
						throw new Error("Something wrong when trying to delete your selected document!")
					}
				}
			}}
		>
			{title}
		</RightMenuItemBase>
	)
}
RightMenuItemDelete.propTypes = {
	title: PropTypes.string,
	targetDocItem: PropTypes.object,
	sx: PropTypes.object
}

export const RightMenuItemMore = ({ sx }) => {
	const dispatch = useDispatch()
	return (
		<RightMenuItemBase
			Icon={<MoreHorizIcon />} sx={{ ...sx }}
			onClick={() => {
				/* This is to show TocSideBarDetails of current Doc */
				dispatch(setShowTocSideBarDetails(true))
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

const DocumentTocSideBar = () => {
	const { activeDocId } = useSelector(getDocsCenter)
	const { editorDataHeadings } = useSelector(getTextEditor)

	const { activeDoc } = useGetDocsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			activeDoc: data?.find((post) => post.docId === activeDocId) ?? {},
		})
	})

	return (
		<Box sx={{
			position: "sticky",
			display: { xs: "none", lg: "flex" },
			flexDirection: "column",
			width: "224px",
			backgroundColor: "#FFF",
		}}>

			{(activeDocId !== null) &&
				<div style={{ position: "sticky", top: "80px" }}>

					<Box sx={{
						borderLeft: "1px solid transparent",
						borderColor: "divider",
					}}>

						<RightMenuItemAddNewDoc targetDocItem={activeDoc} />
						<RightMenuItemImport targetDocItem={activeDoc} />
						<RightMenuItemExportPDF targetDocItem={activeDoc} />
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
								if (item.level > 2) return null
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

				</div>
			}
		</Box>
	)
}
DocumentTocSideBar.propTypes = { children: PropTypes.node }

export default DocumentTocSideBar