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

import React from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from "@mui/material"

//THIRD-PARTY
import { useSelector, useDispatch } from "react-redux"

//PROJECT IMPORT
import { getNewTicket } from "./../../redux/selectors"
import {
	setSelectedCategory, setSelectedSubCategory,
	setSelectedPriority,
	setSelectedDepartment
} from "./../../redux/slices/newTicket"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const DepartmentBlock = ({ departments, selectedDepartment, defaultDepartment }) => {
	const dispatch = useDispatch()
	return (
		<FormControl sx={{ formControl: { m: 1, minWidth: 120 } }} fullWidth>
			<InputLabel shrink id="department">Department</InputLabel>
			<Select
				labelId="department"
				id="department"
				value={selectedDepartment ? selectedDepartment : defaultDepartment}
				onChange={(e) => {
					dispatch(setSelectedDepartment(e.target.value))
				}}
				displayEmpty
				MenuProps={{
					anchorOrigin: {
						vertical: "bottom",
						horizontal: "left"
					},
				}}
			>
				{
					departments?.map(
						department => <MenuItem key={department} value={department}>{department}</MenuItem>
					)
				}
			</Select>
			<FormHelperText>Department</FormHelperText>
		</FormControl>
	)
}
DepartmentBlock.propTypes = {
	departments: PropTypes.array,
	selectedDepartment: PropTypes.string,
	defaultDepartment: PropTypes.string,
}

const PriorityBlock = ({ priorities, selectedPriority, defaultPriority }) => {
	const dispatch = useDispatch()
	return (
		<FormControl sx={{ formControl: { m: 1, minWidth: 120 } }} fullWidth>
			<InputLabel shrink id="priority">Priority</InputLabel>
			<Select
				labelId="priority"
				id="priority"
				value={selectedPriority ? selectedPriority : defaultPriority}
				onChange={(e) => {
					dispatch(setSelectedPriority(e.target.value))
				}}
				displayEmpty
				MenuProps={{
					anchorOrigin: {
						vertical: "bottom",
						horizontal: "left"
					},
				}}
			>
				{
					priorities?.map(priority => <MenuItem key={priority} value={priority}>{priority}</MenuItem>)
				}
			</Select>
			<FormHelperText>Priority</FormHelperText>
		</FormControl>
	)
}
PriorityBlock.propTypes = {
	priorities: PropTypes.array,
	selectedPriority: PropTypes.string,
	defaultPriority: PropTypes.string,
}

const CategoryBlock = ({ categories, currentCategory }) => {
	const dispatch = useDispatch()
	return (
		<FormControl sx={{ formControl: { m: 1, minWidth: 120 } }} fullWidth>
			<InputLabel shrink id="category">Category</InputLabel>
			<Select
				labelId="category"
				id="category"
				value={currentCategory}
				onChange={(e) => {
					dispatch(setSelectedCategory(e.target.value))
				}}
				displayEmpty
				MenuProps={{
					anchorOrigin: {
						vertical: "bottom",
						horizontal: "left"
					},
				}}
			>
				{
					Object.entries(categories)?.map(
						(category) => <MenuItem key={category[0]} value={category[0]}>{category[0]}</MenuItem>
					)
				}
			</Select>
			<FormHelperText>Category</FormHelperText>
		</FormControl>
	)
}
CategoryBlock.propTypes = {
	categories: PropTypes.object,
	currentCategory: PropTypes.string
}


const SubCategoryBlock = ({ categories, currentCategory, currentSubCategory }) => {
	const dispatch = useDispatch()
	return (
		<FormControl sx={{ formControl: { m: 1, minWidth: 120 } }} fullWidth>
			<InputLabel shrink id="category">Sub-Category</InputLabel>
			<Select
				labelId="sub-category"
				id="sub-category"
				value={currentSubCategory}
				onChange={(e) => {
					dispatch(setSelectedSubCategory(e.target.value))
				}}
				displayEmpty
				MenuProps={{
					anchorOrigin: {
						vertical: "bottom",
						horizontal: "left"
					},
				}}
			>
				{
					categories[currentCategory]?.map(
						(category) => <MenuItem key={category} value={category}>{category}</MenuItem>
					)
				}
			</Select>
			<FormHelperText>Sub-Category</FormHelperText>
		</FormControl>
	)
}
SubCategoryBlock.propTypes = {
	categories: PropTypes.object,
	currentCategory: PropTypes.string,
	currentSubCategory: PropTypes.string
}


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const NewTicketStep2 = () => {
	const { newTicket } = useSelector(getNewTicket)
	const {
		/* Selection */
		categories, priorities, departments,
		/* SelectedValue */
		selectedCategory, selectedPriority, selectedDepartment,
		/* defaultValue */
		defaultCategory, defaultSubCategory, defaultPriority, defaultDepartment
	} = newTicket

	const currentCategory = selectedCategory.cat ? selectedCategory.cat : defaultCategory

	let currentSubCategory = ""
	if (selectedCategory.subCat === "") currentSubCategory = defaultSubCategory[currentCategory]
	else {
		if (categories[currentCategory].indexOf(selectedCategory.subCat) === -1)
			currentSubCategory = defaultSubCategory[currentCategory]
		else
			currentSubCategory = selectedCategory.subCat
	}

	return (
		<form onSubmit={(e) => { e.preventDefault() }}>
			<Grid container spacing={4}>
				<Grid item xs={12} sm={6} >

					{(departments?.length === 0) &&
						<div style={{ display: "block" }}>
							Please setup Department information!...
						</div>}

					{(departments?.length > 0) &&
						<DepartmentBlock
							departments={departments}
							selectedDepartment={selectedDepartment}
							defaultDepartment={defaultDepartment}
						/>}

				</Grid>

				<Grid item xs={12} sm={6} >
					<PriorityBlock
						priorities={priorities}
						selectedPriority={selectedPriority}
						defaultPriority={defaultPriority}
					/>
				</Grid>

				<Grid item xs={12} sm={6} >

					{(Object.entries(categories).length === 0) &&
						<div style={{ display: "block" }}>
							Please setup Category information!...
						</div>}

					{(Object.entries(categories).length > 0) &&
						<CategoryBlock
							categories={categories}
							currentCategory={currentCategory}
						/>}

				</Grid>

				{(categories[currentCategory]?.length > 0) &&
					<Grid item xs={12} sm={6} >
						<SubCategoryBlock
							categories={categories}
							currentCategory={currentCategory}
							currentSubCategory={currentSubCategory}
						/>
					</Grid>}

			</Grid >
		</form>
	)
}

export default NewTicketStep2