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
import { styled } from "@mui/material/styles"
import { Autocomplete, Box, Button, Checkbox, Chip, FormControlLabel, IconButton, Switch, TextField, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import slugify from "react-slugify"
import { filter, isEqual } from "lodash"
import { useSelector } from "react-redux"
import relativeTime from "dayjs/plugin/relativeTime"

//PROJECT IMPORT
import useGetDoc from "@helpers/useGetDocs"
import useAppSettings from "@helpers/useAppSettings"
import { CircularProgressBox } from "@components/common"
import SettingsSwitch from "@components/common/SettingsSwitch"
import useLocalComponentCache from "@helpers/useLocalComponentCache"

import {
	DATE_FORMAT,
	DOC_STATUS,
	DOC_TYPE,
	SETTINGS_NAME
} from "@helpers/constants"

import {
	getUiSettings,
	getDocsCenter,
	getAuth
} from "@redux/selectors"

import {
	RightMenuItemAddNewDoc,
	RightMenuItemDelete,
	RightMenuItemExportPDF,
	RightMenuItemImport
} from "@components/Documentation/DocumentTocSideBar"

import {
	useGetDocsQuery,
	useUpdateDocMutation,
	useUpdateAppSettingsMutation
} from "@redux/slices/firestoreApi"

//ASSETS
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"

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

const PublishStatusSwitch = ({ status, setStatus }) => {
	const isPublished = status === DOC_STATUS.PUBLISHED
	dayjs.extend(relativeTime)
	return (
		<SettingsSwitch
			state={isPublished}
			setState={(status) => {
				if (status)
					setStatus(DOC_STATUS.PUBLISHED)
				else
					setStatus(DOC_STATUS.DRAFT)
			}}
			stateDescription={["DRAFT", "PUBLISHED"]}
		/>
	)
}
PublishStatusSwitch.propTypes = {
	status: PropTypes.string.isRequired,
	setStatus: PropTypes.func.isRequired,
}

const Tags = ({ tags, setTags }) => {
	const [inputText, setInputText] = useState("")
	const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
	const checkedIcon = <CheckBoxIcon fontSize="small" />

	console.log({ tags })
	return (
		<Autocomplete
			id="tags-input"
			multiple
			disableCloseOnSelect
			limitTags={3}
			options={tags}
			getOptionLabel={(option) => option}
			value={tags}
			noOptionsText="Enter to add new tag"
			style={{ maxWidth: 336 }}
			renderOption={(props, tag, { selected }) =>
				<li {...props}>
					<Checkbox
						icon={icon}
						checkedIcon={checkedIcon}
						style={{ marginRight: 8 }}
						checked={selected}
					/>
					{tag}
				</li>}
			renderInput={(params) =>
				<TextField
					{...params}
					variant="standard"
					value={inputText}
					onChange={(e) => {
						e.stopPropagation()
						setInputText(e.target.value)
					}}
					onKeyPress={(e) => {
						e.stopPropagation()
						if (e.key === "Enter") {
							if (tags.includes(inputText) === false)
								setTags([...tags, inputText].sort(), "tags")
							setInputText("")
						}
					}}
				/>}
			renderTags={(tags, getTagProps) =>
				tags.map((selectedTag, index) => (
					<Chip
						key={index}
						label={selectedTag}
						{...getTagProps({ index })}
						onDelete={(e) => {
							e.stopPropagation()
							const tagIndex = tags.findIndex(tag => tag === selectedTag)
							const newTags = [...tags]
							newTags.splice(tagIndex, 1)
							setTags(newTags, "tags")
						}}
					/>
				))
			}
			onChange={(event, value) => { setTags(value, "tags") }}
		/>
	)
}
Tags.propTypes = {
	tags: PropTypes.array.isRequired,
	setTags: PropTypes.func.isRequired
}

const CancelSaveButtons = ({ isModified, saveAction, handleClose }) => (
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
			sx={{ px: 3, minWidth: "100px" }}
		>
			Cancel
		</Button>
		<Button
			// type="submit"
			variant="contained"
			color="primary"
			disabled={!isModified}
			sx={{ px: 3, minWidth: "100px" }}
			onClick={() => { saveAction() }}
		>
			Save
		</Button>
	</Box>
)
CancelSaveButtons.propTypes = {
	isModified: PropTypes.bool.isRequired,
	saveAction: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired
}

/**
 * 	Category || Sub-Category, use the same DetailsForm as below
 *  for they are all the same data fields
 */
const DetailsFormCategory = ({ docItem, handleClose }) => {
	const allDocsRaw = useGetDocsQuery(undefined)
	const [updateDoc] = useUpdateDocMutation()

	const autoGenerateSlugFromTitle = useAppSettings(SETTINGS_NAME.autoGenerateSlugFromTitle)
	const [updateAppSettings] = useUpdateAppSettingsMutation()

	const { currentUser } = useSelector(getAuth)

	const {
		localCache,
		handlers: { setLocalCache }
	} = useLocalComponentCache({
		title: docItem.title,
		slug: docItem.slug,
		name: docItem.type === DOC_TYPE.CATEGORY
			? docItem.category
			: docItem.subcategory,
		description: docItem.description
	})

	const isModified =
		docItem.title !== localCache.title
		|| docItem.slug !== localCache.slug
		|| docItem.description !== localCache.description

	const handleSaveCategoryDetails = async () => {
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
			title: localCache.title,
			slug: localCache.slug,
			description: localCache.description,
			updatedBy: currentUser.username,
			...(
				docItem.type === DOC_TYPE.CATEGORY
					? { category: localCache.name }
					: { subcategory: localCache.name }
			),
		}

		console.log("newCategoryOrSubCatMeta", newCategoryOrSubCatMeta)

		//update DB
		updateDoc({
			docItem: newCategoryOrSubCatMeta,
			affectedItems
		})
	}

	return (
		<form onSubmit={(e) => { e.preventDefault() }}>
			<TypographyHeader sx={{ mb: 1 }}>
				Title
			</TypographyHeader>
			<InputBaseStyled
				id={(docItem.type === DOC_TYPE.CATEGORY) ? "cat-title" : "subcat-title"}
				value={localCache.name}
				onChange={(e) => {
					setLocalCache(e.target.value, "name")
					if (autoGenerateSlugFromTitle) {
						setLocalCache(slugify(e.target.value), "slug")
					}
				}}
			/>

			<Box sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				mt: 2
			}}>
				<TypographyHeader sx={{ flexGrow: 1 }}>
					Slug
				</TypographyHeader>
				<FormControlLabel label="Auto-generate" labelPlacement="start"
					control={<Switch
						checked={autoGenerateSlugFromTitle}
						onChange={() => {
							updateAppSettings({
								[SETTINGS_NAME.autoGenerateSlugFromTitle]: !autoGenerateSlugFromTitle
							})
						}}
					/>}
				/>
			</Box>
			<InputBaseStyled
				id="cat-slug"
				value={localCache.slug}
				onChange={(e) => setLocalCache(e.target.value, "slug")}
				disabled={autoGenerateSlugFromTitle}
				sx={{
					...(autoGenerateSlugFromTitle && {
						backgroundColor: "action.hover",
						borderRadius: "0.25rem"
					})
				}}
			/>

			<TypographyHeader sx={{ mt: 3, mb: 1 }}>
				Description
			</TypographyHeader>
			<InputBaseStyled
				id="cat-description" value={localCache.description}
				multiline={true}
				minRows={3}
				onChange={
					(e) => setLocalCache(e.target.value, "description")
				}
			/>

			<CancelSaveButtons
				isModified={isModified}
				handleClose={handleClose}
				saveAction={handleSaveCategoryDetails}
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

	const [updateAppSettings] = useUpdateAppSettingsMutation()
	const autoGenerateSlugFromTitle = useAppSettings(SETTINGS_NAME.autoGenerateSlugFromTitle)

	const {
		localCache,
		handlers: { setLocalCache }
	} = useLocalComponentCache(docItem)

	const isModified =
		docItem.title !== localCache.title
		|| docItem.slug !== localCache.slug
		|| !isEqual(docItem.tags, localCache.tags)
		|| docItem.status !== localCache.status

	const handleSaveDocDetails = async () => {
		//prepare the data
		const newDocMeta = {
			docId: docItem.docId, 	//must be included
			type: docItem.type,		//must be included
			title: localCache.title,
			slug: localCache.slug,
			description: localCache.description,
			status: localCache.status,
			tags: localCache.tags,
			updatedBy: currentUser.username,
			...(
				(docItem.status !== localCache.status
					&& localCache.status === DOC_STATUS.PUBLISHED)
					? {
						status: DOC_STATUS.PUBLISHED,
						publishedBy: currentUser.username,
						publishedDate: dayjs().valueOf()
					}
					: {
						status: DOC_STATUS.DRAFT,
						publishedBy: "",
						publishedDate: 0
					}
			)
		}

		//update DB
		updateDoc({
			docItem: newDocMeta,
			affectedItems: [/* no affectedItems! */]
		})
	}

	return (
		<form onSubmit={(e) => { e.preventDefault() }}>
			<TypographyHeader sx={{ mb: 1 }}>
				Title
			</TypographyHeader>
			<InputBaseStyled
				id="doc-title"
				value={localCache.title}
				onChange={(e) => {
					setLocalCache(e.target.value, "title")
					if (autoGenerateSlugFromTitle) {
						setLocalCache(slugify(e.target.value), "slug")
					}
				}}
			/>

			<Box sx={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				mt: 2
			}}>
				<TypographyHeader sx={{ flexGrow: 1 }}>
					Slug
				</TypographyHeader>
				<FormControlLabel label="Auto-generate" labelPlacement="start"
					control={<Switch
						checked={autoGenerateSlugFromTitle}
						onChange={() => {
							updateAppSettings({
								[SETTINGS_NAME.autoGenerateSlugFromTitle]: !autoGenerateSlugFromTitle
							})
						}}
					/>}
				/>
			</Box>
			<InputBaseStyled
				id="doc-slug" value={localCache.slug}
				onChange={(e) => setLocalCache(e.target.value, "slug")}
				disabled={autoGenerateSlugFromTitle}
				sx={{
					...(autoGenerateSlugFromTitle && {
						backgroundColor: "action.hover",
						borderRadius: "0.25rem"
					})
				}}
			/>

			<TypographyHeader sx={{ mt: 3, mb: 1 }}>
				Tags
			</TypographyHeader>

			<Tags
				tags={localCache?.tags ?? []}
				setTags={setLocalCache}
			/>

			<Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<TypographyHeader sx={{ mt: 1, mb: 1 }}>
						Status
					</TypographyHeader>

					<PublishStatusSwitch
						status={localCache.status}
						setStatus={(status) => setLocalCache(status, "status")}
					/>
				</Box>
				{(localCache.status === DOC_STATUS.PUBLISHED) &&
					<Typography variant="caption" sx={{
						textAlign: "right",
						fontSize: "0.8rem",
						color: "text.secondary",
					}}>
						Published at {dayjs(localCache.publishedDate ? localCache.publishedDate : undefined).format(DATE_FORMAT.LONG)}<br />
						by {localCache.publishedBy ? localCache.publishedBy : currentUser.username}<br />
						<span style={{ fontStyle: "italic" }}>({dayjs(localCache.publishedDate ? localCache.publishedDate : undefined).fromNow()})</span>
					</Typography>}
			</Box>
			<CancelSaveButtons
				isModified={isModified}
				handleClose={handleClose}
				saveAction={handleSaveDocDetails}
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

	const {
		localCache,
		handlers: { setLocalCache }
	} = useLocalComponentCache(docItem)

	const isModified =
		docItem.title !== localCache.title
		|| docItem.url !== localCache.url
		|| docItem.description !== localCache.description
		|| !isEqual(docItem.tags, localCache.tags)
		|| docItem.status !== localCache.status

	const handleSaveExternalDetails = async () => {
		//prepare the data
		const newExternalMeta = {
			docId: docItem.docId, //must included here
			type: docItem.type,
			title: localCache.title,
			url: localCache.url,
			description: localCache.description,
			status: localCache.status,
			tags: localCache.tags,
			updatedBy: currentUser.username,
			...(
				(docItem.status !== localCache.status
					&& localCache.status === DOC_STATUS.PUBLISHED)
					? {
						status: DOC_STATUS.PUBLISHED,
						publishedBy: currentUser.username,
						publishedDate: dayjs().valueOf()
					}
					: {
						status: DOC_STATUS.DRAFT,
						publishedBy: "",
						publishedAt: 0
					}
			)
		}

		//update DB
		await updateDoc({
			docItem: newExternalMeta,
			affectedItems: [/* no affectedItems */]
		})
	}

	return (
		<form onSubmit={(e) => { e.preventDefault() }}>
			<TypographyHeader sx={{ mb: 1 }}>
				Title
			</TypographyHeader>
			<InputBaseStyled
				id="external-title"
				value={localCache.title}
				onChange={
					(e) => setLocalCache(e.target.value, "title")
				}
			/>

			<TypographyHeader sx={{ mt: 3, mb: 1 }}>
				url
			</TypographyHeader>
			<InputBaseStyled
				id="external-url" value={localCache.url}
				onChange={
					(e) => setLocalCache(e.target.value, "url")
				}
			/>

			<TypographyHeader sx={{ mt: 3, mb: 1 }}>
				Description
			</TypographyHeader>
			<InputBaseStyled
				id="external-description" value={localCache.description}
				multiline={true}
				minRows={3}
				onChange={
					(e) => setLocalCache(e.target.value, "description")
				}
			/>

			<TypographyHeader sx={{ mt: 3, mb: 1 }}>
				Tags
			</TypographyHeader>

			<Tags
				tags={localCache?.tags ?? []}
				setTags={setLocalCache}
			/>

			<Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
					<TypographyHeader sx={{ mt: 1, mb: 1 }}>
						Status
					</TypographyHeader>

					<PublishStatusSwitch
						status={localCache.status}
						setStatus={(status) => setLocalCache(status, "status")}
					/>
				</Box>
				{(localCache.status === DOC_STATUS.PUBLISHED) &&
					<Typography variant="caption" sx={{
						textAlign: "right",
						fontSize: "0.8rem",
						color: "text.secondary",
					}}>
						Published at {dayjs(localCache.publishedDate ? localCache.publishedDate : undefined).format(DATE_FORMAT.LONG)}<br />
						by {localCache.publishedBy ? localCache.publishedBy : currentUser.username}<br />
						<span style={{ fontStyle: "italic" }}>({dayjs(localCache.publishedDate ? localCache.publishedDate : undefined).fromNow()})</span>
					</Typography>}
			</Box>

			<CancelSaveButtons
				isModified={isModified}
				handleClose={handleClose}
				saveAction={handleSaveExternalDetails}
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

	const {
		isSideBarExpanded,
		sideBarLeft,
		showTocSideBarDetails
	} = useSelector(getUiSettings)

	const {
		data: docItem,
		isLoading: isLoadingDocItem
	} = useGetDoc(activeDocIdOfTocSideBarDetails)

	console.log("TocSideBarDetails => activeDocIdOfTocSideBarDetails", activeDocIdOfTocSideBarDetails)
	console.log("TocSideBarDetails => docItem", docItem)

	return (
		<>
			<Box id="TocSideBarDetails" sx={{
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
				...(showTocSideBarDetails
					? {
						opacity: 1,
						visibility: "visible",
						transition: "opacity 0.5s, visibility 0 0.5s" //!! invalid property
					}
					: {
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
					<TypographyHeader>{docItem?.type}</TypographyHeader>
					<IconButton onClick={() => { handleClose() }}>
						<ArrowBackIcon />
					</IconButton>
				</Box>

				{isLoadingDocItem
					? <CircularProgressBox />
					: (docItem !== undefined)
						? <>
							<Box sx={{
								mx: 3, pt: 3, pb: 3,
								borderColor: "divider",
								borderBottom: "1px solid transparent",
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

								<RightMenuItemAddNewDoc
									sx={{ px: 3 }}
									targetDocItem={docItem}
								/>

								<RightMenuItemImport
									sx={{ px: 3 }}
									targetDocItem={docItem}
								/>

								{(docItem.type === DOC_TYPE.CATEGORY) &&
									<RightMenuItemDelete
										targetDocItem={docItem}
										title="Delete this category"
										sx={{ px: 3 }}
									/>}

								{(docItem.type === DOC_TYPE.SUBCATEGORY) &&
									<RightMenuItemDelete
										sx={{ px: 3 }}
										targetDocItem={docItem}
										title="Delete this sub-category"
									/>}

								{(docItem.type === DOC_TYPE.DOC) &&
									<RightMenuItemExportPDF
										sx={{ px: 3 }}
										targetDocItem={docItem}
									/>}

								{(docItem.type === DOC_TYPE.DOC || docItem.type === DOC_TYPE.EXTERNAL) &&
									<RightMenuItemDelete
										sx={{ px: 3 }}
										targetDocItem={docItem}
									/>}

							</Box>
						</>
						: null}
			</Box>

			{/* This is the backdrop when TocSideBarDetails showed */}
			<Box
				onClick={() => { handleClose() }}
				sx={{
					position: "fixed",
					zIndex: 149,
					display: showTocSideBarDetails ? "block" : "none",
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