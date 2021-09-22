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
import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"

// MATERIAL-UI
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { Logo } from "../../common"
import { AuthFalse, AuthTrue } from "../../AuthCheck"
import UserIcon from "../../BackEnd/UserIcon"
import LeftIcon from "./LeftIcon"
import SearchBox from "./SearchBox"
import PortfolioLinks from "./PortfolioLinks"

//ASSETS
import { MORE_BTN } from "./DUMMY_DATA"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Header({ showLogo = false, showSlogan = true, title, slogan, separator = " - ", showPortfolio = true }) {
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

				<LeftIcon />

				<Box sx={{ display: "flex", alignItems: "center", flexGrow: 2, justifyContent: { xs: showLogo ? null : "center", sm: "left" } }}>

					{showLogo &&
						<Box sx={{ mt: "4px", mr: 1 }}>
							<Logo />
						</Box>}


					<Typography sx={{ fontWeight: 400, fontSize: "1.25rem" }} noWrap>

						{showLogo ? null : title}

						{showSlogan &&
							<Box component="span" sx={{ display: { xs: "none", md: slogan ? "initial" : "none" } }}>
								{showLogo ? null : separator}
								{slogan ?? ""}
							</Box>}

					</Typography>

				</Box>

				<SearchBox />

				<Box sx={{ alignItems: "center" }} >

					{showPortfolio && <PortfolioLinks moreBtn={MORE_BTN} />}

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

			</Toolbar>
		</AppBar >
	)
}
Header.propTypes = {
	showLogo: PropTypes.bool,
	showSlogan: PropTypes.bool,
	showPortfolio: PropTypes.bool,
	title: PropTypes.string,
	slogan: PropTypes.string,
	separator: PropTypes.string
}

export default Header