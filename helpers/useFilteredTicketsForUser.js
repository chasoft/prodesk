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
import { useSelector } from "react-redux"
import { useDeepCompareEffect } from "react-use"
import { filter, groupBy, isEqual, orderBy, pickBy, size } from "lodash"

//PROJECT IMPORT
import { STATUS_FILTER } from "./constants"
import { useGetTicketsForUserQuery } from "@redux/slices/firestoreApi"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function useFilteredTicketsForUser() {
	const [res, setRes] = useState([])
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)

	const filteredGroupBy = useSelector(s => s.uiSettingsState.filteredGroupBy)
	const filteredByDepartment = useSelector(s => s.uiSettingsState.filteredByDepartment)
	const filteredByPriority = useSelector(s => s.uiSettingsState.filteredByPriority)
	const filteredByStatusRaw = useSelector(s => s.uiSettingsState.filteredByStatusRaw)

	const {
		data: tickets, isLoading: isLoadingTickets
	} = useGetTicketsForUserQuery(currentUser.username)

	useDeepCompareEffect(
		() => {
			console.log("useFilteredTicketsForUser - useDeepCompareEffect")
			//filter #1 by priority & department
			let filtered_1 = tickets

			let filterCriteria = {}
			if (filteredByPriority !== STATUS_FILTER.ANY)
				filterCriteria.priority = filteredByPriority
			if (filteredByDepartment !== STATUS_FILTER.ANY)
				filterCriteria.departmentId = filteredByDepartment
			if (size(filterCriteria) > 0)
				filtered_1 = filter(tickets, filterCriteria)

			//filter by status
			const selectedStatus = Object.keys(pickBy(filteredByStatusRaw, v => v === true))
			const filteredStatus = filter(filtered_1, i => selectedStatus.includes(i.status))

			//sort the list - descensing by `createdAt`
			const filteredSorted = orderBy(filteredStatus, ["updatedAt"], ["desc"])

			//group by department | status (default) | priority
			const filteredGroupedByStatus = groupBy(filteredSorted, i => i[filteredGroupBy])

			setRes(Object.entries(filteredGroupedByStatus))

		},
		[
			tickets,
			filteredGroupBy,
			filteredByDepartment,
			filteredByPriority,
			filteredByStatusRaw,
		]
	)

	if (isLoadingTickets) { return ({ data: [], isLoading: true }) }

	return ({ data: res, isLoading: false })
}

export default useFilteredTicketsForUser