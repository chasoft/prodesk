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

import { getLayout } from "./../layout/BlankLayout"
import PromotedSearch from "./../components/common/frontend/PromotedSearch"
import FrontAccordions from "./../components/common/frontend/FrontAccordions"
import MainNav from "./../components/common/frontend/MainNav"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function Home() {
	// const smallScreen = useMediaQuery({ query: "(max-width: 959px)" })

	return (
		<>
			<MainNav />
			<PromotedSearch />
			<FrontAccordions />
		</>
	)
}

Home.getLayout = getLayout
export default Home