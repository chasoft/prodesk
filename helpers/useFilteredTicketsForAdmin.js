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

import { useRef } from "react"

//THIRD-PARTY
import { usePrevious } from "react-use"
import { filter, groupBy, isEqual, orderBy, pickBy, size } from "lodash"

//PROJECT IMPORT
import { useGetTicketsForAdminQuery } from "../redux/slices/firestoreApi"
import { useSelector } from "react-redux"
import { getAuth, getUiSettings } from "../redux/selectors"
import { SETTINGS_NAME, STATUS_FILTER } from "./constants"
import useUserSettings from "./useUserSettings"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export default function useFilteredTicketsForAdmin() {
	const { currentUser } = useSelector(getAuth)
	const { data: tickets, isLoading: isLoadingTickets } = useGetTicketsForAdminQuery(undefined)
	const hasAdminPermissions = useUserSettings(currentUser.username, SETTINGS_NAME.hasAdminPermissions)
	const {
		filteredByWord,
		filteredGroupBy,
		filteredByInbox,
		filteredByLabel,
		filteredByPriority,
		filteredByStatusRaw,
		filteredByDepartment
	} = useSelector(getUiSettings)

	const prevInbox = usePrevious(filteredByInbox)
	const prevLabel = usePrevious(filteredByLabel)
	const prevStatus = usePrevious(filteredByStatusRaw)
	const prevTickets = usePrevious(tickets)
	const prevGroupBy = usePrevious(filteredGroupBy)
	const prevPriority = usePrevious(filteredByPriority)
	const prevSearchTerm = usePrevious(filteredByWord)
	const prevDepartment = usePrevious(filteredByDepartment)





	if (isLoadingTickets) { return ({ data: [], isLoading: true }) }

	if (isEqual(prevTickets, tickets) === false
		|| isEqual(prevStatus, filteredByStatusRaw) === false
		|| prevInbox !== filteredByInbox
		|| prevLabel !== filteredByLabel
		|| prevGroupBy !== filteredGroupBy
		|| prevSearchTerm !== filteredByWord
		|| prevPriority !== filteredByPriority
		|| prevDepartment !== filteredByDepartment) {





		//filter #0 by User (this is for Admin only)
		let filtered_0 = tickets
		if (hasAdminPermissions === false) {
			filtered_0 = filter(tickets, (ticket) => {
				if (!ticket?.staffInCharge) return false

				const latestStaffInCharge = (ticket.staffInCharge.length > 0)
					? ticket.staffInCharge[ticket.staffInCharge.length - 1]
					: null

				return ((latestStaffInCharge === null) ||
					(latestStaffInCharge.assignee !== currentUser.username))
			})
		}

		//filter #1 by Inbox (this is for all except members & user)
		let filtered_1 = filtered_0


		//filter #2 by priority & department
		let filtered_2 = filtered_1
		let f = {}
		if (filteredByPriority !== STATUS_FILTER.ANY) f.priority = filteredByPriority
		if (filteredByDepartment !== STATUS_FILTER.ANY) f.department = filteredByDepartment
		if (size(f) > 0) filtered_2 = filter(tickets, f)

		//filter #3 by label & status
		const selectedStatus = Object.keys(pickBy(filteredByStatusRaw, v => v === true))
		const filteredStatus = filter(filtered_2, (i) => {
			return selectedStatus.includes(i.status) &&
				(i.labels.includes(filteredByLabel) || filteredByLabel === STATUS_FILTER.ANY)
		})

		//sort the list - descensing by `createdAt`
		const filteredSorted = orderBy(filteredStatus, ["updatedAt"])

		//group by department | status (default) | priority
		console.log({ filteredGroupBy })

		const filteredGroupedByStatus = groupBy(filteredSorted, i => i[filteredGroupBy])

		filteredTickets.current = Object.entries(filteredGroupedByStatus)
	}

	return ({ data: filteredTickets.current, isLoading: false })
}