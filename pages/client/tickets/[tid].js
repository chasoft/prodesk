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
import { useRouter } from "next/router"

// MATERIAL-UI
import { Container } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout } from "../../../layout/ClientLayout"
import Post from "../../../components/Post"
import updateUiSettings from "../../../helpers/updateUiSettings"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/



/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function SingleTicket() {
	const router = useRouter()
	// const { tid } = router.query

	updateUiSettings({
		background: {
			backgroundImage: ""
		}
	})

	return (
		<Container style={{ minHeight: "calc(100vh - 150px)" }}>
			<Post />
		</Container>
	)
}

SingleTicket.getLayout = getLayout

export default SingleTicket