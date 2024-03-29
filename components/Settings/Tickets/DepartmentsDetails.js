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

import React, { useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Button, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import { useSnackbar } from "notistack"
import { filter, isEqual, some } from "lodash"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { CircularProgressBox } from "@components/common"
import MembersList from "@components/Settings/MembersList"
import ConfirmDialog from "@components/common/ConfirmDialog"
import useLocalComponentCache from "@helpers/useLocalComponentCache"

import {
	SettingsSwitch,
	SettingsContentActionBar,
	SettingsContentDetails,
	SettingsContentHeader
} from "@components/common/Settings"

import { TYPE } from "@redux/slices/firestoreApiConstants"

import { setActiveSettingPanel } from "@redux/slices/uiSettings"

import {
	useDeleteDepartmentMutation,
	useGetCannedRepliesQuery,
	useGetDepartmentsQuery,
	useUpdateDepartmentMutation
} from "@redux/slices/firestoreApi"

import { DEPARTMENT_PAGES } from "@pages/admin/settings/tickets/department"

import { CODE, EMPTY } from "@helpers/constants"
import { requestSilentRefetching } from "@helpers/realtimeApi"

//ASSETS
import DeleteIcon from "@mui/icons-material/Delete"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function DepartmentsDetails({ backBtnClick }) {
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const [deleteDepartment] = useDeleteDepartmentMutation()
	const [updateDepartment] = useUpdateDepartmentMutation()
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

	const {
		data: cannedReplies, isLoading: isLoadingCannedReplies
	} = useGetCannedRepliesQuery(undefined)

	const activeSettingPanel = useSelector(s => s.uiSettingsState.activeSettingPanel)

	const {
		data: departments = EMPTY.ARRAY, isLoading: isLoadingDepartments
	} = useGetDepartmentsQuery(undefined)

	const selectedDepartment = departments.find(department => department.name === activeSettingPanel)

	//Local memory
	const {
		localCache, handlers: { setLocalCache }
	} = useLocalComponentCache(selectedDepartment)

	const handleDeleteDepartment = async (confirmed) => {
		if (confirmed === false)
			return

		//User must delete all related canned-replies
		//before they can delete department
		const existedCannedReplies = filter(cannedReplies, { departmentId: selectedDepartment.did })
		if (existedCannedReplies.length > 0) {
			enqueueSnackbar("Please delete all related canned-replies first!", { variant: "error" })
			return
		}

		//redirect to overview tab
		dispatch(setActiveSettingPanel(DEPARTMENT_PAGES.OVERVIEW))

		//get newList of department
		const newList = filter(departments, department => department.did !== selectedDepartment.did)
		const res = await deleteDepartment({
			departmentItem: { did: selectedDepartment.did },
			fullList: newList
		})

		//broadcast refetching-request
		if (res?.data?.code === CODE.SUCCESS) {
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

	const handleUpdateDepartment = async () => {
		//Do not allow departments have the same name
		const departmentDuplicated = (selectedDepartment?.name === localCache.name)
			? false
			: some(departments, { name: localCache.name })
		if (departmentDuplicated) {
			enqueueSnackbar(`Department with name "${localCache.name}" existed."`, { variant: "error" })
			return
		}

		//prepare the data for current department
		const departmentItem = {
			...localCache,
			updatedAt: dayjs().valueOf(),
			updatedBy: currentUser.username,
		}

		dispatch(setActiveSettingPanel(localCache.name))
		const res = await updateDepartment(departmentItem)

		//broadcast refetching-request
		if (res?.data?.code === CODE.SUCCESS) {
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

	return (
		<>
			{(isLoadingDepartments || isLoadingCannedReplies)
				? <CircularProgressBox minHeight="300px" />
				: <>
					<SettingsContentHeader
						backBtnOnClick={() => backBtnClick(false)}
						rightButton={<Tooltip title="Delete current department" placement="left">
							<IconButton
								sx={{ ":hover": { color: "warning.main" } }}
								onClick={() => setOpenConfirmDialog(true)}
							>
								<DeleteIcon fontSize="small" />
							</IconButton>
						</Tooltip>}
					>
						<Typography variant="button">{localCache.name}</Typography>

						<ConfirmDialog
							okButtonText="Delete"
							color="warning"
							open={openConfirmDialog}
							setOpen={setOpenConfirmDialog}
							callback={handleDeleteDepartment}
						>
							<Box sx={{
								display: "flex"
							}}>
								<DeleteIcon sx={{ width: 60, height: 60, mr: 2 }} color="warning" />
								<Typography sx={{ lineHeight: 2 }}>
									Are you sure you want to delete this department?<br />Try to rename instead of deleting if it&apos; s possible.<br />Please note that this action can not be undo.
								</Typography>
							</Box>
						</ConfirmDialog>
					</SettingsContentHeader>

					<SettingsContentDetails>
						<Grid container spacing={4}>

							<Grid item xs={12}>
								<TextField
									value={localCache.name}
									onChange={(e) => {
										setLocalCache(e.target.value, "name")
									}}
									label="Name of the department"
									placeholder="eg. Sales, Accounting..."
									fullWidth />
							</Grid>

							<Grid item xs={12}>
								<TextField
									value={localCache.description}
									onChange={(e) => {
										setLocalCache(e.target.value, "description")
									}}
									label="Department description (Optional)"
									fullWidth />
							</Grid>
							<Grid item xs={12}>
								<SettingsSwitch
									title="Public"
									state={localCache.isPublic}
									setState={() => {
										setLocalCache(undefined, "isPublic", "toggle")
									}}
									stateDescription={["For internal use only", "Available for all users"]}
									description="If the department is public, it allows users to select this department when creating the ticket. Normally, you will keep this setting being on." />
							</Grid>
							<Grid item xs={12}>
								<SettingsSwitch
									title="All staffs/agents"
									state={localCache.availableForAll}
									setState={() => {
										setLocalCache(undefined, "availableForAll", "toggle")
									}}
									stateDescription={["Only selected staffs/agents", "All staffs/agents"]}
									description="Allow access to the department to all staffs/agents, or exclusively to a specified group of staffs/agents. Eg: you only want sale-staffs view/support sales' tickets only; you don't want technician see sales's tickets" />
							</Grid>
							<Grid item xs={12}>
								<MembersList
									members={localCache.members}
									addMemberCallback={(members) => setLocalCache(members, "members")} />
								<div style={{ height: "2rem" }}></div>
							</Grid>
						</Grid>
					</SettingsContentDetails>

					<SettingsContentActionBar>
						<Button
							variant="contained"
							color="primary"
							disabled={isEqual(selectedDepartment, localCache)}
							onClick={handleUpdateDepartment}
						>
							Save
						</Button>
					</SettingsContentActionBar>
				</>}
		</>
	)
}

DepartmentsDetails.propTypes = {
	backBtnClick: PropTypes.func,
}

export default DepartmentsDetails