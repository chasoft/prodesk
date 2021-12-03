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

import dynamic from "next/dynamic"
import PropTypes from "prop-types"
import React, { useState } from "react"

// MATERIAL-UI
import { emphasize, styled } from "@mui/material/styles"
import { Autocomplete, Avatar, Box, Button, Checkbox, Chip, CircularProgress, FormControl, FormControlLabel, IconButton, InputBase, Switch, TextField, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { filter, isEqual } from "lodash"
import { useDeepCompareEffect } from "react-use"
import { useSelector } from "react-redux"
import dayjs from "dayjs"
import PerfectScrollbar from "react-perfect-scrollbar"
import relativeTime from "dayjs/plugin/relativeTime"
import slugify from "react-slugify"

//PROJECT IMPORT
import { useGetDoc } from "@helpers/useGetDocs"
import useAppSettings from "@helpers/useAppSettings"
import { deleteFile, STORAGE_DESTINATION, useUploadFile } from "@helpers/storageApi"
import { CircularProgressBox, LinearProgressWithLabel } from "@components/common"
import { SettingsSwitch } from "@components/common/Settings"
import usePopupContainer from "@components/common/usePopupContainer"
import useLocalComponentCache from "@helpers/useLocalComponentCache"

import {
	CODE,
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
} from "@components/Documentation/DocumentTocSideBar"

import {
	useGetDocsQuery,
	useUpdateDocMutation,
	useUpdateAppSettingsMutation
} from "@redux/slices/firestoreApi"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank"
import UploadIcon from "@mui/icons-material/Upload"
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined"
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const Picker = dynamic(
	() => import("emoji-picker-react"),
	{
		loading: () => <CircularProgressBox minHeight="250px" sx={{ width: "278px" }} />,
		ssr: false
	}
)

const HexColorPicker = dynamic(
	() => import("react-colorful").then((mod) => mod.HexColorPicker),
	{
		loading: () => <CircularProgressBox minHeight="200px" sx={{ width: "200px" }} />,
		ssr: false
	}
)

const TypographyHeader = styled(Typography)(({ theme }) => ({
	fontWeight: 700,
	textTransform: "uppercase",
	color: theme.palette.grey[500]
}))

const InputBaseStyled = (props) => {
	const [minRows, setMinRows] = useState(1)
	return (
		<TextField
			fullWidth
			variant="outlined"
			minRows={minRows}
			onBlur={() => setMinRows(1)}
			onFocus={() => setMinRows(3)}
			sx={{
				color: "grey.800",
				borderColor: "divider",
			}}
			{...props}
		/>
	)
}

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
							if (tags.includes(inputText) === false && !!inputText)
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

const PublishStatusSection = ({ localCache, setLocalCache }) => {
	const { currentUser } = useSelector(getAuth)
	return (
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
	)
}
PublishStatusSection.propTypes = {
	localCache: PropTypes.object.isRequired,
	setLocalCache: PropTypes.func.isRequired
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

export const AddEmojiButton = ({ emoji, handleSelectEmoji, removeEmoji, flexDirection, children }) => {

	const [
		PopupContainer,
		open,
		anchorRef,
		{
			handleToggle,
			handleClose
		}
	] = usePopupContainer()

	const handleRemoveEmoji = () => {
		if (emoji) {
			removeEmoji()
		}
	}

	return (
		<>
			<Box sx={{
				display: "flex",
				alignItems: "center",
				flexDirection: flexDirection ?? "row"
			}}>
				{children}
				<Box sx={{
					display: "flex",
					"& #removeEmojiBtn": {
						display: "none"
					},
					":hover": {
						"& #removeEmojiBtn": {
							display: "block"
						}
					}
				}}>
					<Tooltip arrow title={emoji ? "Change Emoji" : "Add Emoji"} placement="top">
						<IconButton
							size="small"
							sx={{ mx: 1 }}
							ref={anchorRef}
							onClick={handleToggle}
						>
							{emoji
								? emoji
								: <AddIcon sx={{ color: "silver" }} />}
						</IconButton>
					</Tooltip>

					{emoji
						&& <div id="removeEmojiBtn">
							<Tooltip arrow title="Remove Emoji" placement="top">
								<IconButton
									size="small"
									sx={{
										position: "relative",
										ml: -2,
										mt: -0.5
									}}
									onClick={handleRemoveEmoji}
								>
									<RemoveCircleOutlineOutlinedIcon sx={{ fontSize: 24 }} />
								</IconButton>
							</Tooltip>
						</div>}
				</Box>
			</Box>

			<PopupContainer
				open={open}
				anchorRef={anchorRef}
				handleClose={handleClose}
				placement="bottom-start"
				transformOrigin="top left"
				elevation={1}
			>

				<Picker
					onEmojiClick={(event, { emoji }) => {
						handleSelectEmoji(emoji)
						handleClose(event)
					}}
				/>

			</PopupContainer>
		</>
	)
}
AddEmojiButton.propTypes = {
	isLoading: PropTypes.bool,
	emoji: PropTypes.string,
	removeEmoji: PropTypes.func,
	handleSelectEmoji: PropTypes.func,
	flexDirection: PropTypes.string,
	children: PropTypes.node
}

const DocPhoto = ({ username, docId, photo = "", photoColor, setPhotoColor }) => {
	const [message, setMessage] = useState({ code: "", message: "" })
	const [uploadFile, { uploading, progress }] = useUploadFile()

	const [updateDoc] = useUpdateDocMutation()

	const [
		PopupContainer,
		open,
		anchorRef,
		{
			handleToggle,
			handleClose
		}
	] = usePopupContainer()

	useDeepCompareEffect(() => {
		const timeoutId = setTimeout(() => { setMessage({ code: "none", message: "" }) }, 2000)
		return function cleanup() {
			clearTimeout(timeoutId)
		}
	}, [message])

	const handleSelectAndUploadFile = async (e) => {
		const file = e.target.files[0]

		if (!file) return

		if (file.size > 1024000) {
			setMessage({
				code: CODE.FAILED,
				message: "File size cannot exceed more than 1MB"
			})
			return
		}

		// const extension = file.type.split("/")[1]
		/*
			Currently, i don't want to deal with searching files
			then, I use fixed fileRef which distinguish by docId
		*/
		const extension = "png"
		const photoURL = await uploadFile(
			file,
			`${STORAGE_DESTINATION.DOCS}/${docId}.${extension}`
		)

		await updateDoc({
			docItem: {
				docId,
				photo: photoURL,
				updatedBy: username
			},
			affectedItems: []
		})
	}

	const handleRemovePhoto = async () => {
		const res = await deleteFile(`/${STORAGE_DESTINATION.DOCS}/${docId}.png`)

		setMessage({
			code: res?.data?.code,
			message: res?.data?.message,
		})

		await updateDoc({
			docItem: {
				docId,
				photo: "",
				updatedBy: username
			},
			affectedItems: []
		})
	}

	return (
		<>
			<TypographyHeader sx={{ mt: 3, mb: 1 }}>
				Photo
			</TypographyHeader>
			<Box sx={{
				display: "flex",
				my: 2,
			}}>
				<Box sx={{
					display: "flex",
					flexDirection: "column",
					width: "150px",
					height: "100px",
					mr: 2,
					"& #removePhotoBtn": {
						display: "none"
					},
					":hover #removePhotoBtn": {
						display: "block"
					}
				}}>
					<div>
						<Avatar
							variant="square"
							src={photo ?? "/img/no-image.png"}
							sx={{
								position: "absolute",
								width: 150,
								height: 100,
								"& >img": {
									objectFit: "contain"
								}
							}}
						/>

						{photo && <IconButton
							id="removePhotoBtn"
							size="small"
							variant="outlined"
							disabled={photo === ""}
							onClick={handleRemovePhoto}
							sx={{
								float: "right",
								position: "relative"
							}}
						>
							<RemoveCircleIcon sx={{ fontSize: 24 }} />
						</IconButton>}
					</div>

					{uploading && <LinearProgressWithLabel
						value={progress}
						sx={{
							marginTop: "auto",
							marginBottom: "-25px",
							"& > div > p": {
								fontSize: "0.8rem",
							}
						}}
					/>}
				</Box>

				<Box sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					width: "fit-content",
				}}>
					<FormControl sx={{
						"& [type=\"file\"]": {
							display: "none"
						}
					}}>
						<label
							htmlFor="photo-file-upload"
							style={{
								border: "1px solid #ccc",
								display: "inline-block",
								padding: "6px 12px",
								cursor: "pointer"
							}}
						>
							<span style={{ display: "flex", alignItems: "center" }}>
								<UploadIcon fontSize="small" /> &nbsp; Upload Photo
							</span>
						</label>
						<input
							id="photo-file-upload"
							aria-describedby="my-helper-text"
							type="file"
							accept="image/*"
							onChange={handleSelectAndUploadFile}
						/>
					</FormControl>

					{photo
						? <Box
							ref={anchorRef}
							onClick={handleToggle}
							sx={{
								mt: 2,
								height: "20px",
								backgroundColor: photoColor ?? "#D3D3D3",
								flexGrow: 1,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								borderRadius: "4px",
								cursor: "pointer",
								fontSize: "0.7rem",
								border: "1px solid transparent",
								borderColor: emphasize(photoColor ?? "#D3D3D3", 0.2)
							}}
						>

							{photoColor
								? <InputBase
									value={photoColor ?? "#D3D3D3"}
									onChange={(e) => { setPhotoColor(e.target.value ? e.target.value : "#FFFFFF") }}
									sx={{
										pl: 3,
										textAlign: "center",
										color: emphasize(photoColor ?? "#D3D3D3", 1)
									}}
								/>
								: <span>
									Click here to choose<br /> background color
								</span>}

						</Box> : null}

				</Box>
			</Box>

			{message.code
				? <Typography
					color={
						(message.code === CODE.FAILED)
							? "error.main"
							: "primary.main"}
				>
					{message.message}
				</Typography>
				: null}

			<PopupContainer
				open={open}
				anchorRef={anchorRef}
				handleClose={handleClose}
				placement="top"
				transformOrigin="bottom"
				elevation={1}
				sx={{ borderRadius: "8px" }}
			>
				<HexColorPicker
					color={photoColor ?? "#D3D3D3"}
					onChange={setPhotoColor}
				/>
			</PopupContainer>
		</>
	)
}
DocPhoto.propTypes = {
	username: PropTypes.string.isRequired,
	docId: PropTypes.string.isRequired,
	photo: PropTypes.string,
	photoColor: PropTypes.string,
	setPhotoColor: PropTypes.func,
}

