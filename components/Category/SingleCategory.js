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

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React from "react"
import Link from "next/link"

// MATERIAL-UI
import { Box, ButtonBase, Grid, IconButton, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY


//PROJECT IMPORT
import { LINK_TYPE } from "../../helpers/constants"

//ASSETS
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const DummyData =
{
	cat: "Communication apps",
	items: [
		{ subject: "Phone app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
		{ subject: "Messages app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
		{ subject: "Contacts app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
		{ subject: "Google Duo app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
		{ subject: "Camera app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
		{ subject: "Clock app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
		{ subject: "Calculator  app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
		{ subject: "Gboard  app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
		{ subject: "Get help from your Google Assistant", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
		{ subject: "Get info before you ask in Discover", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
		{ subject: "Search the Web with Google", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
	]
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function SingleCategory() {
	return (
		<Box component="main"
			sx={{
				border: "1px solid",
				borderRadius: "0.5rem",
				borderColor: "divider",
				margin: "2.625rem 0 0"
			}}
		>
			<Box sx={{ padding: { xs: 3, md: 8 } }}>


				<Box sx={{ display: "flex", alignItems: "center", mb: "1rem" }}>
					<Tooltip title="Back to parent category" placement="top">
						<IconButton size="small" onClick={() => { }} style={{ marginRight: "5px" }}>
							<NavigateBeforeIcon />
						</IconButton>
					</Tooltip>
					<Typography variant="h1" sx={{ m: 0, fontSize: { xs: "1.5rem", sm: "1.75rem" } }}>{DummyData.cat}</Typography>
				</Box>

				<Box>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</Box>

				<Grid container spacing={2}>
					<Grid item xs={12}>

						<Box
							component="ul"
							sx={{
								padding: 0,
								cursor: "pointer",
								listStyle: "none",
								color: "primary.main",
								"& > li": { display: "flex", px: 2, py: 1 },
								"& > li:hover": {
									backgroundColor: "#E8F0FE"
								}
							}}
						>
							{DummyData.items.map((link, idx) => (
								<Link href="/" key={idx}>
									<li >
										<ButtonBase sx={{ textAlign: "left" }}>
											{link.subject}
										</ButtonBase>
									</li>
								</Link>
							))}
						</Box>

					</Grid>
				</Grid>
			</Box>
		</Box >
	)
}

export default SingleCategory