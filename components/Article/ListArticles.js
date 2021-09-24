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

import React, { useEffect, useRef, useState } from "react"

// MATERIAL-UI
import { Box, Typography } from "@mui/material"
import { SvgItemIcon } from "../common/SvgIcons"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ListArticles() {
	const [fixed, setFixed] = useState(false)
	const listRef = useRef(null)

	const fixedPosition = () => {
		setFixed(
			((listRef.current.clientHeight + 110) < window.innerHeight)
				? (window.scrollY > 50) ? true : false
				: false
		)
	}

	/* Activate resize listener */
	useEffect(() => {
		fixedPosition()
		window.addEventListener("resize", fixedPosition)
		return () => window.removeEventListener("resize", fixedPosition)
	}, [])

	/* Activate resize listener */
	useEffect(() => {
		window.addEventListener("scroll", fixedPosition)
		return () => window.removeEventListener("scroll", fixedPosition)
	}, [])

	return (
		<Box ref={listRef}
			sx={{
				margin: "3rem 0 0",
				position: fixed ? "sticky" : "static",
				top: fixed ? "110px" : "initial"
			}}
		>
			<Box component="nav"
				sx={{
					display: "flex",
					flexDirection: "column",
					marginLeft: { xs: "1.125rem", md: "3.125rem" },
				}}
			>

				<Typography variant="h2">Google services &amp; your child {JSON.stringify(fixed)}</Typography>
				<Box component="ul"
					sx={{
						display: "flex",
						flexDirection: "column",
						listStyle: "none",
						paddingLeft: 0,
						"& > li": {
							display: "flex",
							flexDirection: "row",
							"& > svg": {
								marginTop: ".6rem",
								height: "1.25rem",
								width: "1.25rem",
								minWidth: "1.25rem",
								fill: (theme) => theme.palette.primary.main
							},
							"& > :last-child": {
								padding: ".625rem 0 .625rem .875rem"
							}
						}
					}}
				>
					<li>
						<SvgItemIcon />
						<Typography>Chrome &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<SvgItemIcon />
						<Typography>Maps &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<SvgItemIcon />
						<Typography>Google Photos &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<SvgItemIcon />
						<Typography>Google Photos &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<SvgItemIcon />
						<Typography>Google Photos &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<SvgItemIcon />
						<Typography>Google Photos &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<SvgItemIcon />
						<Typography>Google Photos &amp; your child&apos;s Google Account</Typography>
					</li>
				</Box>
			</Box>
		</Box>
	)
}

export default ListArticles