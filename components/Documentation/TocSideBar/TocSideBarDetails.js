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

import React, { useState, useMemo, useEffect } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { styled } from "@mui/material/styles"
import { Box, Button, IconButton, Typography, InputBase, ToggleButtonGroup, ToggleButton, Tooltip, TextField } from "@mui/material"

//THIRD-PARTY
import { filter } from "lodash"
import { useSelector } from "react-redux"

//PROJECT IMPORT
import { DOC_STATUS, DOC_TYPE } from "../../../helpers/constants"
import { getUiSettings, getDocsCenter, getAuth } from "./../../../redux/selectors"
import { RightMenuItemAddNewDoc, RightMenuItemDelete, RightMenuItemExportPDF, RightMenuItemImport } from "./../DocumentTocSideBar"

//ASSETS
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined"
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined"
import { useGetDocsQuery, useUpdateDocMutation } from "../../../redux/slices/firestoreApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const TypographyHeader = styled(Typography)(({ theme }) => ({
	fontWeight: 700,
	textTransform: "uppercase",
	color: theme.palette.grey[500]
}))

const InputBaseStyled = (props) => <TextField
	fullWidth
	variant="outlined"
	sx={{
		color: "grey.800",
		borderColor: "divider",
	}}
	{...props}
/>

const PublishStatus = ({ setStatus, ...otherProps }) => (
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
				<DraftsOutlinedIcon />
			</Tooltip>
		</ToggleButton>
		<ToggleButton value={DOC_STATUS.PUBLISHED}>
			<Tooltip title="Publish" placement="top">
				<PublishOutlinedIcon />
			</Tooltip>
		</ToggleButton>
	</ToggleButtonGroup>
)
PublishStatus.propTypes = { setStatus: PropTypes.func }

const Tags = () => {
	return (
		<Typography>will implement later</Typography>
	)
}

const CancelSaveButtons = ({ saveAction, handleClose }) => (
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
			onClick={() => {
				saveAction()
				handleClose()
			}}
			type="submit"
			variant="contained"
			color="primary"
			sx={{ px: 3 }}
		>
			Save
		</Button>
	</Box>
)
CancelSaveButtons.propTypes = {
	saveAction: PropTypes.func,
	handleClose: PropTypes.func
}

/**
 * 	Category || Sub-Category, use the same DetailsForm as below
 *  for they are all the same data fields
 */
const DetailsFormCategory = ({ docItem, handleClose }) => {
	const allDocsRaw = useGetDocsQuery(undefined)
	const [updateDoc] = useUpdateDocMutation()
	const { currentUser } = useSelector(getAuth)

	const [slug, setSlug] = useState(docItem.slug)
	const [name, setName] = useState(
		docItem.type === DOC_TYPE.CATEGORY
			? docItem.category
			: docItem.subcategory
	)
	const [description, setDescription] = useState(docItem.description)

	useEffect(() => {
		setSlug(docItem.slug)
		setName(docItem.type === DOC_TYPE.CATEGORY
			? docItem.category
			: docItem.subcategory)
		setDescription(docItem.description)
	}, [docItem.slug, docItem.category, docItem.subcategory, docItem.type, docItem.description])

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
			}}
		>
			<TypographyHeader sx={{ mb: 1 }}>
				Title
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
				minRows={3}
				onChange={
					(e) => setDescription(e.target.value)
				}
			/>

			<CancelSaveButtons
				handleClose={handleClose}
				saveAction={() => {
					//prepare the affectedItems
					const affectedItems = filter(
						allDocsRaw.data,
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
					}

					//update DB
					updateDoc({
						docItem: newCategoryOrSubCatMeta,
						affectedItems
					})
				}}
			/>
		</form>
	)
}
DetailsFormCategory.propTypes = {
	docItem: PropTypes.object,
	handleClose: PropTypes.func
}

const DetailsFormDoc = ({ docItem, handleClose }) => {
	const { currentUser } = useSelector(getAuth)
	const [updateDoc] = useUpdateDocMutation()

	const [slug, setSlug] = useState(docItem.slug)
	// const [tags, setTags] = useState(docItem.tags)
	const [title, setTitle] = useState(docItem.title)
	const [status, setStatus] = useState(docItem.status)
	const [description, setDescription] = useState(docItem.description)

	useEffect(() => {
		setSlug(docItem.slug)
		// setTags(docItem.tags)
		setTitle(docItem.title)
		setStatus(docItem.status)
		setDescription(docItem.description)
	}, [docItem.slug, docItem.title, docItem.status, docItem.description])

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
			}}
		>
			<TypographyHeader sx={{ mb: 1 }}>
				Title
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

			{/* <TypographyHeader sx={{ mt: 3, mb: 1 }}>
				Description
			</TypographyHeader>
			<InputBaseStyled
				id="doc-description" value={description}
				multiline={true}
				minRows={3}
				onChange={
					(e) => setDescription(e.target.value)
				}
			/> */}

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
				handleClose={handleClose}
				saveAction={() => {
					//prepare the data
					const newDocMeta = {
						docId: docItem.docId, 	//must be included
						type: docItem.type,		//must be included
						title: title,
						slug: slug,
						description: description,
						status: status,
						// tags: tags,
						updatedBy: currentUser.username,
					}

					//update DB
					updateDoc({
						docItem: newDocMeta,
						affectedItems: [/* no affectedItems! */]
					})
				}}
			/>
		</form>
	)
}
DetailsFormDoc.propTypes = {
	docItem: PropTypes.object,
	handleClose: PropTypes.func
}

