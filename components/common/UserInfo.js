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
import { Avatar, Box, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const UserInfo = () => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center"
			}}
		>

			<Box sx={{ mr: 1 }}>
				<Avatar alt="Remy Sharp" src="/avatar/default.png" />
			</Box>

			<Box
				sx={{
					flexDirection: "column",
					display: { xs: "none", xl: "flex" }
				}}
			>
				<Typography style={{ whiteSpace: "nowrap" }} variant="caption">Camille V.</Typography>
				<Typography style={{ whiteSpace: "nowrap" }} variant="caption">Techical Supporter</Typography>
			</Box>

		</Box>
	)
}

export default UserInfo