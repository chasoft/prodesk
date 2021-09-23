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
import { Container, Grid, Box, } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import HistoryTimeline from "./HistoryTimeline"
import PostContent from "./PostContent"
import Replies from "./Replies"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Post() {
	return (
		<div>
			<Container>
				<Grid container>
					<Grid item xs={12} sm={12} md={8} >
						<main>
							<PostContent />
							<div>{/* this is empty intentionally */}</div>
							<Replies />
						</main>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<Box sx={{ display: { xs: "none", md: "block" } }}>
							<HistoryTimeline />
						</Box>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default Post