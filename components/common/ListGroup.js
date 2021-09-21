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
import Link from "next/link"
import PropTypes from "prop-types"

// MATERIAL-UI
import { styled } from "@mui/material/styles"
import { Box, Paper, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const RootStyle = styled(Box)({
	marginTop: { xs: 3, md: 8 },
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
})

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const ListGroup = ({ title, viewAllText, viewAllLink, children }) => {
	return (
		<RootStyle>
			<div style={{ width: "100%" }}>

				<Typography variant="h2">{title}</Typography>

				{viewAllLink ?
					<Link
						href={viewAllLink}
						sx={{
							display: "flex",
							alignItems: "center",
							color: "primary.main",
							cursor: "pointer",
							"&:hover": {
								textDecoration: "underline"
							}
						}}
					>
						<a>
							<Typography variant="button">{viewAllText}</Typography>
						</a>
					</Link> : null}

				<Paper
					elevation={2}
					sx={{ margin: { xs: "1.625rem 0 0", md: "1.5rem 0 0" } }}
				>
					{children}
				</Paper>

			</div>
		</RootStyle >
	)
}
ListGroup.propTypes = {
	title: PropTypes.string,
	viewAllText: PropTypes.string,
	viewAllLink: PropTypes.string,
	children: PropTypes.node,
}

export default ListGroup