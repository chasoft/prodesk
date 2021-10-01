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
import { PropTypes } from "prop-types"

// MATERIAL-UI
import { Box, Paper, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CategoryGroupItem = ({ header, viewAllText, viewAllLink, children }) => {
	return (
		<Paper elevation={1}>

			<Typography noWrap
				sx={{
					py: 2, px: 3,
					fontFamily: "\"Google Sans\", Roboto, sans-serif",
					fontSize: "1rem",
					fontWeight: 500,
					lineHeight: "1.25rem"
				}}
			>{header}</Typography>

			{children}

			<Box
				sx={{
					py: 2, px: 3,
					display: "flex",
					alignItems: "center",
					borderTop: "1px solid",
					borderColor: "divider",
					"& > :first-child": { mr: 1 },
					"& > *": { color: "primary.main" },
				}}
			>
				<Link href={viewAllLink} passHref>
					<Box component="a"
						sx={{
							display: "flex",
							alignItems: "center",
							cursor: "pointer",
							"&:hover": { textDecoration: "underline" }
						}}
					>
						<Typography>{viewAllText}</Typography>
						<ArrowForwardIcon fontSize="small" />
					</Box>
				</Link>
			</Box>
		</Paper>
	)
}
CategoryGroupItem.propTypes = {
	header: PropTypes.string,
	viewAllText: PropTypes.string,
	viewAllLink: PropTypes.string,
	children: PropTypes.node
}

export default CategoryGroupItem