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
import React, { useMemo, useRef, useState } from "react"

// MATERIAL-UI
import { Box, Collapse, Grid, Stack, Typography } from "@mui/material"

//THIRD-PARTY
import { groupBy, isEqual, orderBy, size } from "lodash"
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
	CODE,
	EMPTY
} from "@helpers/constants"

import {
	TopMenuPreview as SimplicityTopMenuPreview,
} from "@components/Themes/Simplicity/MenuPreview"

import { AddNewMenuItemPanel, DuplicateIconButton, ExpandIndicator, FormCustomLink, FormDocLink, MENU_DRAG_TYPE, MENU_TYPE, NO_PARENT, DRAG_TARGET, RemoveIconButton, VisibilityIconButton } from "@components/Settings/MenuSettings"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function isValidDropExistedTopMenuItems(sourceItem, targetItem) {

	console.log({ sourceItem, targetItem })
	//Not allow to drag to itself
	if (sourceItem.details.id === targetItem.id) return false

	//Not allow to move sub-item to its current parent
	if (sourceItem.details.parentId === targetItem.id) return false

	//Not allow rootItem with children
	if (sourceItem.details.parentId === NO_PARENT
		&& sourceItem.hasChildren) return false

	//else, allow all
	return true
}

/**
 * Moving the existed menu-item around
 * @param {*} sourceItem 
 * @param {*} targetItem 
 * @param {*} setLocalCache 
 * @returns 
 */
function moveTopMenuItem(sourceItem, targetItem, setLocalCache) {
	if (targetItem.target === DRAG_TARGET.ROOT) {
		setLocalCache(NO_PARENT, sourceItem.details.id + ".parentId")
		return
	}

	if (targetItem.target === DRAG_TARGET.INSERT_BEFORE) {
		if (sourceItem.details.parentId === NO_PARENT) {
			setLocalCache(targetItem.details.order - 1, sourceItem.details.id + ".order")
			return
		}
		setLocalCache(NO_PARENT, sourceItem.details.id + ".parentId")
		setLocalCache(targetItem.details.order - 1, sourceItem.details.id + ".order")
		return
	}

	if (targetItem.target === DRAG_TARGET.MENU_ITEM) {
		//1. SubItem => SubItem
		if (sourceItem.details.parentId !== NO_PARENT && targetItem.details.parentId !== NO_PARENT) {
			//the same parent
			if (sourceItem.details.parentId === targetItem.details.parentId) {
				//user want to move from higher to lower
				if (sourceItem.details.order <= targetItem.details.order) {
					setLocalCache(targetItem.details.order + 1, sourceItem.details.id + ".order")
					return
				}
				//user want to move from lower to higher
				setLocalCache(targetItem.details.order - 1, sourceItem.details.id + ".order")
				return
			}
			//not the same parent
			setLocalCache(targetItem.details.parentId, sourceItem.details.id + ".parentId")
			return
		}

		//2. SubItem => RootItem
		if (sourceItem.details.parentId !== NO_PARENT && targetItem.details.parentId === NO_PARENT) {
			if (sourceItem.details.parentId === targetItem.details.id) return
			setLocalCache(targetItem.details.id, sourceItem.details.id + ".parentId")
			return
		}

		//3. RootItem => SubItem
		if (sourceItem.details.parentId === NO_PARENT && targetItem.details.parentId !== NO_PARENT) {
			if (!sourceItem.hasChildren) {
				setLocalCache(targetItem.details.parentId, sourceItem.details.id + ".parentId")
				setLocalCache(targetItem.details.order - 1, sourceItem.details.id + ".order")
				return
			}
		}

		//4. RootItem => RootItem
		if (sourceItem.details.parentId === NO_PARENT && targetItem.details.parentId === NO_PARENT) {
			if (!sourceItem.hasChildren) {
				setLocalCache(targetItem.details.id, sourceItem.details.id + ".parentId")
				return
			}
		}
	}
}

function InsertTopMenuItemToRoot({ menuItem }) {
	const ref = useRef(null)

	const [{ canDrop, isOverCurrent }, drop] = useDrop(() => ({
		accept: [MENU_DRAG_TYPE.NEW_ITEM, MENU_DRAG_TYPE.EXISTED],
		canDrop: () => true,
		drop: (_, monitor) => {
			if (monitor.didDrop()) return
			return ({
				details: menuItem,
				target: DRAG_TARGET.INSERT_BEFORE
			})
		},
		collect: (monitor) => ({
			canDrop: monitor.canDrop(),
			isOverCurrent: monitor.isOver({ shallow: true })
		})
	}), [
		menuItem.order,
		menuItem.parentId,
		menuItem.id
	])

	drop(ref)
	const isActive = canDrop && isOverCurrent

	return (
		<Box
			ref={ref}
			sx={{
				width: "8px",
				mr: 0.5,
				...(isActive ? { backgroundColor: "primary.main" } : {})
			}}
		/>
	)
}
InsertTopMenuItemToRoot.propTypes = {
	menuItem: PropTypes.object.isRequired,
}

