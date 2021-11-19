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
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import { useDeepCompareEffect } from "react-use"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import TextEditor from "@components/common/TextEditor"

import {
	SettingsContentActionBar,
	SettingsContentDetails
} from "@components/Settings/SettingsPanel"

import { CODE, DATE_FORMAT } from "@helpers/constants"
import { requestSilentRefetching } from "@helpers/realtimeApi"

import { setEditorData } from "@redux/slices/textEditor"
import { getAuth, getTextEditor } from "@redux/selectors"
import { TYPE } from "@redux/slices/firestoreApiConstants"
import { setActiveSettingPanel } from "@redux/slices/uiSettings"

import {
	useGetDepartmentsQuery,
	useUpdateCannedReplyMutation
} from "@redux/slices/firestoreApi"


//ASSETS

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CannedRepliesDetails = ({ selectedCannedReply, isFullCannedReply }) => {
	const {
		data: departments,
		isLoading: isLoadingDepartments
	} = useGetDepartmentsQuery(undefined)

	const { currentUser } = useSelector(getAuth)
	const { editorData } = useSelector(getTextEditor)

	const [content, setContent] = useState("")
	const [description, setDescription] = useState("")
	const [departmentId, setDepartmentId] = useState("")

	const [updateCannedReply] = useUpdateCannedReplyMutation()

	const isModified = (selectedCannedReply.content !== editorData
		|| selectedCannedReply.departmentId !== departmentId
		|| selectedCannedReply.description !== description
		|| isFullCannedReply !== selectedCannedReply?.full)

	const dispatch = useDispatch()

	useDeepCompareEffect(() => {
		setContent(selectedCannedReply.content)
		setDepartmentId(selectedCannedReply.departmentId)
		setDescription(selectedCannedReply.description)
		dispatch(setEditorData(selectedCannedReply.content))
	}, [selectedCannedReply])

	const handleUpdateCannedReply = async () => {
		const updatedContent = {
			...selectedCannedReply,
			departmentId: departmentId,
			description: description,
			content: editorData,
			full: isFullCannedReply,
			updatedBy: currentUser.username,
			updatedAt: dayjs().valueOf()
		}
		dispatch(setActiveSettingPanel(departmentId))
		const res = await updateCannedReply(updatedContent)

		if (res?.data.code === CODE.SUCCESS) {
			const invalidatesTags = {
				trigger: currentUser.username,
				tag: [{ type: TYPE.CANNED_REPLIES, id: "LIST" }],
				target: {
					isForUser: true,
					isForAdmin: true,
				},
				forceRefetch: true
			}
			await requestSilentRefetching(invalidatesTags)
		}
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
							value={departmentId}
							onChange={(e) => { setDepartmentId(e.target.value) }}
						>
							{departments.map((department) => (
								<MenuItem key={department.did} value={department.did}>
									{department.name}
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
						onChange={(e) => { setDescription(e.target.value) }}
						fullWidth
					/>
				</Box>

				<Box sx={{ pl: 4, py: 1, mb: 3, border: "1px solid #f0f0f0" }}>
					<TextEditor
						value={content}
					/>
				</Box>

				<Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
					Created at {dayjs(selectedCannedReply.createdAt).format(DATE_FORMAT.LONG)} by {selectedCannedReply.createdBy}
					<span style={{ display: "block" }}>
						Updated at {dayjs(selectedCannedReply.createdAt).format(DATE_FORMAT.LONG)} by {selectedCannedReply.updatedBy}&nbsp;
						<span style={{ fontStyle: "italic" }}>({dayjs(selectedCannedReply.updatedAt).fromNow()})</span>
					</span>
				</Typography>

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
	selectedCannedReply: PropTypes.string,
	isFullCannedReply: PropTypes.bool,
}

export default CannedRepliesDetails