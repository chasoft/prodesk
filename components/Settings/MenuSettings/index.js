/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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
import React, { useCallback, useRef, useState } from "react"

// MATERIAL-UI
import { Box, Button, Checkbox, ClickAwayListener, FormControlLabel, Grid, IconButton, InputBase, TextField, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { debounce, isEqual, uniqueId } from "lodash"
import { DndProvider, useDrag } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import PerfectScrollbar from "react-perfect-scrollbar"

//PROJECT IMPORT
import { getLayout } from "@layout/ClientLayout"
import nanoid from "@helpers/nanoid"
import useLocalComponentCache from "@helpers/useLocalComponentCache"
import useAppSettings from "@helpers/useAppSettings"
import useLocalSearch from "@helpers/useLocalSearch"
import TopMenu from "./TopMenu"
import FooterMenu from "./FooterMenu"
import usePopupContainer from "@components/common/usePopupContainer"

import {
	SettingsContainer,
	SettingsContent,
	SettingsHeader,
} from "@components/common/Settings"

import {
	useGetThemeSettingsQuery,
	useGetDocSearchIndexQuery
} from "@redux/slices/firestoreApi"

import {
	APP_SETTINGS,
	DOC_TYPE,
	EMPTY
} from "@helpers/constants"

import {
	CircularProgressBox,
} from "@components/common"
import dynamic from "next/dynamic"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined"
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded"
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded"
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff"
import VisibilityIcon from "@mui/icons-material/Visibility"
import CloseIcon from "@mui/icons-material/Close"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/
export const NO_PARENT = "this-item-has-no-parent-564526985"

export const MENU_LOCATION = {
	TOP: "top",
	FOOTER: "footer"
}

export const COLUMN_TYPE = {
	LINK: "Link",
	IMAGE: "Image"
}

export const DRAG_TARGET = {
	ROOT: "Move to root",
	INSERT_BEFORE: "Insert before",
	MENU_ITEM: "Menu item",
	FOOTER_ITEM: "footerItem",
	FOOTER_COLUMN: "footerColumn",
}

export const MENU_DRAG_TYPE = {
	EXISTED: "EXISTED",
	NEW_ITEM: "NEW_MENU_ITEM",
	COLUMN: "COLUMN",
}

export const MENU_TYPE = {
	CUSTOM_LINK: "Custom Link",
	PAGE: "Page",
	SOCIAL: "Social",
	DOC_TYPE: Object.values(DOC_TYPE)
}

export const searchOptions = {
	// isCaseSensitive: false,
	// includeScore: false,
	// shouldSort: true,
	// includeMatches: false,
	// findAllMatches: false,
	// minMatchCharLength: 1,
	// location: 0,
	// threshold: 0.6,
	// distance: 100,
	// useExtendedSearch: false,
	// ignoreLocation: false,
	// ignoreFieldNorm: false,

	//we use docSearchIndex data
	keys: [
		"keywords",
		"name",
		"subtitle",
	]
}

const Picker = dynamic(
	() => import("emoji-picker-react"),
	{
		loading: () => <CircularProgressBox minHeight="250px" sx={{ width: "278px" }} />,
		ssr: false
	}
)

export function ExpandIndicator({ expanded }) {
	return (
		<IconButton>
			{expanded
				? <KeyboardArrowUpRoundedIcon fontSize="small" />
				: <KeyboardArrowDownRoundedIcon fontSize="small" />}
		</IconButton>
	)
}
ExpandIndicator.propTypes = {
	expanded: PropTypes.bool.isRequired
}

export function VisibilityIconButton({ visibility, onClick }) {
	return (
		<Tooltip arrow
			title={visibility
				? <span>The item is visible<br />Click to hide.</span>
				: <span>The item is hidden<br />Click to show.</span>}
			placement="top"
		>
			<IconButton onClick={onClick}>
				{visibility
					? <VisibilityIcon fontSize="small" />
					: <VisibilityOffIcon fontSize="small" />}
			</IconButton>
		</Tooltip>
	)
}
VisibilityIconButton.propTypes = {
	visibility: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired
}

export function DuplicateIconButton({ onClick }) {
	return (
		<Tooltip arrow title="Duplicate menu item" placement="top">
			<IconButton onClick={onClick}>
				<ContentCopyIcon fontSize="small" />
			</IconButton>
		</Tooltip>
	)
}
DuplicateIconButton.propTypes = {
	onClick: PropTypes.func.isRequired
}

export function RemoveIconButton({ onClick }) {
	return (
		<Tooltip arrow title="Remove menu item" placement="top">
			<IconButton onClick={onClick}>
				<DeleteRoundedIcon fontSize="small" />
			</IconButton>
		</Tooltip>
	)
}
RemoveIconButton.propTypes = {
	onClick: PropTypes.func.isRequired
}

function addMenuItem(sourceItem, targetItem, setLocalCache) {
	const incNumber = uniqueId()
	let data = {
		id: nanoid(),
		order: incNumber + 100,
		slug: "#",
		visibility: true,
		...sourceItem.details,
	}
	if (data?.menuCategory) delete data.menuCategory

	/* TOP MENU */

	//Drop on the backdrop
	if (targetItem.target === DRAG_TARGET.ROOT) {
		setLocalCache(
			{
				...data,
				parentId: NO_PARENT,
			}, data.id
		)
		return
	}

	//Drop on existed item
	if (targetItem.target === DRAG_TARGET.MENU_ITEM) {
		if (targetItem.details.parentId === NO_PARENT) {
			setLocalCache(
				{
					...data,
					parentId: targetItem.details.id,
				}, data.id
			)
			return
		}
		setLocalCache(
			{
				...data,
				parentId: targetItem.details.parentId,
			}, data.id
		)
		return
	}

	//Drop on insertBefore
	if (targetItem.target === DRAG_TARGET.INSERT_BEFORE) {
		setLocalCache(
			{
				...data,
				parentId: NO_PARENT,
				order: targetItem.details.order - 1
			}, data.id
		)
		return
	}

	/* FOOTER MENU */

	if (targetItem.target === DRAG_TARGET.FOOTER_COLUMN || targetItem.target === DRAG_TARGET.FOOTER_ITEM) {
		const parentId = (targetItem.target === DRAG_TARGET.FOOTER_COLUMN)
			? targetItem.details.id
			: targetItem.details.parentId
		setLocalCache(
			{
				...data,
				parentId,
				order: targetItem.details.order - 1
			},
			`${parentId}.children.${data.id}`
		)
		return
	}
}

function NewMenuItem({ menuItem, setLocalCache, sx }) {
	const ref = useRef(null)
	const {
		localCache: newItemDetails,
		handlers: {
			setLocalCache: setNewItemDetails
		}
	} = useLocalComponentCache({
		menuCategory: MENU_DRAG_TYPE.NEW_ITEM,
		...menuItem
	})

	const [{ isDragging }, drag] = useDrag(() => ({
		type: MENU_DRAG_TYPE.NEW_ITEM,
		item: () => ({
			details: newItemDetails,
			hasChildren: 0
		}),
		end: (sourceItem, monitor) => {
			const targetItem = monitor.getDropResult()
			if (sourceItem && targetItem) {
				addMenuItem(sourceItem, targetItem, setLocalCache)
			}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}), [
		newItemDetails.label,
	])

	drag(ref)
	const opacity = isDragging ? 0.4 : 1

	return (
		<Box
			ref={ref}
			sx={{
				display: "flex",
				flexDirection: "column",
				border: "1px solid #9e9e9e",
				p: 1,
				mb: 1,
				cursor: "pointer",
				":hover": {
					backgroundColor: "action.hover",
				},
				opacity,
				...sx
			}}
		>
			<Box sx={{
				display: "flex",
				alignItems: "baseline",
			}}>
				<Typography noWrap id="menuType" sx={{
					color: "grey.500",
					fontSize: "0.75rem"
				}}>
					{menuItem.type}
				</Typography>

				<Box sx={{
					flexGrow: 1,
					ml: 2
				}}>
					<InputBase
						fullWidth
						value={newItemDetails.label}
						placeholder="Navigation Label"
						onChange={(e) => {
							setNewItemDetails(e.target.value, "label")
						}}
						sx={{ borderBottom: 1, borderColor: "silver" }}
					/>
				</Box>
			</Box>
		</Box>
	)
}
NewMenuItem.propTypes = {
	menuItem: PropTypes.object.isRequired,
	setLocalCache: PropTypes.func.isRequired,
	sx: PropTypes.object
}

export const AddNewMenuItemPanel = React.memo(function _AddNewMenuItemPanel({ type = MENU_LOCATION.TOP, showDrawer, setShowDrawer, setLocalCache }) {
	const ref = useRef(null)
	const [searchText, setSearchText] = useState("")

	const {
		data: docSearchIndex = { searchIndexes: EMPTY.ARRAY },
	} = useGetDocSearchIndexQuery(undefined)

	const searchResult = useLocalSearch(docSearchIndex.searchIndexes, searchOptions, searchText)

	const handleSearchTextOnChange = debounce((e) => {
		setSearchText(e.target.value)
	}, 300)

	const handleClose = useCallback(() => { setShowDrawer(false) }, [setShowDrawer])

	return (
		<ClickAwayListener onClickAway={handleClose}>
			<Box
				id="AddNewMenuItemPanel"
				sx={{
					position: "fixed",
					top: "200px",
					display: "flex",
					flexDirection: "column",
					width: "350px",
					...(showDrawer ? { right: -1 } : { right: "-370px" }),
					height: "60vh",
					backgroundColor: "#FFF",
					transition: "right .3s cubic-bezier(0.4, 0, 0.2, 1)",
					borderTopLeftRadius: "6px",
					borderBottomLeftRadius: "6px",
					border: "1px solid silver",
					boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
					padding: 2,
					zIndex: 165
				}}
				onClick={e => e.stopPropagation()}
			>

				<Box sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					backgroundColor: "#e9e9e9",
					borderTopLeftRadius: "6px",
					m: -2,
					px: 2,
					py: 0.5,
				}}>
					<Typography fontWeight={700}>
						Add new menu item
					</Typography>

					<IconButton
						size="small"
						onClick={handleClose}
					>
						<CloseIcon />
					</IconButton>
				</Box>

				<Box sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					mt: 4,
					flexGrow: 1,
				}}>
					<div>
						<TextField fullWidth
							defaultValue=""
							id="searchBoxForAddMenuItem"
							label="Search for documentation articles"
							size="small"
							onChange={handleSearchTextOnChange}
						/>
						<PerfectScrollbar component="div" style={{
							height: (searchResult.length === 0) ? "200px" : "calc(50vh - 30px)"
						}}>
							<Box sx={{
								display: "flex",
								flexDirection: "column",
								py: 2,
								flexGrow: 1
							}}>

								{searchResult.map(i => {
									const id = nanoid()
									const menuItem = {
										id,
										docId: i.item.id,
										label: i.item.name,
										originalLabel: i.item.name,
										type: i.item.type,
										slug: i.item.slug,
										emoji: i.item.emoji,
										originalEmoji: i.item.emoji,
										description: i.item.subtitle,
										visibility: true
									}
									return (
										<NewMenuItem
											key={id}
											menuItem={menuItem}
											setLocalCache={setLocalCache}
										/>
									)
								})}

								{(searchText.length > 0 && searchResult.length === 0)
									? <Typography
										sx={{
											backgroundColor: "grey.200",
											p: 2
										}}
									>
										{searchText.length < 3
											? "too short..."
											: "Nothing found"}
									</Typography>
									: null}
							</Box>
						</PerfectScrollbar>
					</div>

					{(type === MENU_LOCATION.TOP
						&& searchResult.length === 0)
						? <NewMenuItem
							menuItem={{
								type: MENU_TYPE.CUSTOM_LINK,
								label: "Untitled Menu Item"
							}}
							setLocalCache={setLocalCache}
						/> : null}

					{(type !== MENU_LOCATION.TOP
						&& searchResult.length === 0)
						? <div ref={ref}>
							<NewMenuItem
								menuItem={{
									type: MENU_TYPE.CUSTOM_LINK,
									label: "Untitled Menu Item"
								}}
								setLocalCache={setLocalCache}
							/>
							<NewMenuItem
								menuItem={{
									type: MENU_TYPE.SOCIAL,
									label: "Social Menu Item",
									slug: "",
									logoUrl: ""
								}}
								setLocalCache={setLocalCache}
							/>
							<Grid container spacing={2}>
								<Grid item xs>
									<Button
										variant="outlined"
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											height: "80px",
											border: "1px solid silver",
											cursor: "pointer"
										}}
										onClick={() => {
											let data = {
												id: nanoid(),
												type: COLUMN_TYPE.LINK,
												label: "Untitled Footer",
												children: {},
												visibility: true,
												order: 100,
											}
											setLocalCache(data, data.id)
										}}
									>
										ADD TEXT COLUMN
									</Button>
								</Grid>

								<Grid item xs>
									<Button
										variant="outlined"
										sx={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											height: "80px",
											border: "1px solid silver",
											cursor: "pointer"
										}}
										onClick={() => {
											let data = {
												id: nanoid(),
												type: COLUMN_TYPE.IMAGE,
												label: "Footer",
												photoUrl: "",
												visibility: true,
												order: 100,
												children: {}
											}
											setLocalCache(data, data.id)
										}}
									>
										ADD IMAGE COLUMN
									</Button>
								</Grid>
							</Grid>
						</div> : null}
				</Box>
			</Box>
		</ClickAwayListener >
	)
}, (prevProps, nextProps) => isEqual(prevProps, nextProps))
AddNewMenuItemPanel.propTypes = {
	type: PropTypes.string,
	showDrawer: PropTypes.bool.isRequired,
	setShowDrawer: PropTypes.func.isRequired,
	setLocalCache: PropTypes.func.isRequired
}

