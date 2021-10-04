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

/*
	Structure of documentation collection
	/root/collection/{docId}/::....
	/root/collection/{docId}/content/{current}/::text
	/root/collection/{docId}/content/{history1...10}/::text
*/

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import {
	collection, doc, getDoc, getDocs, deleteDoc, query, where, writeBatch, updateDoc, serverTimestamp
} from "firebase/firestore"

//THIRD-PARTY

//PROJECT IMPORT
import { db } from "."
import { DOC_TYPE } from "./../constants"

/*****************************************************************
 * READ                                                          *
 *****************************************************************/

//this is for reading document's content
export const docsGetContent = async (docId) => {
	let docItemContent = ""
	try {
		const docSnap = await getDoc(doc(db, "documentation", docId, "content", "current"))
		if (docSnap.exists()) docItemContent = docSnap.data().text
	} catch (e) {
		throw new Error("Something wrong happenned when trying to get doc's content.")
	}
	return docItemContent
}

/*****************************************************************
 * WRITE                                                         *
 *****************************************************************/

//Just add new records, nothing to take care
export const docsAdd = async (docItem) => {
	const batch = writeBatch(db)
	try {
		batch.set(doc(db, "documentation", docItem.docId), { docItem })
		if (docItem.type === DOC_TYPE.DOC)
			batch.set(doc(db, "documentation", docItem.docId, "content", "current"), { text: "" })
		await batch.commit()
	} catch (e) {
		throw new Error(e.message)
	}
}

//if docItem.type === DOC || EXTERNAL => just update
//if docItem.type === CAT || SUBCAT => change all mirros
//eg: change Category name => change all records with new Category name...etc
//Note: affectedItems is used for updating Category and Sub-category only
// affectedItems is a array of docId which we need to update data.
export const docsUpdate = async (docItem, affectedItems = []) => {
	if (docItem.type === DOC_TYPE.EXTERNAL || docItem.type === DOC_TYPE.DOC) {
		try {
			await updateDoc(
				doc(db, "documentation", docItem.docId),
				{
					...docItem,
					updatedAt: serverTimestamp()
				}
			)
		} catch (e) {
			throw new Error(e.message)
		}
	}

	if (docItem.type === DOC_TYPE.CATEGORY) {
		const batch = writeBatch(db)
		try {
			affectedItems.forEach((affectedItem) => {
				batch.update(
					doc(db, "documentation", affectedItem.docId),
					{
						updatedAt: serverTimestamp(),
						...(affectedItem.type === DOC_TYPE.CATEGORY)
							? { ...docItem, updatedAt: serverTimestamp() }
							: { category: docItem.category }
					}
				)
			})
			await batch.commit()
		} catch (e) {
			throw new Error(e.message)
		}
	}

	if (docItem.type === DOC_TYPE.SUBCATEGORY) {
		const batch = writeBatch(db)
		try {
			affectedItems.forEach((affectedItem) => {
				batch.update(
					doc(db, "documentation", affectedItem.docId),
					{
						updatedAt: serverTimestamp(),
						...(affectedItem.type === DOC_TYPE.SUBCATEGORY)
							? { ...docItem, updatedAt: serverTimestamp() }
							: { subcategory: docItem.subcategory }
					}
				)
			})
			await batch.commit()
		} catch (e) {
			throw new Error(e.message)
		}
	}
}

//if docItem.type === DOC || EXTERNAL => just delete
//if docItem.type === CAT || SUBCAT => only allow to delete if they are Empty
//TODO: @next-version will enhance this behaviour of CAT & SUBCAT
export const docsDelete = async (docItem) => {
	if (docItem.type === DOC_TYPE.EXTERNAL || docItem.type === DOC_TYPE.DOC) {
		try {
			//must delete sub-collection "content" first,
			//then, you can delete the docItem, else it would fail
			await deleteDoc(doc(db, "documentation", docItem.docId))
		} catch (e) {
			throw new Error(e.message)
		}
	}

	if (docItem.type === DOC_TYPE.CATEGORY) {
		try {
			//query to check if category is empty or not
			//We need to check directly because deleting is serious,
			//if anything wrong, this would be unrecoverable.
			const q = query(
				collection(db, "documentation"),
				where("category", "==", docItem.category)
			)
			const querySnapshot = await getDocs(q)
			//Only delete category when it is empty
			if (querySnapshot.length === 1) {
				await deleteDoc(doc(db, "documentation", docItem.docId))
			} else {
				throw new Error("You can only delete empty category!")
			}
		} catch (e) {
			throw new Error(e.message)
		}
	}

	if (docItem.type === DOC_TYPE.SUBCATEGORY) {
		try {
			//query to check if sub-category is empty or not
			//We need to check directly because deleting is serious,
			//if anything wrong, this would be unrecoverable.
			const q = query(
				collection(db, "documentation"),
				where("category", "==", docItem.category),
				where("subcategory", "==", docItem.subcategory)
			)
			const querySnapshot = await getDocs(q)
			//Only delete category when it is empty
			if (querySnapshot.length === 1) {
				await deleteDoc(doc(db, "documentation", docItem.docId))
			} else {
				throw new Error("You can only delete empty sub-category!")
			}
		} catch (e) {
			throw new Error(e.message)
		}
	}
}

