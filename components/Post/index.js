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

// MATERIAL-UI
import { Grid, Box, } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import HistoryTimeline from "./HistoryTimeline"
import PostContent from "./PostContent"
import Replies from "./Replies"
import PostMeta from "./PostMeta"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Post() {
	return (
		<>
			<Grid container>
				<Grid item xs={12} sm={12} md={8} >
					<main>
						<PostContent />
						<Replies />
					</main>
				</Grid>
				<Grid item xs={12} sm={12} md={4} sx={{ alignItems: "stretch" /* for sticky working */ }}>
					<Box sx={{
						display: { xs: "none", md: "block" },
						height: "100%" /* for sticky working */
					}}>
						<PostMeta />
						<Box sx={{ position: "sticky", top: "100px", mt: "4rem" }}>
							<HistoryTimeline />
						</Box>
					</Box>
				</Grid>
			</Grid>

		</>
	)
}

export default Post