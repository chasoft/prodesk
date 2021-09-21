/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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
// import { makeStyles } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout as getAdminLayout } from "./../../layout/AdminLayout"
import updateUiSettings from "./../../helpers/updateUiSettings"
import TabsSettings from "./TabsSettings"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const TICKET_SETTINGS_NAMES = {
	GENERAL: "General",		//Explained fix Status & Priority
	DEPARTMENT: "Department",
	LABEL: "Label",
	CANNED_REPLY: "Canned Reply",
}

export const TICKET_SETTINGS_TABS = [
	[TICKET_SETTINGS_NAMES.GENERAL, "/admin/settings/tickets"],
	[TICKET_SETTINGS_NAMES.DEPARTMENT, "/admin/settings/tickets/department"],
	[TICKET_SETTINGS_NAMES.LABEL, "/admin/settings/tickets/label"],
	[TICKET_SETTINGS_NAMES.CANNED_REPLY, "/admin/settings/tickets/canned-reply"],
]

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function InnerLayoutTickets({ children }) {

	// updateUiSettings(TICKET_SETTINGS_NAMES.GENERAL)

	return (
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>

			<Typography variant="h1" style={{ color: "white" }}>Tickets Settings</Typography>

			<TabsSettings dataSet={TICKET_SETTINGS_TABS} />

			{children}

		</Container>
	)
}
InnerLayoutTickets.propTypes = { children: PropTypes.node }

export const getLayout = page => getAdminLayout(<InnerLayoutTickets>{page}</InnerLayoutTickets>)

export default InnerLayoutTickets