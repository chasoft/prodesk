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

import React from "react"
import Head from "next/head"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

// import updatePageMeta from "./../helpers/updatePageMeta"
import { getLayout } from "./../../components/RootLayout"
// import { getLayout as getAdminLayout } from "../../components/layouts/AdminLayout"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function Admin() {
	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				<title>Admin Dashboard - DomainHub</title>
				<meta name="description" content="page description" />
			</Head>

			<p>This is the Admin Page</p>
		</>
	)
}

Admin.getLayout = getLayout
export default Admin