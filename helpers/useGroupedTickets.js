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

import { useMemo, useRef } from "react"

//THIRD-PARTY
import { usePrevious } from "react-use"
import { groupBy, isEqual, sortBy, filter, reverse } from "lodash"

//PROJECT IMPORT
import { useGetTicketsForAdminQuery } from "../redux/slices/firestoreApi"
import { useSelector } from "react-redux"
import { getUiSettings } from "../redux/selectors"
import { PRIORITY } from "./constants"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export default function useGroupedTickets() {
	const { data: tickets, isLoading } = useGetTicketsForAdminQuery(undefined)
	const { ticketSearchTerm, selectedPriority, selectedStatus } = useSelector(getUiSettings)

	const _Status = useMemo(() => Object.entries(selectedStatus).filter(i => i[1] === true).map(i => i[0]), [selectedStatus])

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
		if (selectedPriority !== PRIORITY.ANY) {
			filtered = filter(tickets, { priority: selectedPriority })
		}

		//filter by status
		filtered = filter(filtered, (i) => _Status.includes(i.status))
		//sort the list - descensing by `createdAt`
		const sortedDocs = reverse(sortBy(filtered, ["updatedAt"]))
		//group by status
		const groupByStatus = groupBy(sortedDocs, (i) => i.status)

		filteredTickets.current = Object.entries(groupByStatus)

		console.log({ filteredTickets: filteredTickets.current })
	}

	return ({ data: filteredTickets.current, isLoading: false })
}