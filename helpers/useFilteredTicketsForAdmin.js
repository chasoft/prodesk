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
import { countBy, filter, groupBy, isEqual, orderBy, pickBy } from "lodash"

//PROJECT IMPORT
import { getStaffInCharge } from "@helpers/utils"
import { setTicketCounter } from "@redux/slices/uiSettings"
import useProfilesGroup from "@helpers/useProfilesGroup"
import useUserSettings from "./useUserSettings"

import {
	EMPTY,
	SETTINGS_NAME,
	STATUS_FILTER,
	TICKET_INBOXES,
	USERGROUP
} from "@helpers/constants"

import {
	useGetDepartmentsQuery,
	useGetTicketsForAdminQuery
} from "@redux/slices/firestoreApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export default function useFilteredTicketsForAdmin() {
	const dispatch = useDispatch()
	const [res, setRes] = useState({
		tickets: EMPTY.ARRAY,
		counter: 0
	})
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const [availableTicketsByInbox, setAvailableTicketsByInbox] = useState({})

	const {
		data: departments = EMPTY.ARRAY,
		isLoading: isLoadingDepartment
	} = useGetDepartmentsQuery(undefined)

	const {
		data: tickets = EMPTY.ARRAY,
		isLoading: isLoadingTickets
	} = useGetTicketsForAdminQuery(undefined)

	const {
		userList: allAdminProfiles = EMPTY.ARRAY,
		isLoading: isLoadingAllAdminProfiles
	} = useProfilesGroup([
		USERGROUP.SUPERADMIN.code,
		USERGROUP.ADMIN.code,
		USERGROUP.STAFF.code,
		USERGROUP.AGENT.code
	])

	const hasAdminPermissions = useUserSettings(currentUser.username, SETTINGS_NAME.hasAdminPermissions)

	const filteredGroupBy = useSelector(s => s.uiSettingsState.filteredGroupBy)
	const filteredByInbox = useSelector(s => s.uiSettingsState.filteredByInbox)
	const filteredByLabel = useSelector(s => s.uiSettingsState.filteredByLabel)
	const filteredByPriority = useSelector(s => s.uiSettingsState.filteredByPriority)
	const filteredByStatusRaw = useSelector(s => s.uiSettingsState.filteredByStatusRaw)
	const filteredByDepartment = useSelector(s => s.uiSettingsState.filteredByDepartment)

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
				-> 	or: is department is availableForAll, 
					then check if username included in the AdminList
		*/
		let availableTickets = tickets

		if (hasAdminPermissions === false) {
			availableTickets = filter(
				tickets,
				(ticket) => {

					const latestStaffInCharge = getStaffInCharge(ticket.staffInCharge)

					const departmentDetails = departments.find(
						department => department.did === ticket.departmentId
					) ?? {}

					return latestStaffInCharge.assignee === currentUser.username
						|| (departmentDetails.members.includes(currentUser.username))
						|| (
							departmentDetails.availableForAll
							&& allAdminProfiles
								.map(profile => profile.username)
								.includes(currentUser.username))
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
		//calculating number of not-yet-closed tickets
		//(we do not count closed tickets)

		const startedCounter = countBy(started, t => t.status)
		const mineCounter = countBy(mine, t => t.status)
		const assignedCounter = countBy(assigned, t => t.status)
		const unassignedCounter = countBy(unassigned, t => t.status)

		dispatch(setTicketCounter({
			[TICKET_INBOXES.STARTED]: started.length - (startedCounter[STATUS_FILTER.CLOSED] ?? 0),
			[TICKET_INBOXES.MINE]: mine.length - (mineCounter[STATUS_FILTER.CLOSED] ?? 0),
			[TICKET_INBOXES.ASSIGNED]: assigned.length - (assignedCounter[STATUS_FILTER.CLOSED] ?? 0),
			[TICKET_INBOXES.UNASSIGNED]: unassigned.length - (unassignedCounter[STATUS_FILTER.CLOSED] ?? 0),
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

		setRes({
			tickets: Object.entries(filteredGroupedByStatus),
			counter: filteredSorted.length
		})
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

	if (isLoadingTickets || isLoadingDepartment || isLoadingAllAdminProfiles) { return ({ data: EMPTY.ARRAY, isLoading: true }) }

	return ({ data: res.tickets, counter: res.counter, isLoading: false })
}