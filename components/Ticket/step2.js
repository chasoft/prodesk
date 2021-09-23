import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from "@mui/material"

import { getNewTicket } from "./../../redux/selectors"
import {
	setSelectedCategory, setSelectedSubCategory,
	setSelectedPriority,
	setSelectedDepartment
} from "./../../redux/slices/newTicket"


const NewTicketStep2 = () => {
	const dispatch = useDispatch()
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
					{(departments?.length === 0) ?
						<div style={{ display: "block" }}>
							Please setup Department information!...
						</div>
						:
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
									getContentAnchorEl: null
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
					}
				</Grid>
				<Grid item xs={12} sm={6} >

					{(priorities?.length === 0) ?
						<div style={{ display: "block" }}>
							Please setup Priority information!...
						</div>
						:
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
									getContentAnchorEl: null
								}}
							>
								{
									priorities?.map(priority => <MenuItem key={priority} value={priority}>{priority}</MenuItem>)
								}
							</Select>
							<FormHelperText>Priority</FormHelperText>
						</FormControl>
					}

				</Grid>
				<Grid item xs={12} sm={6} >

					{(Object.entries(categories).length === 0) ?
						<div style={{ display: "block" }}>
							Please setup Category information!...
						</div>
						: <>
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
										getContentAnchorEl: null
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
						</>
					}

				</Grid>

				{(categories[currentCategory]?.length === 0) ? null
					:
					<Grid item xs={12} sm={6} >
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
									getContentAnchorEl: null
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
					</Grid>
				}
			</Grid >
		</form >
	)
}

export default NewTicketStep2