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
import { Box, CircularProgress, IconButton, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY]
import { filter } from "lodash"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import CannedRepliesList from "./CannedRepliesList"
import ConfirmDialog from "../../common/ConfirmDialog"
import CannedRepliesDetails from "./CannedRepliesDetails"
import { getAuth, getUiSettings } from "./../../../redux/selectors"
import { setSelectedCrid } from "../../../redux/slices/uiSettings"
import { SettingsContentDetails, SettingsContentHeader } from "./../../Settings/SettingsPanel"
import { useDeleteCannedReplyMutation, useGetCannedRepliesQuery, useGetDepartmentsQuery } from "../../../redux/slices/firestoreApi"

//ASSETS
import DeleteIcon from "@mui/icons-material/Delete"
import { CODE } from "../../../helpers/constants"
import { TYPE } from "../../../redux/slices/firestoreApiConstants"
import { requestSilentRefetching } from "../../../helpers/realtimeApi"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CannedRepliesGroup = ({ backBtnClick }) => {
	const dispatch = useDispatch()
	const { currentUser } = useSelector(getAuth)
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

	const {
		selectedCrid,
		activeSettingPanel
	} = useSelector(getUiSettings)

	const {
		data: departments,
		isLoading: isLoadingDepartments
	} = useGetDepartmentsQuery(undefined)

	const {
		data: cannedReplies = [],
		isLoading: isLoadingCannedReplies
	} = useGetCannedRepliesQuery(undefined)

	const [deleteCannedReply] = useDeleteCannedReplyMutation()

	const cannedRepliesGroup = cannedReplies.filter(
		(cannedReply) => cannedReply.department === activeSettingPanel
	) ?? []

	const currentDepartment = departments.find(
		department => department.did === activeSettingPanel
	)

	const handleDeleteCannedReply = async (confirmed) => {
		if (confirmed === false) return
		//
		dispatch(setSelectedCrid(""))
		//get newList of canned-replies
		const newList = filter(cannedReplies, e => e.crid !== selectedCrid)

		const res = await deleteCannedReply({
			cannedReplyItem: { crid: selectedCrid },
			fullList: newList
		})

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

	if (isLoadingDepartments || isLoadingCannedReplies) {
		return (
			<>
				<SettingsContentHeader>
					{currentDepartment.department}
				</SettingsContentHeader>
				<SettingsContentDetails>
					<Box sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "300px"
					}}>
						<CircularProgress />
					</Box>
				</SettingsContentDetails>
			</>
		)
	}

	if (cannedRepliesGroup.length === 0) {
		return (
			<>
				<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
					{currentDepartment.department}
				</SettingsContentHeader>
				<SettingsContentDetails>
					<Typography>
						There are no canned replies created for this group
					</Typography>
				</SettingsContentDetails>
			</>
		)
	}

	return (
		<>
			<SettingsContentHeader
				backBtnOnClick={() => {
					/* Go to SettingsList OR CannedRepliesGroup */
					if (selectedCrid === "")
						backBtnClick(false)
					else
						dispatch(setSelectedCrid(""))
				}}

				rightButton={
					selectedCrid &&
					<div>
						<Tooltip arrow title="Delete current canned-reply" placement="left">
							<IconButton
								sx={{ ":hover": { color: "warning.main" } }}
								onClick={() => setOpenConfirmDialog(true)}
							>
								<DeleteIcon fontSize="small" />
							</IconButton>
						</Tooltip>
					</div>
				}
			>
				{currentDepartment.department}
			</SettingsContentHeader>

			{(selectedCrid === "")
				&& <CannedRepliesList cannedReplies={cannedRepliesGroup} />}

			{(selectedCrid !== "")
				&& <CannedRepliesDetails crid={selectedCrid} />}

			<ConfirmDialog
				okButtonText="Delete"
				color="warning"
				open={openConfirmDialog}
				setOpen={setOpenConfirmDialog}
				callback={handleDeleteCannedReply}
			>
				<Box sx={{ display: "flex" }}>
					<DeleteIcon
						color="warning"
						sx={{ width: 60, height: 60, mr: 2 }}
					/>
					<Typography sx={{ lineHeight: 2 }}>
						Are you sure you want to delete this canned-reply? <br /> Please note that this action can not be undo.
					</Typography>
				</Box>
			</ConfirmDialog>
		</ >
	)
}

CannedRepliesGroup.propTypes = {
	groupInfo: PropTypes.object,
	cannedReplies: PropTypes.array,
	backBtnClick: PropTypes.func,
}

export default CannedRepliesGroup