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
				backgroundPosition: { sm: "50% 100%", md: "50%" },
				height: { sm: "16.5rem", md: "19rem" },
				minHeight: { xs: "14rem" },
				marginTop: "1.5rem",
				backgroundImage: { xs: "", sm: "url('/img/homepage_header_background_v2.svg')" },
				backgroundRepeat: { xs: "", sm: "no-repeat" }
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center"
				}}
			>
				<Box
					sx={{
						display: "flex",
						background: "#ffffff",
						boxShadow: "0 1px 2px 0 rgb(60 64 67 / 30 %), 0 1px 3px 1px rgb(60 64 67 / 15 %)",
						boxSizing: "border-box",
						alignItems: "center",
						height: "3.5rem", width: "3.5rem",
						margin: "0 auto 1.125rem auto",
						padding: "0.5rem",
					}}
				>
					<Avatar alt="Remy Sharp" src="/default-avatar/1.png" />
				</Box>
				<Typography variant="h4"
					sx={{
						width: "100%",
						textAlign: "center",
						fontSize: "2rem",
						fontWeight: 400,
						lineHeight: "2.5rem",
						marginBottom: "1.625rem",
						mx: { xs: 1, md: "" },
						color: "primary.main"
					}}
				>
					How can we help you?
				</Typography>
			</Box>

			<Box component="form" sx={{ mx: 2, mb: 5 }}>
				<Paper
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: "0.5rem",
						margin: "0 auto",
						maxWidth: "32.5rem",
						padding: (theme) => theme.spacing(1, 3, 1, 4),
						mx: "auto",
					}}
				>
					<SearchIcon />
					<InputBase
						sx={{ ml: 1, flexGrow: 1 }}
						placeholder="Describe your issue"
						inputProps={{ "aria-label": "search documentation" }}
					/>
				</Paper>
			</Box>
		</Box >

	)
}

export default PromotedSearch