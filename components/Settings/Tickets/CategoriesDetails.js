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
import { Button, Box, Grid, TextField, Tooltip, Typography, IconButton } from "@mui/material"

//THIRD-PARTY
import { useSnackbar } from "notistack"
import { find, filter, some, isEqual } from "lodash"
import { useDeepCompareEffect } from "react-use"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getAuth, getUiSettings } from "../../../redux/selectors"
import { setActiveSettingPanel } from "../../../redux/slices/uiSettings"
import { SettingsContentActionBar, SettingsContentDetails, SettingsContentHeader } from "./../../Settings/SettingsPanel"
import { useDeleteCategoryMutation, useUpdateCategoryMutation } from "../../../redux/slices/firestoreApi"

//ASSETS
import DeleteIcon from "@mui/icons-material/Delete"
import { CATEGORY_PAGES } from "../../../pages/admin/settings/tickets/category"
import { SubCatItem } from "./CategoriesAddNew"
import useTicketCategories from "../../../helpers/useTicketCategories"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CategoriesDetails = ({ backBtnClick }) => {
	const dispatch = useDispatch()
	const { currentUser } = useSelector(getAuth)
	const { enqueueSnackbar } = useSnackbar()
	const [deleteCategory] = useDeleteCategoryMutation()
	const [updateCategory] = useUpdateCategoryMutation()

	//Original
	const { data: categories, isLoading } = useTicketCategories()
	const { activeSettingPanel } = useSelector(getUiSettings)
	const selectedCategory = find(categories, { name: activeSettingPanel })

	//Local memory
	const [categoryName, setCategoryName] = useState("")
	const [subCategories, setSubCategories] = useState([])
	const [subCategoryName, setSubCategoryName] = useState("")

	//Re-render
	useDeepCompareEffect(() => {
		setCategoryName(selectedCategory.name)
		setSubCategories(selectedCategory.subCategories)
	}, [selectedCategory])

	const isModified = (selectedCategory.name !== categoryName
		|| !isEqual(selectedCategory.subCategories, subCategories))

	const handleAddSubCat = () => {
		if (some(subCategories, (i) => i.name === subCategoryName))
			enqueueSnackbar("Sub-category existed", { variant: "error" })
		else {
			setSubCategories([...subCategories, { name: subCategoryName, default: false }])
			setSubCategoryName("")
		}
	}

	console.log("Category Details")

	return (
		<>
			{isLoading ? <div>Loading...</div> :
				<>
					<SettingsContentHeader
						backBtnOnClick={() => backBtnClick(false)}
						rightButton={
							<Tooltip title="Delete current category" placement="left">
								<IconButton onClick={async () => {
									dispatch(setActiveSettingPanel(CATEGORY_PAGES.OVERVIEW))
									await deleteCategory(selectedCategory)
								}}>
									<DeleteIcon fontSize="small" color="warning" />
								</IconButton>
							</Tooltip>
						}
					>
						Edit category
					</SettingsContentHeader>

					<SettingsContentDetails>
						<Grid container spacing={2}>
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
												fullWidth
											/>
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
							onClick={async () => {
								const departmentDuplicated =
									(selectedCategory.name === categoryName)
										? false
										: some(categories, { name: categoryName })
								if (departmentDuplicated) {
									enqueueSnackbar("Category name existed", { variant: "error" })
									return
								}
								await updateCategory({
									categoryItem: {
										catId: selectedCategory.catId,
										name: categoryName,
										subCategories: subCategories,
										updatedBy: currentUser.username
									},
									affectedItems: []
								}).unwrap()
								//Go to overview page
								dispatch(setActiveSettingPanel(categoryName))
							}}
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