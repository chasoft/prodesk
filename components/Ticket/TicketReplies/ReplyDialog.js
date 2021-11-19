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
import React from "react"

// MATERIAL-UI
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import { size } from "lodash"
import { nanoid } from "nanoid"
import { useSelector } from "react-redux"
import relativeTime from "dayjs/plugin/relativeTime"

//PROJECT IMPORT
import TextEditor from "@components/common/TextEditor"
import { TicketUser } from "@components/Ticket/AdminTicketListItem"

import {
	ACTIONS,
	TYPE
} from "@redux/slices/firestoreApiConstants"
import {
	getAuth,
	getTextEditor
} from "@redux/selectors"
import {
	useAddTicketReplyMutation,
	useGetDepartmentsQuery
} from "@redux/slices/firestoreApi"

import useAdmin from "@helpers/useAdmin"
import { getStaffInCharge } from "@helpers/utils"
import { addNewNotification } from "@helpers/realtimeApi"
import {
	CODE,
	DATE_FORMAT,
	STATUS_FILTER,
} from "@helpers/constants"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const handleSubmitReplyBase = async ({
	currentUser,
	departmentDetails,
	addTicketReply,
	latestStaffInCharge,
	ticket,
	content
}) => {
	if (currentUser.username !== ticket.username && ticket.status === STATUS_FILTER.CLOSED) return

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
			link: ticket.slug,
			trid: trid
		}

		const receivers = (currentUser.username !== ticket.username)
			? [ticket.username]
			: (latestStaffInCharge.assignee)
				? [latestStaffInCharge.assignee]
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

const ReplyDialog = ({ ticket, open, setOpen }) => {
	const theme = useTheme()
	dayjs.extend(relativeTime)
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

	const { isAdminURL } = useAdmin()
	const { currentUser } = useSelector(getAuth)
	const { editorData } = useSelector(getTextEditor)
	const [addTicketReply] = useAddTicketReplyMutation()
	const {
		data: departments = [],
		isLoading: isLoadingDepartments
	} = useGetDepartmentsQuery(undefined)

	const loadLocalStorage = () => localStorage.getItem("NewReply") ?? ""
	const getEditorData = (data) => { localStorage.setItem("NewReply", data) }
	const handleCancelReply = () => { setOpen(false); localStorage.removeItem("NewReply") }

	const latestStaffInCharge = getStaffInCharge(ticket.staffInCharge)

	const departmentDetails = departments.find(
		d => d.did === ticket.departmentId
	) ?? {}

	const handleSubmitReply = async () => {
		setOpen(false)

		handleSubmitReplyBase({
			currentUser: currentUser,
			departmentDetails,
			addTicketReply,
			ticket: ticket,
			content: editorData
		})

		localStorage.removeItem("NewReply")
	}

	return (
		<Dialog
			open={open}
			onClose={() => { setOpen(false) }}
			fullScreen={fullScreen}
			maxWidth="md"
			scroll="paper"
		>

			<DialogTitle sx={{
				bgcolor: "primary.dark",
				color: "#FFF",
				typography: "h3",
				mt: 0,
			}}>
				Create Reply
			</DialogTitle>

			<DialogContent sx={{ mt: 2 }}>
				<Box sx={{
					pl: 4, py: 3, border: "1px solid #F0F0F0",
					width: { sm: "500px", md: "650px", lg: "700px" }
				}}>
					<TextEditor
						defaultValue={loadLocalStorage()}
						placeholder="Provides as many details as possible..."
						onChange={getEditorData}
					/>
				</Box>
			</DialogContent>

			<DialogActions sx={{ justifyContent: "flex-end", pr: 3, mb: 2 }}>
				<Button
					size="small" variant="outlined"
					onClick={handleCancelReply}
					sx={{ px: 3, minWidth: "100px" }}
				>
					Cancel
				</Button>

				<Button
					size="small" variant="contained"
					onClick={handleSubmitReply}
					sx={{ px: 4, minWidth: "100px" }}
					disabled={loadLocalStorage() < 10 || size(editorData) < 10 || isLoadingDepartments}
				>
					Post
				</Button>
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
	)
}
ReplyDialog.propTypes = {
	ticket: PropTypes.object.isRequired,
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
}

export default ReplyDialog