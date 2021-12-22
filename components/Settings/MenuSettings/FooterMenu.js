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
import React, { useMemo, useRef, useState } from "react"

// MATERIAL-UI
import { Avatar, Box, Checkbox, FormControl, Collapse, FormControlLabel, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { debounce, keyBy, isEqual, orderBy, size } from "lodash"
import { useDrag, useDrop } from "react-dnd"

//PROJECT IMPORT
import { requestSilentRefetching } from "@helpers/realtimeApi"
import { THEME_NAME } from "@components/Themes/themeInfo"
import { TYPE } from "@redux/slices/firestoreApiConstants"
import nanoid from "@helpers/nanoid"
import useAppSettings from "@helpers/useAppSettings"
import useLocalComponentCache from "@helpers/useLocalComponentCache"

import {
	ContentGroup,
	ContentRow,
	ContentDescription,
} from "@components/common/Settings"

import {
	useUpdateAppSettingsMutation,
} from "@redux/slices/firestoreApi"

import {
	APP_SETTINGS,
	DOC_TYPE,
	CODE
} from "@helpers/constants"

import {
	LinearProgressWithLabel,
} from "@components/common"

import {
	deleteFile,
	STORAGE_DESTINATION,
	uploadSingleFile,
	useUploadFile,
} from "@helpers/storageApi"

import {
	FooterMenuPreview as SimplicityFooterMenuPreview,
} from "@components/Themes/Simplicity/MenuPreview"

import {
	AddEmojiButton,
	AddNewMenuItemPanel,
	COLUMN_TYPE,
	DuplicateIconButton,
	ExpandIndicator,
	FormCustomLink,
	FormDocLink,
	MENU_DRAG_TYPE,
	MENU_LOCATION,
	MENU_TYPE,
	DRAG_TARGET,
	RemoveIconButton,
	VisibilityIconButton
} from "@components/Settings/MenuSettings"

//ASSETS
import RefreshIcon from "@mui/icons-material/Refresh"
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle"
import UploadIcon from "@mui/icons-material/Upload"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function moveFooterMenuItem(sourceItem, targetItem, setLocalCache) {

	if (targetItem.target === DRAG_TARGET.FOOTER_ITEM) {

		//no need to check sourceItem is column or not
		//because footerItem not accept column type

		//if they are belong to the same column
		//then we will change the order only
		if (sourceItem.details.parentId === targetItem.details.parentId) {
			if (sourceItem.details.order <= targetItem.details.order) {
				setLocalCache(
					targetItem.details.order + 1,
					sourceItem.details.parentId + ".children." + sourceItem.details.id + ".order"
				)
				return
			}

			if (sourceItem.details.order > targetItem.details.order) {
				setLocalCache(
					targetItem.details.order - 1,
					sourceItem.details.parentId + ".children." + sourceItem.details.id + ".order"
				)
				return
			}
		} else {
			//copy sourceItem to target column
			setLocalCache(
				{
					...sourceItem.details,
					order: targetItem.details.order - 1,
					parentId: targetItem.details.parentId
				},
				targetItem.details.parentId + ".children." + sourceItem.details.id
			)
			//remove sourceItem
			setLocalCache(
				undefined,
				sourceItem.details.parentId + ".children." + sourceItem.details.id,
				"delete"
			)
		}
	}

	//Target is column
	if (targetItem.target === DRAG_TARGET.FOOTER_COLUMN) {

		//if sourceItem is a column
		if (sourceItem.details.type === COLUMN_TYPE.LINK
			|| sourceItem.details.type === COLUMN_TYPE.IMAGE) {

			if (sourceItem.details.order <= targetItem.details.order) {
				setLocalCache(
					targetItem.details.order + 1,
					sourceItem.details.id + ".order"
				)
				return
			}

			if (sourceItem.details.order > targetItem.details.order) {
				setLocalCache(
					targetItem.details.order - 1,
					sourceItem.details.id + ".order"
				)
				return
			}

		} else {
			//sourceItem is menu-item
			if (sourceItem.details.parentId !== targetItem.details.id) {
				//copy sourceItem to new column
				setLocalCache(
					{
						...sourceItem.details,
						parentId: targetItem.details.id
					},
					targetItem.details.id + ".children." + sourceItem.details.id
				)
				//remove sourceItem
				setLocalCache(
					undefined,
					sourceItem.details.parentId + ".children." + sourceItem.details.id,
					"delete"
				)
				return
			}
		}
	}
}

const FooterMenuItemBase = React.memo(function _FooterMenuItemBase({ menuItem, expanded, setExpanded, setLocalCache }) {
	const ref = useRef(null)

	const [{ canDrop, isOverCurrent }, drop] = useDrop(() => ({
		accept: [MENU_DRAG_TYPE.NEW_ITEM, MENU_DRAG_TYPE.EXISTED],
		// canDrop: (sourceItem) => isValidDropExistedTopMenuItems(sourceItem, menuItem),
		canDrop: () => true,
		drop: (_, monitor) => {
			if (monitor.didDrop()) return
			return ({
				details: menuItem,
				target: DRAG_TARGET.FOOTER_ITEM
			})
		},
		collect: (monitor) => ({
			// isOver: monitor.isOver(),
			isOverCurrent: monitor.isOver({ shallow: true }),
			canDrop: monitor.canDrop(),
		})
	}), [
		menuItem.order,
		menuItem.parentId,
	])

	const [{ isDragging }, drag] = useDrag(() => ({
		type: MENU_DRAG_TYPE.EXISTED,
		item: () => ({
			details: menuItem
		}),
		end: (sourceItem, monitor) => {
			const targetItem = monitor.getDropResult({ shallow: true })
			console.log({ targetItem })
			if (sourceItem && targetItem) {
				moveFooterMenuItem(sourceItem, targetItem, setLocalCache)
			}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			handlerId: monitor.getHandlerId(),
		}),
	}), [
		menuItem.order,
		menuItem.parentId,
	])

	drag(drop(ref))
	const isActive = canDrop && isOverCurrent
	const isNotActive = !canDrop && isOverCurrent
	const opacity = isDragging ? 0.4 : 1

	return (
		<Box
			ref={ref}
			sx={{
				display: "flex",
				alignItems: "stretch",
				border: "1px solid #9e9e9e",
				cursor: "pointer",
				backgroundColor: expanded
					? "action.hover"
					: menuItem.visibility
						? ""
						: "grey.300",
				"& #additionalButtons": {
					display: "none"
				},
				":hover": {
					backgroundColor: "action.hover",
					"& #additionalButtons": {
						display: "block"
					},
				},
				opacity,
				...(isActive ? { backgroundColor: "primary.light", color: "primary.contrastText" } : {}),
				...(isNotActive ? { backgroundColor: "error.light", color: "error.contrastText" } : {}),
			}}
			onClick={(e) => {
				e.stopPropagation()
				setExpanded(p => !p)
			}}
		>
			{/* <InsertTopMenuItemToRoot menuItem={menuItem} /> */}
			<Box sx={{
				display: "flex",
				alignItems: "baseline",
				flexGrow: 1,
				overflow: "hidden"
			}}>
				<Typography noWrap sx={{
					pl: 1.5,
					pr: 0.5,
					py: 1,
				}}>
					{menuItem?.label}
				</Typography>
				<Typography noWrap id="menuType" sx={{
					color: "grey.500",
					fontSize: "0.75rem"
				}}>
					- {menuItem.type}
				</Typography>
			</Box>

			<Box id="additionalButtons" sx={{
				display: "block",
				whiteSpace: "nowrap"
			}}>
				<div>
					<VisibilityIconButton
						visibility={menuItem.visibility}
						onClick={(e) => {
							e.stopPropagation()
							setLocalCache(
								null,
								`${menuItem.parentId}.children.${menuItem.id}.visibility`,
								"toggle")
						}}
					/>

					<DuplicateIconButton
						onClick={(e) => {
							e.stopPropagation()
							const newId = nanoid()
							setLocalCache(
								{ ...menuItem, id: newId },
								`${menuItem.parentId}.children.${newId}`
							)
						}}
					/>

					<RemoveIconButton
						onClick={(e) => {
							e.stopPropagation()
							setLocalCache(
								null,
								`${menuItem.parentId}.children.${menuItem.id}`,
								"delete"
							)
						}}
					/>
				</div>
			</Box>

			<ExpandIndicator expanded={expanded} />

		</Box>
	)
}, (prevProps, nextProps) => isEqual(prevProps, nextProps))
FooterMenuItemBase.propTypes = {
	menuItem: PropTypes.object.isRequired,
	subMenuItems: PropTypes.array, //optional
	expanded: PropTypes.bool,
	setExpanded: PropTypes.func,
	setLocalCache: PropTypes.func.isRequired,
}

