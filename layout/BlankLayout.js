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
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

import Head from "next/head"
import PropTypes from "prop-types"
import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { getRootLayout } from "./RootLayout"
/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import Header from "../components/common/frontend/Header"
import Footer from "../components/common/Footer"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

// const useStyles = makeStyles((theme) => ({
// 	grow: {
// 		flexGrow: 1,
// 	}
// }))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		minHeight: "100vh",
	},
	main: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(2),
	},
	footer: {
		padding: theme.spacing(3, 2),
		marginTop: "auto",
		backgroundColor:
			theme.palette.type === "light" ? theme.palette.grey[200] : theme.palette.grey[800],
	},
}))

function BlankLayout({ children }) {
	const classes = useStyles()
	return (
		<>
			<Head>
				<title>Site Layout</title>
				<meta name="description" content="Site Layout Description" />
			</Head>

			<div className={classes.root}>
				<Header />

				{children}

				<Footer />
			</div>
		</>
	)
}

BlankLayout.propTypes = { children: PropTypes.node }

export const getLayout = page => getRootLayout(<BlankLayout>{page}</BlankLayout>)

export default BlankLayout