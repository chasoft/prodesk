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

import Link from "next/link"
import React, { useEffect, useState } from "react"

// MATERIAL-UI
import { alpha } from "@mui/material/styles"
import { AppBar, Box, Button, InputBase, IconButton, Toolbar, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { Logo } from ".."
import { AuthFalse, AuthTrue } from "../../AuthCheck"
import UserIcon from "../backend/UserIcon"

//ASSETS
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import MoreIcon from "@mui/icons-material/MoreVert"
import AppsIcon from "@mui/icons-material/Apps"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Header() {
	const [scrolled, setScrolled] = useState(false)

	const animateHeader = () => {
		setScrolled(window.scrollY > 50 ? true : false)
	}

	useEffect(() => {
		window.addEventListener("scroll", animateHeader)
		return () => window.removeEventListener("scroll", animateHeader)
	}, [])

	return (
		<AppBar position="sticky" color="inherit" elevation={scrolled ? 4 : 0}>
			<Toolbar>

				<IconButton
					edge="start"
					color="inherit"
					aria-label="open drawer"
					size="large"
					sx={{
						mr: 2,
						display: { xs: "block", sm: "none" }
					}}
				>
					<MenuIcon />
				</IconButton>

				<Box sx={{ display: { xs: "none", md: "block" } }}>
					<Logo />
				</Box>

				<Typography
					noWrap
					sx={{
						fontWeight: 400,
						fontSize: "1.25rem"
					}}
				>
					Your Elegant &amp; Powerful Ticket System
				</Typography>

				<Box
					sx={{
						position: "relative",
						borderRadius: (theme) => theme.shape.borderRadius,
						backgroundColor: (theme) => alpha(theme.palette.common.white, 0.15),
						"&:hover": {
							backgroundColor: (theme) => alpha(theme.palette.common.white, 0.25),
						},
						mr: 2,
						ml: { xs: 0, sm: 3 },
						width: { xs: "100%", sm: "auto" },
					}}
				>
					<Box
						sx={{
							padding: (theme) => theme.spacing(0, 2),
							height: "100%",
							position: "absolute",
							pointerEvents: "none",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<SearchIcon />
					</Box>
					<InputBase
						placeholder="Search…"
						sx={{
							padding: 1,
							paddingLeft: "3rem",
							transition: (theme) => theme.transitions.create("width"),
							width: { xs: "100%", md: "20ch" },
						}}
						inputProps={{ "aria-label": "search" }}
					/>
				</Box>

				<Box sx={{ flexGrow: 1 }} />

				<Box
					sx={{
						display: { xs: "none", md: "flex" },
						alignItems: "center",
					}}
				>
					<IconButton aria-label="show 17 new notifications" color="inherit" size="large">
						<AppsIcon />
					</IconButton>

					<AuthFalse>
						<Link href="/login">
							<Button variant="contained" color="primary">
								Sign in
							</Button>
						</Link>
					</AuthFalse>

					<AuthTrue>
						<UserIcon />
					</AuthTrue>

				</Box>

				<Box sx={{ display: { xs: "flex", md: "none" } }}>
					<IconButton
						aria-label="show more"
						// aria-controls={mobileMenuId}
						aria-haspopup="true"
						// onClick={handleMobileMenuOpen}
						color="inherit"
						size="large">
						<MoreIcon />
					</IconButton>
				</Box>

			</Toolbar>
		</AppBar>
	)
}

export default Header