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


import React, { useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Button, Box, IconButton, Tooltip, Grid, TextField, Typography } from "@mui/material"

//THIRD-PARTY
import { some, filter, sortBy } from "lodash"
import { nanoid } from "nanoid"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { SettingsContentActionBar, SettingsContentDetails, SettingsContentHeader } from "./../../Settings/SettingsPanel"
import { setActiveSettingPanel } from "./../../../redux/slices/uiSettings"
import { CATEGORY_PAGES } from "./../../../pages/admin/settings/tickets/category"
import { useAddCategoryMutation } from "../../../redux/slices/firestoreApi"
import { useSnackbar } from "notistack"

//PROJECT IMPORT

//ASSETS
import DeleteIcon from "@mui/icons-material/Delete"
import CheckBoxIcon from "@mui/icons-material/CheckBox"
import useTicketCategories from "../../../helpers/useTicketCategories"
import { getAuth } from "../../../redux/selectors"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const SubCatItem = ({ currentItem, list, setList }) => {
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
						onClick={() => {
							console.log("change default item")
							const newArray = Array.from(list)
							newArray.forEach((_, idx) => {
								newArray[idx] = { ...newArray[idx], default: _.name === currentItem.name }
							})
							setList(newArray)
						}}
					>
						<CheckBoxIcon fontSize="small" />
					</IconButton>
				</Tooltip>}
				<Tooltip title="Delete" placement="right">
					<IconButton
						sx={{ ":hover": { color: "warning.main" } }}
						onClick={() => {
							setList(filter(list, (i) => i.name !== currentItem.name))
						}}
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
	//
	const [categoryName, setCategoryName] = useState("")
	const [subCategoryName, setSubCategoryName] = useState("")

	const [subCategories, setSubCategories] = useState([])

	const [addCategory] = useAddCategoryMutation()
	const { data: categories } = useTicketCategories()

	const { enqueueSnackbar } = useSnackbar()

	const handleAddSubCat = () => {
		if (some(subCategories, (i) => i.name === subCategoryName))
			enqueueSnackbar("Sub-category existed", { variant: "error" })
		else {
			const newArray = [...subCategories, { name: subCategoryName, default: false }]
			setSubCategories(sortBy(newArray, ["name"]))
			setSubCategoryName("")
		}
	}

	return (
		<>
			<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
				Add new category
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
					onClick={async () => {
						const departmentDuplicated = some(categories, { name: categoryName })
						if (departmentDuplicated) {
							enqueueSnackbar("Category name existed", { variant: "error" })
							return
						}

						const catId = nanoid()
						const categoryItem = {
							catId,
							name: categoryName,
							default: false,
							subCategories: subCategories,
							createdBy: currentUser.username,
							updatedBy: currentUser.username,
						}
						//Go to newly created category
						// dispatch(setActiveSettingPanel(categoryName))
						dispatch(setActiveSettingPanel(CATEGORY_PAGES.OVERVIEW))
						await addCategory(categoryItem).unwrap()
					}}
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