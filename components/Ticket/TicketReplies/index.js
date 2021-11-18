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

import React, { useState } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, Button, Fab, Skeleton, Tooltip } from "@mui/material"

//THIRD-PARTY
import { useSelector } from "react-redux"

//PROJECT IMPORT
import ReplyItem from "./Reply"
import ReplyDialog from "./ReplyDialog"
import { getAuth } from "../../../redux/selectors"
import useUserSettings from "../../../helpers/useUserSettings"
import { SETTINGS_NAME } from "../../../helpers/constants"
import { useGetTicketRepliesQuery } from "../../../redux/slices/firestoreApi"

//ASSETS
import ReplyIcon from "@mui/icons-material/Reply"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const ReplyButton = ({ ticket, tooltip = "", variant = "contained", disabled = false, sx }) => {
	const [open, setOpen] = useState(false)
	return (
		<Box sx={{
			display: { xs: "none", sm: "flex" },
			justifyContent: "flex-end", mb: 4, ...sx
		}}>
			<Tooltip arrow title={tooltip} placement="left">
				<Button
					disabled={disabled}
					variant={variant}
					startIcon={<ReplyIcon />}
					sx={{ px: 3 }}
					onClick={() => setOpen(true)}
				>
					Reply
				</Button>
			</Tooltip>

			<ReplyDialog
				tid={ticket.tid}
				status={ticket.status}
				username={ticket.username}
				staffInCharge={ticket.staffInCharge}
				slug={ticket.slug}
				subject={ticket.subject}
				department={ticket.department}
				open={open}
				setOpen={setOpen}
			/>
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

const RepliesContainer = ({ tid, status, username, staffInCharge, slug, subject, department, children }) => {
	const [open, setOpen] = useState(false)
	return (
		<Box sx={{ margin: { xs: "1.625rem 0 0", md: "2rem 0 0" } }}>

			<Box sx={{
				border: "1px solid",
				borderRadius: "0.5rem",
				borderColor: "divider",
			}}>
				{children}
			</Box>

			<Fab
				color="primary"
				sx={{
					display: { xs: "initial", sm: "none" },
					position: "fixed",
					bottom: { xs: 32, md: 64 },
					right: { xs: 32, md: 128, lg: 152 }
				}}
				onClick={() => { setOpen(true) }}
			>
				<ReplyIcon />
			</Fab>

			<ReplyDialog
				open={open}
				setOpen={setOpen}
				tid={tid}
				status={status}
				username={username}
				staffInCharge={staffInCharge}
				slug={slug}
				department={department}
				subject={subject}
			/>

		</Box >
	)
}
RepliesContainer.propTypes = {
	tid: PropTypes.string,
	status: PropTypes.string,
	username: PropTypes.string,
	staffInCharge: PropTypes.array,
	slug: PropTypes.string,
	subject: PropTypes.string,
	department: PropTypes.string,
	children: PropTypes.node
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketReplies({ tid, status, username, staffInCharge, replyCount, slug, subject, department }) {

	const { currentUser } = useSelector(getAuth)
	const hasAdminPermissions = useUserSettings(currentUser.username, SETTINGS_NAME.hasAdminPermissions)

	const { data: ticketReplies, isLoading: isLoadingReplies } = useGetTicketRepliesQuery({
		username: username,
		tid: tid
	})

	//TODO: reply this line with Permission system
	const isAdmin = currentUser.username === "superadmin" || hasAdminPermissions

	//We already know the number of replies based on replyCount,
	//then, show the result immediately when replyCount === 0
	if (replyCount == 0) {
		return (
			<RepliesContainer
				tid={tid}
				status={status}
				username={username}
				staffInCharge={staffInCharge}
				slug={slug}
				subject={subject}
				department={department}
			>
				<Box sx={{ p: 4 }}>There is no replies!</Box>
			</RepliesContainer>
		)
	}

	//Skeleton when waiting for replies' content
	if (isLoadingReplies) {
		return (
			<RepliesContainer
				tid={tid}
				status={status}
				username={username}
				staffInCharge={staffInCharge}
				slug={slug}
				subject={subject}
				department={department}
			>
				<Box sx={{
					display: "flex",
					px: 3, py: { xs: 3, md: 4 },
					flexDirection: { xs: "column", sm: "row" }
				}}>
					<Box sx={{
						display: "flex",
						alignItems: "center",
						flexDirection: { xs: "row", sm: "column" },
						justifyContent: { xs: "space-between", sm: "flex-start" },
						minWidth: { xs: "initial", sm: "80px" },
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}>
						<Skeleton animation="wave" variant="circular" width={40} height={40} />

						<Skeleton
							animation="wave"
							height={15}
							width="80%"
							sx={{
								mx: { xs: 2, sm: 0 },
								mt: { xs: 0, sm: 2 },
								flexGrow: { xs: 1, sm: 0 }
							}}
						/>

						<Skeleton
							sx={{
								display: { xs: "flex", sm: "none" },
								flexDirection: { xs: "column", sm: "row" },
								alignItems: "flex-end",
							}}
						/>
					</Box>

					<Box sx={{
						flexGrow: 1,
						pr: { xs: 1, sm: 0 }
					}}>
						<Skeleton
							sx={{
								display: { xs: "none", sm: "flex" },
								ml: { xs: 0, sm: 3 },
							}}
						/>

						<Box sx={{
							display: "flex",
							flexDirection: "column",
							my: { xs: 2, sm: 0 },
							ml: { xs: 0, sm: 3 },
						}}>

							<Skeleton sx={{ height: 90 }} animation="wave" variant="rectangular" />

						</Box>
					</Box>

				</Box >
			</RepliesContainer >
		)
	}

	//Replies
	return (
		<RepliesContainer
			tid={tid}
			status={status}
			username={username}
			staffInCharge={staffInCharge}
			slug={slug}
			subject={subject}
			department={department}
		>
			{ticketReplies?.map((replyItem, idx) =>
				<ReplyItem
					key={replyItem.trid}
					isAdmin={isAdmin}
					replyItem={replyItem}
					ticketUsername={username}
					ticketStatus={status}
					isFirst={idx === 0}
				/>
			)}
		</RepliesContainer>
	)
}
TicketReplies.propTypes = {
	tid: PropTypes.string,
	status: PropTypes.string,
	username: PropTypes.string,
	staffInCharge: PropTypes.array,
	replyCount: PropTypes.number,
	slug: PropTypes.string,
	subject: PropTypes.string,
	department: PropTypes.string
}

export default TicketReplies