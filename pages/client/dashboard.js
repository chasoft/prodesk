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

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import { getLayout } from "./../../components/RootLayout"
import Dashboard from "./../../components/Dashboard"
import MainNav from "../../components/MainNav"


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/




function ClientDashboard() {
	// const smallScreen = useMediaQuery({ query: "(max-width: 959px)" })
	return (
		<>
			<MainNav borderBottom={true} />
			<Dashboard />
		</>
	)
}

ClientDashboard.getLayout = getLayout
export default ClientDashboard