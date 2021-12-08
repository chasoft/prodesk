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
import { useRegisterActions } from "kbar"
import kbar_demo_data from "@components/common/kbar/data"

const searchId = randomId()

export default function useDocsActions() {
	const searchActions = useMemo(() => {
		let actions = []
		const collectDocs = (tree) => {
			Object.keys(tree).forEach((key) => {
				const curr = tree[key]
				if (curr.children) {
					collectDocs(curr.children)
				}
				if (curr.component) {
					actions.push({
						id: randomId(),
						parent: searchId,
						name: curr.name,
						shortcut: [],
						keywords: "api reference docs",
						section: curr.section,
						perform: () => history.push(curr.slug),
					})
				}
			})
			return actions
		}
		return collectDocs(kbar_demo_data)
	}, [])

	console.log({ searchActions })

	const rootSearchAction = useMemo(
		() =>
			searchActions.length
				? {
					id: searchId,
					name: "Search docs…",
					shortcut: ["?"],
					keywords: "find",
					section: "Documentation",
				}
				: null,
		[searchActions]
	)

	useRegisterActions([rootSearchAction, ...searchActions].filter(Boolean))
}

function randomId() {
	return Math.random().toString(36).substring(2, 9)
}