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
import Link from "next/link"
import PropTypes from "prop-types"
import { useRouter } from "next/router"

// MATERIAL-UI
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material"

//THIRD-PARTY
import { filter, size } from "lodash"
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getAuth } from "../../../redux/selectors"
import { getLayout } from "../../../layout/ClientLayout"
import useUiSettings from "../../../helpers/useUiSettings"
import { setRedirect } from "../../../redux/slices/redirect"
import TicketContent from "../../../components/Ticket/TicketContent"
import { REDIRECT_URL, STATUS_FILTER } from "../../../helpers/constants"
import IconBreadcrumbs from "../../../components/BackEnd/IconBreadcrumbs"
import TicketReplies, { ReplyButton } from "../../../components/Ticket/TicketReplies"
import { useGetTicketsForUserQuery, useUpdateTicketMutation } from "../../../redux/slices/firestoreApi"

//ASSETS
import HomeIcon from "@mui/icons-material/Home"
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket"
import ErrorIcon from "@mui/icons-material/Error"
import CloseIcon from "@mui/icons-material/Close"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const BreadcrumbsBox = ({ children }) => (
	<Box sx={{
		display: "flex",
		flexDirection: "column",
		alignItems: "flex-start",
		pl: { xs: 0, sm: 3 },
		pt: { xs: 3, sm: 4, md: 6, lg: 8 },
		pb: 2
	}}>
		{children}
	</Box>
)
BreadcrumbsBox.propTypes = { children: PropTypes.node }

//TODO: Customer's satisfaction
//When they click close, then a dialog appear to get their feedback (star rating, small feedback TextField)
const ActionButtons = ({ ticket }) => {
	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const { currentUser } = useSelector(getAuth)
	const [updateTicket] = useUpdateTicketMutation()

	return (
		<Box sx={{
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
		}}>
			<Button
				disabled={ticket.status === STATUS_FILTER.CLOSED}
				variant="outlined"
				sx={{ px: 4, visibility: { xs: "hidden", sm: "visible" } }}
				startIcon={<CloseIcon />}
				onClick={async () => {
					enqueueSnackbar("Ticket closed successfully", { variant: "success" })
					await updateTicket([{
						username: currentUser.username,
						tid: ticket.tid,
						status: STATUS_FILTER.CLOSED
					}])
					dispatch(setRedirect(REDIRECT_URL.TICKETS))
				}}
			>
				Close
			</Button>

			<ReplyButton
				ticket={ticket}
				tooltip={
					(ticket.status === STATUS_FILTER.CLOSED)
						? "The ticket would be re-open if you reply"
						: ""
				}
				variant={(ticket.status === STATUS_FILTER.CLOSED) ? "outlined" : "contained"}
				sx={{ mt: 3 }}
			/>

		</Box>
	)
}
ActionButtons.propTypes = { ticket: PropTypes.object }

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function SingleTicket() {
	const router = useRouter()
	const { slug } = router.query
	const { currentUser } = useSelector(getAuth)
	//
	const { data: tickets, isLoading } = useGetTicketsForUserQuery(currentUser.username)

	useUiSettings({
		title: "Title",
		background: {
			backgroundImage: ""
		}
	})

	//fix bug when nagivate to other page
	if (!slug) return null

	//Note: ticket is array of object => [{}]
	const ticket = filter(tickets ?? [], { tid: slug[1] })

	if (isLoading) {
		return (
			<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>
				<Box sx={{
					display: "flex",
					height: "70%",
					alignItems: "center",
					justifyContent: "center"
				}}>
					<CircularProgress />
				</Box >
			</Container>
		)
	}

	return (
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>

			<BreadcrumbsBox>
				<IconBreadcrumbs
					icon={null}
					title={size(ticket) ? ticket[0].subject : "Ticket not existed"}
					items={[
						{
							icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
							title: "Home",
							url: REDIRECT_URL.CLIENT
						},
						{
							icon: <AirplaneTicketIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
							title: "All tickets",
							url: REDIRECT_URL.TICKETS
						}
					]}
				/>
			</BreadcrumbsBox>

			{(!isLoading && !size(ticket)) ?
				<Box sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "center",
					height: "70%"
				}}>
					<ErrorIcon color="warning" sx={{ fontSize: 80 }} />
					<Typography variant="caption" sx={{ p: 3 }}>Ticket is not existed!</Typography>
					<Link href={REDIRECT_URL.TICKETS} passHref>
						<Button variant="outlined">Go back to All tickets</Button>
					</Link>

				</Box> : null}

			{(!isLoading && size(ticket)) ?
				<>
					<TicketContent ticket={ticket[0]} />
					<TicketReplies
						ticketId={ticket[0].tid}
						ticketStatus={ticket[0].status}
						ticketUsername={ticket[0].username}
					/>
					<ActionButtons ticket={ticket[0]} />
				</> : null}

		</Container >
	)
}

SingleTicket.getLayout = getLayout

export default SingleTicket