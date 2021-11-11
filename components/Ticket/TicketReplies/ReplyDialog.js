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

//PROJECT IMPORT
import TextEditor from "./../../common/TextEditor"
import useAdmin from "./../../../helpers/useAdmin"
import { getAuth, getTextEditor } from "../../../redux/selectors"
import { STATUS_FILTER, DATE_FORMAT } from "./../../../helpers/constants"
import { TicketOwner } from "./../../../components/Ticket/AdminTicketListItem"
import { useAddTicketReplyMutation } from "../../../redux/slices/firestoreApi"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const ReplyDialog = ({
	tid,
	status,
	username,
	staffInCharge,
	//
	open,
	setOpen
}) => {

	const theme = useTheme()
	const fullScreen = useMediaQuery(theme.breakpoints.down("sm"))

	const { isAdminURL } = useAdmin()
	const { currentUser } = useSelector(getAuth)
	const { editorData } = useSelector(getTextEditor)
	const [addTicketReply] = useAddTicketReplyMutation()

	const loadLocalStorage = () => localStorage.getItem("NewReply") ?? ""
	const getEditorData = (data) => { localStorage.setItem("NewReply", data) }
	const handleCancelReply = () => { setOpen(false); localStorage.removeItem("NewReply") }

	const latestStaffInCharge = (staffInCharge.length > 0)
		? staffInCharge[staffInCharge.length - 1]
		: null

	const handleSubmitReply = async () => {
		setOpen(false)
		//prevent non-owner to reply a closed ticket
		if (currentUser.username !== username && status === STATUS_FILTER.CLOSED) return

		const trid = nanoid()
		const newReplyItem = {
			ticketItem: {
				username: username,
				tid: tid,
				...((currentUser.username === username)
					? ((status !== STATUS_FILTER.OPEN) ? { status: STATUS_FILTER.PENDING } : {})
					: { status: STATUS_FILTER.REPLIED }),
				...((staffInCharge?.length === 0)
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
				tid: tid,
				content: editorData,
				username: currentUser.username,
			}
		}
		await addTicketReply(newReplyItem)
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
					pl: 4, py: 3, border: "1px solid #FAFAFA",
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
					disabled={loadLocalStorage() < 10 || size(editorData) < 10}
				>
					Post
				</Button>
			</DialogActions>

			{(isAdminURL && staffInCharge?.length === 0) &&
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

			{(isAdminURL && staffInCharge?.length > 0) &&
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
							? <>
								This ticket has been assigned to you by {(latestStaffInCharge.assignor === currentUser.username) ? " yourself " : <TicketOwner username={latestStaffInCharge.assignor} />} at {dayjs(latestStaffInCharge.assignedDate).format(DATE_FORMAT.LONG)}
							</>
							: <>
								This ticket has been assigned to {<TicketOwner username={latestStaffInCharge.assignee} />} by {(latestStaffInCharge.assignor === currentUser.username) ? " yourself " : <TicketOwner username={latestStaffInCharge.assignor} />} at {dayjs(latestStaffInCharge.assignedDate).format(DATE_FORMAT.LONG)}
							</>}

						{(latestStaffInCharge.assignee !== currentUser.username)
							? "You are not in charge of this ticket. Are you sure you want to do a reply?"
							: null}
					</Box>
				</Box>}

		</Dialog>
	)
}
ReplyDialog.propTypes = {
	tid: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired,
	staffInCharge: PropTypes.array.isRequired,
	//
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
}

export default ReplyDialog