const DetailsFormCategory = ({ docItem, handleClose }) => {
	const { currentUser } = useSelector(getAuth)

	const [updateDoc] = useUpdateDocMutation()
	const [updateAppSettings] = useUpdateAppSettingsMutation()

	const {
		data: autoGenerateSlugFromTitle,
		isLoading: isLoadingSettings
	} = useAppSettings(SETTINGS_NAME.autoGenerateSlugFromTitle)

	const {
		data: allDocs = [],
		isLoading: isLoadingAllDocs
	} = useGetDocsQuery(undefined)

	const {
		localCache,
		handlers: { setLocalCache }
	} = useLocalComponentCache(docItem)

	const isModified =
		docItem.category !== localCache.category
		|| docItem.slug !== localCache.slug
		|| docItem.description !== localCache.description
		|| docItem.tags !== localCache.tags
		|| docItem.status !== localCache.status
		|| docItem.emoji !== localCache.emoji
		|| docItem.photoColor !== localCache.photoColor

	const handleSaveCategoryDetails = async () => {
		//If user modify item.category, then, we will have affected items
		let affectedItems = []
		let affectedItemsData = {}
		if (docItem.category !== localCache.category) {
			affectedItems = filter(
				allDocs,
				(item) =>
					item.category === docItem.category
					&& item.docId !== docItem.docId	//not included current editing item
			)
			affectedItemsData = { category: localCache.category }
		}

		//new data for current editing item
		const updatedDocItem = {
			docId: docItem.docId,
			//
			slug: localCache.slug,
			tags: localCache.tags,
			category: localCache.category,
			description: localCache.description,
			emoji: localCache.emoji ?? "",
			photoColor: localCache.photoColor ?? "",
			//
			updatedBy: currentUser.username,
			//
			...(
				docItem.status !== localCache.status
					? localCache.status === DOC_STATUS.PUBLISHED
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
					: {}
			)
		}

		console.log("updatedDocItem for Cat", { updatedDocItem }, { affectedItems })

		await updateDoc({
			docItem: updatedDocItem,
			affectedItems,
			affectedItemsData
		})
	}

	return (
		<form onSubmit={(e) => { e.preventDefault() }}>
			<PerfectScrollbar
				component="div"
				options={{ suppressScrollX: true }}
				style={{ height: "calc(100vh - 340px)", paddingRight: "2px" }}
			>
				<AddEmojiButton
					emoji={localCache.emoji}
					removeEmoji={() => setLocalCache("", "emoji")}
					handleSelectEmoji={(emoji) => setLocalCache(emoji, "emoji")}
				>
					<TypographyHeader>
						Title {isLoadingAllDocs ? <CircularProgress size={16} /> : null}
					</TypographyHeader>
				</AddEmojiButton>

				<InputBaseStyled
					id="cat-title"
					value={localCache.category}
					onChange={(e) => {
						setLocalCache(e.target.value, "category")
						if (autoGenerateSlugFromTitle) {
							setLocalCache(slugify(e.target.value), "slug")
						}
					}}
				/>

				<Box sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mt: 2,
					minHeight: "38px"
				}}>
					<TypographyHeader sx={{ flexGrow: 1 }}>
						Slug
					</TypographyHeader>
					{!isLoadingSettings &&
						<FormControlLabel label="Auto-generate" labelPlacement="start"
							control={<Switch
								checked={autoGenerateSlugFromTitle}
								onChange={async () => {
									await updateAppSettings({
										[SETTINGS_NAME.autoGenerateSlugFromTitle]: !autoGenerateSlugFromTitle
									})
								}}
							/>}
						/>}
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
					// minRows={3}
					onChange={
						(e) => setLocalCache(e.target.value, "description")
					}
				/>

				<TypographyHeader sx={{ mt: 3, mb: 1 }}>
					Tags
				</TypographyHeader>
				<Tags
					tags={localCache.tags}
					setTags={setLocalCache}
				/>

				<DocPhoto
					username={currentUser.username}
					docId={localCache.docId}
					photo={localCache.photo}
					photoColor={localCache.photoColor}
					setPhotoColor={(color) => {
						setLocalCache(color, "photoColor")
					}}
				/>

				<PublishStatusSection
					localCache={localCache}
					setLocalCache={setLocalCache}
				/>

			</PerfectScrollbar>

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

