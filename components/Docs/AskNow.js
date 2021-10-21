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
import { Box, Button, Paper, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { setRedirect } from "./../../redux/slices/redirect"

//ASSETS
import ForumIcon from "@mui/icons-material/Forum"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const AskNow = () => {
	const dispatch = useDispatch()
	return (
		<Box sx={{ my: { xs: 2, md: 4 } }}>
			<Paper elevation={2}
				sx={{
					display: "flex",
					alignItems: "center",
					"& > *:not(:last-child)": { mr: 4 },
					px: { xs: 4, md: 4 },
					py: { xs: 2, md: 3 }
				}}
			>

				<ForumIcon color="primary" />

				<Box
					sx={{
						display: "flex",
						flexGrow: 1,
						alignItems: { xs: "flex-start", md: "center" },
						flexDirection: { xs: "column", md: "row" },
						"& > *": { mr: 2 },
					}}
				>

					<Typography>
						<span style={{ fontWeight: 500 }}>Need help?</span> Open a ticket and we will help you.
					</Typography>

					<Button
						size="small"
						color="primary"
						endIcon={<ArrowForwardIcon />}
						sx={{ whiteSpace: "nowrap", px: 2, ml: { xs: -2, sm: 0 } }}
						onClick={() => dispatch(setRedirect("/client/tickets/new-ticket"))}
					>
						Ask now
					</Button>

				</Box>
			</Paper>
		</Box >
	)
}

export default AskNow