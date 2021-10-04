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

import React, { useState, useMemo } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { styled } from "@mui/material/styles"
import { Box, Button, IconButton, Typography, InputBase, ToggleButtonGroup, ToggleButton, Tooltip } from "@mui/material"

//THIRD-PARTY
import { serverTimestamp } from "firebase/firestore"
import { filter } from "lodash"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { DOC_STATUS, DOC_TYPE, LOCALUPDATE_DOCSLIST_ACTION } from "../../../helpers/constants"
import { getUiSettings, getDocsCenter, getAuth } from "./../../../redux/selectors"
import { docsUpdate } from "../../../helpers/firebase/docs"
import { updateDocsList } from "./../../../redux/slices/docsCenter"
import { RightMenuItemAddNewDoc, RightMenuItemDelete, RightMenuItemExportPDF, RightMenuItemImport } from "./../DocumentTocSideBar"

//ASSETS
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined"
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const TypographyHeader = styled(Typography)(({ theme }) => ({
	fontWeight: 700,
	textTransform: "uppercase",
	color: theme.palette.grey[500]
}))

const InputBaseStyled = (props) => <InputBase
	fullWidth
	variant="outlined"
	sx={{
		px: 1, py: 0.5,
		color: "grey.800",
		border: "1px solid transparent",
		borderColor: "divider",
	}}
	{...props}
/>

const PublishStatus = ({ setStatus, ...otherProps }) => {
	<ToggleButtonGroup
		exclusive
		size="small"
		onChange={(event, selectedStatus) => {
			if (selectedStatus) {
				setStatus(selectedStatus)
			}
		}}
		{...otherProps}
	>
		<ToggleButton value={DOC_STATUS.DRAFT}>
			<Tooltip title="Draft" placement="top">
				<DraftsOutlinedIcon sx={{ fontSize: 20, px: 3 }} />
			</Tooltip>
		</ToggleButton>
		<ToggleButton value={DOC_STATUS.PUBLISHED}>
			<Tooltip title="Publish" placement="top">
				<PublishOutlinedIcon sx={{ fontSize: 20, px: 3 }} />
			</Tooltip>
		</ToggleButton>
	</ToggleButtonGroup>
}
PublishStatus.propTypes = { setStatus: PropTypes.func }

const Tags = () => {
	return (
		<Typography>will implement later</Typography>
	)
}

const CancelSaveButtons = ({ saveAction }) => (
	<Box sx={{
		display: "flex",
		justifyContent: "space-between",
		mt: 3, pt: 3,
		borderTop: "1px solid transparent",
		borderColor: "divider",
	}}>
		<Button
			onClick={() => { handleClose() }}
			variant="outlined"
			color="primary"
			sx={{ px: 3 }}
		>
			Cancel
		</Button>
		<Button
			onClick={() => { saveAction() }}
			type="submit"
			variant="contained"
			color="primary"
			sx={{ px: 3 }}
		>
			Save
		</Button>
	</Box>
)
CancelSaveButtons.propTypes = { saveAction: PropTypes.func }

/**
 * 	Category || Sub-Category, use the same DetailsForm as below
 *  for they are all the same data fields
 */
const DetailsFormCategory = ({ docItem }) => {
	const { docsListRaw } = useSelector(getDocsCenter)
	const { currentUser } = useSelector(getAuth)

	const [slug, setSlug] = useState(docItem.slug)
	const [name, setName] = useState(
		docItem.type === DOC_TYPE.CATEGORY ? docItem.category : docItem.subcategory
	)
	const [description, setDescription] = useState(docItem.description)

	const dispatch = useDispatch()

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
			}}
		>
			<TypographyHeader sx={{ mb: 1 }}>
				{(docItem.type === DOC_TYPE.CATEGORY) ? "Category" : "Sub-Category"}
			</TypographyHeader>
			<InputBaseStyled
				id={(docItem.type === DOC_TYPE.CATEGORY) ? "cat-title" : "subcat-title"}
				value={name}
				onChange={
					(e) => setName(e.target.value)
				}
			/>

			<TypographyHeader sx={{ mt: 3, mb: 1 }}>
				Slug
			</TypographyHeader>
			<InputBaseStyled
				id="cat-slug" value={slug}
				onChange={
					(e) => setSlug(e.target.value)
				}
			/>

			<TypographyHeader sx={{ mt: 3, mb: 1 }}>
				Description
			</TypographyHeader>
			<InputBaseStyled
				id="cat-description" value={description}
				multiline={true}
				onChange={
					(e) => setDescription(e.target.value)
				}
			/>

			<CancelSaveButtons
				saveAction={() => {
					//prepare the affectedItems
					const affectedItems = filter(
						docsListRaw,
						(docItem.type === DOC_TYPE.CATEGORY)
							? { category: docItem.category }
							: { category: docItem.category, subcategory: docItem.subcategory }
					)

					//prepare the data
					const newCategoryOrSubCatMeta = {
						docId: docItem.docId,
						type: docItem.type,
						...(
							docItem.type === DOC_TYPE.CATEGORY
								? { category: name }
								: { subcategory: name }
						),
						slug: slug,
						description: description,
						updatedBy: currentUser.username,
						updatedAt: serverTimestamp()
					}

					//update Redux
					dispatch(updateDocsList({
						type: LOCALUPDATE_DOCSLIST_ACTION.UPDATE_CAT,
						docItem: newCategoryOrSubCatMeta,
						affectedItems: affectedItems
					}))

					//update DB
					docsUpdate(
						newCategoryOrSubCatMeta,
						affectedItems
					)
				}}
			/>
		</form>
	)
}
DetailsFormCategory.propTypes = { docItem: PropTypes.object }

