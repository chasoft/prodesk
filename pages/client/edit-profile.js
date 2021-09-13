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

import { Container, Typography } from "@material-ui/core"
import React from "react"

// MATERIAL-UI

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout } from "./../../layout/ClientLayout"
import { updateFrontendBackground } from "./../../helpers/updateFrontendBackground"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/



/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function EditProfile() {
	updateFrontendBackground({ data: { backgroundColor: "red" } })
	return (
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>
			<Typography variant="h1">Edit Profile</Typography>


		</Container>
	)
}

EditProfile.getLayout = getLayout

export default EditProfile