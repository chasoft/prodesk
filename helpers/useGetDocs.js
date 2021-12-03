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

import { useRef, useState } from "react"

//THIRD-PARTY
import { forEach, groupBy, isEqual, sortBy } from "lodash"
import { useDeepCompareEffect, usePrevious } from "react-use"

//PROJECT IMPORT
import { useGetDocsQuery } from "@redux/slices/firestoreApi"
import { DOC_TYPE } from "@helpers/constants"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/**
 * get a single document based on docId
 * Usage:
 * 		- to open/view/edit a document (admin-side)
 * 		- to show a document to end-user (theme-side)
 */
function useGetDoc(docId) {
	const {
		data: docs = [],
		isLoading: isLoadingDocs
	} = useGetDocsQuery(undefined)

	const foundDoc = useRef(undefined)
	const prevDocs = usePrevious(docs)
	const prevDocId = usePrevious(docId)

	if (isLoadingDocs) return {
		data: foundDoc.current,
		isLoading: true
	}

	if (isEqual(prevDocs, docs) === false || docId !== prevDocId) {
		foundDoc.current = docs.find((doc) => doc.docId === docId)
	}

	return {
		data: foundDoc.current,
		isLoading: false
	}
}

/**
 * get all documents and group by Cat and Subcat,
 * @param {array} slug
 * @returns grouped docs
 * @usage
 * 		- for admin side leave the parameters empty
 * 		- for public user, load grouped docs by category or subcat
 */
function useGetDocsGrouped(slug) {
	const {
		data: docs = [],
		isLoading: isLoadingDocs
	} = useGetDocsQuery(undefined)

	const prevData = usePrevious(docs)
	const prevSlug = usePrevious(slug)
	//we use useRef here because, later we change the value
	//and, this hook will not be re-render,
	const groupedDocs = useRef()

	if (isLoadingDocs) { return ({ data: [], isLoading: true }) }

	if (isEqual(prevData, docs) === false || prevSlug !== slug) {

		let filteredDocs = docs

		//get all valid docs
		if (slug) {
			//get parentDoc by docId provided in slug (the first 12 character of slug is docId)
			const docParent = docs.find(doc => doc.docId === slug.substring(0, 12))

			if (!docParent || ((docParent.type !== DOC_TYPE.CATEGORY) && (docParent.type !== DOC_TYPE.SUBCATEGORY))) {
				return ({ data: [], isLoading: false })
			}

			if (docParent.type === DOC_TYPE.CATEGORY) {
				filteredDocs = docs.filter(doc => doc.category === docParent.category)
			}
			if (docParent.type === DOC_TYPE.SUBCATEGORY) {
				filteredDocs = docs.filter(
					doc => doc.category === docParent.category &&
						doc.subcategory === docParent.subcategory
				)

				return ({ data: filteredDocs, isLoading: false })
			}
		}

		//first, we need to sort the docs by position
		const sortedDocs = sortBy(filteredDocs, ["category", "subcategory", "position"])
		//then, we group docs by cat and then by subCat
		const groupByCat = groupBy(sortedDocs, (i) => i.category)
		const groupByCatAndSub = forEach(groupByCat, function (value, key) {
			groupByCat[key] = groupBy(groupByCat[key], (i) => i.subcategory)
		})

		groupedDocs.current = Object.entries(groupByCatAndSub)
	}

	return (
		{
			data: groupedDocs.current,
			isLoading: false
		}
	)
}

/**
 * get a list of DOC_TYPE === CATEGORY || DOC_TYPE === SUB_CATEGORY
 * Usage:
 * 		- list categories (for Frontpage of theme)
 */
function useGetDocsCategoriesList() {
	const [list, setList] = useState([])

	const {
		data: docs = [],
		isLoading: isLoadingDocs
	} = useGetDocsQuery(undefined)

	useDeepCompareEffect(() => {
		setList(docs.filter(doc => doc.type === DOC_TYPE.CATEGORY))
	}, [docs])

	return ({
		data: list,
		isLoading: isLoadingDocs
	})
}

export {
	useGetDoc,
	useGetDocsGrouped,
	useGetDocsCategoriesList,
}