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
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Grid } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import NavLink from "./NavLink"
import { AuthTrue } from "../../AuthCheck"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const MainNav = ({ borderBottom = false }) => {
	return (
		<Grid
			container
			sx={{
				display: "flex",
				alignItems: "center",
				padding: "0 1rem",
				"a[aria-current]": {
					backgroundColor: "transparent",
				},
				...(borderBottom && {
					borderBottom: ".0625rem solid #dadce0",
				})
			}}
		>
			<Grid item>
				<NavLink href="/" passHref >
					<Box
						component="span"
						sx={{
							color: "#1a73e8",
							lineHeight: "3rem",
							fontSize: ".875rem",
							fontWeight: 500,
							borderBottom: "2px solid #1a73e8",
							padding: 2,
							px: 1,
							mr: 1,
						}}
					>
						<Box
							component="span"
							sx={{
								borderBottom: "2px solid #1a73e8",
								padding: (theme) => theme.spacing(2) - 2,
							}}
						>
							Help Center
						</Box>
					</Box>
				</NavLink>

				<AuthTrue>
					<NavLink href="/public-tickets" passHref>
						<span>Public Tickets</span>
					</NavLink>
				</AuthTrue>

				{/*
					//TODO: Community Feature would be implemented in version 2.0
					<NavLink href="/community" passHref>
						<span className={classes.link}>Community</span>
					</NavLink>
				*/}

				<NavLink href="/faqs" passHref>
					<Box
						component="span"
						sx={{
							color: "#5f6368",
							lineHeight: "3rem",
							fontSize: ".875rem",
							fontWeight: 500,
							padding: (theme) => theme.spacing(2) - 3,
							mr: 1,
							px: { xs: "1", md: (theme) => theme.spacing(2) - 3 }
						}}
					>
						Frequently Asked Questions
					</Box>
				</NavLink>
			</Grid>
			<Grid item>

			</Grid>
			<Grid item>


			</Grid>
		</Grid >
	)
}
MainNav.propTypes = { borderBottom: PropTypes.bool }

export default MainNav