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
import { Box, IconButton, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY]
import { filter, size } from "lodash"
import { useDeepCompareEffect } from "react-use"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { CircularProgressBox } from "@components/common"
import { FullCannedReplySwitch } from "./CannedRepliesAddNew"
import CannedRepliesDetails from "@components/Settings/CannedReplies/CannedRepliesDetails"
import CannedRepliesList from "@components/Settings/CannedReplies/CannedRepliesList"
import ConfirmDialog from "@components/common/ConfirmDialog"

import {
	SettingsContentDetails,
	SettingsContentHeader
} from "@components/common/Settings"

import { CODE } from "@helpers/constants"
import { requestSilentRefetching } from "@helpers/realtimeApi"

import { TYPE } from "@redux/slices/firestoreApiConstants"
import { setSelectedCrid } from "@redux/slices/uiSettings"
import { getAuth, getUiSettings } from "@redux/selectors"

import {
	useDeleteCannedReplyMutation,
	useGetCannedRepliesQuery,
	useGetDepartmentsQuery
} from "@redux/slices/firestoreApi"

//ASSETS
import DeleteIcon from "@mui/icons-material/Delete"


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function CannedRepliesGroup({ backBtnClick }) {
	const dispatch = useDispatch()
	const { currentUser } = useSelector(getAuth)
	const [isFullCannedReply, setIsFullCannedReply] = useState(false)
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

	const {
		selectedCrid, activeSettingPanel
	} = useSelector(getUiSettings)

	const {
		data: departments, isLoading: isLoadingDepartments
	} = useGetDepartmentsQuery(undefined)

	const {
		data: cannedReplies = [], isLoading: isLoadingCannedReplies
	} = useGetCannedRepliesQuery(undefined)

	const [deleteCannedReply] = useDeleteCannedReplyMutation()

	const cannedRepliesGroup = cannedReplies.filter(
		(cannedReply) => cannedReply.departmentId === activeSettingPanel
	) ?? []

	const currentDepartment = departments.find(
		department => department.did === activeSettingPanel
	)

	const selectedCannedReply = cannedReplies.find(
		cannedReply => cannedReply.crid === selectedCrid
	) ?? {}

	useDeepCompareEffect(() => {
		setIsFullCannedReply(selectedCannedReply?.full ?? false)
	}, [selectedCannedReply])

	const handleDeleteCannedReply = async (confirmed) => {
		if (confirmed === false)
			return
		//
		dispatch(setSelectedCrid(""))
		//get newList of canned-replies
		const newList = filter(
			cannedReplies,
			cannedReply => cannedReply.crid !== selectedCrid
		)

		const res = await deleteCannedReply({
			cannedReplyItem: { crid: selectedCrid },
			fullList: newList
		})

		if (res?.data?.code === CODE.SUCCESS) {
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
					{currentDepartment.name}
				</SettingsContentHeader>
				<SettingsContentDetails>
					<CircularProgressBox minHeight="300px" />
				</SettingsContentDetails>
			</>
		)
	}

	if (cannedRepliesGroup.length === 0) {
		return (
			<>
				<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
					{currentDepartment.name}
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

				rightButton={(size(selectedCannedReply) > 0)
					? <Box sx={{ display: "flex", alignItems: "center" }}>

						<FullCannedReplySwitch
							isFullCannedReply={isFullCannedReply}
							setIsFullCannedReply={setIsFullCannedReply} />

						<div>
							<Tooltip arrow title="Delete current canned-reply" placement="top">
								<IconButton
									sx={{ ":hover": { color: "warning.main" } }}
									onClick={() => setOpenConfirmDialog(true)}
								>
									<DeleteIcon fontSize="small" />
								</IconButton>
							</Tooltip>
						</div>
					</Box> : null}
			>
				{currentDepartment.name}
			</SettingsContentHeader>

			{(size(selectedCannedReply) === 0)
				? <CannedRepliesList
					cannedReplies={cannedRepliesGroup} /> : null}

			{(size(selectedCannedReply) > 0)
				? <CannedRepliesDetails
					selectedCannedReply={selectedCannedReply}
					isFullCannedReply={isFullCannedReply} /> : null}

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
						sx={{ width: 60, height: 60, mr: 2 }} />
					<Typography sx={{ lineHeight: 2 }}>
						Are you sure you want to delete this canned-reply?<br /> Please note that this action can not be undo.
					</Typography>
				</Box>
			</ConfirmDialog>
		</>
	)
}

CannedRepliesGroup.propTypes = {
	groupInfo: PropTypes.object,
	cannedReplies: PropTypes.array,
	backBtnClick: PropTypes.func,
}

export default CannedRepliesGroup