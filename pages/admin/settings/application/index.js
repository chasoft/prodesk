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

// MATERIAL-UI
import { Typography } from "@mui/material"
// import { makeStyles } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout, APPLICATION_SETTINGS_NAMES } from "./../../../../components/Settings/InnerLayoutSettings"
import updateUiSettings from "../../../../helpers/updateUiSettings"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function ApplicationSettings() {

	updateUiSettings({
		activeTab: APPLICATION_SETTINGS_NAMES.GENERAL,
		background: {
			backgroundImage: "url(\"/bg/meteor.svg\")"
		}
	})

	return (
		<>
			<Typography variant="h1">Admin Application Settings</Typography>
		</>
	)
}

ApplicationSettings.getLayout = getLayout

export default ApplicationSettings