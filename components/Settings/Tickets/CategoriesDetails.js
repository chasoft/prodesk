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

import PropTypes from "prop-types"
import React, { useState } from "react"

// MATERIAL-UI
import { Button, Box, Grid, TextField, Tooltip, Typography, IconButton, FormControlLabel, Switch, Collapse } from "@mui/material"

//THIRD-PARTY
import { cloneDeep, find, filter, some, isEqual } from "lodash"
import { isMobile } from "react-device-detect"
import { TransitionGroup } from "react-transition-group"
import { useDeepCompareEffect } from "react-use"
import { useDispatch, useSelector } from "react-redux"
import { useSnackbar } from "notistack"
import dayjs from "dayjs"

//PROJECT IMPORT
import { CATEGORY_PAGES } from "@pages/admin/settings/tickets/category"
import { CircularProgressBox } from "@components/common"
import { CODE } from "@helpers/constants"
import { requestSilentRefetching } from "@helpers/realtimeApi"
import { setActiveSettingPanel } from "@redux/slices/uiSettings"
import { SubCatItem } from "@components/Settings/Tickets/CategoriesAddNew"
import { TYPE } from "@redux/slices/firestoreApiConstants"
import ConfirmDialog from "@components/common/ConfirmDialog"
import useTicketCategories from "@helpers/useTicketCategories"

import {
	SettingsContentActionBar,
	SettingsContentDetails,
	SettingsContentHeader
} from "@components/common/Settings"

import {
	useDeleteCategoryMutation,
	useUpdateCategoryMutation
} from "@redux/slices/firestoreApi"

