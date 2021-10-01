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

import React from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Container, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout as getAdminLayout } from "./../../layout/AdminLayout"
import updateUiSettings from "./../../helpers/updateUiSettings"
import TabsSettings from "./TabsSettings"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const APPLICATION_SETTINGS_NAMES = {
	GENERAL: "General",
	USER: "Users",
	SECURITY: "Security",
	SMTP: "SMTP",
	ADS: "Ads",
}

export const APPLICATION_SETTINGS_TABS = [
	[APPLICATION_SETTINGS_NAMES.GENERAL, "/admin/settings/application"],
	[APPLICATION_SETTINGS_NAMES.USER, "/admin/settings/application/users"],
	[APPLICATION_SETTINGS_NAMES.SECURITY, "/admin/settings/application/security"],
	[APPLICATION_SETTINGS_NAMES.SMTP, "/admin/settings/application/smtp"],
	[APPLICATION_SETTINGS_NAMES.ADS, "/admin/settings/application/ads"],
]

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function InnerLayoutSettings({ children }) {

	updateUiSettings(APPLICATION_SETTINGS_NAMES.GENERAL)

	return (
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)", marginTop: "1rem" }}>

			<Typography variant="h1" style={{ color: "white" }}>Application Settings</Typography>

			<TabsSettings dataSet={APPLICATION_SETTINGS_TABS} />

			{children}

		</Container>
	)
}
InnerLayoutSettings.propTypes = { children: PropTypes.node }

export const getLayout = page => getAdminLayout(<InnerLayoutSettings>{page}</InnerLayoutSettings>)

export default InnerLayoutSettings