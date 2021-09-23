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
import Link from "next/link"

// MATERIAL-UI
import { Box, Container, Grid, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import CategoryGroupLatestFAQs from "./CategoryGroupLatestFAQs"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CategoryGroup = () => {
	return (
		<Container maxWidth="md">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					width: "100%",
				}}
			>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						pt: 6, px: 1, pb: 3,
						width: "100%"
					}}
				>

					<Typography variant="h2">Categories</Typography>

					<Link href="/docs/categories">
						<a>
							<Typography
								sx={{
									color: "primary.main",
									"&:hover": {
										textDecoration: "underline",
										cursor: "pointer",
									}
								}}
							>
								View all Categories
							</Typography>
						</a>
					</Link>

				</Box>


				<Grid container spacing={4}>

					<Grid item xs={12} sm={6}>
						<CategoryGroupLatestFAQs />
					</Grid>

					<Grid item xs={12} sm={6}>
						<CategoryGroupLatestFAQs />
					</Grid>

				</Grid>

			</Box>
		</Container >
	)
}

export default CategoryGroup