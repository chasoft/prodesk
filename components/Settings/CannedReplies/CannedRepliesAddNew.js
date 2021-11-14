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


import PropTypes from "prop-types"
import React, { useState } from "react"

// MATERIAL-UI
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import { trim } from "lodash"
import { nanoid } from "nanoid"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import TextEditor from "./../../common/TextEditor"
import { getAuth, getTextEditor, getUiSettings } from "../../../redux/selectors"
import { CANNED_REPLY_PAGES } from "../../../pages/admin/settings/tickets/canned-reply"
import { setActiveSettingPanel, setIsAddNewPanel, setSelectedCrid } from "../../../redux/slices/uiSettings"
import { useAddCannedReplyMutation, useGetDepartmentsQuery } from "../../../redux/slices/firestoreApi"
import { SettingsContentActionBar, SettingsContentDetails, SettingsContentHeader } from "./../../Settings/SettingsPanel"

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CannedRepliesAddNew = ({ backBtnClick }) => {
	const { activeSettingPanel } = useSelector(getUiSettings)
	const { data: departments, isLoading: isLoadingDepartments } = useGetDepartmentsQuery(undefined)

	console.log({ activeSettingPanel })

	const [department, setDepartment] = useState(
		(activeSettingPanel !== CANNED_REPLY_PAGES.ADD_NEW_CANNED_REPLY)
			? activeSettingPanel
			: ""
	)
	const [description, setDescription] = useState("")
	const { editorData } = useSelector(getTextEditor)

	const { currentUser } = useSelector(getAuth)
	const [addCannedReply] = useAddCannedReplyMutation()

	const dispatch = useDispatch()

	const handleCancel = () => {
		dispatch(setIsAddNewPanel(false))
		backBtnClick(false)
	}

	const handleAddNewCannedReply = async () => {
		const crid = nanoid()
		const newCannedReply = {
			crid,
			department,
			description,
			content: editorData,
			createdBy: currentUser.username,
			updatedBy: currentUser.username,
			createdAt: dayjs().valueOf(),
			updatedAt: dayjs().valueOf(),
		}
		await addCannedReply(newCannedReply)
		// Go to the group of new canned
		reduxBatch(() => {
			dispatch(setIsAddNewPanel(false))
			dispatch(setSelectedCrid(""))
			dispatch(setActiveSettingPanel(department))
		})
	}

	return (
		<>
			<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
				New canned reply
			</SettingsContentHeader>

			<SettingsContentDetails sx={{
				display: "flex", flexDirection: "column",
				pt: { xs: 3, sm: 0 }
			}}>

				{isLoadingDepartments
					? <Box sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "200px"
					}}>
						<CircularProgress />
					</Box>
					: <FormControl variant="standard" fullWidth>
						<InputLabel id="demo-simple-select-label">
							Department
						</InputLabel>
						<Select
							id="department-select"
							label="Department"
							value={department}
							onChange={(e) => {
								setDepartment(e.target.value)
							}}
						>
							{departments.map((department) => (
								<MenuItem
									key={department.did}
									value={department.did}
								>
									{department.department}
								</MenuItem>
							))}
						</Select>
					</FormControl>}

				<Box sx={{ py: 2 }}>
					<TextField
						id="cannedReply-description"
						label="Description"
						variant="standard"
						value={description}
						onChange={(e) => {
							setDescription(e.target.value)
						}}
						fullWidth
					/>
				</Box>

				<Box sx={{ pl: 4, py: 1, mb: 3, border: "1px solid #FAFAFA" }}>
					<TextEditor defaultValue="" />
				</Box>

			</SettingsContentDetails>

			<SettingsContentActionBar>

				<Button
					variant="outlined"
					onClick={handleCancel}
				>
					Cancel
				</Button>

				<Button
					variant="contained" color="primary"
					disabled={
						(department === "")
						|| (description === "")
						|| (trim(editorData) === "")
						|| (trim(editorData) === "\\")
					}
					onClick={handleAddNewCannedReply}
				>
					Add
				</Button>

			</SettingsContentActionBar>
		</>
	)
}

CannedRepliesAddNew.propTypes = {
	backBtnClick: PropTypes.func,
}

export default CannedRepliesAddNew