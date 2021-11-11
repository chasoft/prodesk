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
import { Avatar, Box, IconButton, MenuItem, Paper, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import TextEditor from "../common/TextEditor"
import { getAuth } from "../../redux/selectors"
import { TicketCategory, TicketDepartment, TicketLabels, TicketPriority, TicketReplyCount, TicketStatus } from "./AdminTicketListItem"
import useMenuContainer from "../common/useMenuContainer"
import { setRedirect } from "../../redux/slices/redirect"
import ReplyDialog from "../Ticket/TicketReplies/ReplyDialog"
import { DATE_FORMAT, REDIRECT_URL, STATUS_FILTER } from "../../helpers/constants"
import { useUpdateTicketMutation } from "../../redux/slices/firestoreApi"

//ASSETS
import CloseIcon from "@mui/icons-material/Close"
import ReplyIcon from "@mui/icons-material/Reply"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import useGetProfileByUsername from "../../helpers/useGetProfileByUsername"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const MenuItemStyled = ({ ItemIcon, children, ...otherProps }) => {
	return (
		<MenuItem {...otherProps}>
			{<ItemIcon fontSize="small" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />}
			<Typography style={{ marginLeft: "0.5rem", marginRight: "3rem" }}>
				{children}
			</Typography>
		</MenuItem>
	)
}
MenuItemStyled.propTypes = {
	ItemIcon: PropTypes.object,
	children: PropTypes.node
}

const PopupMenu = ({ ticket }) => {
	const [showReplyDialog, setShowReplyDialog] = useState(false)
	const [MenuContainer, open, anchorRef, { handleToggle, handleClose, handleListKeyDown }] = useMenuContainer()

	const dispatch = useDispatch()
	const [updateTicket] = useUpdateTicketMutation()
	const { currentUser } = useSelector(getAuth)
	const { enqueueSnackbar } = useSnackbar()

	const handleCloseTicket = async () => {
		enqueueSnackbar("Ticket closed successfully", { variant: "success" })
		await updateTicket([{
			username: currentUser.username,
			tid: ticket.tid,
			status: STATUS_FILTER.CLOSED
		}])
		dispatch(setRedirect(REDIRECT_URL.CLIENT.TICKETS))
	}

	return (
		<>
			<IconButton
				size="large"
				ref={anchorRef}
				id="composition-button"
				aria-controls={open ? "composition-menu" : undefined}
				aria-expanded={open ? "true" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				<MoreVertIcon />
			</IconButton>

			<MenuContainer
				open={open}
				anchorRef={anchorRef}
				handleClose={handleClose}
				handleListKeyDown={handleListKeyDown}
				placement="bottom-end"
				transformOrigin="right top"
			>
				<MenuItem
					disabled={(ticket.username !== currentUser.username) && (ticket.status === STATUS_FILTER.CLOSED)}
					onClick={() => { setShowReplyDialog(true) }}
				>
					{<ReplyIcon fontSize="small" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />}
					<Typography style={{ marginLeft: "0.5rem", marginRight: "3rem" }}>
						Reply
					</Typography>
				</MenuItem>
				<MenuItem
					disabled={ticket.status === STATUS_FILTER.CLOSED}
					onClick={handleCloseTicket}
				>
					{<CloseIcon fontSize="small" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />}
					<Typography style={{ marginLeft: "0.5rem", marginRight: "3rem" }}>
						Close
					</Typography>
				</MenuItem>
			</MenuContainer>

			<ReplyDialog
				tid={ticket.tid}
				status={ticket.status}
				username={ticket.username}
				staffInCharge={ticket.staffInCharge}
				open={showReplyDialog}
				setOpen={setShowReplyDialog}
			/>
		</>
	)
}

PopupMenu.propTypes = {
	ticket: PropTypes.object
}

const TicketCreatedAt = ({ createdAt, dateTimeFormat, sx }) => {
	return (
		<Box sx={{
			display: "flex",
			flexDirection: { xs: "row", sm: "column", md: "row" },
			alignItems: { xs: "center", sm: "flex-end", md: "center" },
			justifyContent: "flex-end",
			flexWrap: "wrap",
			...sx
		}}>
			<Typography noWrap sx={{
				display: "flex",
				alignItems: "center"
			}}>
				&nbsp;<AccessTimeIcon sx={{ fontSize: 18 }} />&nbsp;
				{dayjs(createdAt).format(dateTimeFormat ?? DATE_FORMAT.LONG)}
			</Typography>
			<Typography noWrap sx={{ fontStyle: "italic", mr: 1 }} color="textSecondary">
				&nbsp;({dayjs(createdAt).fromNow()})
			</Typography>
		</Box>
	)
}
TicketCreatedAt.propTypes = {
	createdAt: PropTypes.any,
	prefixText: PropTypes.string,
	dateTimeFormat: PropTypes.string,
	sx: PropTypes.object
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketContent({ ticket }) {
	const profile = useGetProfileByUsername(ticket.username)
	dayjs.extend(relativeTime)
	return (
		<Paper component="main" sx={{
			borderRadius: "0.5rem",
			mt: 2,
		}}>

			<Box sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				top: "28px",
				pl: { xs: 3, md: 6 },
				pt: { xs: 4, md: 4 },
				pr: { xs: 2, md: 3 }
			}}>

				<Box sx={{
					display: "flex",
					alignItems: "center",
				}}>
					<Avatar
						alt={profile?.displayName}
						src={profile?.photoURL ?? "/avatar/1.png"}
						sx={{
							marginLeft: "auto",
							marginRight: "auto"
						}}
					/>
					<Box sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						ml: 1
					}}>
						<Typography variant="h2" sx={{
							fontWeight: 500,
							lineHeight: "initial",
							mb: 0
						}} >
							{ticket.subject}
						</Typography>
						<Box sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}>
							<Typography noWrap sx={{
								fontWeight: 500
							}}>
								{profile.displayName}
							</Typography>
							<TicketCreatedAt
								createdAt={ticket.createdAt}
								dateTimeFormat={DATE_FORMAT.SHORT}
								sx={{ display: { xs: "flex", sm: "none" } }}
							/>
						</Box>
					</Box>
				</Box>

				<Box sx={{ display: "flex", alignItems: "center" }}>
					<TicketCreatedAt
						createdAt={ticket.createdAt}
						sx={{ display: { xs: "none", sm: "flex" } }}
					/>
					<PopupMenu ticket={ticket} />
				</Box>

			</Box>

			<Box sx={{
				px: { xs: 3, sm: 6 },
				pb: { xs: 2, sm: 4 },
				"&>p": { lineHeight: "1.5rem" }
			}}>
				<TextEditor
					value={ticket.content}
					readOnly={true}
				/>
			</Box>

			<Box sx={{
				display: "flex",
				px: { xs: 3, md: 6 },
				py: 2,
				alignItems: "center",
				backgroundColor: "#F8F9FA",
				borderBottomLeftRadius: "0.5rem",
				borderBottomRightRadius: "0.5rem",
				borderTop: "1px solid",
				borderTopColor: "divider",
				flexWrap: "wrap"
			}}>
				<TicketPriority sx={{ cursor: "pointer" }} priority={ticket.priority} />
				<TicketStatus status={ticket.status} sx={{ mb: 0.5, ml: 1 }} />
				<TicketDepartment department={ticket.department} />
				<TicketCategory
					department={ticket.department}
					category={ticket.category}
					subCategory={ticket.subCategory}
				/>
				<TicketReplyCount count={ticket.replyCount} />
				<TicketLabels ticket={ticket} sx={{ ml: 1 }} />
			</Box>

		</Paper>
	)
}
TicketContent.propTypes = {
	ticket: PropTypes.object
}

export default TicketContent