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
import { filter, findIndex, groupBy, orderBy, pickBy } from "lodash"

//PROJECT IMPORT
import useUserSettings from "./useUserSettings"
import { getAuth, getUiSettings } from "@redux/selectors"
import { useGetDepartmentsQuery, useGetTicketsForAdminQuery } from "@redux/slices/firestoreApi"
import { SETTINGS_NAME, STATUS_FILTER, TICKET_INBOXES } from "./constants"
import { setTicketCounter } from "@redux/slices/uiSettings"
import { getStaffInCharge } from "./utils"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export default function useFilteredTicketsForAdmin() {
	const dispatch = useDispatch()
	const [res, setRes] = useState([])
	const { currentUser } = useSelector(getAuth)
	const [availableTicketsByInbox, setAvailableTicketsByInbox] = useState({})
	const { data: departments = {}, isLoading: isLoadingDepartment } = useGetDepartmentsQuery(undefined)
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

	/*	filter all available tickets for current user
		and pre-filter for all inboxes
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
			availableTickets = filter(
				tickets,
				(ticket) => {
					const latestStaffInCharge = getStaffInCharge(ticket.staffInCharge)
					const departmentIndex = findIndex(
						departments, department => department.did === ticket.departmentId
					)
					return latestStaffInCharge.assignee === currentUser.username
						|| (departments[departmentIndex].members.includes(currentUser.username))
				}
			)
		}

		/* Filters for each Inbox */
		const started = filter(
			availableTickets,
			(ticket) => {
				const latestStaffInCharge = getStaffInCharge(ticket.staffInCharge)
				return ticket.replyCount > 0
					&& latestStaffInCharge.assignee === currentUser.username
			}
		)
		const mine = filter(
			availableTickets,
			(ticket) => {
				const latestStaffInCharge = getStaffInCharge(ticket.staffInCharge)
				return ticket.replyCount === 0
					&& latestStaffInCharge.assignee === currentUser.username
			}
		)
		const assigned = filter(
			availableTickets,
			(ticket) => {
				const latestStaffInCharge = getStaffInCharge(ticket.staffInCharge)
				return !!ticket.staffInCharge.assignee
					&& latestStaffInCharge.assignee !== currentUser.username
			}
		)
		const unassigned = filter(
			availableTickets,
			(ticket) => {
				const latestStaffInCharge = getStaffInCharge(ticket.staffInCharge)
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
		const filteredStatus = filter(availableTicketsByInbox[filteredByInbox], (ticket) => {
			const isPassed =
				selectedStatus.includes(ticket.status)
				&& (ticket.labels.includes(filteredByLabel) || filteredByLabel === STATUS_FILTER.ANY)
				&& (ticket.priority === filteredByPriority || filteredByPriority === STATUS_FILTER.ANY)
				&& (ticket.departmentId === filteredByDepartment || filteredByDepartment === STATUS_FILTER.ANY)
			return isPassed
		})

		//sort - descensing by `createdAt`
		const filteredSorted = orderBy(filteredStatus, ["updatedAt"], ["desc"])

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

	if (isLoadingTickets || isLoadingDepartment) { return ({ data: [], isLoading: true }) }

	return ({ data: res, isLoading: false })
}