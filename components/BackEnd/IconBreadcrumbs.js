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

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React from "react"
import Link from "next/link"
import PropTypes from "prop-types"

//MATERIAL-UI
import { Box, Breadcrumbs, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function BreadcrumbsBox({ children }) {
	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-start",
			pl: { xs: 0, sm: 3 },
			pt: { xs: 3, sm: 4, md: 6, lg: 8 },
			pb: 2
		}}>
			{children}
		</Box>
	)
}
BreadcrumbsBox.propTypes = { children: PropTypes.node }

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function IconBreadcrumbs({ icon, title, items }) {
	return (
		<div role="presentation">
			<Breadcrumbs aria-label="breadcrumb">

				{
					items.map((item) => (
						<Link
							key={item.title}
							href={item.url}
							passHref
						>
							<a href="just-a-placeholder">
								<Box sx={{ display: "flex", alignItems: "center", cursor: "pointer", ":hover": { color: "primary.main" } }}>
									{item.icon}
									{item.title}
								</Box>
							</a>
						</Link>
					))
				}
				<Typography
					sx={{ display: "flex", alignItems: "center", fontWeight: 500 }}
					color="text.primary"
				>
					{icon}
					{title}
				</Typography>
			</Breadcrumbs>
		</div>
	)
}
IconBreadcrumbs.propTypes = {
	icon: PropTypes.node,
	title: PropTypes.node,
	items: PropTypes.array
}

export default IconBreadcrumbs