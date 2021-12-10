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

import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem } from "@mui/material"

//THIRD-PARTY
import { trim } from "lodash"
import { isMobile } from "react-device-detect"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import TextEditor from "@components/common/TextEditor"
import { CircularProgressBox } from "@components/common"

import {
	DescriptionTextField,
	FullCannedReplySwitch,
	handleAddNewCannedReplyBase
} from "@components/Settings/CannedReplies/CannedRepliesAddNew"

import {
	getTextEditor,
	getUiSettings
} from "@redux/selectors"

import {
	useAddCannedReplyMutation,
	useGetDepartmentsQuery
} from "@redux/slices/firestoreApi"
import { setEditorData } from "@redux/slices/textEditor"
import { CODE } from "@helpers/constants"
import { TYPE } from "@redux/slices/firestoreApiConstants"
import { requestSilentRefetching } from "@helpers/realtimeApi"

//ASSETS


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function NewCannedReplyDialog({
	createdBy, content, departmentId,
	//
	open, setOpen
}) {
	const dispatch = useDispatch()
	const { isSmallScreen } = useSelector(getUiSettings)

	const [description, setDescription] = useState("")
	const [isFullCannedReply, setIsFullCannedReply] = useState(false)

	const { editorData } = useSelector(getTextEditor)
	const [addCannedReply] = useAddCannedReplyMutation()

	const {
		data: departments = [], isLoading: isLoadingDepartments
	} = useGetDepartmentsQuery(undefined)

	useEffect(() => {
		dispatch(setEditorData(content))
	}, [dispatch, content])

	const DepartmentDetails = departments.find(department => department.did === departmentId)

	const handleAddNewCannedReply = async () => {
		setOpen(false)

		const res = await handleAddNewCannedReplyBase({
			content: editorData,
			createdBy: createdBy,
			departmentId: departmentId,
			description,
			isFullCannedReply: isFullCannedReply,
			//
			addCannedReply,
			// dispatchActions,
		})

		if (res?.data?.code === CODE.SUCCESS) {
			const invalidatesTags = {
				trigger: createdBy,
				tag: [{ type: TYPE.CANNED_REPLIES, id: "LIST" }],
				target: {
					isForUser: false,
					isForAdmin: true,
				},
				// forceRefetch: true
			}
			await requestSilentRefetching(invalidatesTags)
		}
	}

	return (
		<Dialog
			open={open}
			onClose={() => { setOpen(false) }}
			fullScreen={isSmallScreen || isMobile}
			maxWidth="md"
			scroll="paper"
		>

			<DialogTitle sx={{
				bgcolor: "primary.dark",
				color: "#FFF",
				typography: "h4",
				mt: 0,
			}}>
				Create New Canned-reply
			</DialogTitle>

			<DialogContent sx={{ mt: 2 }}>
				<Box sx={{
					width: { sm: "500px", md: "650px", lg: "700px" }
				}}>
					{isLoadingDepartments
						? <CircularProgressBox />
						: <Box sx={{ display: "flex", alignItems: "flex-end" }}>
							<FormControl variant="standard" sx={{ mr: 2 }} fullWidth>
								<InputLabel id="department-select-label">
									Department
								</InputLabel>
								<Select
									id="department-select"
									label="Department"
									value={DepartmentDetails.did}
									disabled={true}
								>
									<MenuItem value={DepartmentDetails.did}>
										{DepartmentDetails.name}
									</MenuItem>
								</Select>
							</FormControl>

							<FullCannedReplySwitch
								isFullCannedReply={isFullCannedReply}
								setIsFullCannedReply={setIsFullCannedReply} />
						</Box>}

					<Box sx={{ py: 2 }}>
						<DescriptionTextField
							description={description}
							handleSetDescription={(e) => {
								setDescription(e.target.value)
							}} />
					</Box>

					<Box sx={{ pl: 4, py: 1, mb: 3, border: "1px solid #F0F0F0" }}>
						<TextEditor value={content} />
					</Box>
				</Box>
			</DialogContent>

			<DialogActions sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", pr: 3, mb: 2 }}>
				<Button
					variant="outlined"
					sx={{ minWidth: "100px" }}
					onClick={() => { setOpen(false) }}
				>
					Cancel
				</Button>

				<Button
					variant="contained"
					color="primary"
					sx={{ minWidth: "100px" }}
					disabled={(trim(description) === "")
						|| (trim(editorData) === "")
						|| (trim(editorData) === "\\")}
					onClick={handleAddNewCannedReply}
				>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	)
}
NewCannedReplyDialog.propTypes = {
	content: PropTypes.string.isRequired,
	createdBy: PropTypes.string.isRequired,
	departmentId: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
}

export default NewCannedReplyDialog