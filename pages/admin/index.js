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
import { getLayout } from "./../../layout/AdminLayout"
import { BACKGROUND_ID } from "../../helpers/constants"
import updateAdminBackground from "../../helpers/updateAdminBackground"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function Admin() {

	updateAdminBackground({ id: BACKGROUND_ID.ADMIN_INDEX })

	return (
		<>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>

			<p>hello world</p>			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>

			<p>hello world</p>			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>

			<p>hello world</p>			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>
			<p>hello world</p>

			<p>hello world</p>
		</>
	)
}

Admin.getLayout = getLayout
export default Admin