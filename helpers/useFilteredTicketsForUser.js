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
import { useDeepCompareEffect } from "react-use"
import { useSelector } from "react-redux"
import { filter, groupBy, orderBy, pickBy, size } from "lodash"

//PROJECT IMPORT
import { STATUS_FILTER } from "./constants"
import { getAuth, getUiSettings } from "./../redux/selectors"
import { useGetTicketsForUserQuery } from "./../redux/slices/firestoreApi"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useFilteredTicketsForUser = () => {
	const { currentUser } = useSelector(getAuth)
	const [res, setRes] = useState([])
	const { filteredGroupBy, filteredByStatusRaw, filteredByPriority, filteredByDepartment } = useSelector(getUiSettings)
	const { data: tickets, isLoading: isLoadingTickets } = useGetTicketsForUserQuery(currentUser.username)

	useDeepCompareEffect(() => {
		console.log("useFilteredTicketsForUser - useDeepCompareEffect")
		//filter #1 by priority & department
		let filtered_1 = tickets
		let f = {}
		if (filteredByPriority !== STATUS_FILTER.ANY) f.priority = filteredByPriority
		if (filteredByDepartment !== STATUS_FILTER.ANY) f.department = filteredByDepartment
		if (size(f) > 0) filtered_1 = filter(tickets, f)

		//filter by status
		const selectedStatus = Object.keys(pickBy(filteredByStatusRaw, v => v === true))
		const filteredStatus = filter(filtered_1, i => selectedStatus.includes(i.status))

		//sort the list - descensing by `createdAt`
		const filteredSorted = orderBy(filteredStatus, ["updatedAt"])

		//group by department | status (default) | priority
		const filteredGroupedByStatus = groupBy(filteredSorted, i => i[filteredGroupBy])

		setRes(Object.entries(filteredGroupedByStatus))

	}, [filteredByDepartment, filteredByPriority, filteredByStatusRaw, filteredGroupBy, tickets])

	if (isLoadingTickets) { return ({ data: [], isLoading: true }) }

	return ({ data: res, isLoading: false })
}

export default useFilteredTicketsForUser