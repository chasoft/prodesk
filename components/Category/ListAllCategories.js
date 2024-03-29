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

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React, { useState } from "react"
import Link from "next/link"

// MATERIAL-UI
import { Box, ButtonBase, Grid, Typography } from "@mui/material"


//THIRD-PARTY


//PROJECT IMPORT
import { LINK_TYPE } from "@helpers/constants"
import ViewModeSwitcher, { VIEW_LISTING_MODE } from "@components/common/ViewModeSwitcher"


//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const DummyData = [
	{
		cat: "Communication apps",
		items: [
			{ subject: "Phone app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Messages app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Contacts app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Google Duo app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" }
		]
	},
	{
		cat: "Tool apps",
		items: [
			{ subject: "Camera app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Clock app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Calculator  app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Gboard  app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" }
		]
	},
	{
		cat: "Google app",
		items: [
			{ subject: "Get help from your Google Assistant", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Get info before you ask in Discover", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Search the Web with Google", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
		]
	},
	{
		cat: "Other Google apps on your phone",
		items: [
			{ subject: "Android Auto app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Family Link app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Gmail app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Google Docs app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Google Earth app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
			{ subject: "Google Keep app", linkType: LINK_TYPE.ARTICLE, data: "K_356sIK" },
		]
	}
]


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ListAllCategories() {
	const [listingMode, setListingMode] = useState(VIEW_LISTING_MODE.DETAILS)
	return (
		<Box component="main"
			sx={{
				border: "1px solid",
				borderRadius: "0.5rem",
				borderColor: "divider",
				margin: { xs: "2rem 0 0", sm: "2.625rem 0 0" },
			}}
		>

			<Box sx={{ float: "right", p: 1, }}>
				<ViewModeSwitcher
					listingMode={listingMode}
					setListingMode={(mode) => setListingMode(mode)}
				/>
			</Box>

			<Box
				sx={{
					px: { xs: 3, sm: 6, md: 8 },
					py: { xs: 3, sm: 6, md: 8 }
				}}
			>

				<Typography variant="h1"
					sx={{
						marginBottom: "1rem",
						fontSize: { xs: "1.5rem", sm: "1.75rem" }
					}}
				>
					Get help with apps on your phone
				</Typography>

				<Box>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</Box>

				<Grid container spacing={2}>

					{DummyData.map(((block, idx) => (
						<Grid
							item key={idx} xs={12} sm={6}
							sx={{ mt: 4 }}
						>
							<Typography variant="h2" sx={{ pl: 2 }}>{block.cat}</Typography>

							{(idx === 2) && <Box sx={{ pl: 2 }}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							</Box>}

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
								{block.items.map((link, idx) => (
									<Link key={idx} href="/" passHref>
										<li>
											<ButtonBase sx={{ textAlign: "left" }}>
												{link.subject}
											</ButtonBase>
										</li>
									</Link>
								))}
							</Box>
						</Grid>
					)))}

				</Grid>
			</Box>
		</Box>
	)
}

export default ListAllCategories