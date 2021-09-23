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

import React, { useState } from "react"
import Link from "next/link"

// MATERIAL-UI
import { Box, ButtonBase, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"


//THIRD-PARTY


//PROJECT IMPORT
import { LINK_TYPE } from "../../helpers/constants"


//ASSETS
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined"
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined"
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined"

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

const LISTING_MODE = {
	BASIC: "ONLY CATEGORY NAME",
	STANDARD: "CAREGORY AND DESCRITION",
	FULL: "FULL"

}

const CateogryListingMode = () => {
	const [listingMode, setListingMode] = useState(LISTING_MODE.STANDARD)

	const handleListingMode = (event, newListingMode) => {
		if (newListingMode !== null) {
			setListingMode(newListingMode)
		}
	}
	return (
		<ToggleButtonGroup
			exclusive
			size="small"
			value={listingMode}
			onChange={handleListingMode}
		>
			<ToggleButton value={LISTING_MODE.BASIC}>
				<AppsOutlinedIcon />
			</ToggleButton>
			<ToggleButton value={LISTING_MODE.STANDARD}>
				<GridViewOutlinedIcon />
			</ToggleButton>
			<ToggleButton value={LISTING_MODE.FULL}>
				<GridOnOutlinedIcon />
			</ToggleButton>
		</ToggleButtonGroup>
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ListAllCategories() {
	return (
		<Box>



			<Box component="main"
				sx={{
					border: "1px solid",
					borderRadius: "0.5rem",
					borderColor: "divider",
					margin: { xs: "2rem 0 0", sm: "2.625rem 0 0" },
				}}
			>

				<Box
					sx={{
						float: "right",
						p: 1,
					}}
				>
					<CateogryListingMode />
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
								sx={{
									mt: 4,
									"& > h2": { fontSize: "1rem" }
								}}
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
										<Link key={idx} href="/">
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
		</Box>
	)
}

export default ListAllCategories