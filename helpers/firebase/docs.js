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

import { collection, doc, getDoc, getDocs, query, where, limit, setDoc, writeBatch } from "firebase/firestore"

//THIRD-PARTY

//PROJECT IMPORT
import { auth, db } from "."

/*****************************************************************
 * CATEGORY                                                      *
 *****************************************************************/

export const docsAddCategory = async (docItem) => {
	try {
		// await setDoc(doc(db, "documentation", docItem.docId), { docItem })
	} catch (err) {
		throw new Error(err.message)
	}
}

export const docsDeleteCategory = async (docItem) => {
	try {
		// await setDoc(doc(db, "documentation", docItem.docId), { docItem })
	} catch (err) {
		throw new Error(err.message)
	}
}

export const docsUpdateCategory = async (docId, data) => {
	try {
		// await setDoc(doc(db, "documentation", docItem.docId), { docItem })
	} catch (err) {
		throw new Error(err.message)
	}
}

/*****************************************************************
 * SUB-CATEGORY                                                  *
 *****************************************************************/

export const docsAddSubCategory = async (docItem) => {
	try {
		// await setDoc(doc(db, "documentation", docItem.docId), { docItem })
	} catch (err) {
		throw new Error(err.message)
	}
}


export const docsDeleteSubCategory = async (docItem) => {
	try {
		// await setDoc(doc(db, "documentation", docItem.docId), { docItem })
	} catch (err) {
		throw new Error(err.message)
	}
}

export const docsUpdateSubCategory = async (docId, data) => {
	try {
		// await setDoc(doc(db, "documentation", docItem.docId), { docItem })
	} catch (err) {
		throw new Error(err.message)
	}
}

/*****************************************************************
 * EXTERNAL LINK                                                 *
 *****************************************************************/


export const docsAddExternalLink = async (docItem) => {
	try {
		// await setDoc(doc(db, "documentation", docItem.docId), { docItem })
	} catch (err) {
		throw new Error(err.message)
	}
}


export const docsDeleteExternalLink = async (docItem) => {
	try {
		// await setDoc(doc(db, "documentation", docItem.docId), { docItem })
	} catch (err) {
		throw new Error(err.message)
	}
}

export const docsUpdateExternalLink = async (docId, data) => {
	try {
		// await setDoc(doc(db, "documentation", docItem.docId), { docItem })
	} catch (err) {
		throw new Error(err.message)
	}
}


/*****************************************************************
 * DOCUMENT                                                      *
 *****************************************************************/

export const docsAddDoc = async (docItem) => {
	try {
		// await setDoc(doc(db, "documentation", docItem.docId), { docItem })
	} catch (err) {
		throw new Error(err.message)
	}
}


export const docsDeleteDoc = async (docItem) => {
	try {
		// await setDoc(doc(db, "documentation", docItem.docId), { docItem })
	} catch (err) {
		throw new Error(err.message)
	}
}

export const docsUpdateDoc = async (docId, data) => {
	try {
		//!! update at 2 locations
		// await setDoc(doc(db, "documentation", docItem.docId), { docItem })
	} catch (err) {
		throw new Error(err.message)
	}
}