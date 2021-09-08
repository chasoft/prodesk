/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║          ProDesk - Your Elegant & Powerful Ticket System          ║ *
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

import { Card, CardContent, Container, Grid, Paper, Typography } from "@material-ui/core"
import React from "react"

// MATERIAL-UI
import { makeStyles } from "@material-ui/core/styles"
//THIRD-PARTY

//PROJECT IMPORT
import { getLayout } from "./../../layout/ClientLayout"
import Dashboard from "./../../components/Dashboard"
import updatePageMeta from "../../helpers/updatePageMeta"
import ClientStats from "../../components/common/backend/client/ClientStats"
import LatestTicketFeedback from "../../components/common/backend/client/LatestTicketFeedback"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


const useStyles = makeStyles((theme) => ({
	root: {

	},
	boxTitle: {
		padding: theme.spacing(8, 0, 4),
		color: "white",
	},
	siteTitle: {
		fontFamily: "\"Google Sans\", Roboto, sans-serif",
		fontWeight: "500",
		fontSize: "2.5rem",
		lineHeight: "2.5rem",
		[theme.breakpoints.down("sm")]: {
			fontSize: "2.2rem",
			lineHeight: "2.2rem",
		},
		[theme.breakpoints.down("xs")]: {
			fontSize: "2rem",
			lineHeight: "2rem",
		}
	}
}))


/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function Client() {
	const classes = useStyles()
	updatePageMeta({ title: "" })

	return (
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>

			<div className={classes.boxTitle}>
				<Typography className={classes.siteTitle}>
					prodesk
				</Typography>

				<Typography variant="subtitle1">
					Your Elegant &amp; Powerful Ticket System
				</Typography>
			</div>

			<ClientStats />

			<LatestTicketFeedback />

		</Container>
	)
}

Client.getLayout = getLayout

export default Client