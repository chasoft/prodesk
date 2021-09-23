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

// MATERIAL-UI

//THIRD-PARTY

//PROJECT IMPORT
import { FRONT_PAGE_TABS_NAME, getLayout } from "../../layout/EntryLayout"
import { Container, Grid } from "@mui/material"
import updateUiSettings from "../../helpers/updateUiSettings"
import { Box } from "@mui/system"
import Banner from "../../components/widget/Banner"
import SingleCategory from "../../components/Category/SingleCategory"


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ViewSingleCategory() {

	updateUiSettings({
		activeTab: FRONT_PAGE_TABS_NAME.DOCS + "@note:" + "single-category",
	})

	return (
		<Container maxWidth="lg">
			<Grid container>
				<Grid item xs={12} sm={12} md={8} >
					<SingleCategory />
				</Grid>
				<Grid item xs={12} sm={12} md={4}>
					<Box
						sx={{
							marginLeft: { xs: 0, lg: "3rem" },
							marginTop: { xs: "3rem", lg: "4rem" },
						}}
					>
						<Banner />
					</Box>
				</Grid>
			</Grid>
		</Container>
	)
}

ViewSingleCategory.getLayout = getLayout

export default ViewSingleCategory