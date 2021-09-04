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

import React, { useEffect } from "react"
import Head from "next/head"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

// import updatePageMeta from "./../helpers/updatePageMeta"
import { getLayout } from "./../../../layout/AdminLayout"
import { BACKGROUND_ID } from "./../../../helpers/constants"
import updateAdminBackground from "./../../../helpers/updateAdminBackground"
import { Grid } from "@material-ui/core"
import DashboardContent from "../../../components/Dashboard/DashboardContent"
import Filters from "../../../components/Dashboard/Filters"
// import Dashboard from "./../../../components/Dashboard"
// import { getLayout as getAdminLayout } from "../../components/layouts/AdminLayout"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function Tickets() {
	updateAdminBackground({ id: BACKGROUND_ID.EMPTY })
	return (
		<Grid container>
			<DashboardContent />

		</Grid>
	)
}

Tickets.getLayout = getLayout
export default Tickets