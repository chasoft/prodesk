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

import { useMemo } from "react"

//THIRD-PARTY
import { keyBy } from "lodash"
import { useDispatch } from "react-redux"
import { useRegisterActions } from "kbar"

//PROJECT IMPORT
import { setRedirect } from "@redux/slices/redirect"
import { useGetDocSearchIndexQuery } from "@redux/slices/firestoreApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const DOCUMENTATION_ID = "documentationSectionId"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

export default function useDocsActions() {
	const {
		data: docSearchIndex = { searchIndexes: [] },
	} = useGetDocSearchIndexQuery(undefined)

	const dispatch = useDispatch()

	const searchActions = useMemo(() => {
		let actions = []
		const collectDocs = (tree) => {
			Object.keys(tree).forEach((key) => {
				const curr = tree[key]
				if (curr.children) {
					collectDocs(curr.children)
				}
				if (!curr.children) {
					actions.push({
						...curr,
						parent: DOCUMENTATION_ID,
						shortcut: [],
						perform: () => {
							if (curr.slug.substring(0, 4) === "http")
								window.open(curr.slug, "_blank")
							else
								dispatch(setRedirect(curr.slug))
						},
					})
				}
			})
			return actions
		}

		const shortedList = keyBy(docSearchIndex.searchIndexes, "id")

		return collectDocs(shortedList)
	}, [dispatch, docSearchIndex.searchIndexes])

	const rootSearchAction = useMemo(
		() =>
			searchActions.length
				? {
					id: DOCUMENTATION_ID,
					name: "Search docs…",
					shortcut: ["?"],
					keywords: "find",
					section: "Documentation",
				}
				: null,
		[searchActions]
	)

	useRegisterActions([rootSearchAction, ...searchActions].filter(Boolean), [docSearchIndex.searchIndexes.length])
}