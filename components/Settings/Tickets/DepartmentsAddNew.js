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
import dayjs from "dayjs"
import { some } from "lodash"
import { nanoid } from "nanoid"
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import MembersList from "@components/Settings/MembersList"
import SettingsSwitch from "@components/common/SettingsSwitch"

import {
	SettingsContentActionBar,
	SettingsContentDetails,
	SettingsContentHeader
} from "@components/Settings/SettingsPanel"

import { TYPE } from "@redux/slices/firestoreApiConstants"
import { getAuth } from "@redux/selectors"
import { setActiveSettingPanel } from "@redux/slices/uiSettings"

import {
	useAddDepartmentMutation,
	useGetDepartmentsQuery
} from "@redux/slices/firestoreApi"

import { CODE } from "@helpers/constants"
import { requestSilentRefetching } from "@helpers/realtimeApi"

import { DEPARTMENT_PAGES } from "@pages/admin/settings/tickets/department"

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const DepartmentsAddNew = ({ backBtnClick }) => {
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const { currentUser } = useSelector(getAuth)
	const [addDepartment] = useAddDepartmentMutation()
	const { data: departments, isLoading: isLoadingDepartments } = useGetDepartmentsQuery(undefined)

	//Local memory
	const [localCache, setLocalCache] = useState({
		isPublic: true,
		name: "",
		description: "",
		members: [],
		availableForAll: false
	})

	const handleSetLocalCache = (value, key, toggle = false) => {
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
		const departmentDuplicated = some(departments, { name: localCache.name })
		if (departmentDuplicated) {
			enqueueSnackbar(`Department with name ${localCache.name} existed`, { variant: "error" })
			return
		}

		//prepare the data for new category
		const departmentItem = {
			did: nanoid(),
			createdBy: currentUser.username,
			updatedBy: currentUser.username,
			createdAt: dayjs().valueOf(),
			updatedAt: dayjs().valueOf(),
			...localCache
		}

		dispatch(setActiveSettingPanel(DEPARTMENT_PAGES.OVERVIEW))
		const res = await addDepartment(departmentItem)

		//broadcast refetching-request
		if (res?.data.code === CODE.SUCCESS) {
			const invalidatesTags = {
				trigger: currentUser.username,
				tag: [{ type: TYPE.DEPARTMENTS, id: "LIST" }],
				target: {
					isForUser: true,
					isForAdmin: true,
				}
			}
			await requestSilentRefetching(invalidatesTags)
		}
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
							value={localCache.name}
							onChange={(e) =>
								handleSetLocalCache(e.target.value, "name")
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
								handleSetLocalCache(e.target.value, "description")
							}}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<SettingsSwitch
							title="Public"
							state={localCache.isPublic}
							setState={() => {
								handleSetLocalCache(undefined, "isPublic", true)
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
								handleSetLocalCache(undefined, "availableForAll", true)
							}}
							stateDescription={["Only selected staffs/agents", "All staffs/agents"]}
							description="Allow access to the department to all staffs/agents, or exclusively to a specified group of staffs/agents. Eg: you only want sale-staffs view/support sales' tickets only; you don't want technician see sales's tickets"
						/>
					</Grid>
					<Grid item xs={12}>
						<MembersList
							members={localCache.members}
							addMemberCallback={
								(members) => handleSetLocalCache(members, "members")
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