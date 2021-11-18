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
import TabsSettings from "./TabsSettings"
import { getLayout as getAdminLayout } from "./../../layout/AdminLayout"

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
	{ index: 0, name: APPLICATION_SETTINGS_NAMES.GENERAL, path: "/admin/settings/application" },
	{ index: 1, name: APPLICATION_SETTINGS_NAMES.USER, path: "/admin/settings/application/users" },
	{ index: 2, name: APPLICATION_SETTINGS_NAMES.SECURITY, path: "/admin/settings/application/security" },
	{ index: 3, name: APPLICATION_SETTINGS_NAMES.SMTP, path: "/admin/settings/application/smtp" },
	{ index: 4, name: APPLICATION_SETTINGS_NAMES.ADS, path: "/admin/settings/application/ads" },
]

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function InnerLayoutSettings({ children }) {
	return (
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)", marginTop: "1rem" }}>

			<Typography variant="h1" style={{ color: "white" }}>Application Settings</Typography>

			<TabsSettings tabsList={APPLICATION_SETTINGS_TABS} />

			{children}

		</Container>
	)
}
InnerLayoutSettings.propTypes = { children: PropTypes.node }

export const getLayout = page => getAdminLayout(<InnerLayoutSettings>{page}</InnerLayoutSettings>)

export default InnerLayoutSettings