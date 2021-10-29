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
import { Box, Container } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout } from "./../../../layout/AdminLayout"
import useUiSettings from "./../../../helpers/useUiSettings"
import AdminTicketList from "../../../components/Ticket/AdminTicketList"
import AdminTicketFilters from "../../../components/Ticket/AdminTicketFilters"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Tickets() {

	useUiSettings({
		title: "Tickets management",
		background: {
			backgroundImage: ""
		}
	})

	return (
		<Container maxWidth="lg" sx={{ minHeight: "calc(100vh - 150px)" }}>

			<Box sx={{ display: "flex", height: "100%" }}>

				<Box sx={{ flexGrow: 1 }}>
					<AdminTicketList />
				</Box>

				<div> {/* this `div` is a placeholder for sticky feature works */}
					<AdminTicketFilters sx={{
						display: { xs: "none", md: "flex" },
						flexDirection: "column",
						mt: "124px",
						ml: 3, px: 3,
						backgroundColor: "#FFF",
						borderRadius: "0.5rem",
						width: "250px",
						position: "sticky",
						top: "80px"
					}} />
				</div>

			</Box>

		</Container >
	)
}

Tickets.getLayout = getLayout
export default Tickets