//ASSETS
import DeleteIcon from "@mui/icons-material/Delete"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function CategoriesDetails({ backBtnClick }) {
	const dispatch = useDispatch()
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const { enqueueSnackbar } = useSnackbar()
	const isSmallScreen = useSelector(s => s.uiSettingsState.isSmallScreen)
	const [deleteCategory] = useDeleteCategoryMutation()
	const [updateCategory] = useUpdateCategoryMutation()
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
	//
	const { data: categories, isLoading } = useTicketCategories()
	const activeSettingPanel = useSelector(s => s.uiSettingsState.activeSettingPanel)
	const selectedCategory = find(categories, { name: activeSettingPanel })

	//Local memory
	const [isDefault, setIsDefault] = useState(false)
	const [categoryName, setCategoryName] = useState("")
	const [subCategories, setSubCategories] = useState([])
	const [subCategoryName, setSubCategoryName] = useState("")

	useDeepCompareEffect(() => {
		setIsDefault(selectedCategory.default)
		setCategoryName(selectedCategory.name)
		setSubCategories(selectedCategory.subCategories)
	}, [selectedCategory])

	const isModified = (selectedCategory.name !== categoryName
		|| !isEqual(selectedCategory.subCategories, subCategories))
		|| isDefault !== selectedCategory.default

	const handleAddSubCat = () => {
		if (some(subCategories, (i) => i.name === subCategoryName))
			enqueueSnackbar("Sub-category existed", { variant: "error" })
		else {
			setSubCategories([...subCategories, { name: subCategoryName, default: false }])
			setSubCategoryName("")
		}
	}

	const handleDeleteCategory = async (confirmed) => {
		if (confirmed === false)
			return

		//redirect to overview tab
		dispatch(setActiveSettingPanel(CATEGORY_PAGES.OVERVIEW))
		//get newList of categories
		const newList = filter(categories, c => c.catId !== selectedCategory.catId)
		await deleteCategory({
			categoryItem: { catId: selectedCategory.catId },
			fullList: newList
		})
	}

	const handleUpdateCategory = async () => {
		//Do not allow categories have the same name
		const categoryDuplicated = (selectedCategory.name === categoryName)
			? false
			: some(categories, { name: categoryName })
		if (categoryDuplicated) {
			enqueueSnackbar(`Category with name "${categoryName}" existed`, { variant: "error" })
			return
		}

		/**
		 * Note: if user set as default === true, then, must update all items
		 */
		//prepare the data for current category
		const updatedData = {
			name: categoryName,
			default: isDefault,
			subCategories: subCategories,
			updatedAt: dayjs().valueOf(),
			updatedBy: currentUser.username,
		}
		//make a independent copy current category list (deep copy)
		const fullList = cloneDeep(categories)
		//set default to false for existing categories (if existed)
		if (isDefault) {
			const oldDefaultItem = fullList.find(c => c.default === true)
			if (oldDefaultItem !== undefined) {
				Object.assign(oldDefaultItem, { default: false })
			}
		}
		//update current category
		let updatedItem = fullList.find(c => c.catId === selectedCategory.catId)
		Object.assign(updatedItem, updatedData)

		dispatch(setActiveSettingPanel(categoryName))
		const res = await updateCategory({
			isDefault,
			categoryItem: updatedItem,
			fullList
		})

		//broadcast refetching-request
		if (res?.data?.code === CODE.SUCCESS) {
			const invalidatesTags = {
				trigger: currentUser.username,
				tag: [{ type: TYPE.CATEGORIES, id: "LIST" }],
				target: {
					isForUser: true,
					isForAdmin: true,
				}
			}
			await requestSilentRefetching(invalidatesTags)
		}
	}

	console.log("Category Details")

	return (
		<>
			{isLoading
				? <CircularProgressBox />
				: <>
					<SettingsContentHeader
						backBtnOnClick={() => backBtnClick(false)}
						rightButton={<Box>
							<FormControlLabel
								control={<Switch
									checked={isDefault}
									onChange={() => setIsDefault(p => !p)}
									name="checkedB"
									color="primary" />}
								label={(isMobile || isSmallScreen) ? "Default " : "Set as default"} />
							<Tooltip title="Delete current category" placement="left">
								<IconButton
									sx={{ ":hover": { color: "warning.main" } }}
									onClick={() => setOpenConfirmDialog(true)}
								>
									<DeleteIcon fontSize="small" />
								</IconButton>
							</Tooltip>
						</Box>}
					>
						<Typography variant="button">
							Edit category
						</Typography>

						<ConfirmDialog
							okButtonText="Delete"
							color="warning"
							open={openConfirmDialog}
							setOpen={setOpenConfirmDialog}
							callback={handleDeleteCategory}
						>
							<Box sx={{
								display: "flex"
							}}>
								<DeleteIcon sx={{ width: 60, height: 60, mr: 2 }} color="warning" />
								<Typography sx={{ lineHeight: 2 }}>
									Are you sure you want to delete this category and all its sub-categories?<br />Please note that this action can not be undo.
								</Typography>
							</Box>
						</ConfirmDialog>
					</SettingsContentHeader>

					<SettingsContentDetails>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									value={categoryName}
									onChange={(e) => { setCategoryName(e.target.value) }}
									label="Category name"
									placeholder="eg. name of your provided product/service group"
									fullWidth />
							</Grid>

							<Grid item xs={12}>
								<Typography color="grey.600" sx={{ mb: 1 }}>Sub-Categories</Typography>
								<TransitionGroup>
									{subCategories.map((subCat) => (
										<Collapse key={subCat.name}>
											<SubCatItem
												currentItem={subCat}
												list={subCategories}
												setList={setSubCategories} />
										</Collapse>
									))}
								</TransitionGroup>
							</Grid>

							<Grid item xs={12}>
								<form
									onSubmit={(e) => {
										e.preventDefault()
										handleAddSubCat()
									}}
									sx={{ display: "flex" }}
								>
									<Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
										<div style={{ flexGrow: 1 }}>
											<TextField
												value={subCategoryName}
												onChange={(e) => { setSubCategoryName(e.target.value) }}
												label="Sub-category name"
												placeholder="eg. name of your sub-category"
												fullWidth />
										</div>
										<Button
											sx={{ ml: { xs: 0, sm: 2 }, px: 2, mt: { xs: 2, sm: 0 } }}
											variant="outlined"
											disabled={subCategoryName === ""}
											size="small"
											onClick={() => handleAddSubCat()}>
											Add Sub-category
										</Button>
									</Box>
								</form>
							</Grid>

						</Grid>
					</SettingsContentDetails>

					<SettingsContentActionBar>
						<Button
							variant="outlined"
							onClick={() => {
								dispatch(setActiveSettingPanel(CATEGORY_PAGES.OVERVIEW))
							}}
						>
							Cancel
						</Button>
						<Button
							color="primary"
							variant="contained"
							disabled={!isModified}
							onClick={handleUpdateCategory}
						>
							Update
						</Button>
					</SettingsContentActionBar>
				</>}
		</>
	)
}

CategoriesDetails.propTypes = {
	backBtnClick: PropTypes.func,
}

export default CategoriesDetails