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

import PropTypes from "prop-types"
import React, { useState } from "react"

// MATERIAL-UI
import { Avatar, Box, IconButton, MenuItem, Paper, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import { useSnackbar } from "notistack"
import relativeTime from "dayjs/plugin/relativeTime"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import TextEditor from "@components/common/TextEditor"
import useMenuContainer from "@components/common/useMenuContainer"
import ReplyDialog from "@components/Ticket/TicketReplies/ReplyDialog"
import { handleCloseTicketBase } from "@components/Ticket/TicketCloseReplyButtons"

import {
	TicketCategory,
	TicketDepartment,
	TicketLabels,
	TicketUser,
	TicketPriority,
	TicketReplyCount,
	TicketStatus,
	TicketNote
} from "@components/Ticket/AdminTicketListItem"

import { getAuth } from "@redux/selectors"
import { setRedirect } from "@redux/slices/redirect"

import {
	useGetDepartmentsQuery,
	useUpdateTicketMutation
} from "@redux/slices/firestoreApi"

import { getStaffInCharge } from "@helpers/utils"

import useGetProfileByUsername from "@helpers/useGetProfileByUsername"
import {
	DATE_FORMAT,
	REDIRECT_URL,
	STATUS_FILTER
} from "@helpers/constants"

//ASSETS
import CloseIcon from "@mui/icons-material/Close"
import ReplyIcon from "@mui/icons-material/Reply"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import AccessTimeIcon from "@mui/icons-material/AccessTime"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function MenuItemStyled({ ItemIcon, children, ...otherProps }) {
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

function PopupMenu({ ticket, allAdminProfiles }) {
	const dispatch = useDispatch()
	const [updateTicket] = useUpdateTicketMutation()
	const { currentUser } = useSelector(getAuth)
	const { enqueueSnackbar } = useSnackbar()
	const [showReplyDialog, setShowReplyDialog] = useState(false)

	const [
		MenuContainer, open, anchorRef, {
			handleToggle, handleClose, handleListKeyDown
		}
	] = useMenuContainer()

	const {
		data: departments = [], isLoading: isLoadingDepartments
	} = useGetDepartmentsQuery(undefined)

	const handleCloseTicket = async () => {
		enqueueSnackbar("Ticket closed successfully", { variant: "success" })

		await handleCloseTicketBase({
			allAdminProfiles,
			currentUser,
			departments,
			ticket,
			updateTicket,
		})

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
					disabled={ticket.status === STATUS_FILTER.CLOSED || isLoadingDepartments}
					onClick={handleCloseTicket}
				>
					{<CloseIcon fontSize="small" style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }} />}
					<Typography style={{ marginLeft: "0.5rem", marginRight: "3rem" }}>
						Close
					</Typography>
				</MenuItem>
			</MenuContainer>

			<ReplyDialog
				ticket={ticket}
				showReplyDialog={showReplyDialog}
				setShowReplyDialog={setShowReplyDialog} />
		</>
	)
}

PopupMenu.propTypes = {
	allAdminProfiles: PropTypes.array,
	ticket: PropTypes.object
}

function TicketCreatedAt({ createdAt, dateTimeFormat, sx }) {
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

function TicketContent({ ticket, allAdminProfiles }) {
	const { currentUser } = useSelector(getAuth)
	const profile = useGetProfileByUsername(ticket.username)
	const latestStaffInCharge = getStaffInCharge(ticket.staffInCharge)

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
					<PopupMenu
						allAdminProfiles={allAdminProfiles}
						ticket={ticket}
					/>
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
				<TicketPriority
					sx={{ cursor: "pointer" }}
					priority={ticket.priority}
				/>
				<TicketStatus
					sx={{ mb: 0.5, ml: 1 }}
					status={ticket.status}
				/>
				<TicketDepartment
					departmentId={ticket.departmentId}
				/>
				<TicketCategory
					departmentId={ticket.departmentId}
					category={ticket.categoryId}
					subCategory={ticket.subCategory}
				/>
				<TicketReplyCount
					count={ticket.replyCount}
				/>
				<TicketLabels
					sx={{ ml: 1 }}
					ticket={ticket}
				/>
				<TicketUser
					username={latestStaffInCharge.assignee}
					title={(currentUser.username === latestStaffInCharge.assignee) ? "Ticket Supporter (it's you)" : "Ticket Supporter"}
				/>

				<TicketNote ticket={ticket} />
			</Box>

		</Paper>
	)
}
TicketContent.propTypes = {
	allAdminProfiles: PropTypes.array,
	ticket: PropTypes.object
}

export default TicketContent