const DetailsFormExternal = ({ docItem, handleClose }) => {
	const { currentUser } = useSelector(getAuth)
	const [updateDoc] = useUpdateDocMutation()

	const [url, setUrl] = useState(docItem.url)
	// const [tags, setTags] = useState(docItem.tags)
	const [title, setTitle] = useState(docItem.title)
	const [status, setStatus] = useState(docItem.status)
	const [description, setDescription] = useState(docItem.description)

	useEffect(() => {
		setUrl(docItem.url)
		// setTags(docItem.tags)
		setTitle(docItem.title)
		setStatus(docItem.status)
		setDescription(docItem.description)
	}, [docItem.url, docItem.title, docItem.status, docItem.description])

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
			}}
		>
			<TypographyHeader sx={{ mb: 1 }}>
				Title
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
				minRows={3}
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
				handleClose={handleClose}
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
					}

					//update DB
					updateDoc({
						docItem: newExternalMeta,
						affectedItems: [/* no affectedItems */]
					})
				}}
			/>
		</form>
	)
}
DetailsFormExternal.propTypes = {
	docItem: PropTypes.object,
	handleClose: PropTypes.func
}


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TocSideBarDetails = ({ handleClose }) => {
	const { activeDocIdOfTocSideBarDetails } = useSelector(getDocsCenter)
	const { isSideBarExpanded, sideBarLeft, showTocSideBarDetails } = useSelector(getUiSettings)

	const { docItem } = useGetDocsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			docItem: data?.find((post) => post.docId === activeDocIdOfTocSideBarDetails),
		})
	})

	if (docItem === undefined) return null

	console.log("docItem", docItem)

	return (
		<>
			<Box sx={{
				position: "fixed",
				zIndex: 150,
				display: "flex",
				flexDirection: "column",
				alignItems: "stretch",
				left: `${sideBarLeft + (isSideBarExpanded ? 257 : 69)}px`,
				minWidth: "385px",
				height: "100%",
				backgroundColor: "#FFF",
				borderRight: "1px solid",
				borderColor: "divider",
				...(showTocSideBarDetails ?
					{
						opacity: 1,
						visibility: "visible",
						transition: "opacity 0.5s, visibility 0 0.5s" //!! invalid property
					} : {
						opacity: 0,
						visibility: "hidden",
						transition: "opacity 0.5s, visibility 0.5s" //!! invalid property
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
					<TypographyHeader>{docItem.type}</TypographyHeader>
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
						<DetailsFormCategory docItem={docItem} handleClose={handleClose} />}

					{(docItem.type === DOC_TYPE.EXTERNAL) &&
						<DetailsFormExternal docItem={docItem} handleClose={handleClose} />}

					{(docItem.type === DOC_TYPE.DOC) &&
						<DetailsFormDoc docItem={docItem} handleClose={handleClose} />}

				</Box>

				<Box sx={{ mt: 3 }}>

					<RightMenuItemAddNewDoc targetDocItem={docItem} sx={{ px: 3 }} />
					<RightMenuItemImport targetDocItem={docItem} sx={{ px: 3 }} />

					{(docItem.type === DOC_TYPE.CATEGORY) &&
						<RightMenuItemDelete targetDocItem={docItem} title="Delete this category" sx={{ px: 3 }} />}

					{(docItem.type === DOC_TYPE.SUBCATEGORY) &&
						<RightMenuItemDelete targetDocItem={docItem} title="Delete this sub-category" sx={{ px: 3 }} />}

					{(docItem.type === DOC_TYPE.DOC) &&
						<RightMenuItemExportPDF targetDocItem={docItem} sx={{ px: 3 }} />}

					{(docItem.type === DOC_TYPE.DOC || docItem.type === DOC_TYPE.EXTERNAL) &&
						<RightMenuItemDelete targetDocItem={docItem} sx={{ px: 3 }} />}

				</Box>
			</Box >

			{/* This is the backdrop when TocSideBarDetails showed */}
			<Box
				onClick={() => { handleClose() }}
				sx={{
					position: "fixed",
					zIndex: 149,
					display: open ? "block" : "none",
					left: `${sideBarLeft + 300}px`,
					minWidth: "100%",
					height: "100%",
					backgroundColor: "action.disabled",
				}}
			/>
		</>
	)
}
TocSideBarDetails.propTypes = {
	handleClose: PropTypes.func,
}

export default TocSideBarDetails