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
import { forEach, groupBy, isEqual, sortBy } from "lodash"

//PROJECT IMPORT
import { useGetDocsQuery } from "@redux/slices/firestoreApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export default function useGroupedDocs() {
	const {
		data: docs = [],
		isLoading: isLoadingDocs
	} = useGetDocsQuery(undefined)

	const prevData = usePrevious(docs)
	//we use useRef here because, later we change the value
	//and, this hook will not be re-render,
	const groupedDocs = useRef()

	if (isLoadingDocs) { return ({ data: [], isLoading: true }) }

	console.log("useGetDocsQuery => ", { docs })

	if (isEqual(prevData, docs) === false) {
		//step 0: sort the docs list
		// const sortedDocs = sortBy(docs, ["category", "subcategory", "title"])
		const sortedDocs = sortBy(docs, ["category", "position"])

		//step 1: group by cat
		const groupByCat = groupBy(sortedDocs, (i) => i.category)

		console.log({ groupByCat })

		//step 2: group by SubCat
		const groupByCatAndSub = forEach(groupByCat, function (value, key) {
			groupByCat[key] = groupBy(groupByCat[key], (i) => i.subcategory)
		})

		groupedDocs.current = Object.entries(groupByCatAndSub)

		console.log({ "group": groupedDocs.current })
	}

	return (
		{
			data: groupedDocs.current,
			isLoading: false
		}
	)
}