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

import Head from "next/head"
import PropTypes from "prop-types"
import React from "react"
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material"
//PROJECT IMPORT

import Header from "./Header"
import Footer from "./Footer"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

// const useStyles = makeStyles((theme) => ({
// 	grow: {
// 		flexGrow: 1,
// 	}
// }))

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh",
	},
	mobile: {
		[theme.breakpoints.down('md')]: {
			display: "none"
		},
	},
	fixFooter: {
		marginTop: "auto",
	}
}))

function NewTicketLayout({ children }) {
	const classes = useStyles()
	return (
		<>
			<Head>
				<title>Site Layout</title>
				<meta name="description" content="Site Layout Description" />
			</Head>

			<div className={classes.root} disableGutters={true}>
				<div className={classes.mobile}>
					<Header />
				</div>

				{children}

				<Grid container className={classes.fixFooter}>
					<Grid item xs={12} sm={11} md={10} className={classes.red}>
						<Footer />
					</Grid>
				</Grid>
			</div>
		</>
	)
}

NewTicketLayout.propTypes = { children: PropTypes.node }

export const getLayout = page => <NewTicketLayout>{page}</NewTicketLayout>

export default NewTicketLayout