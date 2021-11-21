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
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { Box, Button, CircularProgress, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import { trim } from "lodash"
import { useDispatch, useSelector } from "react-redux"
import relativeTime from "dayjs/plugin/relativeTime"

//PROJECT IMPORT
import TextEditor from "@components/common/TextEditor"

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
	useUpdateTicketMutation
} from "@redux/slices/firestoreApi"

import useAdmin from "@helpers/useAdmin"
import { getStaffInCharge } from "@helpers/utils"
import { addNewNotification } from "@helpers/realtimeApi"

import {
	CODE,
	DATE_FORMAT,
} from "@helpers/constants"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const TicketNoteDialog = ({ ticket, departments, open, setOpen }) => {
	const theme = useTheme()
	dayjs.extend(relativeTime)
	const dispatch = useDispatch()
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

	const { isAdminURL } = useAdmin()
	const { currentUser } = useSelector(getAuth)
	const { editorData } = useSelector(getTextEditor)
	const [updateTicket] = useUpdateTicketMutation()
	const { isLoadingSomething } = useSelector(getUiSettings)

	const handleCancelTicketNote = () => {
		console.log("Cancel")
		setOpen(false)
	}

	const latestStaffInCharge = getStaffInCharge(ticket.staffInCharge)
	const trimEditorData = trim(editorData)

	const handleSaveTicketNote = async () => {
		dispatch(setIsLoadingSomething(true))

		const res = await updateTicket([{
			username: currentUser.username,
			tid: ticket.tid,
			note: {
				content: editorData,
				updatedAt: dayjs().valueOf(),
				updatedBy: currentUser.username
			}
		}])

		if (res?.data.code === CODE.SUCCESS) {
			//prepare notification content
			const notisContent = {
				actionType: ACTIONS.UPDATE_TICKET,
				iconURL: currentUser.photoURL,
				title: currentUser.username + " just updated ticket note",
				description: ticket.subject,
				link: ticket.slug,
			}

			const departmentDetails = departments.find(
				department => department.did === ticket.departmentId
			)

			const receivers = (currentUser.username !== ticket.username)
				? [ticket.username]
				: (latestStaffInCharge.assignee)
					? [latestStaffInCharge.assignee]
					: departmentDetails.members

			const invalidatesTags = {
				trigger: currentUser.username,
				tag: [{ type: TYPE.TICKETS, id: "LIST" }],
				target: {
					isForUser: false,
					isForAdmin: true,
				}
			}

			await addNewNotification(receivers, notisContent, invalidatesTags)
		}

		setOpen(false)
		dispatch(setIsLoadingSomething(false))
	}

	return (
		<Box onClick={(e) => { e.stopPropagation() }}>
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
					typography: "h4",
					mt: 0,
				}}>
					Ticket note
				</DialogTitle>

				<DialogContent sx={{ mt: 2 }}>
					<Box sx={{
						width: { sm: "500px", md: "650px", lg: "700px" }
					}}>
						<TextEditor
							defaultValue=""
							placeholder="Write anything you want... this is a note field of the ticket"
						/>
					</Box>

					{ticket.note.content
						? <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
							Updated at {dayjs(ticket.note.updatedAt).format(DATE_FORMAT.LONG)} by {ticket.note.updatedBy}&nbsp;
							<span style={{ fontStyle: "italic" }}>({dayjs(ticket.note.updatedAt).fromNow()})</span>
						</Typography> : null}
				</DialogContent>

				<DialogActions sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", pr: 3, mb: 2 }}>

					<div>
						<Button
							size="small"
							variant="outlined"
							onClick={handleCancelTicketNote}
							sx={{ px: 3, minWidth: "100px" }}
						>
							Cancel
						</Button>

						<Button
							size="small"
							onClick={handleSaveTicketNote}
							sx={{ px: 4, minWidth: "100px" }}
							disabled={
								isLoadingSomething
								|| trimEditorData === ""
								|| trimEditorData === "\\"
								|| trimEditorData === trim(ticket.note.content)
							}
						>
							{isLoadingSomething
								? <>Saving... &nbsp; <CircularProgress size={16} /></>
								: "Save"}
						</Button>
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
							Some note here for this feature......
						</Typography>
					</Box>}

			</Dialog>

		</Box>
	)
}
TicketNoteDialog.propTypes = {
	ticket: PropTypes.object.isRequired,
	departments: PropTypes.array.isRequired,
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired
}

export default TicketNoteDialog