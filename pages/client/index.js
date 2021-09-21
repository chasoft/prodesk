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
import Link from "next/link"

import makeStyles from "@mui/styles/makeStyles"
import { Container, IconButton, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout } from "./../../layout/ClientLayout"
import updateUiSettings from "../../helpers/updateUiSettings"
import ClientStats from "../../components/common/backend/client/ClientStats"
import LatestTicketFeedback from "../../components/common/backend/client/LatestTicketFeedback"
import RecentActivities from "../../components/common/backend/client/RecentActivities"

//ASSETS
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {

	},
	boxTitle: {
		display: "flex",
		justifyContent: "space-between",
		padding: theme.spacing(8, 0, 4),
		color: "white",
	},
	siteTitle: {
		fontFamily: "\"Google Sans\", Roboto, sans-serif",
		fontWeight: "500",
		fontSize: "2.5rem",
		lineHeight: "2.5rem",
		[theme.breakpoints.down("lg")]: {
			fontSize: "2.2rem",
			lineHeight: "2.2rem",
		},
		[theme.breakpoints.down("md")]: {
			fontSize: "2rem",
			lineHeight: "2rem",
		}
	}
}))


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Client() {
	const classes = useStyles()

	updateUiSettings({
		title: "",
		background: {
			backgroundImage: ""
		}
	})

	return (
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>

			<div className={classes.boxTitle}>
				<div>
					<Typography className={classes.siteTitle}>
						prodesk
					</Typography>

					<Typography variant="subtitle1">
						Your Elegant &amp; Powerful Ticket System
					</Typography>
				</div>
				<div>
					<Link href="/client/tickets/new-ticket" alt="Open New Ticket">
						<Tooltip title="Open New Ticket" placement="left">
							<IconButton color="inherit" size="large">
								<ArrowForwardIcon />
							</IconButton>
						</Tooltip>
					</Link>
				</div>
			</div>

			<ClientStats />

			<LatestTicketFeedback />

			<RecentActivities />


		</Container>
	)
}

Client.getLayout = getLayout

export default Client