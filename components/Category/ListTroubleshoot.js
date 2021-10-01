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

import Link from "next/link"
import PropTypes from "prop-types"
import React, { useState } from "react"

// MATERIAL-UI
import { Box, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import ViewModeSwitcher, { VIEW_LISTING_MODE } from "./../common/ViewModeSwitcher"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const DummyData = [
	{
		id: 1,
		title: "Communication apps",
		short: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
		url: "/admin"
	},
	{
		id: 2,
		title: "Fix your Camera app on your Pixel phone",
		short: "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		url: "/client"
	},
	{
		id: 3,
		title: "Fix Bluetooth problems on your Pixel",
		short: "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		url: "/client"
	},
]

const ReadMoreBtn = ({ url }) => {
	return (
		<Box
			sx={{
				py: 1.5,
				display: "flex",
				alignItems: "center",
				color: "primary.main"
			}}
		>
			<Link href={url}>
				<Box component="a"
					sx={{
						display: "flex",
						alignItems: "center",
						cursor: "pointer",
						"&:hover": { textDecoration: "underline" }
					}}
				>
					<Typography sx={{ mr: 0.5 }}>Read more</Typography>
					<ArrowForwardIcon fontSize="small" />
				</Box>
			</Link>
		</Box>
	)
}
ReadMoreBtn.propTypes = { url: PropTypes.string }

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ListTroubleshoot() {
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

			<Box sx={{ float: "right", p: 1 }}>
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
					Troubleshoot your phone
				</Typography>

				{DummyData.map((item, idx) => {
					return (
						<Box key={item.id}
							sx={{
								display: "flex",
								flexDirection: "column",
								width: "100%"
							}}
						>
							<Box
								sx={{
									display: "flex",
									borderTop: (idx === 0) ? "" : "1px solid",
									borderColor: "divider",
									pt: (idx === 0) ? "" : "1.5rem",
								}}
							>
								<Box
									sx={{
										color: "#1a73e8",
										borderLeft: ".125rem solid #1a73e8",
										margin: ".25rem -2rem .25rem -1rem",
										minWidth: "3rem",
										paddingLeft: ".875rem",
										width: "3rem",
										display: { xs: "none", sm: "initial", }
									}}
								/>

								<Typography variant="h2"
									sx={{

									}}
								>
									{item.title}
								</Typography>

							</Box>
							<Typography variant="body1">{item.short}</Typography>
							<ReadMoreBtn url={item.url} />
						</Box>
					)
				})}

			</Box>
		</Box >
	)
}

export default ListTroubleshoot