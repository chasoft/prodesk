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

//MATERIAL-UI
import { Container, Grid } from "@mui/material"

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import AskNowFrame from "./../../components/Docs/AskNowFrame"
import useUiSettings from "./../../helpers/useUiSettings"
import FeaturedDocs from "./../../components/FrontEnd/FeaturedDocs"
import { getLayout, FRONT_PAGE_TABS_NAME } from "./../../layout/EntryLayout"
import ListAllCategories from "./../../components/Category/ListAllCategories"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Docs() {
	useUiSettings({
		activeTab: FRONT_PAGE_TABS_NAME.DOCS,
	})

	return (
		<>
			<Container maxWidth="md" sx={{ mt: { xs: 3, md: 6 } }}>

				<Grid container>
					<Grid item xs={12} >
						{/* <FeaturedDocs /> */}
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