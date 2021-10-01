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
import Head from "next/head"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Grid } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import Header from "./../components/BackEnd/Header"
import Footer from "./../components/common/Footer"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function NewTicketLayout({ children }) {
	return (
		<>
			<Head>
				<title>Site Layout</title>
				<meta name="description" content="Site Layout Description" />
			</Head>

			<Box disableGutters={true} sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}>
				<Box sx={{ display: { xs: "none", md: "block" } }}>
					<Header />
				</Box>

				{children}

				<Grid container sx={{ marginTop: "auto" }}>
					<Grid item xs={12} sm={11} md={10}>
						<Footer />
					</Grid>
				</Grid>
			</Box>
		</>
	)
}

NewTicketLayout.propTypes = { children: PropTypes.node }

export const getLayout = page => <NewTicketLayout>{page}</NewTicketLayout>

export default NewTicketLayout