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

// MATERIAL-UI
import { Box, Typography } from "@mui/material"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function FooterNotice() {
	return (
		<Box
			sx={{
				padding: {
					xs: (theme) => theme.spacing(1, 3),
					md: (theme) => theme.spacing(2, 8)
				},
				backgroundColor: "#F8F9FA",
				borderBottomLeftRadius: "0.5rem",
				borderBottomRightRadius: "0.5rem",
				borderTop: "1px solid",
				borderTopColor: "divider"
			}}
		>
			<Typography variant="caption">
				Community content may not be verified or up-to-date. Learn more.
			</Typography>
		</Box>
	)
}

export default FooterNotice