export function AddEmojiButton({ emoji, menuId, setLocalCache, path = "" }) {
	const [
		PopupContainer, open, anchorRef, {
			handleToggle, handleClose
		}
	] = usePopupContainer()

	const handleRemoveEmoji = useCallback(() => {
		setLocalCache("", `${path ? (path + ".") : ""}${menuId}.emoji`)
	}, [setLocalCache, menuId, path])

	const handleAddEmoji = useCallback((event, { emoji }) => {
		setLocalCache(emoji, `${path ? (path + ".") : ""}${menuId}.emoji`)
		handleClose(event)
	}, [setLocalCache, menuId, path, handleClose])

	return (
		<Box sx={{
			float: "right",
			mt: "-38px"
		}}>
			<Box sx={{
				display: "flex",
				alignItems: "center",
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
									ml: -8,
									mt: -1.5
								}}
								onClick={handleRemoveEmoji}
							>
								<RemoveCircleOutlineOutlinedIcon sx={{ fontSize: 24 }} />
							</IconButton>
						</Tooltip>
					</div>}
			</Box>


			<PopupContainer
				open={open}
				anchorRef={anchorRef}
				handleClose={handleClose}
				placement="bottom-start"
				transformOrigin="top left"
				elevation={1}
			>

				<Picker onEmojiClick={handleAddEmoji} />

			</PopupContainer>
		</Box>
	)
}
AddEmojiButton.propTypes = {
	emoji: PropTypes.string,
	menuId: PropTypes.string,
	setLocalCache: PropTypes.func.isRequired,
	path: PropTypes.string
}

