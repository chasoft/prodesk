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

import PropTypes from "prop-types"
import React, { useState } from "react"

// MATERIAL-UI
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import { find } from "lodash"
import { useDeepCompareEffect } from "react-use"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import TextEditor from "./../../common/TextEditor"
import { setEditorData } from "../../../redux/slices/textEditor"
import { getAuth, getTextEditor } from "./../../../redux/selectors"
import { SettingsContentActionBar, SettingsContentDetails } from "./../../Settings/SettingsPanel"
import { useGetCannedRepliesQuery, useGetDepartmentsQuery, useUpdateCannedReplyMutation } from "../../../redux/slices/firestoreApi"
import { setActiveSettingPanel } from "../../../redux/slices/uiSettings"

//ASSETS

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CannedRepliesDetails = ({ crid }) => {
	const { data: departments, isLoading: isLoadingDepartments } = useGetDepartmentsQuery(undefined)
	const { data: cannedReplies, isLoading: isLoadingCannedReplies } = useGetCannedRepliesQuery(undefined)
	const selectedCannedReply = find(cannedReplies, { crid })

	const { currentUser } = useSelector(getAuth)
	const { editorData } = useSelector(getTextEditor)

	const [content, setContent] = useState("")
	const [department, setDepartment] = useState("")
	const [description, setDescription] = useState("")

	const [updateCannedReply] = useUpdateCannedReplyMutation()

	const isModified = (selectedCannedReply.content !== editorData
		|| selectedCannedReply.department !== department
		|| selectedCannedReply.description !== description)

	const dispatch = useDispatch()

	useDeepCompareEffect(() => {
		dispatch(setEditorData(selectedCannedReply.content))
		setContent(selectedCannedReply.content)
		setDepartment(selectedCannedReply.department)
		setDescription(selectedCannedReply.description)
	}, [selectedCannedReply])

	const handleUpdateCannedReply = async () => {
		const updatedContent = {
			...selectedCannedReply,
			department: department,
			description: description,
			content: editorData,
			updatedBy: currentUser.username,
			updatedAt: dayjs().valueOf()
		}
		dispatch(setActiveSettingPanel(department))
		await updateCannedReply(updatedContent)
	}

	return (
		<>
			<SettingsContentDetails sx={{
				display: "flex", flexDirection: "column",
				pt: { xs: 3, sm: 0 }
			}}>

				{isLoadingDepartments
					? <Box sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "50px"
					}}>
						<CircularProgress />
					</Box>
					: <FormControl variant="standard" fullWidth>
						<InputLabel id="demo-simple-select-label">Department</InputLabel>
						<Select
							id="department-select"
							label="Department"
							value={department}
							onChange={(e) => { setDepartment(e.target.value) }}
						>
							{departments.map((department) => (
								<MenuItem key={department.did} value={department.did}>
									{department.department}
								</MenuItem>
							))}
						</Select>
					</FormControl>}

				{isLoadingCannedReplies
					? <Box sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "200px"
					}}>
						<CircularProgress />
					</Box>
					: <>
						<Box sx={{ py: 2 }}>
							<TextField
								id="cannedReply-description"
								label="Description"
								variant="standard"
								value={description}
								onChange={(e) => { setDescription(e.target.value) }}
								fullWidth
							/>
						</Box>

						<Box sx={{ pl: 4, py: 1, mb: 3, border: "1px solid #FAFAFA" }}>
							<TextEditor
								value={content}
							/>
						</Box>
					</>}

			</SettingsContentDetails>

			<SettingsContentActionBar>

				<Button
					variant="contained" color="primary"
					disabled={!isModified}
					onClick={handleUpdateCannedReply}
				>
					Save changes
				</Button>

			</SettingsContentActionBar>
		</>
	)
}

CannedRepliesDetails.propTypes = {
	crid: PropTypes.string,
}

export default CannedRepliesDetails