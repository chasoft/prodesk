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

import { Container, Hidden } from "@material-ui/core"
import React from "react"

// MATERIAL-UI
import { makeStyles } from "@material-ui/core/styles"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout } from "../../../layout/ClientLayout"
import updateUiSettings from "../../../helpers/updateUiSettings"
import ListTickets from "../../../components/Ticket/ListTickets"
import ListTicketsFilter from "../../../components/Ticket/ListTicketsFilter"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles({
	root: {
		minHeight: "calc(100vh - 150px)",
		width: "100%"
	},
	container: {
		display: "flex",
		minHeight: "calc(100vh - 200px)",
	}
})

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function Tickets() {
	const classes = useStyles()

	updateUiSettings({
		title: "All tickets",
		background: {
			backgroundImage: ""
		}
	})

	return (
		<Container maxWidth="lg" className={classes.root}>
			<div className={classes.container}>

				<ListTickets />

				<Hidden smDown>
					<ListTicketsFilter />
				</Hidden>

			</div>
		</Container>
	)
}

Tickets.getLayout = getLayout

export default Tickets