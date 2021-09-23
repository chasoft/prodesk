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

import { Container } from "@mui/material"
import React from "react"
import CreateNewTicket from "../../../components/Ticket/CreateNewTicket"
import updateUiSettings from "../../../helpers/updateUiSettings"

// MATERIAL-UI

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout } from "../../../layout/ClientLayout"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/



/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function NewTicket() {

	updateUiSettings({
		title: "Open New Ticket",
		background: {
			backgroundImage: ""
		}
	})

	return (
		<Container style={{ minHeight: "calc(100vh - 150px)" }}>
			<CreateNewTicket />
		</Container>
	)
}

NewTicket.getLayout = getLayout

export default NewTicket