const DetailsFormSubCategory = ({ docItem, handleClose }) => {
	const { currentUser } = useSelector(getAuth)

	const [updateDoc] = useUpdateDocMutation()
	const [updateAppSettings] = useUpdateAppSettingsMutation()

	const {
		data: autoGenerateSlugFromTitle,
		isLoading: isLoadingSettings
	} = useAppSettings(SETTINGS_NAME.autoGenerateSlugFromTitle)


	const {
		data: allDocs = [],
		isLoading: isLoadingAllDocs
	} = useGetDocsQuery(undefined)

	const {
		localCache,
		handlers: { setLocalCache }
	} = useLocalComponentCache(docItem)

	const isModified =
		docItem.subcategory !== localCache.subcategory
		|| docItem.slug !== localCache.slug
		|| docItem.description !== localCache.description
		|| docItem.tags !== localCache.tags
		|| docItem.status !== localCache.status
		|| docItem.emoji !== localCache.emoji
		|| docItem.photoColor !== localCache.photoColor

	const handleSaveSubCategoryDetails = async () => {
		//If user modify item.subcategory, then, we will have affected items
		let affectedItems = []
		let affectedItemsData = {}
		if (docItem.subcategory !== localCache.subcategory) {
			affectedItems = filter(
				allDocs,
				(item) =>
					item.category === docItem.category
					&& item.subcategory === docItem.subcategory
					&& item.docId !== docItem.docId	//not included current editing item
			)
			affectedItemsData = { subcategory: localCache.subcategory }
		}

		//new data for current editing item
		const updatedDocItem = {
			docId: docItem.docId,	//must included
			//
			slug: localCache.slug,
			tags: localCache.tags,
			subcategory: localCache.subcategory,
			description: localCache.description,
			emoji: localCache.emoji ?? "",
			photoColor: localCache.photoColor ?? "",
			//
			updatedBy: currentUser.username,
			//
			...(
				docItem.status !== localCache.status
					? localCache.status === DOC_STATUS.PUBLISHED
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
					: {}
			)
		}

		console.log("updatedDocItem for SubCat", { updatedDocItem }, { affectedItems })

		await updateDoc({
			docItem: updatedDocItem,
			affectedItems,
			affectedItemsData
		})
	}

	return (
		<form onSubmit={(e) => { e.preventDefault() }}>
			<PerfectScrollbar
				component="div"
				options={{ suppressScrollX: true }}
				style={{ height: "calc(100vh - 340px)", paddingRight: "2px" }}
			>
				<AddEmojiButton
					emoji={localCache.emoji}
					removeEmoji={() => setLocalCache("", "emoji")}
					handleSelectEmoji={(emoji) => setLocalCache(emoji, "emoji")}
				>
					<TypographyHeader>
						Title {isLoadingAllDocs ? <CircularProgress size={16} /> : null}
					</TypographyHeader>
				</AddEmojiButton>

				<InputBaseStyled
					id="cat-title"
					value={localCache.subcategory}
					onChange={(e) => {
						setLocalCache(e.target.value, "subcategory")
						if (autoGenerateSlugFromTitle) {
							setLocalCache(slugify(e.target.value), "slug")
						}
					}}
				/>

				<Box sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mt: 2,
					minHeight: "38px"
				}}>
					<TypographyHeader sx={{ flexGrow: 1 }}>
						Slug
					</TypographyHeader>
					{!isLoadingSettings &&
						<FormControlLabel label="Auto-generate" labelPlacement="start"
							control={<Switch
								checked={autoGenerateSlugFromTitle}
								onChange={async () => {
									await updateAppSettings({
										[SETTINGS_NAME.autoGenerateSlugFromTitle]: !autoGenerateSlugFromTitle
									})
								}}
							/>}
						/>}
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
					// minRows={3}
					onChange={
						(e) => setLocalCache(e.target.value, "description")
					}
				/>

				<TypographyHeader sx={{ mt: 3, mb: 1 }}>
					Tags
				</TypographyHeader>
				<Tags
					tags={localCache.tags}
					setTags={setLocalCache}
				/>

				<DocPhoto
					username={currentUser.username}
					docId={localCache.docId}
					photo={localCache.photo}
					photoColor={localCache.photoColor}
					setPhotoColor={(color) => {
						setLocalCache(color, "photoColor")
					}}
				/>

				<PublishStatusSection
					localCache={localCache}
					setLocalCache={setLocalCache}
				/>

			</PerfectScrollbar>

			<CancelSaveButtons
				isModified={isModified}
				handleClose={handleClose}
				saveAction={handleSaveSubCategoryDetails}
			/>
		</form>
	)
}
DetailsFormSubCategory.propTypes = {
	docItem: PropTypes.object,
	handleClose: PropTypes.func
}

