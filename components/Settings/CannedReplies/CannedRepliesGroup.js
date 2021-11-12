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

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import CannedRepliesList from "./CannedRepliesList"
import CannedRepliesDetails from "./CannedRepliesDetails"
import { getUiSettings } from "./../../../redux/selectors"
import { setSelectedCrid } from "../../../redux/slices/uiSettings"
import { SettingsContentDetails, SettingsContentHeader } from "./../../Settings/SettingsPanel"
import { useDeleteCannedReplyMutation, useGetCannedRepliesQuery } from "../../../redux/slices/firestoreApi"

//ASSETS
import DeleteIcon from "@mui/icons-material/Delete"
import ConfirmDialog from "../../common/ConfirmDialog"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CannedRepliesGroup = ({ backBtnClick }) => {
	const dispatch = useDispatch()
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
	const { selectedCrid, activeSettingPanel } = useSelector(getUiSettings)
	const { cannedReplies } = useGetCannedRepliesQuery(undefined, {
		selectFromResult: ({ data }) => ({
			cannedReplies: data?.filter((cannedReply) => cannedReply.department === activeSettingPanel) ?? [],
		})
	})

	const [deleteCannedReply] = useDeleteCannedReplyMutation()

	const handleDeleteCannedReply = async (confirmed) => {
		if (confirmed) {
			dispatch(setSelectedCrid(""))
			await deleteCannedReply({ crid: selectedCrid })
		}
	}

	if (cannedReplies.length === 0) {
		return (
			<>
				<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
					{activeSettingPanel}
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

				rightButton={selectedCrid
					&& <div>
						<Tooltip arrow title="Delete current canned-reply" placement="left">
							<IconButton
								sx={{ ":hover": { color: "warning.main" } }}
								onClick={() => setOpenConfirmDialog(true)}
							>
								<DeleteIcon fontSize="small" />
							</IconButton>
						</Tooltip>
					</div>}
			>
				{activeSettingPanel}

				<ConfirmDialog
					okButtonText="Delete"
					color="warning"
					open={openConfirmDialog}
					setOpen={setOpenConfirmDialog}
					callback={handleDeleteCannedReply}
				>
					<Box sx={{ display: "flex" }}>
						<DeleteIcon sx={{ width: 60, height: 60, mr: 2 }} color="warning" />
						<Typography sx={{ lineHeight: 2 }}>
							Are you sure you want to delete this canned-reply? <br />Please note that this action can not be undo.
						</Typography>
					</Box>
				</ConfirmDialog>
			</SettingsContentHeader>

			{(selectedCrid === "")
				&& <CannedRepliesList cannedReplies={cannedReplies} />}

			{(selectedCrid !== "")
				&& <CannedRepliesDetails crid={selectedCrid} />}
		</ >
	)
}

CannedRepliesGroup.propTypes = {
	groupInfo: PropTypes.object,
	cannedReplies: PropTypes.array,
	backBtnClick: PropTypes.func,
}

export default CannedRepliesGroup