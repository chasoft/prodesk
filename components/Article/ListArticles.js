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

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const ItemIcon = (props) => {
	return <svg {...props} viewBox="0 0 24 24">
		<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path><path d="M0 0h24v24H0z" fill="none"></path>
	</svg>
}

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
						<ItemIcon />
						<Typography>Chrome &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<ItemIcon />
						<Typography>Maps &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<ItemIcon />
						<Typography>Google Photos &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<ItemIcon />
						<Typography>Google Photos &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<ItemIcon />
						<Typography>Google Photos &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<ItemIcon />
						<Typography>Google Photos &amp; your child&apos;s Google Account</Typography>
					</li>
					<li>
						<ItemIcon />
						<Typography>Google Photos &amp; your child&apos;s Google Account</Typography>
					</li>
				</Box>
			</Box>
		</Box>
	)
}

export default ListArticles