export const FormCustomLink = React.memo(function _FormCustomLink({ menuItem, setLocalCache, path }) {

	const handleTextFieldOnChange = debounce((e) => {
		setLocalCache(
			e.target.value,
			`${path ? (path + ".children.") : ""}${menuItem.id}.${e.target.id}`
		)
	}, 300)

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<TextField fullWidth
					id="slug"
					label="Slug"
					size="small"
					defaultValue={menuItem?.slug ?? ""}
					onChange={handleTextFieldOnChange}
				/>
			</Grid>
			<Grid item xs={12} sx={{ position: "relative" }}>
				<TextField fullWidth
					defaultValue={menuItem?.label ?? ""}
					id="label"
					label="Navigation Label"
					size="small"
					onChange={handleTextFieldOnChange}
				/>

				<AddEmojiButton
					path={path}
					emoji={menuItem?.emoji ?? ""}
					menuId={menuItem.id}
					setLocalCache={setLocalCache}
				/>
			</Grid>
			<Grid item xs={12} sx={{ my: -1.5 }}>
				<Box>
					<FormControlLabel
						control={
							<Checkbox
								checked={menuItem?.newtab ?? false}
								onChange={() =>
									setLocalCache(null, menuItem.id + ".newtab", "toggle")
								}
							/>
						}
						label="Open link in a new tab"
					/>
				</Box>
			</Grid>
			<Grid item container spacing={2}>
				<Grid item xs={6}>
					<TextField fullWidth
						id="attribute"
						label="Title Attribute"
						size="small"
						defaultValue={menuItem?.attribute ?? ""}
						onChange={handleTextFieldOnChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField fullWidth
						id="classes"
						label="CSS Classes (optional)"
						size="small"
						defaultValue={menuItem?.classes ?? ""}
						onChange={handleTextFieldOnChange}
					/>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<TextField fullWidth
					id="description"
					label="Description"
					size="small"
					multiline
					rows={2}
					defaultValue={menuItem?.description ?? ""}
					onChange={handleTextFieldOnChange}
				/>
				<Typography paragraph mt={1} fontSize="0.75rem">
					The description will be displayed in the menu if the current theme supports it.
				</Typography>
			</Grid>
		</Grid>
	)
}, (prevProps, nextProps) => isEqual(prevProps, nextProps))

