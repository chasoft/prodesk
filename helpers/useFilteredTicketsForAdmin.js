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

import { useState } from "react"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"
import { useDeepCompareEffect } from "react-use"
import { filter, groupBy, orderBy, pickBy } from "lodash"

//PROJECT IMPORT
import useUserSettings from "./useUserSettings"
import { getAuth, getUiSettings } from "../redux/selectors"
import { useGetTicketsForAdminQuery } from "../redux/slices/firestoreApi"
import { SETTINGS_NAME, STATUS_FILTER, TICKET_INBOXES } from "./constants"
import { setTicketCounter } from "../redux/slices/uiSettings"
import { getStaffInCharge } from "./utils"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export default function useFilteredTicketsForAdmin() {
	const dispatch = useDispatch()
	const [res, setRes] = useState([])
	const { currentUser } = useSelector(getAuth)
	const [availableTicketsByInbox, setAvailableTicketsByInbox] = useState({})
	const { data: tickets = {}, isLoading: isLoadingTickets } = useGetTicketsForAdminQuery(undefined)
	const hasAdminPermissions = useUserSettings(currentUser.username, SETTINGS_NAME.hasAdminPermissions)
	const {
		filteredGroupBy,
		filteredByInbox,
		filteredByLabel,
		filteredByPriority,
		filteredByStatusRaw,
		filteredByDepartment
	} = useSelector(getUiSettings)

	console.log("hasAdminPermissions", hasAdminPermissions)

	/* filter all available tickets for current user 
		and pre-filter for inboxes
	*/
	useDeepCompareEffect(() => {

		/* Get available tickets for current user
			admin => all tickets
			others
				-> based on user.permissions.department
				-> based on ticket.staffInCharge.assignee
		*/

		let availableTickets = tickets
		if (hasAdminPermissions === false) {
			const _departments = Object.keys(currentUser?.departments ?? [])
			availableTickets = filter(
				tickets,
				t => {
					const latestStaffInCharge = getStaffInCharge(t.staffInCharge)
					return latestStaffInCharge.assignee === currentUser.username
						|| (_departments.includes(t.department))
				}
			)
		}

		/* Filters for each Inbox */

		const started = filter(
			availableTickets,
			t => {
				const latestStaffInCharge = getStaffInCharge(t.staffInCharge)
				return t.replyCount > 0
					&& latestStaffInCharge.assignee === currentUser.username
			}
		)
		const mine = filter(
			availableTickets,
			t => {
				const latestStaffInCharge = getStaffInCharge(t.staffInCharge)
				return t.replyCount === 0
					&& latestStaffInCharge.assignee === currentUser.username
			}
		)
		const assigned = filter(
			availableTickets,
			t => {
				const latestStaffInCharge = getStaffInCharge(t.staffInCharge)
				return !!t.staffInCharge.assignee
					&& latestStaffInCharge.assignee !== currentUser.username
			}
		)
		const unassigned = filter(
			availableTickets,
			t => {
				const latestStaffInCharge = getStaffInCharge(t.staffInCharge)
				return !latestStaffInCharge.assignee
			}
		)

		setAvailableTicketsByInbox({
			[TICKET_INBOXES.STARTED]: started,
			[TICKET_INBOXES.MINE]: mine,
			[TICKET_INBOXES.ASSIGNED]: assigned,
			[TICKET_INBOXES.UNASSIGNED]: unassigned,
		})

		//for AdminTicketFilters
		dispatch(setTicketCounter({
			[TICKET_INBOXES.STARTED]: started.length,
			[TICKET_INBOXES.MINE]: mine.length,
			[TICKET_INBOXES.ASSIGNED]: assigned.length,
			[TICKET_INBOXES.UNASSIGNED]: unassigned.length,
		}))
	}, [dispatch, tickets, currentUser.username, hasAdminPermissions])

	/* filter by other settings and groupBy */
	useDeepCompareEffect(() => {
		//filter
		const selectedStatus = Object.keys(pickBy(filteredByStatusRaw, v => v === true))
		const filteredStatus = filter(availableTicketsByInbox[filteredByInbox], (i) => {
			const isPassed =
				selectedStatus.includes(i.status)
				&& (i.labels.includes(filteredByLabel) || filteredByLabel === STATUS_FILTER.ANY)
				&& (i.priority === filteredByPriority || filteredByPriority === STATUS_FILTER.ANY)
				&& (i.department === filteredByDepartment || filteredByDepartment === STATUS_FILTER.ANY)
			return isPassed
		})

		//sort - descensing by `createdAt`
		const filteredSorted = orderBy(filteredStatus, ["updatedAt"])

		//group by department | status (default) | priority
		const filteredGroupedByStatus = groupBy(filteredSorted, i => i[filteredGroupBy])

		setRes(Object.entries(filteredGroupedByStatus))
	}, [
		availableTicketsByInbox,
		filteredByInbox,
		filteredByLabel,
		filteredGroupBy,
		filteredByPriority,
		filteredByStatusRaw,
		filteredByDepartment,
		hasAdminPermissions,
		currentUser.username,
	])

	if (isLoadingTickets) { return ({ data: [], isLoading: true }) }

	return ({ data: res, isLoading: false })
}