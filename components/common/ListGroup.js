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

import React from "react"
import Link from "next/link"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Paper, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const ListGroup = ({ title, viewAllText, viewAllLink, children }) => {
	return (
		<Box
			sx={{
				mt: { xs: 5, md: 8 },
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<div style={{ width: "100%" }}>

				<Typography variant="h2">{title}</Typography>

				{viewAllLink &&
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
						passHref
					>
						<a href="just-a-placeholder">
							<Typography variant="button">{viewAllText}</Typography>
						</a>
					</Link>}

				<Paper
					elevation={0}
					sx={{
						margin: { xs: "1.625rem 0 0", md: "1.5rem 0 0" },
						border: 1,
						borderColor: "divider",
						borderRadius: "8px"
					}}
				>
					{children}
				</Paper>

			</div>
		</Box >
	)
}
ListGroup.propTypes = {
	title: PropTypes.string,
	viewAllText: PropTypes.string,
	viewAllLink: PropTypes.string,
	children: PropTypes.node,
}

export default ListGroup