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

import Link from "next/link"
import React from "react"

// MATERIAL-UI
import { Select, MenuItem, InputLabel, Grid, FormControl } from "@mui/material"

//THIRD-PARTY
import { useSelector, useDispatch } from "react-redux"

//PROJECT IMPORT
import { getNewTicket } from "./../../../redux/selectors"
import { useGetDepartmentsQuery, useGetCategoriesQuery } from "./../../../redux/slices/firestoreApi"
import {
	setSelectedCategory, setSelectedSubCategory,
	setSelectedPriority,
	setSelectedDepartment
} from "./../../../redux/slices/newTicket"
import { useGetTicketDetails } from "./NewTicketStepper"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const DepartmentBlock = () => {
	const dispatch = useDispatch()
	const { data: departments, isLoading } = useGetDepartmentsQuery()
	const { selectedDepartment } = useSelector(getNewTicket)

	if (isLoading)
		return (
			<div>Loading departments..</div>
		)

	if (!departments?.length)
		return (
			<div style={{ display: "block" }}>
				Please <Link href="/admin/settings/tickets/department">click here</Link> to setup department information!
			</div>
		)

	console.log("selectedDepartment", selectedDepartment)

	return (

		<FormControl sx={{ formControl: { m: 1 } }} fullWidth>
			<InputLabel shrink id="department">Department</InputLabel>
			<Select
				labelId="department"
				label="Department"
				id="department"
				value={selectedDepartment ?? departments[0].department}
				onChange={(e) => {
					dispatch(setSelectedDepartment(e.target.value))
				}}
			>

				{departments.map((item) => (
					<MenuItem key={item.department} value={item.department}>
						{item.department}
					</MenuItem>))}

			</Select>
		</FormControl>
	)
}

const PriorityBlock = () => {
	const dispatch = useDispatch()
	const priorities = ["Low", "Normal", "High"]
	const { selectedPriority } = useSelector(getNewTicket)

	return (
		<FormControl sx={{ formControl: { m: 1, minWidth: 120 } }} fullWidth>
			<InputLabel shrink id="priority">Priority</InputLabel>
			<Select
				labelId="priority"
				label="Priority"
				id="priority"
				value={selectedPriority ? selectedPriority : "Normal"}
				onChange={(e) => {
					dispatch(setSelectedPriority(e.target.value))
				}}
			>

				{priorities.map((priority) => (
					<MenuItem key={priority} value={priority}>
						{priority}
					</MenuItem>))}

			</Select>
		</FormControl>
	)
}

const CategoryBlock = () => {
	const dispatch = useDispatch()
	const { selectedCategory } = useSelector(getNewTicket)
	const { data: categories, isLoading } = useGetCategoriesQuery()

	if (isLoading) return (<div>Loading categories..</div>)
	if (!categories?.length) return null

	const defaultCategory = categories?.find(i => i.default === true)?.name ?? ""

	return (
		<FormControl sx={{ formControl: { m: 1, minWidth: 120 } }} fullWidth>
			<InputLabel shrink id="category">Category</InputLabel>
			<Select
				labelId="category"
				label="Category"
				id="category"
				value={selectedCategory ?? defaultCategory}
				onChange={(e) => {
					dispatch(setSelectedCategory(e.target.value))
				}}
			>
				{categories.map((item) => (
					<MenuItem key={item.name} value={item.name}>
						{item.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

const SubCategoryBlock = () => {
	const dispatch = useDispatch()
	const { selectedSubCategory } = useSelector(getNewTicket)
	const { subCategories, defaultSubCategory, isLoading } = useGetTicketDetails()

	if (isLoading) return (<div>Loading sub-categories..</div>)
	if (subCategories.length === 0) return null

	return (
		<FormControl sx={{ formControl: { m: 1, minWidth: 120 } }} fullWidth>
			<InputLabel shrink id="category">Sub-Category</InputLabel>
			<Select
				labelId="sub-category"
				label="Sub-Category"
				id="sub-category"
				value={selectedSubCategory ?? defaultSubCategory}
				onChange={(e) => {
					dispatch(setSelectedSubCategory(e.target.value))
				}}
			>
				{subCategories.map((item) => (
					<MenuItem key={item.name} value={item.name}>
						{item.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const NewTicketStep2 = () => {
	return (
		<form onSubmit={(e) => { e.preventDefault() }}>
			<Grid container spacing={4}>
				<Grid item xs={12} sm={6} >
					<DepartmentBlock />
				</Grid>

				<Grid item xs={12} sm={6} >
					<PriorityBlock />
				</Grid>

				<Grid item xs={12} sm={6} >
					<CategoryBlock />
				</Grid>

				<Grid item xs={12} sm={6} >
					<SubCategoryBlock />
				</Grid>

			</Grid >
		</form>
	)
}

export default NewTicketStep2