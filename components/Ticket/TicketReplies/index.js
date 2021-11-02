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
import { getAuth } from "../../../redux/selectors"
import useUserSettings from "../../../helpers/useUserSettings"
import { USER_SETTINGS_NAME } from "../../../helpers/constants"
import { useGetTicketRepliesQuery } from "../../../redux/slices/firestoreApi"

//ASSETS
import ReplyIcon from "@mui/icons-material/Reply"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const ReplyButton = ({ ticket, tooltip = "", variant = "contained", disabled = false, sx }) => {
	return (
		<Box sx={{
			display: { xs: "none", sm: "flex" },
			justifyContent: "flex-end", mb: 4, ...sx
		}}>
			<ReplyDialog
				ticketId={ticket.tid}
				ticketStatus={ticket.status}
				ticketUsername={ticket.username}
			>
				<Tooltip arrow title={tooltip} placement="left">
					<Button disabled={disabled} variant={variant} startIcon={<ReplyIcon />} sx={{ px: 3 }}>
						Reply
					</Button>
				</Tooltip>
			</ReplyDialog>
		</Box>
	)
}
ReplyButton.propTypes = {
	ticket: PropTypes.object,
	tooltip: PropTypes.string,
	variant: PropTypes.string,
	disabled: PropTypes.bool,
	sx: PropTypes.object
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketReplies({ ticketId, ticketStatus, ticketUsername }) {

	const { currentUser } = useSelector(getAuth)
	const hasAdminPermissions = useUserSettings(currentUser.username, USER_SETTINGS_NAME.hasAdminPermissions)

	const { data: ticketReplies, isLoading: isLoadingReplies } = useGetTicketRepliesQuery({
		username: ticketUsername,
		tid: ticketId
	})

	const isAdmin = currentUser.username === "superadmin" || hasAdminPermissions

	if (isLoadingReplies) {
		return (
			<Box sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				p: 5
			}}>
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
						isAdmin={isAdmin}
						replyItem={replyItem}
						isFirst={idx === 0}
					/>
				)}
			</Box>

			<ReplyDialog
				ticketId={ticketId}
				ticketStatus={ticketStatus}
				ticketUsername={ticketUsername}
			>
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
TicketReplies.propTypes = {
	ticketId: PropTypes.string,
	ticketStatus: PropTypes.string,
	ticketUsername: PropTypes.string
}

export default TicketReplies