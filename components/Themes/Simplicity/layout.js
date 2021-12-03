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
import { Container, ThemeProvider } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { simplicityTheme } from "@components/Themes/Simplicity/theme"
import { Header } from "@components/Themes/Simplicity/Header"
import { Footer } from "@components/Themes/Simplicity/Footer"

//ASSETS


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function SimplicityLayout({ children }) {
	return (
		<ThemeProvider theme={simplicityTheme}>
			<Head>
				{/* PWA primary color */}
				<meta name="theme-color" content={simplicityTheme.palette.primary.main} />
				{/* eslint-disable-next-line @next/next/no-css-tags */}
				<link rel="stylesheet" href="/themes/simplicity/simplicity.css" />
				{/* eslint-disable-next-line @next/next/no-page-custom-font */}
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap"
				/>
				{/* eslint-disable-next-line @next/next/no-page-custom-font */}
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Google+Sans:300,400,500,700&amp;display=swap"
				/>
			</Head>

			<div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

				<Header />

				<hr style={{ borderColor: "transparent", marginTop: "150px" }} />

				<Container
					maxWidth="lg"
					component="main"
					sx={{ flexGrow: 1 }}
				>
					{children}
				</Container>

				<Footer />

			</div>
		</ThemeProvider>
	)
}
SimplicityLayout.propTypes = { children: PropTypes.node }

export default SimplicityLayout