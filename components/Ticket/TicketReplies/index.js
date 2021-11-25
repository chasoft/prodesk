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
import { Avatar, Box, Button, ButtonGroup, CircularProgress, Divider, Fab, ListItemIcon, ListItemText, MenuItem, Skeleton, Tooltip } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import ReplyItem from "@components/Ticket/TicketReplies/Reply"
import ReplyDialog, { handleSubmitReplyBase } from "@components/Ticket/TicketReplies/ReplyDialog"
import useMenuContainer from "@components/common/useMenuContainer"

import useAdmin from "@helpers/useAdmin"
import useUserSettings from "@helpers/useUserSettings"

import {
	DATE_FORMAT,
	REDIRECT_URL,
	SETTINGS_NAME,
	USERGROUP
} from "@helpers/constants"

import { getAuth } from "@redux/selectors"
import { setRedirect } from "@redux/slices/redirect"

import {
	useAddTicketReplyMutation,
	useGetCannedRepliesQuery,
	useGetDepartmentsQuery,
	useGetTicketRepliesQuery
} from "@redux/slices/firestoreApi"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import ReplyIcon from "@mui/icons-material/Reply"
import BatteryFullIcon from "@mui/icons-material/BatteryFull"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import useProfilesGroup from "@helpers/useProfilesGroup"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const ReplyButton = ({ ticket, tooltip = "", disabled = false, sx }) => {
	const dispatch = useDispatch()
	const { isAdminURL } = useAdmin()
	const { currentUser } = useSelector(getAuth)
	const [showReplyDialog, setShowReplyDialog] = useState(false)
	const [addTicketReply] = useAddTicketReplyMutation()
	const [isSubmitingCannedReply, setIsSubmitingCannedReply] = useState(false)

	const {
		userList: allAdminProfiles = [],
		// isLoading: isLoadingAllAdminProfiles
	} = useProfilesGroup([
		USERGROUP.SUPERADMIN.code,
		USERGROUP.ADMIN.code,
		USERGROUP.STAFF.code,
		USERGROUP.AGENT.code
	])

	const {
		data: departments = [],
		isLoading: isLoadingDepartments
	} = useGetDepartmentsQuery(undefined)

	const [
		MenuContainer,
		open,
		anchorRef,
		{
			handleToggle,
			handleClose,
			handleListKeyDown
		}
	] = useMenuContainer()

	const {
		data: cannedReplies = [],
		isLoading: isLoadingCannedReplies
	} = useGetCannedRepliesQuery(undefined)

	const filterCannedReplies = cannedReplies.filter(
		cannedReply =>
			(cannedReply.departmentId === ticket.departmentId)
			&& cannedReply.full === true
	)

	const departmentDetails = departments.find(
		department => department.did === ticket.departmentId
	)

	const handleSubmitReplyUsingCannedReply = async (cannedReplyContent) => {

		setIsSubmitingCannedReply(true)

		await handleSubmitReplyBase({
			addTicketReply,
			content: cannedReplyContent,
			currentUser,
			departmentDetails,
			allAdminProfiles,
			ticket,
		})

		setIsSubmitingCannedReply(false)
	}

	return (
		<Box sx={{
			display: { xs: "none", sm: "flex" },
			justifyContent: "flex-end", mb: 4, ...sx
		}}>
			<Tooltip arrow title={tooltip} placement="left">
				<ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
					<Button
						sx={{ px: 3 }}
						disabled={disabled || isSubmitingCannedReply}
						startIcon={<ReplyIcon />}
						onClick={() => setShowReplyDialog(true)}
					>
						{isSubmitingCannedReply
							? <>Sending... <CircularProgress size={16} /></>
							: "Reply"}
					</Button>

					{isAdminURL &&
						<Tooltip arrow title="Canned-replies" placement="bottom">
							<Button
								size="small"
								aria-controls={open ? "split-button-menu" : undefined}
								aria-expanded={open ? "true" : undefined}
								aria-label="select canned-reply"
								aria-haspopup="menu"
								onClick={handleToggle}
								disabled={disabled || isSubmitingCannedReply}
							>
								<ArrowDropUpIcon />
							</Button>
						</Tooltip>}
				</ButtonGroup>
			</Tooltip>

			<MenuContainer
				open={open}
				anchorRef={anchorRef}
				handleClose={handleClose}
				handleListKeyDown={handleListKeyDown}
				placement="top-end"
				transformOrigin="right bottom"
			>
				{(isLoadingCannedReplies || isLoadingDepartments) &&
					[
						<MenuItem key="loading">
							Loading canned replies... <CircularProgress size={20} />
						</MenuItem>,
						<Divider key="divider_01" />
					]}

				{/* TODO: Check permission to add/edit canned-replies */}

				{(!isLoadingCannedReplies && filterCannedReplies.length === 0) &&
					<MenuItem key="message-no-canned-replies" disabled={true}>
						You don&apos;t have any full canned-replies
					</MenuItem>}

				{(filterCannedReplies.length > 0) &&
					<MenuItem disabled={true}>
						Select a canned-reply to reply immediately
					</MenuItem>}

				{(filterCannedReplies.length > 0) &&
					filterCannedReplies.map((cannedReply) =>
						<MenuItem
							key={cannedReply.createdAt}
							onClick={() => handleSubmitReplyUsingCannedReply(cannedReply.content)}
						>
							<Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: "transparent" }}>
								<BatteryFullIcon sx={{ fill: (theme) => theme.palette.primary.light }} />
							</Avatar>
							<ListItemText
								primary={cannedReply.description}
								primaryTypographyProps={{
									fontWeight: 500
								}}
								secondary={
									<Box component="span" sx={{ whiteSpace: "normal" }}>
										{cannedReply.content.substring(0, 110)}
										<span style={{
											display: "block",
											marginTop: "6px",
											fontSize: "0.75rem"
										}}>
											Updated at {dayjs(cannedReply.createdAt).format(DATE_FORMAT.LONG)}&nbsp;
											<span style={{ fontStyle: "italic" }}>({dayjs(cannedReply.updatedAt).fromNow()})</span>
										</span>
									</Box>
								}
								secondaryTypographyProps={{
									fontSize: "0.9rem",
									maxWidth: "385px"
								}}
							/>
						</MenuItem>
					)}
				<Divider key="divider_02" />
				<MenuItem
					key="goto-settings-canned-replies"
					onClick={() => {
						dispatch(setRedirect(REDIRECT_URL.SETTINGS.CANNED_REPLIES))
					}}
				>
					<ListItemIcon>
						<AddIcon fontSize="small" />
					</ListItemIcon>
					Add/Edit canned-replies...
				</MenuItem>

			</MenuContainer>

			<ReplyDialog
				ticket={ticket}
				showReplyDialog={showReplyDialog}
				setShowReplyDialog={setShowReplyDialog}
			/>
		</Box>
	)
}
ReplyButton.propTypes = {
	ticket: PropTypes.object,
	tooltip: PropTypes.string,
	disabled: PropTypes.bool,
	sx: PropTypes.object
}