FormCustomLink.propTypes = {
	menuItem: PropTypes.object.isRequired,
	setLocalCache: PropTypes.func.isRequired,
	path: PropTypes.string
}

//TODO: check why MenuItem updated but ForDocLink not auto updated
export const FormDocLink = React.memo(function _FormDocLink({ menuItem, setLocalCache, path }) {
	const handleTextFieldOnChange = debounce((e) => {
		setLocalCache(
			e.target.value,
			`${path ? (path + ".") : ""}${menuItem.id}.${e.target.id}`
		)
	}, 300)

	const handleCheckbox = useCallback(() => {
		setLocalCache(null, `${path ? (path + ".") : ""}${menuItem.id}.newtab`, "toggle")
	}, [setLocalCache, menuItem.id, path])

	const isLabelModified = menuItem.originalLabel !== menuItem.label

	console.log({ menuItem })

	return (
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<TextField fullWidth
					id="slug"
					label="Slug"
					size="small"
					disabled
					defaultValue={menuItem?.slug ?? ""}
				/>
			</Grid>
			<Grid item xs={12} sx={{ position: "relative" }}>
				<TextField fullWidth
					defaultValue={menuItem?.label ?? ""}
					id="label"
					label="Navigation Label"
					size="small"
					onChange={handleTextFieldOnChange}
					sx={{
						...(isLabelModified
							? { "& > div input": { color: "red" } }
							: {}
						)
					}}
				/>

				<AddEmojiButton
					path={path}
					emoji={menuItem?.emoji ?? ""}
					menuId={menuItem.id}
					setLocalCache={setLocalCache}
				/>
			</Grid>
			{(menuItem.type === DOC_TYPE.EXTERNAL)
				? <Grid item xs={12} sx={{ my: -1.5 }}>
					<Box>
						<FormControlLabel
							control={
								<Checkbox
									checked={menuItem?.newtab ?? false}
									onChange={handleCheckbox}
								/>
							}
							label="Open link in a new tab"
						/>
					</Box>
				</Grid>
				: null}

			<Grid item container spacing={2}>
				<Grid item xs={6}>
					<TextField fullWidth
						id="attribute"
						label="Title Attribute"
						size="small"
						defaultValue={menuItem?.attribute ?? ""}
						onChange={handleTextFieldOnChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField fullWidth
						id="classes"
						label="CSS Classes (optional)"
						size="small"
						defaultValue={menuItem?.classes ?? ""}
						onChange={handleTextFieldOnChange}
					/>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<TextField fullWidth
					id="description"
					label="Description"
					size="small"
					multiline
					rows={2}
					defaultValue={menuItem?.description ?? ""}
					onChange={handleTextFieldOnChange}
				/>
				<Typography paragraph mt={1} fontSize="0.75rem">
					The description will be displayed in the menu if the current theme supports it.
				</Typography>
			</Grid>
		</Grid>
	)
}, (prevProps, nextProps) => isEqual(prevProps.menuItem, nextProps.menuItem))
FormDocLink.propTypes = {
	menuItem: PropTypes.object.isRequired,
	setLocalCache: PropTypes.func.isRequired,
	path: PropTypes.string
}


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function MenuSettings() {

	const {
		data: activeTheme,
		isLoading: isLoadingActiveTheme
	} = useAppSettings(APP_SETTINGS.activeTheme)

	const {
		data: themeSettings,
		isLoading: isLoadingThemeSettings
	} = useGetThemeSettingsQuery(activeTheme)

	if (isLoadingActiveTheme || isLoadingThemeSettings) {
		return <CircularProgressBox />
	}

	return (
		<>
			<SettingsHeader>
				<Typography variant="h1" sx={{ mt: 5 }}>
					Site Menu
				</Typography>
			</SettingsHeader>

			<SettingsContainer>
				<SettingsContent>
					<DndProvider backend={HTML5Backend}>
						<TopMenu themeSettings={themeSettings} />
						<FooterMenu themeSettings={themeSettings} />
					</DndProvider>
				</SettingsContent>
			</SettingsContainer>
		</>
	)
}

MenuSettings.getLayout = getLayout

export default MenuSettings