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


import PropTypes from "prop-types"
import React, { useState } from "react"

// MATERIAL-UI
import { Box, Button, CircularProgress, FormControlLabel, Grid, IconButton, Switch, TextField, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import { nanoid } from "nanoid"
import { isMobile } from "react-device-detect"
import { cloneDeep, some, filter, sortBy, trim } from "lodash"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { useSnackbar } from "notistack"
import { setActiveSettingPanel } from "./../../../redux/slices/uiSettings"
import { useAddCategoryMutation } from "../../../redux/slices/firestoreApi"
import { CATEGORY_PAGES } from "./../../../pages/admin/settings/tickets/category"
import { SettingsContentActionBar, SettingsContentDetails, SettingsContentHeader } from "./../../Settings/SettingsPanel"

//PROJECT IMPORT
import { getAuth, getUiSettings } from "../../../redux/selectors"
import useTicketCategories from "../../../helpers/useTicketCategories"

//ASSETS
import DeleteIcon from "@mui/icons-material/Delete"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import { CODE } from "../../../helpers/constants"
import { TYPE } from "../../../redux/slices/firestoreApiConstants"
import { requestSilentRefetching } from "../../../helpers/realtimeApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const SubCatItem = ({ currentItem, list, setList }) => {
	const handleSetDefault = () => {
		console.log("change default item")
		const newArray = Array.from(list)
		newArray.forEach((_, idx) => {
			newArray[idx] = { ...newArray[idx], default: _.name === currentItem.name }
		})
		setList(newArray)
	}

	const handleDelete = () => {
		setList(filter(list, (i) => i.name !== currentItem.name))
	}

	return (
		<Box sx={{
			display: "flex",
			px: 2,
			"&>#buttons": {
				visibility: "hidden"
			},
			":hover": {
				backgroundColor: "action.hover",
				"&>#buttons": {
					visibility: "visible"
				}
			}
		}}>

			<Box sx={{
				display: "flex",
				alignItems: "center",
				flexGrow: 1
			}}>
				{currentItem.default ?
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<Typography color="primary.main" sx={{ fontWeight: "bold" }}>
							{currentItem.name}
						</Typography>
						<Typography color="primary.main">
							&nbsp; (default)
						</Typography>
					</Box>
					:
					<div>
						<Typography>{currentItem.name}</Typography>
					</div>}
			</Box>

			<Box id="buttons" sx={{
				display: "flex",
				alignItems: "center"
			}}>
				{!currentItem.default && <Tooltip title="Set default" placement="left">
					<IconButton
						sx={{ ":hover": { color: "primary.main" } }}
						onClick={handleSetDefault}
					>
						<CheckBoxIcon fontSize="small" />
					</IconButton>
				</Tooltip>}
				<Tooltip title="Delete" placement="right">
					<IconButton
						sx={{ ":hover": { color: "warning.main" } }}
						onClick={handleDelete}
					>
						<DeleteIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			</Box>

		</Box >
	)
}
SubCatItem.propTypes = {
	currentItem: PropTypes.object,
	list: PropTypes.array,
	setList: PropTypes.func,
}


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CategoriesAddNew = ({ backBtnClick }) => {
	const dispatch = useDispatch()
	const { currentUser } = useSelector(getAuth)
	const { isSmallScreen } = useSelector(getUiSettings)
	//
	const [isDefault, setIsDefault] = useState(false)
	const [categoryName, setCategoryName] = useState("")
	const [subCategoryName, setSubCategoryName] = useState("")
	const [subCategories, setSubCategories] = useState([])

	const [addCategory] = useAddCategoryMutation()
	const { data: categories, isLoading: isLoadingCategories } = useTicketCategories()

	const { enqueueSnackbar } = useSnackbar()

	const handleAddSubCat = (e) => {
		e.preventDefault()
		if (some(subCategories, (i) => i.name === subCategoryName))
			enqueueSnackbar("Sub-category existed", { variant: "error" })
		else {
			const newArray = [...subCategories, { name: subCategoryName, default: false }]
			setSubCategories(sortBy(newArray, ["name"]))
			setSubCategoryName("")
		}
	}

	const handleAddNewCategory = async () => {
		//Do not allow categories have the same name
		const departmentDuplicated = some(categories, { name: categoryName })
		if (departmentDuplicated) {
			enqueueSnackbar("Category name existed", { variant: "error" })
			return
		}

		/**
		 * Note: if user set as default === true, then, must update all items
		 */

		//prepare the data for new category
		const catId = nanoid()
		const categoryItem = {
			catId,
			name: categoryName,
			default: isDefault,
			subCategories: subCategories,
			createdBy: currentUser.username,
			updatedBy: currentUser.username,
			createdAt: dayjs().valueOf(),
			updatedAt: dayjs().valueOf()
		}

		let fullList
		if (isDefault) {
			//make a independent copy current category list (deep copy)
			fullList = cloneDeep(categories)
			//set default to false for existing categories (if existed)
			let obj = fullList.find(c => c.default === true)
			if (obj !== undefined) {
				Object.assign(obj, { default: false })
			}
			//append new category
			fullList.push(categoryItem)
		}

		dispatch(setActiveSettingPanel(CATEGORY_PAGES.OVERVIEW))
		const res = await addCategory({
			isDefault,
			categoryItem,
			fullList
		})

		//broadcast refetching-request
		if (res?.data.code === CODE.SUCCESS) {
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

	const handleCancel = () => {
		dispatch(setActiveSettingPanel(CATEGORY_PAGES.OVERVIEW))
	}

	return (
		<>
			<SettingsContentHeader
				backBtnOnClick={() => backBtnClick(false)}
				rightButton={
					<FormControlLabel
						control={
							<Switch
								checked={isDefault}
								onChange={() => setIsDefault(p => !p)}
								name="checkedB"
								color="primary"
							/>
						}
						label={(isMobile || isSmallScreen) ? "Default " : "Set as default"}
					/>
				}
			>
				Add new category
			</SettingsContentHeader>

			<SettingsContentDetails>
				{isLoadingCategories
					? <Box sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "200px"
					}}>
						<CircularProgress />
					</Box>
					: <Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								value={categoryName}
								onChange={(e) => { setCategoryName(e.target.value) }}
								label="Category name"
								placeholder="eg. name of your provided product/service group"
								fullWidth
							/>
						</Grid>

						<Grid item xs={12}>
							<Typography color="grey.600" sx={{ mb: 1 }}>Sub-Categories</Typography>
							{subCategories.map((subCat) => (
								<SubCatItem
									key={subCat.name}
									currentItem={subCat}
									list={subCategories}
									setList={setSubCategories}
								/>
							))}

						</Grid>

						<Grid item xs={12}>
							<form sx={{ display: "flex" }} onSubmit={handleAddSubCat}>
								<Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
									<div style={{ flexGrow: 1 }}>
										<TextField
											value={subCategoryName}
											onChange={(e) => { setSubCategoryName(e.target.value) }}
											label="Sub-category name"
											placeholder="eg. name of your sub-category"
											fullWidth
										/>
									</div>
									<Button
										sx={{ ml: { xs: 0, sm: 2 }, px: 2, mt: { xs: 2, sm: 0 } }}
										variant="outlined"
										disabled={trim(subCategoryName) === ""}
										size="small"
										onClick={() => handleAddSubCat()}>
										Add Sub-category
									</Button>
								</Box>
							</form>
						</Grid>
					</Grid>}
			</SettingsContentDetails>

			<SettingsContentActionBar>
				<Button variant="outlined" onClick={handleCancel}>
					Cancel
				</Button>
				<Button
					color="primary"
					variant="contained"
					onClick={handleAddNewCategory}
					disabled={isLoadingCategories || trim(categoryName) === ""}
				>
					Add
				</Button>
			</SettingsContentActionBar>

		</>
	)
}

CategoriesAddNew.propTypes = {
	backBtnClick: PropTypes.func,
}

export default CategoriesAddNew