const DetailsFormDoc = ({ docItem }) => {
	const { currentUser } = useSelector(getAuth)

	const [title, setTitle] = useState(docItem.title)
	const [slug, setSlug] = useState(docItem.slug)
	const [description, setDescription] = useState(docItem.description)
	// const [tags, setTags] = useState(docItem.tags)
	const [status, setStatus] = useState(docItem.status)

	const dispatch = useDispatch()

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
			}}
		>
			<TypographyHeader sx={{ mb: 1 }}>
				Document
			</TypographyHeader>
			<InputBaseStyled
				id="doc-title"
				value={title}
				onChange={
					(e) => setTitle(e.target.value)
				}
			/>

			<TypographyHeader sx={{ mt: 3, mb: 1 }}>
				Slug
			</TypographyHeader>
			<InputBaseStyled
				id="doc-slug" value={slug}
				onChange={
					(e) => setSlug(e.target.value)
				}
			/>

			<TypographyHeader sx={{ mt: 3, mb: 1 }}>
				Description
			</TypographyHeader>
			<InputBaseStyled
				id="doc-description" value={description}
				multiline={true}
				onChange={
					(e) => setDescription(e.target.value)
				}
			/>

			<TypographyHeader sx={{ mt: 3, mb: 1 }}>
				Tags
			</TypographyHeader>
			<Tags />

			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<TypographyHeader sx={{ mt: 3, mb: 1 }}>
					Status
				</TypographyHeader>
				<PublishStatus value={status} setStatus={setStatus} />
			</Box>

			<CancelSaveButtons
				saveAction={() => {
					//prepare the data
					const newDocMeta = {
						docId: docItem.docId, //must included here
						type: docItem.type,
						title: title,
						slug: slug,
						description: description,
						status: status,
						// tags: tags,
						updatedBy: currentUser.username,
						updatedAt: serverTimestamp()
					}

					//update Redux
					dispatch(updateDocsList({
						type: LOCALUPDATE_DOCSLIST_ACTION.UPDATE_DOC,
						docItem: newDocMeta
					}))

					//update DB
					docsUpdate(newDocMeta, [/* no affectedItems! */])
				}}
			/>
		</form>
	)
}
DetailsFormDoc.propTypes = { docItem: PropTypes.object }

