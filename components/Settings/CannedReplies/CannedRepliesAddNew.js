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
import { Box, Button, CircularProgress, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import { trim } from "lodash"
import { nanoid } from "nanoid"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import TextEditor from "@components/common/TextEditor"

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
} from "@components/Settings/SettingsPanel"

import { CODE } from "@helpers/constants"
import { requestSilentRefetching } from "@helpers/realtimeApi"

import {
	getAuth,
	getTextEditor,
	getUiSettings
} from "@redux/selectors"

import { TYPE } from "@redux/slices/firestoreApiConstants"

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CannedRepliesAddNew = ({ backBtnClick }) => {
	const dispatch = useDispatch()
	const { activeSettingPanel } = useSelector(getUiSettings)

	const {
		data: departments = [],
		isLoading: isLoadingDepartments
	} = useGetDepartmentsQuery(undefined)

	const [description, setDescription] = useState("")
	const [isFullCannedReply, setIsFullCannedReply] = useState(false)

	const { currentUser } = useSelector(getAuth)
	const { editorData } = useSelector(getTextEditor)
	const [addCannedReply] = useAddCannedReplyMutation()

	//empty dependency on purpose
	//we only want to check length of departments only once
	// useEffect(() => {
	// 	if (departments.length === 1)
	// 		setDepartmentId(departments[0].did)
	// }, [])

	const handleCancel = () => {
		dispatch(setIsAddNewPanel(false))
		backBtnClick(false)
	}

	const handleAddNewCannedReply = async () => {
		const crid = nanoid()
		const newCannedReply = {
			crid,
			description,
			full: isFullCannedReply,
			content: editorData,
			departmentId: activeSettingPanel,
			createdBy: currentUser.username,
			updatedBy: currentUser.username,
			createdAt: dayjs().valueOf(),
			updatedAt: dayjs().valueOf(),
		}

		// Go to the group of new canned
		reduxBatch(() => {
			dispatch(setIsAddNewPanel(false))
			dispatch(setSelectedCrid(""))
			// dispatch(setActiveSettingPanel(departmentId))
		})

		const res = await addCannedReply(newCannedReply)

		if (res?.data.code === CODE.SUCCESS) {
			const invalidatesTags = {
				trigger: currentUser.username,
				tag: [{ type: TYPE.CANNED_REPLIES, id: "LIST" }],
				target: {
					isForUser: true,
					isForAdmin: false,
				}
			}
			await requestSilentRefetching(invalidatesTags)
		}
	}

	return (
		<>
			<SettingsContentHeader
				backBtnOnClick={() => backBtnClick(false)}
				rightButton={
					<FormControlLabel
						control={
							<Switch
								checked={isFullCannedReply}
								onChange={() => setIsFullCannedReply(p => !p)}
								name="full-canned-reply"
								color="primary"
							/>
						}
						label={isFullCannedReply ? "Full canned-reply" : "Partial canned-reply"}
					/>
				}
			>
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
							value={activeSettingPanel}
							onChange={(e) => {
								// setDepartmentId(e.target.value)
								dispatch(setActiveSettingPanel(e.target.value))
							}}
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
					disabled={
						(description === "")
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