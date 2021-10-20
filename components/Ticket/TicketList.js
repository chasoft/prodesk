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

import React, { useRef } from "react"
import { Box, CircularProgress, Fab, Paper, Typography } from "@mui/material"

//THIRD-PARTY
import { usePrevious } from "react-use"
import { useDispatch, useSelector } from "react-redux"
import { isEqual, sortBy, groupBy, filter } from "lodash"

//PROJECT IMPORT
import AskNow from "../Docs/AskNow"
import { PRIORITY } from "../../helpers/constants"
import TicketListItem from "./TicketListItem"
import { getAuth, getUiSettings } from "../../redux/selectors"
import { resetTicketsFilter } from "../../redux/slices/uiSettings"
import { useGetTicketsQuery } from "../../redux/slices/firestoreApi"

//ASSETS
import AddIcon from "@mui/icons-material/Add"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useGetTickets = () => {
	const { currentUser } = useSelector(getAuth)
	const { data: tickets, isLoading } = useGetTicketsQuery(currentUser.username)
	const { ticketSearchTerm, selectedPriority, selectedStatus } = useSelector(getUiSettings)

	const _Status = Object.entries(selectedStatus).filter(i => i[1] === true).map(i => i[0])

	const prevTickets = usePrevious(tickets)
	const prevSearchTerm = usePrevious(ticketSearchTerm)
	const prevPriority = usePrevious(selectedPriority)
	const prevStatus = usePrevious(_Status)
	//we use useRef here because, later we change the value
	//and, this hook will not be re-render,
	const filteredTickets = useRef()

	if (isLoading) { return ({ data: [], isLoading: true }) }


	console.log("tickets", tickets)


	if (!isEqual(prevTickets, tickets) ||
		!isEqual(prevSearchTerm, ticketSearchTerm) ||
		!isEqual(prevPriority, selectedPriority) ||
		!isEqual(prevStatus, selectedStatus)) {

		//filter by priority
		let filtered = tickets
		if (selectedPriority !== PRIORITY.ALL) {
			filtered = filter(tickets, { priority: selectedPriority })
		}

		//filter by status
		filtered = filter(filtered, (i) => _Status.includes(i.status))
		//sort the list
		const sortedDocs = sortBy(filtered, ["status", "updatedAt"])
		//group by status
		const groupByStatus = groupBy(sortedDocs, (i) => i.status)

		filteredTickets.current = Object.entries(groupByStatus)
	}

	return ({ data: filteredTickets.current, isLoading: false })
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketsList() {
	const dispatch = useDispatch()
	const { data: tickets, isLoading } = useGetTickets()
	const handleResetSearchCriteria = () => { dispatch(resetTicketsFilter()) }

	if (isLoading) {
		return (
			<Box sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%"
			}}>
				<CircularProgress />
			</Box>
		)
	}

	console.log("tickets", tickets)

	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			minWidth: 0
		}}>
			<Typography variant="h1" style={{ color: "white", textAlign: "center" }}>All tickets</Typography>

			{(tickets.length === 0) &&
				<Box sx={{
					ml: 3,
					mt: { xs: "0.5rem", md: "3rem" },
				}}>
					<Typography variant="h2" style={{ color: "white" }}>
						There are no tickets that matched your criteria
					</Typography>

					<Typography variant="body" style={{ color: "white" }}>
						Try again by using other search criteria or click &quot;
						<Box component="span" onClick={handleResetSearchCriteria} sx={{
							cursor: "pointer",
							fontWeight: 500,
							"&:hover": { textDecoration: "underline" }
						}}>
							here
						</Box>
						&quot; to reset.
					</Typography>
				</Box>}

			{(tickets.length > 0) &&
				tickets.map((statusGroupItem, idx) => (
					<div key={statusGroupItem[0]}>

						<Typography variant="h2" sx={{
							ml: 3,
							marginTop: "3rem",
							mt: { xs: "0.5rem", md: "3rem" },
							...((idx === 0) ? { color: "white" } : {})
						}}>
							{statusGroupItem[0]}
						</Typography>

						<Paper elevation={2} >
							{statusGroupItem[1].map((ticket, idx) => (
								<TicketListItem
									key={ticket.tid}
									ticket={ticket}
									isFirst={idx === 0}
									isLast={idx === statusGroupItem[1].length - 1}
								/>
							))}
						</Paper>
					</div>
				))}

			<AskNow />

			<Fab
				color="primary" aria-label="add"
				sx={{
					position: "fixed",
					bottom: (theme) => theme.spacing(2),
					right: (theme) => theme.spacing(2),
				}}
			>
				<AddIcon />
			</Fab>
		</Box>
	)
}

export default TicketsList