const FormSocialLink = React.memo(function _FormSocialLink({ menuItem, setLocalCache, path }) {
	const handleTextFieldOnChange = debounce((e) => {
		setLocalCache(
			e.target.value,
			`${path ? (path + ".") : ""}${menuItem.id}.${e.target.id}`
		)
	}, 300)

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
					sx={{ border: "1px solid red" }}
				/>
			</Grid>
			{(menuItem.type === DOC_TYPE.EXTERNAL)
				? <Grid item xs={12} sx={{ my: -1.5 }}>
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
}, (prevProps, nextProps) => isEqual(prevProps, nextProps))
FormSocialLink.propTypes = {
	menuItem: PropTypes.object.isRequired,
	setLocalCache: PropTypes.func.isRequired,
	path: PropTypes.string
}

const FooterMenuItem = React.memo(function _FooterMenuItem({ menuItem, setLocalCache }) {
	const [expanded, setExpanded] = useState(false)
	return (
		<Box onClick={(e) => e.stopPropagation()}>
			<FooterMenuItemBase
				menuItem={menuItem}
				expanded={expanded}
				setExpanded={setExpanded}
				setLocalCache={setLocalCache}
			/>

			<Collapse in={expanded}>
				<Box sx={{
					display: "flex",
					flexDirection: "column",
					border: 1,
					borderTop: 0,
					borderColor: "#9e9e9e",
					p: 2
				}}>
					{(menuItem.type === MENU_TYPE.CUSTOM_LINK)
						? <FormCustomLink
							menuItem={menuItem}
							setLocalCache={setLocalCache}
							path={menuItem.parentId + ".children"}
						/> : null}

					{(menuItem.type === MENU_TYPE.SOCIAL)
						? <FormSocialLink
							menuItem={menuItem}
							setLocalCache={setLocalCache}
							path={menuItem.parentId + ".children"}
						/> : null}

					{(MENU_TYPE.DOC_TYPE.includes(menuItem.type) || menuItem.type === MENU_TYPE.PAGE)
						? <FormDocLink
							menuItem={menuItem}
							setLocalCache={setLocalCache}
							path={menuItem.parentId + ".children"}
						/> : null}
				</Box>
			</Collapse>
		</Box>
	)
}, (prevProps, nextProps) => isEqual(prevProps, nextProps))
FooterMenuItem.propTypes = {
	menuItem: PropTypes.object.isRequired,
	setLocalCache: PropTypes.func.isRequired,
}

export const TextHeader = React.memo(function _TextHeader({ column, setLocalCache }) {
	const handleTextFieldOnChange = debounce((e) => {
		setLocalCache(
			e.target.value,
			column.id + "." + e.target.id
		)
	}, 300)

	return (
		<Grid container spacing={2} >
			<Grid item xs={12} sx={{ position: "relative" }}>
				<TextField fullWidth
					defaultValue={column?.label ?? ""}
					id="label"
					label="Navigation Label"
					size="small"
					onChange={handleTextFieldOnChange}
				/>
				<AddEmojiButton
					emoji={column?.emoji ?? ""}
					menuId={column.id}
					setLocalCache={setLocalCache}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField fullWidth
					id="description"
					label="Description"
					size="small"
					multiline
					rows={3}
					defaultValue={column?.description ?? ""}
					onChange={handleTextFieldOnChange}
				/>
			</Grid>
		</Grid>
	)
}, (prevProps, nextProps) => isEqual(prevProps, nextProps))
TextHeader.propTypes = {
	column: PropTypes.object.isRequired,
	setLocalCache: PropTypes.func.isRequired,
}

export const ImageHeader = React.memo(function _ImageHeader({ column, setLocalCache }) {
	const [message, setMessage] = useState({ code: "", message: "" })
	const [uploadFile, { uploading, progress }] = useUploadFile()

	const handleTextFieldOnChange = debounce((e) => {
		setLocalCache(
			e.target.value,
			`${column.id}.${e.target.id}`
		)
	}, 300)

	const handleSelectAndUploadFile = async (e) => {
		const photoURL = await uploadSingleFile(
			e,
			uploadFile,
			`${STORAGE_DESTINATION.SETTINGS}/footer.${column.id}.png`
		)

		if (photoURL?.error) {
			setMessage({
				code: CODE.FAILED,
				message: photoURL.error.message
			})
			return
		}

		setLocalCache(photoURL, column.id + ".photoUrl")
	}

	const handleRemovePhoto = async () => {
		const res = await deleteFile(`/${STORAGE_DESTINATION.SETTINGS}/footer.${column.id}.png`)

		setMessage({
			code: res?.data?.code,
			message: res?.data?.message,
		})

		setLocalCache("", column.id + ".photoUrl")
	}

	return (
		<Grid container spacing={2} >
			<Grid item xs={12} sx={{ position: "relative" }}>
				<Box sx={{
					display: "flex",
					flexDirection: "column",
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
							src={column?.photoUrl ?? "/img/no-image.png"}
							sx={{
								position: "absolute",
								width: "calc(100% - 16px)",
								height: 100,
								"& >img": {
									objectFit: "contain"
								}
							}} />

						{column?.photoUrl && <IconButton
							id="removePhotoBtn"
							size="small"
							variant="outlined"
							disabled={column?.photoUrl === ""}
							onClick={handleRemovePhoto}
							sx={{
								float: "right",
								position: "relative"
							}}
						>
							<RemoveCircleIcon sx={{ fontSize: 24 }} />
						</IconButton>}
					</div>

					{uploading
						&& <LinearProgressWithLabel value={progress} sx={{
							"& > div > p": { fontSize: "0.8rem" },
							zIndex: 300
						}} />}
				</Box>

				<Box sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					width: "100%",
					mt: 1
				}}>
					<FormControl sx={{
						"& [type=\"file\"]": {
							display: "none"
						},
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
				</Box>
			</Grid>
			<Grid item xs={12}>
				<TextField fullWidth
					id="description"
					label="Description"
					size="small"
					multiline
					rows={3}
					defaultValue={column?.description ?? ""}
					onChange={handleTextFieldOnChange}
				/>
			</Grid>

			{message.code
				? <Grid item xs={12}>
					<Typography
						color={(message.code === CODE.FAILED)
							? "error.main"
							: "primary.main"}
					>
						{message.message}
					</Typography>
				</Grid> : null}
		</Grid>
	)
}, (prevProps, nextProps) => isEqual(prevProps, nextProps))
ImageHeader.propTypes = {
	column: PropTypes.object.isRequired,
	setLocalCache: PropTypes.func.isRequired,
}

const FooterColumnBase = React.memo(function _FooterColumnBase({ column, expanded, setExpanded, setLocalCache }) {

	const ref = useRef(null)

	const [{ canDrop, isOverCurrent }, drop] = useDrop(() => ({
		accept: [MENU_DRAG_TYPE.COLUMN, MENU_DRAG_TYPE.EXISTED, MENU_DRAG_TYPE.NEW_ITEM],
		canDrop: (sourceItem) => {
			if (sourceItem.details?.parentId === column.id) return false
			if (sourceItem.details?.type === MENU_TYPE.SOCIAL
				&& column.type !== COLUMN_TYPE.IMAGE) return false
			return true
		},
		drop: (_, monitor) => {
			if (monitor.didDrop()) return
			return ({
				details: column,
				target: DRAG_TARGET.FOOTER_COLUMN
			})
		},
		collect: (monitor) => ({
			canDrop: monitor.canDrop(),
			isOverCurrent: monitor.isOver({ shallow: true })
		})
	}), [
		column.id,
		column.order,
	])

	const [{ isDragging }, drag] = useDrag(() => ({
		type: MENU_DRAG_TYPE.COLUMN,
		item: () => ({ details: column }),
		end: (sourceItem, monitor) => {
			const targetItem = monitor.getDropResult({ shallow: true })
			if (sourceItem && targetItem) {
				moveFooterMenuItem(sourceItem, targetItem, setLocalCache)
			}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			handlerId: monitor.getHandlerId(),
		}),
	}), [
		column.id,
		column.order,
	])

	drag(drop(ref))
	const isActive = canDrop && isOverCurrent
	const isNotActive = !canDrop && isOverCurrent
	const opacity = isDragging ? 0.4 : 1

	return (
		<Box
			ref={ref}
			sx={{
				display: "flex",
				alignItems: "stretch",
				border: "1px solid #9e9e9e",
				cursor: "pointer",
				backgroundColor: expanded
					? "action.hover"
					: column.visibility
						? ""
						: "grey.300",
				"& #additionalButtons": {
					display: "none"
				},
				":hover": {
					backgroundColor: "action.hover",
					"& #additionalButtons": {
						display: "block"
					},
				},
				opacity,
				...(isActive ? { backgroundColor: "primary.light", color: "primary.contrastText" } : {}),
				...(isNotActive ? { backgroundColor: "error.light", color: "error.contrastText" } : {}),
			}}
			onClick={(e) => {
				e.stopPropagation()
				setExpanded(p => !p)
			}}
		>
			<Box sx={{
				display: "flex",
				alignItems: "baseline",
				flexGrow: 1,
				overflow: "hidden"
			}}>
				<Typography noWrap sx={{
					pl: 1.5,
					pr: 0.5,
					py: 1,
				}}>
					{column?.label}
				</Typography>
				<Typography noWrap id="menuType" sx={{
					color: "grey.500",
					fontSize: "0.75rem"
				}}>
					- {column.type}
				</Typography>
			</Box>

			<Box id="additionalButtons" sx={{
				display: "block",
				whiteSpace: "nowrap"
			}}>
				<div>
					<VisibilityIconButton
						visibility={column.visibility}
						onClick={(e) => {
							e.stopPropagation()
							setLocalCache(
								null,
								`${column.id}.visibility`,
								"toggle")
						}}
					/>

					<DuplicateIconButton
						onClick={(e) => {
							e.stopPropagation()
							const newId = nanoid()
							setLocalCache(
								{
									...column,
									id: newId,
									children: {}
								},
								newId
							)
						}}
					/>

					<RemoveIconButton
						onClick={(e) => {
							e.stopPropagation()
							setLocalCache(
								null,
								column.id,
								"delete"
							)
						}}
					/>
				</div>
			</Box>

			<ExpandIndicator expanded={expanded} />

		</Box>
	)
}, (prevProps, nextProps) => isEqual(prevProps, nextProps))
FooterColumnBase.propTypes = {
	column: PropTypes.object.isRequired,
	expanded: PropTypes.bool,
	setExpanded: PropTypes.func,
	setLocalCache: PropTypes.func.isRequired,
}

function FooterColumn({ column, setLocalCache }) {
	const [expanded, setExpanded] = useState(false)
	return (
		<Box onClick={(e) => e.stopPropagation()}>
			<FooterColumnBase
				column={column}
				expanded={expanded}
				setExpanded={setExpanded}
				setLocalCache={setLocalCache}
			/>
			<Collapse in={expanded}>
				<Box sx={{
					display: "flex",
					flexDirection: "column",
					border: 1,
					borderTop: 0,
					borderColor: "#9e9e9e",
					p: 2
				}}>
					{(column.type === COLUMN_TYPE.LINK)
						? <TextHeader
							column={column}
							setLocalCache={setLocalCache}
						/> : null}

					{(column.type === COLUMN_TYPE.IMAGE)
						? <ImageHeader
							column={column}
							setLocalCache={setLocalCache}
						/> : null}
				</Box>
			</Collapse>
		</Box>
	)
}
FooterColumn.propTypes = {
	column: PropTypes.object.isRequired,
	setLocalCache: PropTypes.func.isRequired,
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

//TODO: add social menu item block

export default function FooterMenu({ themeSettings }) {
	const ref = useRef(null)
	const sortedList = useRef([])
	const [showDrawer, setShowDrawer] = useState(false)

	const {
		data: { footerMenu = {} },
		isLoading: isLoadingFooterMenu
	} = useAppSettings(null, APP_SETTINGS.footerMenu)

	const {
		localCache, handlers: { setLocalCache }
	} = useLocalComponentCache(footerMenu)

	const [updateAppSettings] = useUpdateAppSettingsMutation()

	sortedList.current = useMemo(() => {
		return orderBy(localCache, ["order"])
	}, [localCache])

	const allFooterMenuPreview = {
		[THEME_NAME.themeSimplicity]: <SimplicityFooterMenuPreview />
	}

	const handleSaveFooterMenu = async () => {
		const res = await updateAppSettings({
			data: {
				[APP_SETTINGS.footerMenu]: keyBy(localCache, "id")
			},
			options: {
				docName: APP_SETTINGS.footerMenu,
				merge: false
			}
		})

		if (res?.data?.code === CODE.SUCCESS) {
			const invalidatesTags = {
				trigger: "__",
				tag: [{ type: TYPE.SETTINGS, id: APP_SETTINGS.footerMenu }],
				target: {
					isForUser: true,
					isForAdmin: true,
					isForPublic: true
				},
			}
			await requestSilentRefetching(invalidatesTags)
		}
	}

	const handleCancelFooterMenu = () => {
		setLocalCache(footerMenu)
	}

	return (
		<ContentGroup title="Footer Menu">
			<ContentDescription>
				Managing your Footer menu.<br /> The preview is based on your current theme ({themeSettings.themeName}).
			</ContentDescription>
			<ContentRow
				defaultContent={allFooterMenuPreview[themeSettings.themeName]}
				editModeContent={
					<Box
						id="editFooterMenuScreen"
						ref={ref}
						sx={{
							display: "flex",
							flexDirection: "column",
							p: 2,
							m: -2
						}}
						onClick={(e) => {
							e.stopPropagation()
							setShowDrawer(p => !p)
						}}
					>
						<Grid id="menu-items" container spacing={2} >
							{sortedList.current.map(column => {
								return (
									<Grid item xs={12} md={6} lg={4} key={column.id}>
										<FooterColumn
											column={column}
											setLocalCache={setLocalCache}
										/>

										{(size(column.children)) ?
											<Stack spacing={1} marginLeft={3} sx={{ mt: 1 }}>
												{orderBy(column.children, ["order"]).map(item => {
													return (
														<FooterMenuItem
															key={item.id}
															menuItem={item}
															setLocalCache={setLocalCache}
															setShowDrawer={setShowDrawer}
														/>
													)
												})}
											</Stack> : null}
									</Grid>
								)
							})}
						</Grid>

						{sortedList.current.length === 0
							? <Box sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								p: 10
							}}>
								<Typography
									onClick={(e) => {
										e.stopPropagation()
										setShowDrawer(true)
									}}
								>
									Click this grey backdrop to open &quote;Add new menu item&quote; panel
								</Typography>
							</Box> : null}

						<AddNewMenuItemPanel
							type={MENU_LOCATION.FOOTER}
							showDrawer={showDrawer}
							setShowDrawer={setShowDrawer}
							setLocalCache={setLocalCache}
						/>

					</Box>
				}
				handleSave={handleSaveFooterMenu}
				handleCancel={handleCancelFooterMenu}
				isModified={!isEqual(localCache, footerMenu)}
				isUpdating={isLoadingFooterMenu}
			>
			</ContentRow>

		</ContentGroup>
	)
}
FooterMenu.propTypes = {
	themeSettings: PropTypes.object.isRequired,
}