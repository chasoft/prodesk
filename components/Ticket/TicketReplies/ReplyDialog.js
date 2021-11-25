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
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Box, Button, CircularProgress, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Tooltip, ButtonGroup, MenuItem, Divider, ListItemIcon, ListItemText, Avatar } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import { size } from "lodash"
import { nanoid } from "nanoid"
import { useDispatch, useSelector } from "react-redux"
import relativeTime from "dayjs/plugin/relativeTime"
import { CopyToClipboard } from "react-copy-to-clipboard"


//PROJECT IMPORT
import TextEditor from "@components/common/TextEditor"
import { TicketUser } from "@components/Ticket/AdminTicketListItem"
import useMenuContainer from "@components/common/useMenuContainer"

import {
	ACTIONS,
	TYPE
} from "@redux/slices/firestoreApiConstants"

import { setIsLoadingSomething } from "@redux/slices/uiSettings"

import {
	getAuth,
	getTextEditor,
	getUiSettings
} from "@redux/selectors"

import {
	useAddTicketReplyMutation,
	useGetCannedRepliesQuery,
	useGetDepartmentsQuery
} from "@redux/slices/firestoreApi"

import useAdmin from "@helpers/useAdmin"
import { getStaffInCharge } from "@helpers/utils"
import { addNewNotification } from "@helpers/realtimeApi"

