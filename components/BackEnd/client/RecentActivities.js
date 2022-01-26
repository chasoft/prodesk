/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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
import DocsList from "@components/common/DocsList"
import { Box, Grid, Typography } from "@mui/material"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const DUMMY_PUBLIC_TICKETS = [
	{
		id: 1,
		subject: "in my pixel 4a 5g phone",
		url: "/faqs/some-faqs-1"
	},
	{
		id: 2,
		subject: "touch sensitiveness that while scrolling i",
		url: "/faqs/some-faqs-2"
	},
	{
		id: 3,
		subject: "touch sensitiveness that while scrolling i",
		url: "/faqs/some-faqs-2"
	},
	{
		id: 4,
		subject: "touch sensitiveness that while scrolling i",
		url: "/faqs/some-faqs-2"
	},
	{
		id: 5,
		subject: "touch sensitiveness that while scrolling i",
		url: "/faqs/some-faqs-2"
	},
]





/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function RecentActivities() {

	return (
		<Box sx={{ mt: { xs: 5, md: 8 }, }}>

			<Typography variant="h2">For your reference</Typography>

			<Box sx={{ margin: { xs: "1.625rem 0", md: "1.5rem 0" }, mb: 0 }}>
				<Grid container spacing={4}>

					<Grid item xs={12} sm={6}>

						<DocsList
							header="Public tickets"
							viewAllText="View all public tickets"
							viewAllLink="/client/public-ticket"
							dataSource={DUMMY_PUBLIC_TICKETS} />

					</Grid>

					<Grid item xs={12} sm={6}>

						<DocsList
							header="Popular documents"
							viewAllText="View all popular documents"
							viewAllLink="/client/popular-documents"
							dataSource={DUMMY_PUBLIC_TICKETS} />

					</Grid>

				</Grid>
			</Box>


		</Box>
	)
}

export default RecentActivities