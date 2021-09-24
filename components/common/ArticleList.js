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
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, ButtonBase, Link, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import { SvgItemIcon } from "./SvgIcons"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const ArticlesList = ({ header, viewAllText, viewAllLink, dataSource }) => {
	return (
		<div>

			<Typography noWrap
				sx={{
					fontFamily: "\"Google Sans\", Roboto, sans-serif",
					fontSize: "1rem",
					fontWeight: 500,
					lineHeight: "1.25rem"
				}}
			>
				{header}
			</Typography>

			<Box
				component="ul"
				sx={{
					padding: 0,
					cursor: "pointer",
					listStyle: "none",
					color: "primary.main",
					"& > a": { textDecoration: "none" },
					"& > a > li": {
						display: "flex", mx: -1, px: 2, py: 0.5,
						flexDirection: "row",
						"&:hover": {
							backgroundColor: "#E8F0FE"
						},
						"& > svg": {
							marginTop: ".5rem",
							height: "1.25rem",
							width: "1.25rem",
							minWidth: "1.25rem",
							fill: (theme) => theme.palette.primary.main
						},
						"& > button": { padding: ".625rem 0 .625rem .875rem" }
					}
				}}
			>
				{dataSource.map((item) => (
					<Link href={item.url} key={item.id}>
						<li>
							<SvgItemIcon />
							<ButtonBase sx={{ textAlign: "left" }}>
								{item.subject}
							</ButtonBase>
						</li>
					</Link>
				))}

				<Link href={viewAllLink}>
					<li>
						<ArrowForwardIcon />
						<ButtonBase sx={{ fontWeight: "bold" }}>
							{viewAllText}
						</ButtonBase>
					</li>
				</Link>

			</Box>

		</div>
	)
}
ArticlesList.propTypes = {
	header: PropTypes.string,
	viewAllText: PropTypes.string,
	viewAllLink: PropTypes.string,
	dataSource: PropTypes.array
}

export default ArticlesList