const TopMenuItemBase = React.memo(function _TopMenuItemBase({ menuItem, subMenuItems, expanded, setExpanded, setLocalCache }) {
	const ref = useRef(null)

	const [{ canDrop, isOverCurrent }, drop] = useDrop(() => ({
		accept: [MENU_DRAG_TYPE.NEW_ITEM, MENU_DRAG_TYPE.EXISTED],
		canDrop: (sourceItem) => isValidDropExistedTopMenuItems(sourceItem, menuItem),
		drop: (_, monitor) => {
			if (monitor.didDrop()) return
			return ({
				details: menuItem,
				target: DRAG_TARGET.MENU_ITEM
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
		menuItem.id
	])

	const [{ isDragging }, drag] = useDrag(() => ({
		type: MENU_DRAG_TYPE.EXISTED,
		item: () => ({
			details: menuItem,
			hasChildren: subMenuItems?.length ?? 0
		}),
		end: (sourceItem, monitor) => {
			const targetItem = monitor.getDropResult({ shallow: true })
			console.log({ targetItem })
			if (sourceItem && targetItem) {
				moveTopMenuItem(sourceItem, targetItem, setLocalCache)
			}
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			handlerId: monitor.getHandlerId(),
		}),
	}), [
		menuItem.order,
		menuItem.parentId,
		subMenuItems
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
			<InsertTopMenuItemToRoot menuItem={menuItem} />
			<Box sx={{
				display: "flex",
				alignItems: "baseline",
				flexGrow: 1,
				overflow: "hidden"
			}}>
				<Typography noWrap sx={{
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
							//if the menuItem is root item
							if (menuItem.parentId === NO_PARENT) {
								//toggle root-item and all available sub-item
								const newValue = !menuItem.visibility
								setLocalCache(
									newValue,
									`${menuItem.id}.visibility`
								)
								subMenuItems.forEach(subMenuItem => {
									setLocalCache(
										newValue,
										`${subMenuItem.id}.visibility`
									)
								})
							} else {
								setLocalCache(
									null,
									`${menuItem.id}.visibility`,
									"toggle")
							}
						}}
					/>


					<DuplicateIconButton
						onClick={(e) => {
							e.stopPropagation()
							const newId = nanoid()
							setLocalCache(
								{
									...menuItem,
									order: menuItem.order + 10,
									id: newId
								},
								newId
							)
						}}
					/>

					<RemoveIconButton
						onClick={(e) => {
							e.stopPropagation()
							if (menuItem.parentId !== NO_PARENT) {
								setLocalCache(null, menuItem.id, "delete")
							} else {
								//delete all related subMenuItems
								setLocalCache(null, menuItem.id, "delete")
								if (!!subMenuItems && size(subMenuItems) > 0) {
									subMenuItems.forEach(subMenuItem => {
										setLocalCache(null, subMenuItem.id, "delete")
									})
								}
							}
						}}
					/>

				</div>
			</Box>

			<ExpandIndicator expanded={expanded} />
		</Box>
	)
}, (prevProps, nextProps) => isEqual(prevProps, nextProps))
TopMenuItemBase.propTypes = {
	menuItem: PropTypes.object.isRequired,
	subMenuItems: PropTypes.array, //optional
	expanded: PropTypes.bool,
	setExpanded: PropTypes.func,
	setLocalCache: PropTypes.func.isRequired,
}

const TopMenuItem = React.memo(function _TopMenuItem({ menuItem, subMenuItems, setLocalCache }) {
	const [expanded, setExpanded] = useState(false)
	return (
		<Box onClick={(e) => e.stopPropagation()}>
			<TopMenuItemBase
				menuItem={menuItem}
				subMenuItems={subMenuItems}
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
						/> : null}

					{(MENU_TYPE.DOC_TYPE.includes(menuItem.type) || menuItem.type === MENU_TYPE.PAGE)
						? <FormDocLink
							menuItem={menuItem}
							setLocalCache={setLocalCache}
						/> : null}
				</Box>
			</Collapse>
		</Box>
	)
}, (prevProps, nextProps) => isEqual(prevProps, nextProps))
TopMenuItem.propTypes = {
	menuItem: PropTypes.object.isRequired,
	subMenuItems: PropTypes.array, //optional
	setLocalCache: PropTypes.func.isRequired,
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

export default function TopMenu({ themeSettings }) {
	const ref = useRef(null)
	const groupedMenu = useRef({})
	const [showDrawer, setShowDrawer] = useState(false)

	const {
		data: { topMenu = EMPTY.OBJECT },
		isLoading: isLoadingTopMenu
	} = useAppSettings(null, APP_SETTINGS.topMenu)

	const {
		localCache, handlers: { setLocalCache }
	} = useLocalComponentCache(topMenu)

	const [updateAppSettings] = useUpdateAppSettingsMutation()

	groupedMenu.current = useMemo(() => {
		return groupBy(orderBy(localCache, ["order"]), i => i.parentId)
	}, [localCache])

	console.log("TopMenu", groupedMenu.current)

	const [{ canDrop, isOverCurrent }, drop] = useDrop(() => ({
		accept: [MENU_DRAG_TYPE.NEW_ITEM, MENU_DRAG_TYPE.EXISTED],
		canDrop: (sourceItem) => {
			if (sourceItem.details?.menuCategory === MENU_DRAG_TYPE.NEW_ITEM) return true

			if (sourceItem.hasChildren
				|| sourceItem.details?.parentId === NO_PARENT) return false

			return true
		},
		drop: (_, monitor) => {
			if (monitor.didDrop()) return
			return ({
				target: DRAG_TARGET.ROOT
			})
		},
		collect: (monitor) => ({
			canDrop: monitor.canDrop(),
			isOverCurrent: monitor.isOver({ shallow: true })
		})
	}), [])

	drop(ref)
	const isActive = canDrop && isOverCurrent

	const allTopMenuPreview = {
		[THEME_NAME.themeSimplicity]: <SimplicityTopMenuPreview />
	}

	const handleSaveTopMenu = async () => {
		const res = await updateAppSettings({
			data: {
				[APP_SETTINGS.topMenu]: localCache
			},
			options: {
				docName: APP_SETTINGS.topMenu,
				merge: false
			}
		})

		if (res?.data?.code === CODE.SUCCESS) {
			const invalidatesTags = {
				trigger: "__",
				tag: [{ type: TYPE.SETTINGS, id: APP_SETTINGS.topMenu }],
				target: {
					isForUser: true,
					isForAdmin: true,
					isForPublic: true
				},
			}
			await requestSilentRefetching(invalidatesTags)
		}
	}

	const handleCancelTopMenu = () => {
		setLocalCache(topMenu)
	}

	return (
		<ContentGroup title="Top Menu">
			<ContentDescription>
				Managing your top menu. <br />The preview is based on your current theme ({themeSettings.themeName}).
			</ContentDescription>
			<ContentRow
				defaultContent={allTopMenuPreview[themeSettings.themeName]}
				editModeContent={
					<Box
						id="editTopMenuScreen"
						ref={ref}
						sx={{
							display: "flex",
							flexDirection: "column",
							p: 2,
							m: -2,
							...(isActive
								? { backgroundColor: "grey.300" }
								: {})
						}}
						onClick={(e) => {
							e.stopPropagation()
							setShowDrawer(p => !p)
						}}
					>
						<Grid id="menu-items" container spacing={2} >
							{(groupedMenu.current[NO_PARENT] ?? []).map((menu) => (
								<Grid item xs={12} md={6} lg={4} key={menu.id}>
									<TopMenuItem
										menuItem={menu}
										subMenuItems={groupedMenu.current[menu.id]}
										setLocalCache={setLocalCache}
										setShowDrawer={setShowDrawer}
									/>

									{(groupedMenu.current[menu.id]) ?
										<Stack spacing={1} marginLeft={3} sx={{ mt: 1 }}>
											{groupedMenu.current[menu.id].map(subMenu => (
												<TopMenuItem
													key={subMenu.id}
													menuItem={subMenu}
													setLocalCache={setLocalCache}
													setShowDrawer={setShowDrawer}
												/>
											))}
										</Stack> : null}

								</Grid>
							)
							)}
						</Grid>

						{groupedMenu.current[NO_PARENT]
							? null
							: isActive
								? null
								: <Box sx={{
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
										{"Click this grey backdrop to open \"Add new menu item\" panel"}
									</Typography>
								</Box>}

						{(isActive && !size(localCache))
							? <Box sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								p: 10
							}}>
								<Typography>
									Drop here to create your root menu item
								</Typography>
							</Box> : null}

						<AddNewMenuItemPanel
							showDrawer={showDrawer}
							setShowDrawer={setShowDrawer}
							setLocalCache={setLocalCache}
						/>

					</Box>
				}
				handleSave={handleSaveTopMenu}
				handleCancel={handleCancelTopMenu}
				isModified={!isEqual(localCache, topMenu)}
				isUpdating={isLoadingTopMenu}
			/>
		</ContentGroup >
	)
}
TopMenu.propTypes = {
	themeSettings: PropTypes.object.isRequired,
}