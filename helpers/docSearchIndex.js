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

import { useState, useCallback } from "react"

//THIRD-PARTY
import dayjs from "dayjs"

//PROJECT IMPORT
import { useUpdateDocSearchIndexMutation } from "@redux/slices/firestoreApi"
import { requestSilentRefetching } from "@helpers/realtimeApi"

import {
	DOC_TYPE,
	RESERVED_KEYWORDS
} from "@helpers/constants"

import {
	_getDocs,
	updateDocSearchIndex
} from "@redux/slices/firestoreApiBase"

import {
	ACTIONS,
	TYPE
} from "@redux/slices/firestoreApiConstants"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function useCreateDocSearchIndex() {
	const [progress, setProgress] = useState(0)
	const [isCreating, setIsCreating] = useState(false)
	const [updateDocSearchIndex] = useUpdateDocSearchIndexMutation()

	// const getDocContent = useCallback(async (docId) => {
	// 	try {
	// 		let docItemContent = {}
	// 		const docSnap = await getDoc(
	// 			doc(db,
	// 				COLLECTION.DOCS, docId,
	// 				"content", "current"
	// 			)
	// 		)
	// 		if (docSnap.exists()) { docItemContent = docSnap.data() }
	// 		return docItemContent?.text
	// 	} catch (e) {
	// 		return e
	// 	}
	// }, [])

	// const collectAllDocContent = useCallback(async (docs, progressIncrement = 1) => {
	// 	setProgress(0)
	// 	return Promise.all(docs.map(async (doc) => {
	// 		if (doc.type === DOC_TYPE.DOC) {
	// 			const docContent = await getDocContent(doc.docId)
	// 			setProgress(p => p + progressIncrement)
	// 			return ({ ...doc, content: docContent })
	// 		} else {
	// 			setProgress(p => p + progressIncrement)
	// 			return doc
	// 		}
	// 	}))
	// }, [getDocContent])

	/**
	 * total progress = docs.length + 2
	 */

	const createSearchIndex = useCallback(async (docs = [], username) => {

		setIsCreating(true)
		const progressIncrement = Math.floor(100 / (docs.length + 2))
		// const allDocsWithContent = await collectAllDocContent(docs, progressIncrement)

		//shorten the list & enrich the items
		let searchIndexes = []

		docs.forEach(doc => {
			if (
				doc.type === DOC_TYPE.CATEGORY
				|| doc.type === DOC_TYPE.SUBCATEGORY
			) return

			const cat = docs.find((item) => item.docId === doc.categoryId)
				?? ""

			const subCat = (doc.subCategoryId === RESERVED_KEYWORDS.CAT_CHILDREN)
				? ""
				: docs.find((item) => item.docId === doc.subCategoryId) ?? ""

			searchIndexes.push({
				id: doc.docId,
				name: doc.title,
				slug: doc.slug
					? `/articles/${doc.docId}-${doc.slug}`
					: doc.url,
				subtitle: doc.description,
				icon: doc.emoji,
				keywords: doc.tags.join(" "),
				section: (cat ? cat.title : "Uncategoried") +
					(subCat ? (" / " + subCat.title) : "")
			})
		})

		setProgress(p => p + progressIncrement)

		//serialized
		// const docIndexes = Fuse.createIndex(
		// 	[
		// 		"title",
		// 		"slug",
		// 		"description",
		// 		"content",
		// 		"section",
		// 	],
		// 	shortedList
		// )

		// const fuseIndex = JSON.stringify(docIndexes.toJSON())

		//save to firestore
		await updateDocSearchIndex({
			searchIndexes,
			// fuseIndex,
			updatedAt: dayjs().valueOf(),
			updatedBy: username
		})

		setProgress(p => p + progressIncrement)
		setIsCreating(false)

		const invalidatesTags = {
			trigger: "__",
			tag: [{ type: TYPE.DOCS, id: ACTIONS.GET_DOC_SEARCH_INDEX }],
			target: {
				isForUser: true,
				isForAdmin: true,
			}
		}
		await requestSilentRefetching(invalidatesTags)

		return true

	}, [updateDocSearchIndex])

	return ([createSearchIndex, { isCreating, progress }])
}

/**
 * this version is used for kBar
 * duplicate the function above
 */
export async function _createDocSearchIndex(username) {

	const docs = await _getDocs()

	let searchIndexes = []

	docs.forEach(doc => {
		if (
			doc.type === DOC_TYPE.CATEGORY
			|| doc.type === DOC_TYPE.SUBCATEGORY
		) return

		const cat = docs.find((item) => item.docId === doc.categoryId)
			?? ""

		const subCat = (doc.subCategoryId === RESERVED_KEYWORDS.CAT_CHILDREN)
			? ""
			: docs.find((item) => item.docId === doc.subCategoryId) ?? ""

		searchIndexes.push({
			id: doc.docId,
			name: doc.title,
			slug: doc.slug
				? `/articles/${doc.docId}-${doc.slug}`
				: doc.url,
			subtitle: doc.description,
			icon: doc.emoji,
			keywords: doc.tags.join(" "),
			section: (cat ? cat.title : "Uncategoried") +
				(subCat ? (" / " + subCat.title) : "")
		})
	})

	//save to firestore
	await updateDocSearchIndex({
		searchIndexes,
		// fuseIndex,
		updatedAt: dayjs().valueOf(),
		updatedBy: username
	})

	//silence refetch
	const invalidatesTags = {
		trigger: "__",
		tag: [{ type: TYPE.DOCS, id: ACTIONS.GET_DOC_SEARCH_INDEX }],
		target: {
			isForUser: true,
			isForAdmin: true,
		}
	}
	await requestSilentRefetching(invalidatesTags)
}