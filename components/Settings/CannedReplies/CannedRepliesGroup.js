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
import { Typography } from "@mui/material"

//PROJECT IMPORT
import { useDispatch, useSelector } from "react-redux"
import CannedRepliesList from "./CannedRepliesList"
import CannedRepliesDetails from "./CannedRepliesDetails"
import { getUiSettings } from "./../../../redux/selectors"
import { SettingsContentDetails, SettingsContentHeader } from "./../../Settings/SettingsPanel"
import { useGetCannedRepliesQuery } from "../../../redux/slices/firestoreApi"
import { setSelectedCrid } from "../../../redux/slices/uiSettings"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CannedRepliesGroup = ({ backBtnClick }) => {
	const dispatch = useDispatch()
	const { selectedCrid, activeSettingPanel } = useSelector(getUiSettings)
	const { cannedReplies } = useGetCannedRepliesQuery(undefined, {
		selectFromResult: ({ data }) => ({
			cannedReplies: data?.filter((cannedReply) => cannedReply.department === activeSettingPanel) ?? [],
		})
	})

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
			>
				{activeSettingPanel}
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