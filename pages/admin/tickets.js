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

// MATERIAL-UI
import { Container, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { getLayout } from "./../../layout/AdminLayout"
import useUiSettings from "./../../helpers/useUiSettings"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Tickets() {
	const dispatch = useDispatch()
	useUiSettings({
		background: {
			backgroundImage: ""
		}
	})

	return (
		<Container maxWidth="lg" style={{ minHeight: "calc(100vh - 150px)", backgroundColor: "#F1F1F1" }}>

			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<Typography variant="h1">Admin Tickets</Typography>








			</div>





		</Container>
	)
}

Tickets.getLayout = getLayout
export default Tickets