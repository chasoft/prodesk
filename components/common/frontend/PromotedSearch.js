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

// MATERIAL-UI
import { Box, InputBase, Paper, Typography, Avatar } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import SearchIcon from "@mui/icons-material/Search"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function PromotedSearch() {
	return (
		<Box
			sx={{
				backgroundPosition: "50%",
				height: { xs: "auto", md: "19.0625rem" },
				marginTop: "1.5rem",
				backgroundImage: { xs: "", sm: "url('/img/homepage_header_background_v2.svg')" },
				backgroundRepeat: { xs: "", sm: "no-repeat" }
			}}
		>
			<Typography variant="h4" align="center"
				sx={{
					fontSize: "2rem",
					lineHeight: "2.5rem",
					marginBottom: "1.625rem",
					mx: { xs: 1, md: "" }
				}}
			>
				<Box
					sx={{
						background: "#ffffff",
						// borderRadius: "1.75rem",
						boxShadow: "0 1px 2px 0 rgb(60 64 67 / 30 %), 0 1px 3px 1px rgb(60 64 67 / 15 %)",
						boxSizing: "border-box",
						display: "flex",
						alignItems: "center",
						height: "3.5rem",
						margin: "0 auto 1.125rem auto",
						padding: ".5rem",
						width: "3.5rem"
					}}
				>
					<Avatar alt="Remy Sharp" src="/default-avatar/1.png" />
				</Box>
				<div>How can we help you?</div>
			</Typography>

			<Paper
				component="form"
				sx={{
					display: "flex",
					alignItems: "center",
					borderRadius: "0.5rem",
					margin: "0 auto",
					maxWidth: "32.5rem",
					padding: (theme) => theme.spacing(1, 3, 1, 4),
					mx: { xs: 2, md: "auto" }
				}}
			>
				<SearchIcon />
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="Describe your issue"
					inputProps={{ "aria-label": "search documentation" }}
				/>
			</Paper>
		</Box >

	)
}

export default PromotedSearch