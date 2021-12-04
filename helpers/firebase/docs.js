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
import nanoid from "@helpers/nanoid"

//PROJECT IMPORT
import {
	DOC_STATUS,
	DOC_TYPE,
	RESERVED_KEYWORDS
} from "@helpers/constants"

/*****************************************************************
 * UTILTIES FUNCTIONS                                            *
 *****************************************************************/

/**
 * Compose a new docItem object template for `new document`
 * @param {string} categoryId
 * @param {string} subCategoryId
 * @param {string} username 
 * @returns docItem object
 */
export function docItemNewDoc(categoryId, subCategoryId, username) {
	const docId = nanoid()
	const incNumber = uniqueId()
	return {
		docId: docId,
		categoryId: categoryId,
		subCategoryId: subCategoryId ?? RESERVED_KEYWORDS.CAT_CHILDREN,
		type: DOC_TYPE.DOC,
		//
		createdBy: username,
		description: "",
		emoji: "",
		photo: "",
		photoColor: "#D3D3D3",
		publishedBy: "",
		publishedDate: 0,
		slug: `document-${incNumber}`,
		status: DOC_STATUS.DRAFT,
		tags: [],
		title: `Document #${incNumber}`,
		updatedBy: username,
		//
		position: 9999
	}
}

/**
 * Compose a new docItem object template for `new external link`
 * @param {string} categoryId
 * @param {string} subCategoryId
 * @param {string} username
 * @returns docItem object
 */
export function docItemNewExternal(categoryId, subCategoryId, username) {
	const docId = nanoid()
	const incNumber = uniqueId()
	return {
		docId: docId,
		categoryId: categoryId,
		subCategoryId: subCategoryId ?? RESERVED_KEYWORDS.CAT_CHILDREN,
		type: DOC_TYPE.EXTERNAL,
		//
		createdBy: username,
		description: "",
		emoji: "",
		photo: "",
		photoColor: "#D3D3D3",
		publishedBy: "",
		publishedDate: 0,
		status: DOC_STATUS.DRAFT,
		tags: [],
		title: `External link #${incNumber}`,
		updatedBy: username,
		url: "",
		//
		position: 9999
	}
}

/**
 * Compose a new docItem object template for `new sub-category`
 * @param {string} categoryId
 * @param {string} username
 * @param {string} customName
 * @returns docItem object
 */
export function docItemNewSubCategory(categoryId, username, customName) {
	const docId = nanoid()
	const incNumber = uniqueId()
	return {
		docId: docId,
		categoryId: categoryId,
		subCategoryId: docId,
		type: DOC_TYPE.SUBCATEGORY,
		//
		createdBy: username,
		description: "",
		emoji: "",
		photo: "",
		photoColor: "#D3D3D3",
		publishedBy: "",
		publishedDate: 0,
		slug: `subcategory-${incNumber}`,
		status: DOC_STATUS.DRAFT,
		tags: [],
		title: customName ?? `SubCategory #${incNumber}`,
		updatedBy: username,
		//
		position: 9999
	}
}

/**
 * Compose a new docItem object template for `new category`
 * @param {string} username
 * @param {string} customName
 * @returns docItem object
 */
export function docItemNewCategory(username, customName) {
	const docId = nanoid()
	const incNumber = uniqueId()
	return {
		docId: docId,
		categoryId: docId,
		type: DOC_TYPE.CATEGORY,
		//
		createdBy: username,
		description: "",
		emoji: "",
		photo: "",
		photoColor: "#D3D3D3",
		publishedBy: "",
		publishedDate: 0,
		slug: `category-${incNumber}`,
		status: DOC_STATUS.DRAFT,
		tags: [],
		title: customName ?? `Category #${incNumber}`,
		updatedBy: username,
		//
		position: 9999
	}
}

