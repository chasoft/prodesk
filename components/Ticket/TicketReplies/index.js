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
import { Box, Button, CircularProgress, Fab, Tooltip } from "@mui/material"

//THIRD-PARTY
import { size } from "lodash"
import { useSelector } from "react-redux"

//PROJECT IMPORT
import ReplyItem from "./Reply"
import ReplyDialog from "./ReplyDialog"
import { getUiSettings, getAuth } from "../../../redux/selectors"
import { useGetTicketRepliesQuery } from "../../../redux/slices/firestoreApi"

//ASSETS
import ReplyIcon from "@mui/icons-material/Reply"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const ReplyButton = ({ tooltip = "", variant = "contained", sx }) => {
	return (
		<Box sx={{
			display: { xs: "none", sm: "flex" },
			justifyContent: "flex-end", mb: 4, ...sx
		}}>
			<ReplyDialog>
				<Tooltip arrow title={tooltip} placement="left">
					<Button variant={variant} startIcon={<ReplyIcon />} sx={{ px: 3 }}>
						Reply
					</Button>
				</Tooltip>
			</ReplyDialog>
		</Box>
	)
}
ReplyButton.propTypes = {
	tooltip: PropTypes.string,
	variant: PropTypes.string,
	sx: PropTypes.object
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketReplies() {
	const { currentUser } = useSelector(getAuth)
	const { ticketId } = useSelector(getUiSettings)

	const { data: ticketReplies, isLoadingReplies } = useGetTicketRepliesQuery({
		username: currentUser.username,
		tid: ticketId
	})

	if (isLoadingReplies) {
		return (
			<Box sx={{ margin: { xs: "1.625rem 0 0", md: "2rem 0 0" } }}>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Box sx={{ margin: { xs: "1.625rem 0 0", md: "2rem 0 0" } }}>

			<Box sx={{
				border: "1px solid",
				borderRadius: "0.5rem",
				borderColor: "divider",
			}}>

				{!size(ticketReplies) &&
					<Box sx={{ p: 4 }}>There is no replies!</Box>}

				{ticketReplies?.map((replyItem, idx) =>
					<ReplyItem
						key={replyItem.trid}
						replyItem={replyItem}
						isFirst={idx === 0}
					/>
				)}
			</Box>

			<ReplyDialog>
				<Fab
					color="primary" sx={{
						display: { xs: "initial", sm: "none" },
						position: "fixed",
						bottom: { xs: 32, md: 64 },
						right: { xs: 32, md: 128, lg: 152 }
					}}>
					<ReplyIcon />
				</Fab>
			</ReplyDialog>
		</Box >
	)
}

export default TicketReplies