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
import { Avatar, Box, Paper, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import FooterNotice from "./FooterNotice"
import ThreadMessageHeader from "./ThreadMessageHeader"
import ThreadMessagePayload from "./ThreadMessagePayload"
import ThreadMessageDetails from "./ThreadMessageDetails"
import ReplyNotice from "./Replies/ReplyNotice"

//ASSETS

/*****************************************************************	
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function PostContent() {
	return (
		<Paper component="main"
			sx={{
				borderRadius: "0.5rem",
				mt: 2
			}}
		>

			<Box sx={{
				display: "flex",
				alignItems: "center",
				top: "28px",
				px: { xs: 3, md: 6 },
				pt: { xs: 4, md: 4 },
			}}>
				<Avatar
					alt="Remy Sharp" src="/img/demo-avatar.jpg"
					sx={{
						bgcolor: "#FFF",
						width: 64, height: 64,
						mr: 2
					}}
				/>
				<Typography variant="h2">
					Heading of the post Heading of the post Heading of the
				</Typography>
			</Box>

			<ThreadMessagePayload />

			<Box
				sx={{
					display: { xs: "flex", md: "none" },
					px: { xs: 3, md: 6 },
					py: { xs: 2, md: 2 },
					backgroundColor: "#F8F9FA",
					borderBottomLeftRadius: "0.5rem",
					borderBottomRightRadius: "0.5rem",
					borderTop: "1px solid",
					borderTopColor: "divider"
				}}
			>
				<Typography variant="caption">
					Community content may not be verified or up-to-date. Learn more.
				</Typography>
			</Box>

		</Paper>
	)
}

export default PostContent