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

import React, { useState } from "react"

// MATERIAL-UI
import { Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getUiSettings } from "../../../../redux/selectors"
import updateUiSettings from "../../../../helpers/updateUiSettings"
import { setActiveSettingPanel } from "../../../../redux/slices/uiSettings"
import { getLayout, APPLICATION_SETTINGS_NAMES } from "./../../../../components/Settings/InnerLayoutSettings"
import { ListItem, ListTitle, SettingsContainer, SettingsContent, SettingsContentDetails, SettingsContentHeader, SettingsContentHelper, SettingsContentHelperLearnMore, SettingsContentHelperText, SettingsHeader, SettingsList } from "../../../../components/common/SettingsPanel"

//ASSETS
import InfoIcon from "@mui/icons-material/Info"
import BusinessIcon from "@mui/icons-material/Business"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ApplicationSettings() {
	const [showContent, setShowContent] = useState(false)

	const dispatch = useDispatch()
	const { activeSettingPanel } = useSelector(getUiSettings)

	updateUiSettings({
		activeTab: APPLICATION_SETTINGS_NAMES.GENERAL,
		background: {
			backgroundImage: "url(\"/bg/meteor.svg\")"
		}
	})

	return (
		<>
			<SettingsHeader>
				<Typography variant="h2" style={{ margin: 0 }}>Application Settings</Typography>
			</SettingsHeader>

			<SettingsContainer>
				<SettingsList sx={{ display: { xs: showContent ? "none" : "initial", sm: "initial", flexGrow: showContent ? 0 : 1 } }}>

					<ListItem
						selected={activeSettingPanel === "AA"}
						icon={<InfoIcon fontSize="small" />}
						onClick={() => {
							dispatch(setActiveSettingPanel("AA"))
							setShowContent(true)
						}}
					>
						Overview
					</ListItem>

					<ListTitle>Available departments</ListTitle>

					{["BB", "CC", "DD", "EE"].map((item, idx) => (
						<ListItem
							key={idx}
							selected={activeSettingPanel === item}
							icon={<BusinessIcon fontSize="small" />}
							onClick={() => {
								dispatch(setActiveSettingPanel(item))
								setShowContent(true)
							}}
						>
							{item}
						</ListItem>
					))}

				</SettingsList>


				<SettingsContent sx={{ display: { xs: showContent ? "initial" : "none", sm: "initial", flexGrow: showContent ? 1 : 0 } }}>

					<SettingsContentHeader backBtnOnClick={() => setShowContent(false)}>
						Application Settings
					</SettingsContentHeader>

					<SettingsContentHelper>

						<SettingsContentHelperText>
							Department Overview Department Overview Department Overview Department Overview Department Overview
							<SettingsContentHelperLearnMore target="/admin" />
						</SettingsContentHelperText>

					</SettingsContentHelper>

					<SettingsContentDetails>
						<Typography>Content goes here!!!!</Typography>
						<Typography>You are viewing {activeSettingPanel}</Typography>
					</SettingsContentDetails>

				</SettingsContent>


			</SettingsContainer>
		</>
	)
}

ApplicationSettings.getLayout = getLayout

export default ApplicationSettings