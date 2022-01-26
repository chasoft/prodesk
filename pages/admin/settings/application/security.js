/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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

import React from "react"

// MATERIAL-UI
import { Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import useUiSettings from "@helpers/useUiSettings"
import { getLayout, APPLICATION_SETTINGS_NAMES } from "@components/Settings/InnerLayoutSettings"

import {
	SettingsContainer,
	SettingsContent,
	SettingsHeader,
} from "@components/common/Settings"
import SecurityAppSettings from "@components/Settings/Application/SecurityAppSettings"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ApplicationSettingsSecurity() {

	useUiSettings({
		activeTab: APPLICATION_SETTINGS_NAMES.SECURITY,
		background: {
			backgroundImage: ""
		}
	})

	return (
		<>
			<SettingsHeader>
				<Typography variant="h1" sx={{ mt: 1 }}>
					General Settings
				</Typography>
			</SettingsHeader>

			<SettingsContainer>
				<SettingsContent>

					<SecurityAppSettings />

				</SettingsContent>
			</SettingsContainer>
		</>
	)
}

ApplicationSettingsSecurity.getLayout = getLayout
export default ApplicationSettingsSecurity