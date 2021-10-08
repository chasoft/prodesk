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

//THIRD-PARTY
import { uniqueId } from "lodash"
import { nanoid } from "nanoid"

//PROJECT IMPORT
import { DOC_STATUS, DOC_TYPE, RESERVED_KEYWORDS } from "./../constants"

/*****************************************************************
 * UTILTIES FUNCTIONS                                            *
 *****************************************************************/

/**
 * Compose a new docItem object template for `new document`
 * @param {*} targetDocItem 
 * @param {*} username 
 * @returns docItem object
 */
export const docItemNewDoc = (targetDocItem, username) => {
	const docId = nanoid(7)
	const incNumber = uniqueId()
	return {
		docId: docId,
		type: DOC_TYPE.DOC,
		category: targetDocItem.category,
		subcategory: targetDocItem.subcategory ?? RESERVED_KEYWORDS.CAT_CHILDREN,
		title: `Document ${docId} #${incNumber}`,
		description: "",
		slug: `document-${docId}-${incNumber}`,
		tags: [],
		status: DOC_STATUS.DRAFT,
		createdBy: username,
		updatedBy: username,
	}
}

/**
 * Compose a new docItem object template for `new external link`
 * @param {*} targetDocItem
 * @param {*} username
 * @returns docItem object
 */
export const docItemNewExternal = (targetDocItem, username) => {
	const docId = nanoid(7)
	const incNumber = uniqueId()
	return {
		docId: docId,
		type: DOC_TYPE.EXTERNAL,
		category: targetDocItem.category,
		subcategory: targetDocItem.subcategory ?? RESERVED_KEYWORDS.CAT_CHILDREN,
		url: "",
		title: `External link ${docId} #${incNumber}`,
		description: "",
		tags: [],
		status: DOC_STATUS.DRAFT,
		createdBy: username,
		updatedBy: username,
	}
}

/**
 * Compose a new docItem object template for `new external sub-category`
 * @param {*} targetDocItem
 * @param {*} username
 * @returns docItem object
 */
export const docItemNewSubCategory = (targetDocItem, username) => {
	const docId = nanoid(7)
	const incNumber = uniqueId()
	return {
		docId: docId,
		type: DOC_TYPE.SUBCATEGORY,
		category: targetDocItem.category,
		subcategory: `SubCategory ${docId} #${incNumber}`,
		slug: `subcategory-${docId}-${incNumber}`,
		description: "",
		createdBy: username,
		updatedBy: username,
	}
}

/**
 * Compose a new docItem object template for `new external category`
 * @param {*} targetDocItem
 * @param {*} username
 * @returns docItem object
 */
export const docItemNewCategory = (username) => {
	const docId = nanoid(7)
	const incNumber = uniqueId()
	return {
		docId: docId,
		type: DOC_TYPE.CATEGORY,
		category: `Category ${docId} #${incNumber}`,
		slug: `category-${docId}-${incNumber}`,
		description: "",
		createdBy: username,
		updatedBy: username,
	}
}

