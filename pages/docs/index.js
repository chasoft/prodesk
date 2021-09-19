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

import React from "react"
import FeaturedDocs from "./../../components/common/frontend/FeaturedDocs"
import CategoryGroup from "../../components/Docs/CategoryGroup"

import { getLayout } from "../../layout/BlankLayout"
import MainNav from "../../components/common/frontend/MainNav"
import PromotedSearch from "../../components/common/frontend/PromotedSearch"
import AskNowFrame from "../../components/Docs/AskNowFrame"
import { Container } from "@mui/material"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function Docs() {
	return (
		<>
			<MainNav />

			<PromotedSearch />

			{/* <DocGroup /> */}

			<Container maxWidth="md">
				<FeaturedDocs />
			</Container>


			<AskNowFrame />

			<CategoryGroup />
		</>
	)
}

Docs.getLayout = getLayout
export default Docs