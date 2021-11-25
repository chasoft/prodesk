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
import { Box, Button, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import { useDeepCompareEffect } from "react-use"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import TextEditor from "@components/common/TextEditor"
import { CircularProgressBox } from "@components/common"

import {
	DepartmentSelect,
	DescriptionTextField
} from "@components/Settings/CannedReplies/CannedRepliesAddNew"

import {
	SettingsContentActionBar,
	SettingsContentDetails
} from "@components/Settings/SettingsPanel"

import { CODE, DATE_FORMAT } from "@helpers/constants"
import { requestSilentRefetching } from "@helpers/realtimeApi"

import { setEditorData } from "@redux/slices/textEditor"
import { getAuth, getTextEditor } from "@redux/selectors"
import { TYPE } from "@redux/slices/firestoreApiConstants"
import { setActiveSettingPanel, setIsAddNewPanel, setSelectedCrid } from "@redux/slices/uiSettings"

import {
	useGetDepartmentsQuery,
	useUpdateCannedReplyMutation
} from "@redux/slices/firestoreApi"

//ASSETS

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

//TODO: add bigger option to show bigger text-editor

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

	const handleCancelUpdateCannedReply = () => {
		reduxBatch(() => {
			dispatch(setSelectedCrid(""))
			dispatch(setIsAddNewPanel(false))
		})
	}

	return (
		<>
			<SettingsContentDetails sx={{
				display: "flex", flexDirection: "column",
				pt: { xs: 3, sm: 0 }
			}}>

				{isLoadingDepartments
					? <CircularProgressBox minHeight="50px" />
					: <DepartmentSelect
						departmentId={departmentId}
						departments={departments}
						handleSelectDepartment={((e) => {
							setDepartmentId(e.target.value)
						})}
					/>}

				<Box sx={{ py: 2 }}>
					<DescriptionTextField
						description={description}
						handleSetDescription={(e) => {
							setDescription(e.target.value)
						}}
					/>
				</Box>

				<Box sx={{ pl: 4, py: 1, mb: 3, border: "1px solid #f0f0f0" }}>
					<TextEditor
						value={content}
					/>
				</Box>

				<Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
					Created at {dayjs(selectedCannedReply.createdAt).format(DATE_FORMAT.LONG)} by {selectedCannedReply.createdBy}
					{(selectedCannedReply.createdAt !== selectedCannedReply.updatedAt) &&
						<span style={{ display: "block" }}>
							Updated at {dayjs(selectedCannedReply.createdAt).format(DATE_FORMAT.LONG)} by {selectedCannedReply.updatedBy}&nbsp;
							<span style={{ fontStyle: "italic" }}>({dayjs(selectedCannedReply.updatedAt).fromNow()})</span>
						</span>}
				</Typography>

			</SettingsContentDetails>

			<SettingsContentActionBar>

				<Button
					variant="outlined" color="primary"
					onClick={handleCancelUpdateCannedReply}
				>
					Cancel
				</Button>

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
	selectedCannedReply: PropTypes.object,
	isFullCannedReply: PropTypes.bool,
}

export default CannedRepliesDetails