const DetailsFormExternal = ({ docItem }) => {
	const { currentUser } = useSelector(getAuth)

	const [title, setTitle] = useState(docItem.title)
	const [url, setUrl] = useState(docItem.url)
	const [description, setDescription] = useState(docItem.description)
	// const [tags, setTags] = useState(docItem.tags)
	const [status, setStatus] = useState(docItem.status)

	const dispatch = useDispatch()

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
			}}
		>
			<TypographyHeader sx={{ mb: 1 }}>
				External Link
			</TypographyHeader>
			<InputBaseStyled
				id="external-title"
				value={title}
				onChange={
					(e) => setTitle(e.target.value)
				}
			/>

			<TypographyHeader sx={{ mt: 3, mb: 1 }}>
				url
			</TypographyHeader>
			<InputBaseStyled
				id="external-url" value={url}
				onChange={
					(e) => setUrl(e.target.value)
				}
			/>

			<TypographyHeader sx={{ mt: 3, mb: 1 }}>
				Description
			</TypographyHeader>
			<InputBaseStyled
				id="external-description" value={description}
				multiline={true}
				onChange={
					(e) => setDescription(e.target.value)
				}
			/>

			<TypographyHeader sx={{ mt: 3, mb: 1 }}>
				Tags
			</TypographyHeader>
			<Tags />

			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<TypographyHeader sx={{ mt: 3, mb: 1 }}>
					Status
				</TypographyHeader>
				<PublishStatus value={status} setStatus={setStatus} />
			</Box>

			<CancelSaveButtons
				saveAction={() => {
					//prepare the data
					const newExternalMeta = {
						docId: docItem.docId, //must included here
						type: docItem.type,
						title: title,
						url: url,
						description: description,
						status: status,
						// tags: tags,
						updatedBy: currentUser.username,
						updatedAt: serverTimestamp()
					}

					//update Redux
					dispatch(updateDocsList({
						type: LOCALUPDATE_DOCSLIST_ACTION.UPDATE_EXTERNAL,
						docItem: newExternalMeta
					}))

					docsUpdate(newExternalMeta, [/* no affectedItems */]
					)
				}}
			/>
		</form>
	)
}
DetailsFormExternal.propTypes = { docItem: PropTypes.object }


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarDetails = ({ open, handleClose }) => {
	const { sideBarLeft } = useSelector(getUiSettings)
	const { docsListRaw, activeDocIdOfTocSideBarDetails } = useSelector(getDocsCenter)

	//Note: docItem = {..} or undefined
	const docItem = useMemo(() => {
		const filterRes = filter(docsListRaw, (i) => i.docId === activeDocIdOfTocSideBarDetails)
		return filterRes[0]
	}, [activeDocIdOfTocSideBarDetails, docsListRaw])

	if (docItem === undefined) return null

	return (
		<>
			<Box sx={{
				position: "fixed",
				zIndex: 150,
				display: "flex",
				flexDirection: "column",
				alignItems: "stretch",
				left: `${sideBarLeft + 556}px`,
				minWidth: "385px",
				height: "100%",
				backgroundColor: "#FFF",
				borderRight: "1px solid",
				borderColor: "divider",
				...(open ?
					{
						opacity: 1,
						visibility: "visible",
						transition: "0.5s opacity, 0 0.5s visibility"
					} : {
						opacity: 0,
						visibility: "hidden",
						transition: "0.5s opacity, 0.5s visibility"
					}
				)
			}}>
				<Box sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					px: 3, py: 1,
					borderBottom: "1px solid transparent",
					borderColor: "divider",
				}}>
					<TypographyHeader>{docItem.Type}</TypographyHeader>
					<IconButton onClick={() => { handleClose() }}>
						<ArrowBackIcon />
					</IconButton>
				</Box>

				<Box sx={{
					mx: 3, pt: 3, pb: 3,
					borderBottom: "1px solid transparent",
					borderColor: "divider",
				}}>

					{(docItem.type === DOC_TYPE.CATEGORY
						|| docItem.type === DOC_TYPE.SUBCATEGORY) &&
						<DetailsFormCategory docItem={docItem} />}

					{(docItem.type === DOC_TYPE.EXTERNAL) &&
						<DetailsFormExternal docItem={docItem} />}

					{(docItem.type === DOC_TYPE.DOC) &&
						<DetailsFormDoc docItem={docItem} />}

				</Box>

				<Box sx={{ mt: 3 }}>

					<RightMenuItemAddNewDoc docItem={docItem} sx={{ px: 3 }} />
					<RightMenuItemImport docItem={docItem} sx={{ px: 3 }} />

					{(docItem.type === DOC_TYPE.CATEGORY) &&
						<RightMenuItemDelete docItem={docItem} title="Delete this category" sx={{ px: 3 }} />}

					{(docItem.type === DOC_TYPE.SUBCATEGORY) &&
						<RightMenuItemDelete docItem={docItem} title="Delete this sub-category" sx={{ px: 3 }} />}

					{(docItem.type === DOC_TYPE.DOC) &&
						<RightMenuItemExportPDF docItem={docItem} sx={{ px: 3 }} />}

					{(docItem.type === DOC_TYPE.DOC || docItem.type === DOC_TYPE.EXTERNAL) &&
						<RightMenuItemDelete docItem={docItem} sx={{ px: 3 }} />}

				</Box>
			</Box >

			{/* This is the backdrop when TocSideBarDetails showed */}
			<Box
				onClick={() => { handleClose() }}
				sx={{
					position: "fixed",
					zIndex: 149,
					display: open ? "block" : "none",
					left: `${sideBarLeft + 556}px`,
					minWidth: "100%",
					height: "100%",
					backgroundColor: "action.disabled",
				}}
			/>
		</>
	)
}
TocSideBarDetails.propTypes = {
	open: PropTypes.bool,
	handleClose: PropTypes.func,
}

export default TocSideBarDetails