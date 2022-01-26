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

import Link from "next/link"
import React from "react"

// MATERIAL-UI
import { Select, MenuItem, InputLabel, Grid, FormControl } from "@mui/material"

//THIRD-PARTY
import { useSelector, useDispatch } from "react-redux"

//PROJECT IMPORT
import { useGetDepartmentsQuery, useGetCategoriesQuery } from "@redux/slices/firestoreApi"
import {
	setSelectedCategory, setSelectedSubCategory,
	setSelectedPriority,
	setSelectedDepartment
} from "@redux/slices/newTicket"

import { useGetTicketDetails } from "@components/Ticket/Create/NewTicketStepper"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function DepartmentBlock() {
	const dispatch = useDispatch()
	const { data: departments, isLoading } = useGetDepartmentsQuery()
	const selectedDepartmentId = useSelector(s => s.newTicketState.selectedDepartmentId)

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

	console.log("selectedDepartmentId", selectedDepartmentId ?? departments[0].did)

	return (

		<FormControl sx={{ formControl: { m: 1 } }} fullWidth>
			<InputLabel shrink id="department">Department</InputLabel>
			<Select
				labelId="department"
				label="Department"
				id="department"
				value={selectedDepartmentId ?? departments[0].did}
				onChange={(e) => {
					dispatch(setSelectedDepartment(e.target.value))
				}}
			>

				{departments.map((department) => (
					<MenuItem key={department.did} value={department.did}>
						{department.name}
					</MenuItem>))}

			</Select>
		</FormControl>
	)
}

function PriorityBlock() {
	const dispatch = useDispatch()
	const priorities = ["Low", "Normal", "High"]
	const selectedPriority = useSelector(s => s.newTicketState.selectedPriority)

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

function CategoryBlock() {
	const dispatch = useDispatch()
	const selectedCategory = useSelector(s => s.newTicketState.selectedCategory)
	const { data: categories, isLoading } = useGetCategoriesQuery()

	if (isLoading)
		return (<div>Loading categories..</div>)
	if (!categories?.length)
		return null

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

function SubCategoryBlock() {
	const dispatch = useDispatch()
	const selectedSubCategory = useSelector(s => s.newTicketState.selectedSubCategory)
	const { subCategories, defaultSubCategory, isLoading } = useGetTicketDetails()

	if (isLoading)
		return (<div>Loading sub-categories..</div>)
	if (subCategories.length === 0)
		return null

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

function NewTicketStep2() {
	return (
		<form onSubmit={(e) => { e.preventDefault() }}>
			<Grid container spacing={4}>
				<Grid item xs={12} sm={6}>
					<DepartmentBlock />
				</Grid>

				<Grid item xs={12} sm={6}>
					<PriorityBlock />
				</Grid>

				<Grid item xs={12} sm={6}>
					<CategoryBlock />
				</Grid>

				<Grid item xs={12} sm={6}>
					<SubCategoryBlock />
				</Grid>

			</Grid>
		</form>
	)
}

export default NewTicketStep2