import {
	CODE,
	DATE_FORMAT,
	REDIRECT_URL,
	STATUS_FILTER,
	USERGROUP,
} from "@helpers/constants"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import { setRedirect } from "@redux/slices/redirect"
import Battery30Icon from "@mui/icons-material/Battery30"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import useProfilesGroup from "@helpers/useProfilesGroup"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const handleSubmitReplyBase = async ({
	addTicketReply,
	content,
	currentUser,
	departmentDetails,
	allAdminProfiles,
	ticket,
}) => {
	if (currentUser.username !== ticket.username && ticket.status === STATUS_FILTER.CLOSED) return
	const latestStaffInCharge = getStaffInCharge(ticket.staffInCharge)
	const trid = nanoid()
	const newReplyItem = {
		ticketItem: {
			username: ticket.username,
			tid: ticket.tid,
			...((currentUser.username === ticket.username)
				? ((ticket.status !== STATUS_FILTER.OPEN) ? { status: STATUS_FILTER.PENDING } : {})
				: { status: STATUS_FILTER.REPLIED }),
			...((ticket.staffInCharge?.length === 0 && currentUser.username !== ticket.username)
				? {
					staffInCharge: [{
						assignor: currentUser.username,
						assignee: currentUser.username,
						assignedDate: dayjs().valueOf()
					}]
				} : {})
		},
		replyItem: {
			trid,
			tid: ticket.tid,
			content: content,
			username: currentUser.username,
		}
	}
	const res = await addTicketReply(newReplyItem)

	if (res?.data.code === CODE.SUCCESS) {
		//prepare notification content
		const notisContent = {
			tid: ticket.tid,
			actionType: ACTIONS.ADD_TICKET_REPLY,
			iconURL: currentUser.photoURL,
			title: (currentUser.username === ticket.username)
				? `${currentUser.displayName} just replied his/her ticket`
				: `${currentUser.displayName} just replied your ticket`,
			description: ticket.subject,
			slug: ticket.slug,
			trid
		}

		const receivers = (currentUser.username !== ticket.username)
			? [ticket.username]
			: (latestStaffInCharge.assignee)
				? [latestStaffInCharge.assignee]
				: (departmentDetails.availableForAll)
					? allAdminProfiles.map(profile => profile.username)
					: departmentDetails.members

		const invalidatesTags = {
			trigger: currentUser.username,
			tag:
				[
					{ type: TYPE.TICKETS, id: "LIST" },
					{ type: TYPE.TICKETS, id: ticket.tid.concat("_replies") }
				],
			target: {
				isForUser: true,
				isForAdmin: true,
			}
		}

		await addNewNotification(receivers, notisContent, invalidatesTags)
	}
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const ReplyDialog = ({ ticket, showReplyDialog, setShowReplyDialog }) => {
	const theme = useTheme()
	dayjs.extend(relativeTime)
	const dispatch = useDispatch()
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

	const { isAdminURL } = useAdmin()
	const { currentUser } = useSelector(getAuth)
	const { editorData } = useSelector(getTextEditor)
	const [addTicketReply] = useAddTicketReplyMutation()
	const { isLoadingSomething } = useSelector(getUiSettings)
	const [justCopied, setJustCopied] = useState(false)

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
			&& cannedReply.full === false
	)

	const loadLocalStorage = () => localStorage.getItem("NewReply") ?? ""
	const getEditorData = (data) => { localStorage.setItem("NewReply", data) }
	const handleCancelReply = () => {
		setShowReplyDialog(false)
		localStorage.removeItem("NewReply")
	}

	const departmentDetails = departments.find(
		department => department.did === ticket.departmentId
	) ?? {}

	const latestStaffInCharge = getStaffInCharge(ticket.staffInCharge)

	const handleSubmitReply = async () => {
		dispatch(setIsLoadingSomething(true))

		await handleSubmitReplyBase({
			addTicketReply,
			content: editorData,
			currentUser,
			departmentDetails,
			allAdminProfiles,
			ticket,
		})

		localStorage.removeItem("NewReply")
		setShowReplyDialog(false)
		dispatch(setIsLoadingSomething(false))
	}

	return (
		<>
			<Dialog
				open={showReplyDialog}
				onClose={() => { setShowReplyDialog(false) }}
				fullScreen={fullScreen}
				maxWidth="md"
				scroll="paper"
			>

				<DialogTitle sx={{
					bgcolor: "primary.dark",
					color: "#FFF",
					typography: "h4",
					mt: 0,
				}}>
					Create Reply
				</DialogTitle>

				<DialogContent sx={{ mt: 2 }}>
					<Box sx={{
						pl: { xs: 1, sm: 4 }, py: 3, border: "1px solid #F0F0F0",
						width: { sm: "500px", md: "650px", lg: "700px" }
					}}>
						<TextEditor
							defaultValue={loadLocalStorage()}
							placeholder="Provides as many details as possible..."
							onChange={getEditorData}
						/>
					</Box>
				</DialogContent>

				<DialogActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pr: 3, mb: 2 }}>

					<div>{justCopied && <Typography sx={{ pl: 2, color: "primary.main" }}>Canned-reply copied</Typography>}</div>

					<div>
						<Button
							size="small"
							variant="outlined"
							onClick={handleCancelReply}
							sx={{ px: 3, minWidth: "100px" }}
						>
							Cancel
						</Button>

						<ButtonGroup
							variant="contained"
							aria-label="split button"
							sx={{ ml: 2 }}
							ref={anchorRef}
						>
							<Button
								size="small"
								onClick={handleSubmitReply}
								sx={{ px: 4, minWidth: "100px" }}
								disabled={
									loadLocalStorage() < 10
									|| size(editorData) < 10
									|| isLoadingDepartments
									|| isLoadingSomething
								}
							>
								{isLoadingSomething
									? <>Posting... <CircularProgress size={16} /></>
									: "Post"}
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
										disabled={isLoadingSomething}
									>
										<ArrowDropUpIcon />
									</Button>
								</Tooltip>}
						</ButtonGroup>
					</div>
				</DialogActions>

				{(isAdminURL && ticket.staffInCharge?.length === 0) &&
					<Box sx={{
						display: "flex",
						alignItems: "center",
						px: 3, py: 2,
						backgroundColor: "#F8F9FA",
						borderBottomLeftRadius: "0.5rem",
						borderBottomRightRadius: "0.5rem",
						borderTop: "1px solid",
						borderTopColor: "divider"
					}} >
						<Chip
							size="small"
							label="Note"
							color="warning"
							sx={{ mr: 2 }}
						/>
						<Typography sx={{ flexGrow: 1 }}>
							This ticket has not been assigned to any staff.<br />If you do the very first reply, this ticket would be assigned to you automatically.
						</Typography>
					</Box>}

				{(isAdminURL && size(ticket.staffInCharge) > 0) &&
					<Box sx={{
						display: "flex",
						alignItems: "center",
						px: 3, py: 2,
						backgroundColor: "#F8F9FA",
						borderBottomLeftRadius: "0.5rem",
						borderBottomRightRadius: "0.5rem",
						borderTop: "1px solid",
						borderTopColor: "divider"
					}} >
						<Chip
							size="small"
							label="Note"
							color="info"
							sx={{ mr: 2 }}
						/>

						<Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
							{(latestStaffInCharge.assignee === currentUser.username)
								? <div>
									This ticket has been assigned to you by {(latestStaffInCharge.assignor === currentUser.username) ? " yourself " : <TicketUser username={latestStaffInCharge.assignor} title="Assignor" />} at {dayjs(latestStaffInCharge.assignedDate).format(DATE_FORMAT.LONG)} ({dayjs(latestStaffInCharge.assignedDate).fromNow()})
								</div>
								: <div>
									This ticket has been assigned to {<TicketUser username={latestStaffInCharge.assignee} title="Supporter" />} by {(latestStaffInCharge.assignor === currentUser.username) ? " yourself " : (latestStaffInCharge.assignor === latestStaffInCharge.assignee) ? "himself/herself" : <TicketUser username={latestStaffInCharge.assignor} title="Supporter" />} <div>at {dayjs(latestStaffInCharge.assignedDate).format(DATE_FORMAT.LONG)} ({dayjs(latestStaffInCharge.assignedDate).fromNow()})</div>
								</div>}

							{(latestStaffInCharge.assignee !== currentUser.username)
								? <div>
									<hr style={{ borderColor: "transparent", margin: 0 }} />
									You are not in charge of this ticket. Are you sure you want to do a reply?
								</div>
								: null}
						</Box>
					</Box>}

			</Dialog>

			<MenuContainer
				open={open}
				anchorRef={anchorRef}
				handleClose={handleClose}
				handleListKeyDown={handleListKeyDown}
				placement="top-end"
				transformOrigin="right bottom"
				zIndex={181}
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
						You don&apos;t have any partial canned-replies
					</MenuItem>}

				{(filterCannedReplies.length > 0) &&
					<MenuItem disabled={true}>
						Click a canned-reply to copy, then, let you paste on the editor
					</MenuItem>}

				{(filterCannedReplies.length > 0) &&
					filterCannedReplies.map((cannedReply) =>
						<CopyToClipboard
							key={cannedReply.createdAt}
							text={cannedReply.content}
							onCopy={() => {
								setJustCopied(true)
								setTimeout(() => { setJustCopied(false) }, 700)
							}}
						>
							<MenuItem>
								<Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: "transparent" }}>
									<Battery30Icon sx={{ fill: (theme) => theme.palette.primary.light }} />
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
						</CopyToClipboard>
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
		</>
	)
}
ReplyDialog.propTypes = {
	ticket: PropTypes.object.isRequired,
	showReplyDialog: PropTypes.bool.isRequired,
	setShowReplyDialog: PropTypes.func.isRequired,
}

export default ReplyDialog