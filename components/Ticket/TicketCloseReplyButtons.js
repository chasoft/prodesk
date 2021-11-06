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
import { getAuth } from "./../../redux/selectors"
import { STATUS_FILTER } from "./../../helpers/constants"
import { ReplyButton } from "./../../components/Ticket/TicketReplies"
import { useUpdateTicketMutation } from "./../../redux/slices/firestoreApi"

//ASSETS
import CloseIcon from "@mui/icons-material/Close"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

//TODO: Customer's satisfaction
//When they click close, then a dialog appear to get their feedback (star rating, small feedback TextField)
const TicketActionButtons = ({ ticket }) => {
	const { enqueueSnackbar } = useSnackbar()
	const { currentUser } = useSelector(getAuth)
	const [updateTicket] = useUpdateTicketMutation()

	const handleCloseTicket = async () => {
		enqueueSnackbar("Ticket closed successfully", { variant: "success" })
		await updateTicket([{
			username: ticket.username,
			tid: ticket.tid,
			status: STATUS_FILTER.CLOSED
		}])
	}

	return (
		<Box sx={{
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
		}}>
			<Button
				disabled={ticket.status === STATUS_FILTER.CLOSED}
				variant="outlined"
				sx={{
					px: 4,
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
					(ticket.status === STATUS_FILTER.CLOSED)
						? "The ticket would be re-open if you reply"
						: ""
				}
				variant={
					(ticket.status === STATUS_FILTER.CLOSED)
						? "outlined"
						: "contained"
				}
				sx={{ mt: 3 }}
			/>

		</Box>
	)
}
TicketActionButtons.propTypes = { ticket: PropTypes.object }

export default TicketActionButtons