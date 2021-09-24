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

import React from "react"
import PopularArticles from "./../../components/FrontEnd/PopularArticles"
import CategoryGroup from "../../components/Docs/CategoryGroup"
import ListAllCategories from "./../../components/Category/ListAllCategories"
import { getLayout } from "../../layout/EntryLayout"
import AskNowFrame from "../../components/Docs/AskNowFrame"
import { Container, Grid, Typography } from "@mui/material"
import updateUiSettings from "../../helpers/updateUiSettings"
import { FRONT_PAGE_TABS_NAME } from "../../layout/EntryLayout"
import CategoryGroupLatestFAQs from "../../components/Docs/CategoryGroupLatestFAQs"
import FeaturedDocs from "../../components/FrontEnd/FeaturedDocs"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Docs() {

	updateUiSettings({
		activeTab: FRONT_PAGE_TABS_NAME.DOCS,
	})

	return (
		<>
			<Container maxWidth="md" sx={{ mt: { xs: 3, md: 6 } }}>

				<Grid container>
					<Grid item xs={12} >
						<FeaturedDocs />
						<ListAllCategories />
					</Grid>
				</Grid>

			</Container>

			<AskNowFrame />
		</>
	)
}

Docs.getLayout = getLayout
export default Docs