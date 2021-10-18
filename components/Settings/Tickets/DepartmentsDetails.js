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
import { Button, CircularProgress, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { useSnackbar } from "notistack"
import { find, filter, some } from "lodash"
import { useDeepCompareEffect } from "react-use"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import MembersList from "./../MembersList"
import { getUiSettings } from "../../../redux/selectors"
import SettingsSwitch from "./../../common/SettingsSwitch"
import { setActiveSettingPanel } from "../../../redux/slices/uiSettings"
import { SettingsContentActionBar, SettingsContentDetails, SettingsContentHeader } from "./../../Settings/SettingsPanel"
import { useDeleteDepartmentMutation, useGetCannedRepliesQuery, useGetDepartmentsQuery, useUpdateDepartmentMutation } from "../../../redux/slices/firestoreApi"

//ASSETS
import DeleteIcon from "@mui/icons-material/Delete"
import { DEPARTMENT_PAGES } from "../../../pages/admin/settings/tickets/department"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const DepartmentsDetails = ({ backBtnClick }) => {
	const dispatch = useDispatch()
	const [deleteDepartment] = useDeleteDepartmentMutation()
	const { enqueueSnackbar } = useSnackbar()
	const [updateDepartment] = useUpdateDepartmentMutation()
	const { data: cannedReplies, isLoading: isLoadingCannedReplies } = useGetCannedRepliesQuery(undefined)
	//Original
	const { activeSettingPanel } = useSelector(getUiSettings)
	const { data: departments, isLoading } = useGetDepartmentsQuery(undefined)
	const selectedDepartment = find(departments, { department: activeSettingPanel })

	//Local memory
	const [department, setDepartment] = useState("")
	const [description, setDescription] = useState("")
	const [availableForAll, setAvailableForAll] = useState(true)
	const [isPublic, setIsPublic] = useState(true)
	const [members, setMembers] = useState([])

	//Re-render
	useDeepCompareEffect(() => {
		setDepartment(selectedDepartment.department)
		setDescription(selectedDepartment.description)
		setAvailableForAll(selectedDepartment.availableForAll)
		setIsPublic(selectedDepartment.isPublic)
		setMembers(selectedDepartment.members)
	}, [selectedDepartment])

	const isModified = (selectedDepartment.department !== department
		|| selectedDepartment.description !== description
		|| selectedDepartment.availableForAll !== availableForAll
		|| selectedDepartment.isPublic !== isPublic)

	console.log("Department Details")

	return (
		<>
			{isLoading ? <div><CircularProgress /></div> :
				<>
					<SettingsContentHeader
						backBtnOnClick={() => backBtnClick(false)}
						rightButton={
							<Tooltip title="Delete current department" placement="left">
								<IconButton
									sx={{ ":hover": { color: "warning.main" } }}
									onClick={async () => {
										//User must delete all related canned-reply before they can delete department
										const affectedCannedReplies = filter(cannedReplies, { department: selectedDepartment.department })
										if (affectedCannedReplies.length > 0) {
											enqueueSnackbar("Please delete all related canned-replies first!", { variant: "error" })
											return
										}
										dispatch(setActiveSettingPanel(DEPARTMENT_PAGES.OVERVIEW))
										await deleteDepartment(selectedDepartment)
									}}
								>
									<DeleteIcon fontSize="small" />
								</IconButton>
							</Tooltip>
						}
					>
						<Typography variant="button">{department}</Typography>
					</SettingsContentHeader>

					<SettingsContentDetails>
						<Grid container spacing={4}>

							<Grid item xs={12}>
								<TextField
									value={department}
									onChange={(e) => { setDepartment(e.target.value) }}
									label="Name of the department"
									placeholder="eg. Sales, Accounting..."
									fullWidth
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									value={description}
									onChange={(e) => { setDescription(e.target.value) }}
									label="Department description (Optional)"
									fullWidth
								/>
							</Grid>

							<Grid item xs={12}>
								<SettingsSwitch
									title="All members"
									state={availableForAll}
									setState={() => { setAvailableForAll(p => !p) }}
									stateDescription={["Only selected members", "All members"]}
									description="Allow access to the department to all members, or exclusively to a specified group of members."
								/>
							</Grid>

							<Grid item xs={12}>
								<SettingsSwitch
									title="Public"
									state={isPublic}
									setState={() => { setIsPublic(p => !p) }}
									stateDescription={["For internal use only", "Available for all users"]}
									description="If the department is public, it allows users to select this department when creating the ticket, otherwise only members can reassign to this department."
								/>
							</Grid>

							<Grid item xs={12}>
								<MembersList
									dataSource={members}
									addMemberCallback={() => { }}
								/>
								<div style={{ height: "2rem" }}></div>
							</Grid>
						</Grid>
					</SettingsContentDetails>

					<SettingsContentActionBar>
						<Button variant="contained" color="primary" disabled={!isModified} onClick={async () => {
							//Do not allow departments have the same name
							const isDuplicatedName = some(departments, { department: department })
							if (isDuplicatedName) {
								enqueueSnackbar(`Department with name "${department}" existed."`, { variant: "error" })
								return
							}
							const affectedCannedReplies = filter(cannedReplies, { department: selectedDepartment.department })
							const departmentItem = {
								did: selectedDepartment.did,
								department,
								description,
								availableForAll,
								isPublic,
								members
							}
							await updateDepartment({ departmentItem, affectedCannedReplies }).unwrap()
							//
							dispatch(setActiveSettingPanel(department))
						}}>Save</Button>
					</SettingsContentActionBar>
				</>}
		</>
	)
}

DepartmentsDetails.propTypes = {
	backBtnClick: PropTypes.func,
}

export default DepartmentsDetails