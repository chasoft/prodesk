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
import { useGetProfilesQuery } from "../redux/slices/firestoreApi"

//THIRD-PARTY
import { isEqual, filter } from "lodash"
import { useDeepCompareEffect, usePrevious } from "react-use"

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/
/**
 * get profiles all users belong to a list of usergroup,
 * or not belong to (use inverting option)
 * @param {array} userGroups
 * @param {array} minus
 * @returns array of profiles in one or more usergroups
 */
export default function useProfilesGroup(userGroups = [], { inverting } = { inverting: false }) {
	const { data = [], isLoading } = useGetProfilesQuery()
	const [filteredList, setFilteredList] = useState([])
	const prevFilteredList = usePrevious(filteredList)

	useDeepCompareEffect(() => {
		if (userGroups.length === 0) {
			setFilteredList(data)
		} else {
			const filtered = filter(data ?? [], i => {
				if (inverting) return !userGroups.includes(i.group)
				return userGroups.includes(i.group)
			})

			if (!isEqual(prevFilteredList, filtered)) {
				setFilteredList(filtered)
			}
		}
	}, [data, userGroups])

	return {
		userList: filteredList,
		isLoading
	}
}