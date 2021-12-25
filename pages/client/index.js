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
import Link from "next/link"

// MATERIAL-UI
import { Box, Container, IconButton, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout } from "@layout/ClientLayout"
import useUiSettings from "@helpers/useUiSettings"
import ClientStats from "@components/BackEnd/client/ClientStats"
import RecentActivities from "@components/BackEnd/client/RecentActivities"
import LatestTicketFeedback from "@components/BackEnd/client/LatestTicketFeedback"

//ASSETS
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Client() {

	useUiSettings({
		title: "Client Dashboard",
		background: {
			backgroundImage: ""
		}
	})

	return (
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>

			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					pt: 8, px: 0, pb: 4,
					color: "white",
				}}
			>
				<div>
					<Typography
						sx={{
							fontFamily: "\"Google Sans\", Roboto, sans-serif",
							fontWeight: "500",
							fontSize: { xs: "2rem", md: "2.2rem", lg: "2.5rem" },
							lineHeight: { xs: "2rem", md: "2.2rem", lg: "2.5rem" },
						}}
					>
						prodesk
					</Typography>

					<Typography variant="subtitle1">
						{"Your Elegant & Powerful Support System"}
					</Typography>
				</div>
				<div>
					<Link href="/client/tickets/new-ticket" alt="Open New Ticket" passHref>
						<Tooltip title="Open New Ticket" placement="left">
							<IconButton color="inherit" size="large">
								<ArrowForwardIcon />
							</IconButton>
						</Tooltip>
					</Link>
				</div>
			</Box>

			<ClientStats />

			<LatestTicketFeedback />

			<RecentActivities />


		</Container>
	)
}

Client.getLayout = getLayout

export default Client