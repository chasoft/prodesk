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
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Button, Fab } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import Reply from "./Reply"
import ReplyDialog from "./ReplyDialog"

//ASSETS
import ReplyIcon from "@mui/icons-material/Reply"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const ReplyButton = ({ sx }) => {
	return (
		<Box sx={{
			display: { xs: "none", xl: "flex" },
			justifyContent: "flex-start", mb: 4, ...sx
		}}>
			<ReplyDialog>
				<Button variant="outlined" startIcon={<ReplyIcon />} sx={{ px: 3 }}			>
					Reply
				</Button>
			</ReplyDialog>
		</Box>
	)
}
ReplyButton.propTypes = { sx: PropTypes.object }

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Replies() {
	return (
		<Box sx={{ margin: { xs: "1.625rem 0 0", md: "2rem 0 0" } }}>

			<ReplyButton />

			<Box sx={{
				border: "1px solid",
				borderRadius: "0.5rem",
				borderColor: "divider",
			}}>
				{[1, 2, 3, 4].map((item, idx) => {
					return <Reply key={item} isFirst={idx === 0} />
				})}
			</Box>

			<ReplyDialog>
				<Fab
					color="primary" sx={{
						display: { xs: "initial", xl: "none" },
						position: "fixed",
						bottom: { xs: 32, md: 64 },
						right: { xs: 32, md: 128, lg: 152 }
					}}>
					<ReplyIcon />
				</Fab>
			</ReplyDialog>

			<ReplyButton sx={{ mt: 3 }} />

		</Box >
	)
}

export default Replies