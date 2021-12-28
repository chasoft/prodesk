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
import { forEach, groupBy, sortBy } from "lodash"
import { useDeepCompareEffect } from "react-use"

//PROJECT IMPORT
import { useGetDocsQuery } from "@redux/slices/firestoreApi"
import { DOC_TYPE, EMPTY } from "@helpers/constants"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/**
 * get a single document based on docId
 * Usage:
 * 		- to open/view/edit a document (admin-side)
 * 		- to show a document to end-user (theme-side)
 */
function useGetDoc(docId, slug) {
	const [res, setRes] = useState({})

	const {
		data: docs = EMPTY.ARRAY,
		isLoading: isLoadingDocs
	} = useGetDocsQuery(undefined)

	useDeepCompareEffect(() => {
		if (slug) {
			setRes(docs.find((doc) => doc.docId === slug.substring(0, 12)))
		} else {
			setRes(docs.find((doc) => doc.docId === docId))
		}
	}, [docs, docId])

	return {
		data: res,
		isLoading: isLoadingDocs
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
		data: docs = EMPTY.ARRAY,
		isLoading: isLoadingDocs
	} = useGetDocsQuery(undefined)

	const [groupedDocs, setGroupedDocs] = useState([])

	useDeepCompareEffect(() => {

		if (isLoadingDocs || docs.length === 0) {
			setGroupedDocs([])
			return
		}

		let filteredDocs = docs

		if (slug) {
			//get parentDoc by docId provided in slug (the first 12 character of slug is docId)
			const docParent = docs.find(doc => doc.docId === slug.substring(0, 12))

			if (!docParent || ((docParent.type !== DOC_TYPE.CATEGORY) && (docParent.type !== DOC_TYPE.SUBCATEGORY))) {
				setGroupedDocs([])
				return
			}

			if (docParent.type === DOC_TYPE.CATEGORY) {
				filteredDocs = docs.filter(doc => doc?.categoryId === docParent.docId)
			}

			if (docParent.type === DOC_TYPE.SUBCATEGORY) {
				filteredDocs = docs.filter(
					doc => doc.categoryId === docParent.categoryId &&
						doc.subCategoryId === docParent.subCategoryId
				)

				setGroupedDocs(filteredDocs)
				return
			}
		}

		//first, we need to sort the docs by position
		const sortedDocs = sortBy(filteredDocs, ["categoryId", "subCategoryId", "position"])
		//then, we group docs by cat and then by subCat
		const groupByCat = groupBy(sortedDocs, (i) => i.categoryId)
		const groupByCatAndSub = forEach(groupByCat, function (value, key) {
			groupByCat[key] = groupBy(groupByCat[key], (i) => i.subCategoryId)
		})

		setGroupedDocs(Object.entries(groupByCatAndSub))

	}, [docs, slug, isLoadingDocs])

	return (
		{
			data: groupedDocs,
			isLoading: isLoadingDocs
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
		data: docs = EMPTY.ARRAY,
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