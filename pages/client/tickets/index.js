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

import { Container, Box } from "@mui/material"
import React from "react"

//THIRD-PARTY
// import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { getLayout } from "./../../../layout/ClientLayout"
import useUiSettings from "./../../../helpers/useUiSettings"
import ListTickets from "./../../../components/Ticket/ListTickets"
import ListTicketsFilter from "./../../../components/Ticket/ListTicketsFilter"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Tickets() {

	useUiSettings({
		title: "All tickets",
		background: {
			backgroundImage: ""
		}
	})

	return (
		<Container maxWidth="lg" sx={{ minHeight: "calc(100vh - 150px)" }}>

			<Box sx={{ display: "flex" }}>

				<Box sx={{ flexGrow: 1 }}>
					<ListTickets />
				</Box>

				<div>
					<ListTicketsFilter />
				</div>

			</Box>

		</Container >
	)
}

Tickets.getLayout = getLayout

export default Tickets