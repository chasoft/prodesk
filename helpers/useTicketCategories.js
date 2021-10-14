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
import { isEqual, sortBy } from "lodash"

//PROJECT IMPORT
import { useGetCategoriesQuery } from "../redux/slices/firestoreApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export default function useTicketCategories() {
	const { data, isLoading } = useGetCategoriesQuery(undefined)
	const prevData = usePrevious(data)
	//we use useRef here because, later we change the value
	//and, this hook will not be re-render,
	const ticketCategories = useRef()

	if (isLoading) { return ({ data: [], isLoading: true }) }

	if (isEqual(prevData, data) === false) {
		//sort the docs list
		const sortedList = sortBy(data, ["name"])
		ticketCategories.current = sortedList
	}

	return ({ data: ticketCategories.current, isLoading: false })
}