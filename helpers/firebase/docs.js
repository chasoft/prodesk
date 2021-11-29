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
 * @param {string} category
 * @param {string} subcategory
 * @param {string} username 
 * @returns docItem object
 */
export const docItemNewDoc = (category, subcategory, username) => {
	const docId = nanoid()
	const incNumber = uniqueId()
	return {
		category: category,
		createdBy: username,
		description: "",
		docId: docId,
		//
		slug: `document-${docId.substring(0, 3)}-${incNumber}`,
		status: DOC_STATUS.DRAFT,
		subcategory: subcategory ?? RESERVED_KEYWORDS.CAT_CHILDREN,
		tags: [],
		title: `Document #${incNumber}`,
		type: DOC_TYPE.DOC,
		updatedBy: username,
		//
		publishedBy: "",
		publishedDate: 0,
		//
		position: 9999
	}
}

/**
 * Compose a new docItem object template for `new external link`
 * @param {string} category
 * @param {string} subcategory
 * @param {string} username
 * @returns docItem object
 */
export const docItemNewExternal = (category, subcategory, username) => {
	const docId = nanoid()
	const incNumber = uniqueId()
	return {
		category: category,
		createdBy: username,
		description: "",
		docId: docId,
		//
		status: DOC_STATUS.DRAFT,
		subcategory: subcategory ?? RESERVED_KEYWORDS.CAT_CHILDREN,
		tags: [],
		title: `External link ${docId.substring(0, 3)} #${incNumber}`,
		type: DOC_TYPE.EXTERNAL,
		updatedBy: username,
		url: "",
		//
		publishedBy: "",
		publishedDate: 0,
		//
		position: 9999
	}
}

/**
 * Compose a new docItem object template for `new external sub-category`
 * @param {string} category
 * @param {string} username
 * @returns docItem object
 */
export const docItemNewSubCategory = (category, username, customName) => {
	const docId = nanoid()
	const incNumber = uniqueId()
	return {
		category: category,
		createdBy: username,
		description: "",
		docId: docId,
		//
		status: DOC_STATUS.DRAFT,
		slug: `subcategory-${docId.substring(0, 3)}-${incNumber}`,
		subcategory: customName ?? `SubCategory #${incNumber}`,
		tags: [],
		type: DOC_TYPE.SUBCATEGORY,
		updatedBy: username,
		//
		publishedBy: "",
		publishedDate: 0,
		//
		position: 9999
	}
}

/**
 * Compose a new docItem object template for `new external category`
 * @param {*} targetDocItem
 * @param {*} username
 * @returns docItem object
 */
export const docItemNewCategory = (username, customName) => {
	const docId = nanoid()
	const incNumber = uniqueId()
	return {
		category: customName ?? `Category #${incNumber}`,
		createdBy: username,
		description: "",
		docId: docId,
		//
		status: DOC_STATUS.DRAFT,
		slug: `category-${docId.substring(0, 3)}-${incNumber}`,
		tags: [],
		type: DOC_TYPE.CATEGORY,
		updatedBy: username,
		//
		publishedBy: "",
		publishedDate: 0,
		//
		position: 9999
	}
}

