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

import React from "react"
import Link from "next/link"

//MATERIAL-UI
import { Box, Button, IconButton } from "@mui/material"

//THIRD-PARTY
import { useKBar } from "kbar"

//PROJECT IMPORT
import { AuthFalse, AuthTrue } from "@components/AuthCheck"
import { LoginButton } from "@components/Themes/Simplicity/Buttons/Login"
import { Logo } from "@components/common"
import { TopMenu } from "@components/Themes/Simplicity/Blocks/TopMenu"
import UserIcon from "@components/BackEnd/UserIcon"

//ASSETS
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"

/*****************************************************************
 * CUSTOM COMPONENTS                                             *
 *****************************************************************/


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function Header() {
	const { query } = useKBar()
	return (
		<Box
			id="pageHeader"
			component="header"
			sx={{
				position: "fixed",
				display: "flex",
				flexDirection: "column",
				width: "100%",
				zIndex: 9,
				backgroundColor: "white"
			}}
		>

			<Box id="header" sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				width: "100%",
				padding: { xs: "24px 24px", sm: "24px 48px" }
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
					<Box
						id="search-wrapper header-search"
						onClick={query.toggle}
					>
						<Box sx={{
							display: { xs: "block", mdd: "none" }
						}}>
							<IconButton id="searchIcon">
								<SearchIcon />
							</IconButton>
						</Box>
						<Button id="searchButton" startIcon={<SearchIcon />} sx={{
							display: { xs: "none", mdd: "flex" },
							mr: 2
						}}>
							Ctrl+K
						</Button>
					</Box>

					<Box
						id="icon-menu"
						component="span"
						sx={{
							display: { xs: "block", mdd: "none" },
							mr: { xs: 0, xss: 1 }
						}}
					>
						<IconButton>
							<Box component={MenuIcon} />
						</IconButton>
					</Box>

					<AuthFalse>
						<Link
							id="header-signup"
							component="a"
							href="/login"
							sx={{
								display: { xs: "none", mdd: "block" },
							}}
							passHref
						>
							<LoginButton>
								Login
							</LoginButton>
						</Link>
					</AuthFalse>

					<AuthTrue>
						<UserIcon />
					</AuthTrue>
				</Box>
			</Box>
		</Box>
	)
}