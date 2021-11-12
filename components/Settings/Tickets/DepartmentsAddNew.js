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
import { Button, Grid, TextField } from "@mui/material"

//THIRD-PARTY
import { filter } from "lodash"
import { nanoid } from "nanoid"
import { useSnackbar } from "notistack"
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import MembersList from "./../MembersList"
import SettingsSwitch from "./../../common/SettingsSwitch"
import { setActiveSettingPanel } from "./../../../redux/slices/uiSettings"
import { DEPARTMENT_PAGES } from "./../../../pages/admin/settings/tickets/department"
import { useAddDepartmentMutation, useGetDepartmentsQuery } from "../../../redux/slices/firestoreApi"
import { SettingsContentActionBar, SettingsContentDetails, SettingsContentHeader } from "./../../Settings/SettingsPanel"

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const DepartmentsAddNew = ({ backBtnClick }) => {
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const [addDepartment] = useAddDepartmentMutation()
	const { data: departments, isLoading: isLoadingDepartments } = useGetDepartmentsQuery(undefined)

	//Local memory
	const [localCache, setLocalCache] = useState({
		isPublic: true,
		department: "",
		description: "",
		members: [],
		availableForAll: false
	})

	const handleUpdateDetails = (value, key, toggle = false) => {
		setLocalCache((prevState) => {
			return {
				...prevState,
				[key]: toggle
					? !prevState[key]
					: value
			}
		})
	}

	const handleAddNewDepartment = async () => {
		//Do not allow departments have the same name
		const existedDepartment = filter(departments, { department: localCache.department })
		if (existedDepartment[0]?.department === localCache.department) {
			enqueueSnackbar(`Department with name "${localCache.department}" existed."`, { variant: "error" })
			return
		}

		const departmentItem = {
			did: nanoid(),
			...localCache
		}

		dispatch(setActiveSettingPanel(DEPARTMENT_PAGES.OVERVIEW))
		await addDepartment(departmentItem)
	}

	const handleCancelAddNewDepartment = () => {
		dispatch(setActiveSettingPanel(DEPARTMENT_PAGES.OVERVIEW))
	}

	return (
		<>
			<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
				Add new department
			</SettingsContentHeader>

			<SettingsContentDetails>
				<Grid container spacing={4}>
					<Grid item xs={12}>
						<TextField
							label="Name of the department"
							placeholder="eg. Sales, Accounting..."
							value={localCache.department}
							onChange={(e) =>
								handleUpdateDetails(e.target.value, "department")
							}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Description (optional)"
							placeholder="eg. For general questions"
							value={localCache.description}
							onChange={(e) => {
								handleUpdateDetails(e.target.value, "description")
							}}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<SettingsSwitch
							title="Public"
							state={localCache.isPublic}
							setState={() => {
								handleUpdateDetails(undefined, "isPublic", true)
							}}
							stateDescription={["For internal use only", "Available for all users"]}
							description="If the department is public, it allows users to select this department when creating the ticket. Normally, you will keep this setting being on."
						/>
					</Grid>
					<Grid item xs={12}>
						<SettingsSwitch
							title="All staffs/agents"
							state={localCache.availableForAll}
							setState={() => {
								handleUpdateDetails(undefined, "availableForAll", true)
							}}
							stateDescription={["Only selected staffs/agents", "All staffs/agents"]}
							description="Allow access to the department to all staffs/agents, or exclusively to a specified group of staffs/agents. Eg: you only want sale-staffs view/support sales' tickets only; you don't want technician see sales's tickets"
						/>
					</Grid>
					<Grid item xs={12}>
						<MembersList
							members={localCache.members}
							addMemberCallback={
								(members) => handleUpdateDetails(members, "members")
							}
						/>
					</Grid>
				</Grid>
			</SettingsContentDetails>

			<SettingsContentActionBar>
				<Button
					variant="outlined"
					onClick={handleCancelAddNewDepartment}
				>
					Cancel
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={handleAddNewDepartment}
					disabled={isLoadingDepartments}
				>
					Add
				</Button>
			</SettingsContentActionBar>

		</>
	)
}

DepartmentsAddNew.propTypes = {
	backBtnClick: PropTypes.func,
}

export default DepartmentsAddNew