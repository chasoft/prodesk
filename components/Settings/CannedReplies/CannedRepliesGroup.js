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
import React, { useCallback, useEffect, useState } from "react"

// MATERIAL-UI
import { Container, Typography } from "@mui/material"

//PROJECT IMPORT
import CannedRepliesList from "./CannedRepliesList"
import CannedRepliesDetails from "./CannedRepliesDetails"
import { SettingsContent, SettingsContentDetails, SettingsContentHeader } from "./../../Settings/SettingsPanel"
import { useSelector } from "react-redux"
import { getUiSettings } from "./../../../redux/selectors"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CannedRepliesGroup = ({ groupInfo, cannedReplies, backBtnClick }) => {
	const [selectedCannedReply, setSelectedCannedReply] = useState("")
	const { activeSettingPanel } = useSelector(getUiSettings)

	useEffect(() => {
		setSelectedCannedReply("")
		console.log("Reset selectedCannedReply")
	}, [activeSettingPanel])

	const getCannedReply = useCallback(
		() => {
			const index = cannedReplies.map(item => item.id).indexOf(selectedCannedReply)
			return cannedReplies[index]
		},
		[selectedCannedReply]
	)

	if (!groupInfo?.department) {
		return (
			<>
				<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
					Unknowned group
				</SettingsContentHeader>
				<SettingsContentDetails>
					<Typography>
						There is something happen! Selected group is not found!
					</Typography>
				</SettingsContentDetails>
			</>
		)
	}

	if (cannedReplies.length === 0) {
		return (
			<>
				<SettingsContentHeader backBtnOnClick={() => backBtnClick(false)}>
					{groupInfo.department}
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
					if (selectedCannedReply === "")
						backBtnClick(false)
					else
						setSelectedCannedReply("")
				}}
			>
				{groupInfo.department}
			</SettingsContentHeader>

			{(selectedCannedReply === "")
				&& <CannedRepliesList data={cannedReplies} callback={setSelectedCannedReply} />}

			{(selectedCannedReply !== "")
				&& <CannedRepliesDetails data={getCannedReply()} />}
		</ >
	)
}

CannedRepliesGroup.propTypes = {
	groupInfo: PropTypes.object,
	cannedReplies: PropTypes.array,
	backBtnClick: PropTypes.func,
}

export default CannedRepliesGroup