const RepliesContainer = ({ ticket, children }) => {
	const [showReplyDialog, setShowReplyDialog] = useState(false)
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
				onClick={() => { setShowReplyDialog(true) }}
			>
				<ReplyIcon />
			</Fab>

			<ReplyDialog
				ticket={ticket}
				showReplyDialog={showReplyDialog}
				setShowReplyDialog={setShowReplyDialog}
			/>

		</Box >
	)
}
RepliesContainer.propTypes = {
	ticket: PropTypes.object,
	children: PropTypes.node
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketReplies({ ticket }) {

	const { currentUser } = useSelector(getAuth)
	const hasAdminPermissions = useUserSettings(currentUser.username, SETTINGS_NAME.hasAdminPermissions)

	const { data: ticketReplies, isLoading: isLoadingReplies } = useGetTicketRepliesQuery({
		username: ticket.username,
		tid: ticket.tid
	})

	//TODO: Replace this line with Permission system
	const isAdmin = currentUser.username === "superadmin" || hasAdminPermissions

	//We already know the number of replies based on replyCount,
	//then, show the result immediately when replyCount === 0
	if (ticket.replyCount == 0) {
		return (
			<RepliesContainer ticket={ticket}>
				<Box sx={{ p: 4 }}>There is no replies!</Box>
			</RepliesContainer>
		)
	}

	//Skeleton when waiting for replies' content
	if (isLoadingReplies) {
		return (
			<RepliesContainer ticket={ticket}>
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
		<RepliesContainer ticket={ticket}>
			{ticketReplies?.map((replyItem, idx) =>
				<ReplyItem
					key={replyItem.trid}
					isAdmin={isAdmin}
					replyItem={replyItem}
					ticketUsername={ticket.username}
					ticketStatus={ticket.status}
					departmentId={ticket.departmentId}
					trid={replyItem.trid}
					isFirst={idx === 0}
				/>
			)}
		</RepliesContainer>
	)
}
TicketReplies.propTypes = {
	ticket: PropTypes.object,
}

export default TicketReplies