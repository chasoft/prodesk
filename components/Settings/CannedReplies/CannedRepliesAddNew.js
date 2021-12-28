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
import { Box, Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import { isEqual, trim } from "lodash"
import nanoid from "@helpers/nanoid"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import TextEditor from "@components/common/TextEditor"
import { CircularProgressBox } from "@components/common"

import {
	useAddCannedReplyMutation,
	useGetDepartmentsQuery
} from "@redux/slices/firestoreApi"

import {
	setActiveSettingPanel,
	setIsAddNewPanel,
	setSelectedCrid
} from "@redux/slices/uiSettings"

import {
	SettingsContentActionBar,
	SettingsContentDetails,
	SettingsContentHeader
} from "@components/common/Settings"

import { CODE, EMPTY } from "@helpers/constants"
import { requestSilentRefetching } from "@helpers/realtimeApi"
import { TYPE } from "@redux/slices/firestoreApiConstants"

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function FullCannedReplySwitch({ isFullCannedReply, setIsFullCannedReply }) {
	return (
		<FormControlLabel
			control={<Switch
				checked={isFullCannedReply}
				onChange={() => setIsFullCannedReply(p => !p)}
				name="full-canned-reply"
				color="primary" />}
			label={<Typography noWrap>
				{isFullCannedReply ? "Full canned-reply" : "Partial canned-reply"}
			</Typography>} />
	)
}
FullCannedReplySwitch.propTypes = {
	isFullCannedReply: PropTypes.bool.isRequired,
	setIsFullCannedReply: PropTypes.func.isRequired,
}

export const DepartmentSelect = React.memo(function _DepartmentSelect({ departmentId, departments, handleSelectDepartment }) {
	return (
		<FormControl variant="standard" fullWidth>
			<InputLabel id="department-select-label">
				Department
			</InputLabel>
			<Select
				id="department-select"
				label="Department"
				value={departmentId}
				onChange={handleSelectDepartment}
			>
				{departments.map((department) => (
					<MenuItem
						key={department.did}
						value={department.did}
					>
						{department.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}, (prevProps, nextProps) => isEqual(prevProps.departments, nextProps.departments) && prevProps.departmentId === nextProps.departmentId)
DepartmentSelect.propTypes = {
	departmentId: PropTypes.string.isRequired,
	departments: PropTypes.array.isRequired,
	handleSelectDepartment: PropTypes.func.isRequired,
}

export const DescriptionTextField = React.memo(function _DescriptionTextField({ description, handleSetDescription }) {
	return (
		<TextField
			id="cannedReply-description"
			label="Description"
			variant="standard"
			value={description}
			onChange={handleSetDescription}
			fullWidth />
	)
}, (prevProps, nextProps) => prevProps.description === nextProps.description)
DescriptionTextField.propTypes = {
	description: PropTypes.string.isRequired,
	handleSetDescription: PropTypes.func.isRequired,
}

export async function handleAddNewCannedReplyBase({
	content, createdBy, departmentId, description, isFullCannedReply,
	dispatchActions, addCannedReply
}) {
	const crid = nanoid()
	const newCannedReply = {
		crid,
		description,
		full: isFullCannedReply,
		content,
		departmentId,
		createdBy: createdBy,
		updatedBy: createdBy,
		createdAt: dayjs().valueOf(),
		updatedAt: dayjs().valueOf(),
	}

	if (typeof dispatchActions === "function")
		dispatchActions()

	const res = await addCannedReply(newCannedReply)

	if (res?.data?.code === CODE.SUCCESS) {
		const invalidatesTags = {
			trigger: createdBy,
			tag: [{ type: TYPE.CANNED_REPLIES, id: "LIST" }],
			target: {
				isForUser: true,
				isForAdmin: false,
			}
		}
		await requestSilentRefetching(invalidatesTags)
	}
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function CannedRepliesAddNew({ backBtnClick }) {
	const dispatch = useDispatch()
	const activeSettingPanel = useSelector(s => s.uiSettingsState.activeSettingPanel)

	const {
		data: departments = EMPTY.ARRAY, isLoading: isLoadingDepartments
	} = useGetDepartmentsQuery(undefined)

	const [description, setDescription] = useState("")
	const [isFullCannedReply, setIsFullCannedReply] = useState(false)

	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const editorData = useSelector(s => s.textEditorState.editorData)
	const [addCannedReply] = useAddCannedReplyMutation()

	const handleCancel = () => {
		dispatch(setIsAddNewPanel(false))
		backBtnClick(false)
	}

	const handleAddNewCannedReply = async () => {
		await handleAddNewCannedReplyBase({
			content: editorData,
			createdBy: currentUser.username,
			departmentId: activeSettingPanel,
			description: description,
			isFullCannedReply: isFullCannedReply,
			//
			addCannedReply,
			dispatchActions: () => {
				reduxBatch(() => {
					dispatch(setIsAddNewPanel(false))
					dispatch(setSelectedCrid(""))
				})
			},
		})
	}

	return (
		<>
			<SettingsContentHeader
				backBtnOnClick={() => backBtnClick(false)}
				rightButton={<FullCannedReplySwitch
					isFullCannedReply={isFullCannedReply}
					setIsFullCannedReply={setIsFullCannedReply} />}
			>
				New canned reply
			</SettingsContentHeader>

			<SettingsContentDetails sx={{
				display: "flex", flexDirection: "column",
				pt: { xs: 3, sm: 0 }
			}}>

				{isLoadingDepartments
					? <CircularProgressBox />
					: <DepartmentSelect
						departmentId={activeSettingPanel}
						departments={departments}
						handleSelectDepartment={(e) => {
							dispatch(setActiveSettingPanel(e.target.value))
						}} />}

				<Box sx={{ py: 2 }}>
					<DescriptionTextField
						description={description}
						handleSetDescription={(e) => {
							setDescription(e.target.value)
						}} />
				</Box>

				<Box sx={{ pl: 4, py: 1, mb: 3, border: "1px solid #F0F0F0" }}>
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
					disabled={(description === "")
						|| (trim(editorData) === "")
						|| (trim(editorData) === "\\")}
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