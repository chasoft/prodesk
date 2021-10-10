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
// import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { getLayout as getAdminLayout } from "./../../layout/AdminLayout"
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
	{ index: 0, name: TICKET_SETTINGS_NAMES.GENERAL, path: "/admin/settings/tickets" },
	{ index: 1, name: TICKET_SETTINGS_NAMES.DEPARTMENT, path: "/admin/settings/tickets/department" },
	{ index: 2, name: TICKET_SETTINGS_NAMES.LABEL, path: "/admin/settings/tickets/label" },
	{ index: 3, name: TICKET_SETTINGS_NAMES.CANNED_REPLY, path: "/admin/settings/tickets/canned-reply" },
]

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function InnerLayoutTickets({ children }) {
	// const dispatch = useDispatch()
	// useUiSettings(dispatch,TICKET_SETTINGS_NAMES.GENERAL)

	return (
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>

			<Typography variant="h1" style={{ color: "white" }}>Tickets Settings</Typography>

			<TabsSettings tabsList={TICKET_SETTINGS_TABS} />

			{children}

		</Container>
	)
}
InnerLayoutTickets.propTypes = { children: PropTypes.node }

export const getLayout = page => getAdminLayout(<InnerLayoutTickets>{page}</InnerLayoutTickets>)

export default InnerLayoutTickets