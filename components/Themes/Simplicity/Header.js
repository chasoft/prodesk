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

import React from "react"
import Link from "next/link"

//MATERIAL-UI
import { Box, IconButton } from "@mui/material"

//PROJECT IMPORT
import { Logo } from "@components/common"
import { TopMenu } from "@components/Themes/Simplicity/Blocks/TopMenu"

//ASSETS
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import { SignUpButton } from "@components/Themes/Simplicity/Buttons/SignUp"


/*****************************************************************
 * CUSTOM COMPONENTS                                             *
 *****************************************************************/


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const Header = () => {
	return (
		<Box component="header" sx={{
			position: "fixed",
			display: "flex",
			flexDirection: "column",
			width: "100%",
			zIndex: 9,
			backgroundColor: "white"
		}}>
			<Box id="announcement-bar" sx={{
				display: { xs: "none", md: "block" },
				backgroundColor: "primary.light",
				textAlign: "center",
				padding: "12px 50px",
				fontSize: "1.125rem",
				width: "100%",
			}}>
				hello world
			</Box>
			<Box id="header" sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				width: "100%",
				padding: { xs: "24px 24px", md: "24px 48px" }
			}}>
				<Box id="logo">
					<Logo />
				</Box>
				<Box id="nav-wrapper">
					<TopMenu />
				</Box>

				<Box id="header-signup-wrapper" sx={{
					display: "flex",
					alignItems: "center"
				}}>
					<Box id="search-wrapper header-search" sx={{ mr: 1 }}>
						<form>

						</form>
						<IconButton size="small">
							<SearchIcon />
						</IconButton>
					</Box>

					<Box
						id="icon-menu"
						component="span"
						sx={{
							display: { xs: "block", md: "none" },
							mr: 1
						}}
					>
						<IconButton>
							<MenuIcon />
						</IconButton>
					</Box>

					<Link
						id="header-signup"
						component="a"
						href="https://chasoft.net"
						sx={{
							display: { xs: "none", md: "block" },
						}}
						passHref
					>
						<SignUpButton>
							Sign up
						</SignUpButton>
					</Link>
				</Box>
			</Box>
		</Box>
	)
}