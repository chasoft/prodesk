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
import { Box, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import FooterNotice from "./FooterNotice"
import ThreadMessageHeader from "./ThreadMessageHeader"
import ThreadMessagePayload from "./ThreadMessagePayload"
import ThreadMessageDetails from "./ThreadMessageDetails"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function PostContent() {
	return (
		<Box component="main"
			sx={{
				border: "1px solid",
				borderRadius: "0.5rem",
				borderColor: "divider",
			}}
		>
			<Box
				sx={{
					p: { xs: 3, md: 8 },
					backgroundColor: "white",
					borderTopLeftRadius: "8px",
					borderTopRightRadius: "8px",
				}}
			>
				<ThreadMessageHeader />

				<Typography variant="h1" sx={{ py: 2 }}>
					Heading of the post
				</Typography>

				<ThreadMessagePayload />
				<ThreadMessageDetails />
			</Box>
			<FooterNotice />
		</Box>
	)
}

export default PostContent