const DetailsFormDoc = ({ docItem, handleClose }) => {
	const { currentUser } = useSelector(getAuth)
	const [updateDoc] = useUpdateDocMutation()

	const [updateAppSettings] = useUpdateAppSettingsMutation()
	const {
		data: autoGenerateSlugFromTitle,
		isLoading: isLoadingSettings
	} = useAppSettings(SETTINGS_NAME.autoGenerateSlugFromTitle)

	const {
		localCache,
		handlers: { setLocalCache }
	} = useLocalComponentCache(docItem)

	const isModified =
		docItem.title !== localCache.title
		|| docItem.slug !== localCache.slug
		|| !isEqual(docItem.tags, localCache.tags)
		|| docItem.status !== localCache.status
		|| docItem.emoji !== localCache.emoji
		|| docItem.photoColor !== localCache.photoColor

	const handleSaveDocDetails = async () => {
		//prepare the data
		const newDocMeta = {
			docId: docItem.docId, 	//must be included
			//
			title: localCache.title,
			slug: localCache.slug,
			description: localCache.description,
			tags: localCache.tags,
			emoji: localCache.emoji ?? "",
			photoColor: localCache.photoColor ?? "",
			//
			updatedBy: currentUser.username,
			//
			...(
				docItem.status !== localCache.status
					? localCache.status === DOC_STATUS.PUBLISHED
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
					: {}
			)
		}

		//update DB
		await updateDoc({
			docItem: newDocMeta,
			affectedItems: [/* no affectedItems! */]
		})
	}

	return (
		<form onSubmit={(e) => { e.preventDefault() }}>
			<PerfectScrollbar
				component="div"
				options={{ suppressScrollX: true }}
				style={{ height: "calc(100vh - 370px)", paddingRight: "2px" }}
			>
				<AddEmojiButton
					emoji={localCache.emoji}
					removeEmoji={() => setLocalCache("", "emoji")}
					handleSelectEmoji={(emoji) => setLocalCache(emoji, "emoji")}
				>
					<TypographyHeader>
						Title
					</TypographyHeader>
				</AddEmojiButton>

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
					mt: 2,
					minHeight: "38px"
				}}>
					<TypographyHeader sx={{ flexGrow: 1 }}>
						Slug
					</TypographyHeader>
					{!isLoadingSettings &&
						<FormControlLabel label="Auto-generate" labelPlacement="start"
							control={<Switch
								checked={autoGenerateSlugFromTitle}
								onChange={async () => {
									await updateAppSettings({
										[SETTINGS_NAME.autoGenerateSlugFromTitle]: !autoGenerateSlugFromTitle
									})
								}}
							/>}
						/>}
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

				<DocPhoto
					username={currentUser.username}
					docId={localCache.docId}
					photo={localCache.photo}
					photoColor={localCache.photoColor}
					setPhotoColor={(color) => {
						setLocalCache(color, "photoColor")
					}}
				/>

				<PublishStatusSection
					localCache={localCache}
					setLocalCache={setLocalCache}
				/>

			</PerfectScrollbar>

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
		|| docItem.emoji !== localCache.emoji
		|| docItem.photoColor !== localCache.photoColor

	const handleSaveExternalDetails = async () => {
		//prepare the data
		const newExternalMeta = {
			docId: docItem.docId, //must included here
			//
			url: localCache.url,
			tags: localCache.tags,
			title: localCache.title,
			description: localCache.description,
			emoji: localCache.emoji ?? "",
			photoColor: localCache.photoColor ?? "",
			//
			updatedBy: currentUser.username,
			//
			...(
				docItem.status !== localCache.status
					? localCache.status === DOC_STATUS.PUBLISHED
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
					: {}
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
			<PerfectScrollbar
				component="div"
				options={{ suppressScrollX: true }}
				style={{ height: "calc(100vh - 340px)", paddingRight: "2px" }}
			>
				<AddEmojiButton
					emoji={localCache.emoji}
					removeEmoji={() => setLocalCache("", "emoji")}
					handleSelectEmoji={(emoji) => setLocalCache(emoji, "emoji")}
				>
					<TypographyHeader>
						Title
					</TypographyHeader>
				</AddEmojiButton>

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
					// minRows={3}
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

				<DocPhoto
					username={currentUser.username}
					docId={localCache.docId}
					photo={localCache.photo}
					photoColor={localCache.photoColor}
					setPhotoColor={(color) => {
						setLocalCache(color, "photoColor")
					}}
				/>

				<PublishStatusSection
					localCache={localCache}
					setLocalCache={setLocalCache}
				/>

			</PerfectScrollbar>

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

	console.log("TocSideBarDetails", { docItem })

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
						? <div>
							<Box sx={{
								mx: 3, pt: 3, pb: 3,
								borderColor: "divider",
								borderBottom: "1px solid transparent",
							}}>

								{docItem.type === DOC_TYPE.CATEGORY &&
									<DetailsFormCategory docItem={docItem} handleClose={handleClose} />}

								{docItem.type === DOC_TYPE.SUBCATEGORY &&
									<DetailsFormSubCategory docItem={docItem} handleClose={handleClose} />}

								{docItem.type === DOC_TYPE.EXTERNAL &&
									<DetailsFormExternal docItem={docItem} handleClose={handleClose} />}

								{docItem.type === DOC_TYPE.DOC &&
									<DetailsFormDoc docItem={docItem} handleClose={handleClose} />}

							</Box>

							<Box>

								<RightMenuItemAddNewDoc
									sx={{ px: 3 }}
									category={docItem.category}
									subcategory={docItem.subcategory}
								/>

								{/* <RightMenuItemImport
									sx={{ px: 3 }}
									targetDocItem={docItem}
								/> */}

								{(docItem.type === DOC_TYPE.CATEGORY) &&
									<RightMenuItemDelete
										id="RightMenuItemDelete-category"
										targetDocItem={docItem}
										title="Delete this category"
										sx={{ px: 3 }}
									/>}

								{(docItem.type === DOC_TYPE.SUBCATEGORY) &&
									<RightMenuItemDelete
										id="RightMenuItemDelete-subcategory"
										sx={{ px: 3 }}
										targetDocItem={docItem}
										title="Delete this sub-category"
									/>}

								{/* {(docItem.type === DOC_TYPE.DOC) &&
									<RightMenuItemExportPDF
										sx={{ px: 3 }}
										targetDocItem={docItem}
									/>} */}

								{(docItem.type === DOC_TYPE.DOC || docItem.type === DOC_TYPE.EXTERNAL) &&
									<RightMenuItemDelete
										id="RightMenuItemDelete-document"
										sx={{ px: 3 }}
										targetDocItem={docItem}
									/>}

							</Box>
						</div>
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