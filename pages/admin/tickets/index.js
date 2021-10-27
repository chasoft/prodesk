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

// MATERIAL-UI
import { Box, Container } from "@mui/material"

//THIRD-PARTY
import { isEqual, filter, reverse, groupBy, sortBy } from "lodash"
import { usePrevious } from "react-use"
import { useSelector } from "react-redux"

//PROJECT IMPORT
import { getLayout } from "./../../../layout/AdminLayout"
import useUiSettings from "./../../../helpers/useUiSettings"
import { useGetTicketsQuery } from "./../../../redux/slices/firestoreApi"
import { getAuth, getUiSettings } from "../../../redux/selectors"
import { PRIORITY } from "../../../helpers/constants"
import AdminTicketList from "../../../components/Ticket/AdminTicketList"
import AdminTicketFilters from "../../../components/Ticket/AdminTicketFilters"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useGetTicketsAdmin = () => {
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
		//sort the list - descensing by `createdAt`
		const sortedDocs = reverse(sortBy(filtered, ["updatedAt"]))
		//group by status
		const groupByStatus = groupBy(sortedDocs, (i) => i.status)

		filteredTickets.current = Object.entries(groupByStatus)
	}

	return ({ data: filteredTickets.current, isLoading: false })
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Tickets() {

	useUiSettings({
		title: "Tickets management",
		background: {
			backgroundImage: ""
		}
	})

	const { data: tickets, isLoading } = useGetTicketsAdmin()

	return (
		<Container maxWidth="lg" sx={{ minHeight: "calc(100vh - 150px)" }}>

			<Box sx={{ display: "flex", height: "100%" }}>

				<Box sx={{ flexGrow: 1 }}>
					<AdminTicketList />
				</Box>

				<div>
					<AdminTicketFilters />
				</div>

			</Box>

		</Container >
	)
}

Tickets.getLayout = getLayout
export default Tickets