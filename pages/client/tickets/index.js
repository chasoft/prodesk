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

import { Container, Grid, Hidden } from "@material-ui/core"
import React from "react"
import Link from "next/link"

// MATERIAL-UI
import { makeStyles } from "@material-ui/core/styles"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout } from "../../../layout/ClientLayout"
import updatePageMeta from "../../../helpers/updatePageMeta"
import ListTickets from "../../../components/Ticket/ListTickets"
import ListTicketsFilter from "../../../components/Ticket/ListTicketsFilter"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {

	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function Tickets() {
	const classes = useStyles()
	updatePageMeta({ title: "All tickets" })
	return (
		<Container style={{ minHeight: "calc(100vh - 150px)" }}>
			<div className={classes.root}>
				<Container>
					<Grid container>
						<Grid item sm={12} md={8} >
							<ListTickets />
						</Grid>
						<Hidden smDown>
							<Grid item md={4}>
								<ListTicketsFilter />
							</Grid>
						</Hidden>
					</Grid>
				</Container>
			</div>
		</Container>
	)
}

Tickets.getLayout = getLayout

export default Tickets