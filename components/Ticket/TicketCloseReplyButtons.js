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
import { Box, Button } from "@mui/material"

//THIRD-PARTY
import { useSnackbar } from "notistack"
import { useSelector } from "react-redux"

//PROJECT IMPORT
import { ReplyButton } from "@components/Ticket/TicketReplies"

import { CODE, STATUS_FILTER } from "@helpers/constants"

import { getAuth } from "@redux/selectors"
import { useGetDepartmentsQuery, useUpdateTicketMutation } from "@redux/slices/firestoreApi"

//ASSETS
import CloseIcon from "@mui/icons-material/Close"
import { ACTIONS, TYPE } from "@redux/slices/firestoreApiConstants"
import { getStaffInCharge } from "@helpers/utils"
import { addNewNotification } from "@helpers/realtimeApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const handleCloseTicketBase = async ({
	allAdminProfiles,
	currentUser,
	departments,
	ticket,
	updateTicket,
}) => {
	const res = await updateTicket([{
		username: currentUser.username,
		tid: ticket.tid,
		status: STATUS_FILTER.CLOSED
	}])

	const latestStaffInCharge = getStaffInCharge(ticket.staffInCharge)

	if (res?.data.code === CODE.SUCCESS) {
		//prepare notification content
		const notisContent = {
			actionType: ACTIONS.UPDATE_TICKET,
			iconURL: currentUser.photoURL,
			title: currentUser.username + " just closed a ticket",
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
				: (departmentDetails.availableForAll)
					? allAdminProfiles.map(profile => profile.username)
					: departmentDetails.members

		const invalidatesTags = {
			trigger: currentUser.username,
			tag: [{ type: TYPE.TICKETS, id: "LIST" }],
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

//TODO: Show a dialog to get customer's feedback (satisfaction)
//When they click close, then a dialog appear to get their feedback (star rating, small feedback TextField)
const TicketActionButtons = ({ ticket, allAdminProfiles }) => {
	const [updateTicket] = useUpdateTicketMutation()
	const { currentUser } = useSelector(getAuth)
	const { enqueueSnackbar } = useSnackbar()

	const {
		data: departments,
		isLoading: isLoadingDepartments
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
	}

	return (
		<Box sx={{
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
		}}>
			<Button
				disabled={ticket.status === STATUS_FILTER.CLOSED || isLoadingDepartments}
				variant="outlined"
				sx={{
					minWidth: "100px",
					visibility: { xs: "hidden", sm: "visible" }
				}}
				startIcon={<CloseIcon />}
				onClick={handleCloseTicket}
			>
				Close
			</Button>

			<ReplyButton
				ticket={ticket}
				disabled={
					currentUser.username !== ticket.username
					&& ticket.status === STATUS_FILTER.CLOSED
				}
				tooltip={
					(ticket.status === STATUS_FILTER.CLOSED
						&& currentUser.username === ticket.username)
						? "The ticket would be re-open if you reply"
						: ""
				}
				sx={{ mt: 3 }}
			/>

		</Box>
	)
}
TicketActionButtons.propTypes = {
	allAdminProfiles: PropTypes.array,
	ticket: PropTypes.object,
}

export default TicketActionButtons