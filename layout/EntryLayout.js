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
import { Box } from "@mui/system"

//THIRD-PARTY

//PROJECT IMPORT
import { getRootLayout } from "./RootLayout"
import Footer from "./../components/common/Footer"
import Header from "../components/FrontEnd/Header"
import TopNavigatorBar from "../components/FrontEnd/TopNavigatorBar"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const FRONT_PAGE_TABS_NAME = {
	HOME: "Help Center",
	DOCS: "Docs",
	TROUBLESHOOT: "Troubleshoot"
}


export const FRONT_PAGE_TABS = [
	[FRONT_PAGE_TABS_NAME.HOME, "/"],
	[FRONT_PAGE_TABS_NAME.DOCS, "/docs"],
	[FRONT_PAGE_TABS_NAME.TROUBLESHOOT, "/troubleshoot"],
]

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function EntryLayout({ children }) {
	return (
		<>
			<Head>
				<title>Site Layout</title>
				<meta name="description" content="Site Layout Description" />
			</Head>

			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
				}}
			>
				<Header
					showLogo={true}
					showSlogan={false}
					title="ProDesk"
					slogan={"Your Elegant & Powerful Support System"}
				/>

				<TopNavigatorBar dataSet={FRONT_PAGE_TABS} />


				{children}


				<Footer />
			</Box>
		</>
	)
}

EntryLayout.propTypes = { children: PropTypes.node }

export const getLayout = page => getRootLayout(<EntryLayout>{page}</EntryLayout>)

export default EntryLayout