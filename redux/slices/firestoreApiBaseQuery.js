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

import {
	collection, doc, getDoc, setDoc, getDocs, deleteDoc, query, where, writeBatch, updateDoc, serverTimestamp
} from "firebase/firestore"

//THIRD-PARTY

//PROJECT IMPORT
import { DOC_TYPE } from "./../../helpers/constants"
import { db } from "./../../helpers/firebase"
import { ACTION, COLLECTION } from "./firestoreApiConstants"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function throwError(statusCode, action, e, data) {
	return {
		error: {
			status: statusCode,
			data: {
				action: action,
				message: e.message,
				data: data
			}
		}
	}
}

// async function fireStoreBaseQuery(args, { signal, dispatch, getState }, extraOptions) {
async function fireStoreBaseQuery(args) {

	switch (args.action) {
		//get all documents
		case ACTION.GET_DOCS:
			try {
				let all = []
				const querySnapshot = await getDocs(collection(db, COLLECTION.DOCS))
				querySnapshot.forEach((doc) => { all.push(doc.data()) })
				return { data: all }
			} catch (e) {
				return throwError(200, ACTION.GET_DOCS, e, null)
			}
		case ACTION.GET_DOC:
			try {
				let docItem = {}
				const docSnap = await getDoc(doc(db, COLLECTION.DOCS, args.docId))
				if (docSnap.exists()) { docItem = docSnap.data() }
				return { data: docItem }
			} catch (e) {
				return throwError(200, ACTION.GET_DOC, e, null)
			}
		case ACTION.GET_CONTENT:
			try {
				let docItemContent = ""
				const docSnap = await getDoc(doc(db, COLLECTION.DOCS, args.docId, "content", "current"))
				if (docSnap.exists()) { docItemContent = docSnap.data() }
				console.log({ docItemContent })
				return { data: docItemContent }
			} catch (e) {
				return throwError(200, ACTION.GET_CONTENT, e, "")
			}
		case ACTION.ADD_DOC:
			try {
				const batch = writeBatch(db)
				batch.set(
					doc(db, COLLECTION.DOCS, args.body.docItem.docId),
					{
						...args.body.docItem,
						createdAt: serverTimestamp(),
						updatedAt: serverTimestamp()
					}
				)
				if (args.body.docItem.type === DOC_TYPE.DOC)
					batch.set(doc(db, COLLECTION.DOCS, args.body.docItem.docId, "content", "current"), { text: "" })
				await batch.commit()
				return {
					data: {
						action: ACTION.ADD_DOC,
						id: args.body.docItem.docId,
						message: "doc added successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.ADD_DOC, e, {
					id: args.body.docItem.docId
				})
			}
		case ACTION.UPDATE_DOC:
			try {
				if (args.body.docItem.type === DOC_TYPE.EXTERNAL || args.body.docItem.type === DOC_TYPE.DOC) {
					await updateDoc(
						doc(db, COLLECTION.DOCS, args.body.docItem.docId),
						{
							...args.body.docItem,
							updatedAt: serverTimestamp()
						}
					)
					return {
						data: {
							action: ACTION.UPDATE_DOC,
							id: args.body.docItem.docId,
							message: "Doc or External link updated successfully"
						}
					}
				}

				if (args.body.docItem.type === DOC_TYPE.CATEGORY) {
					const batch = writeBatch(db)
					args.body.affectedItems.forEach((affectedItem) => {
						batch.update(
							doc(db, COLLECTION.DOCS, affectedItem.docId),
							{
								updatedAt: serverTimestamp(),
								...(affectedItem.type === DOC_TYPE.CATEGORY)
									? { ...args.body.docItem, updatedAt: serverTimestamp() }
									: { category: args.body.docItem.category }
							}
						)
					})
					await batch.commit()
					return {
						data: {
							action: ACTION.UPDATE_DOC,
							id: args.body.docItem.docId,
							message: "category updated successfully"
						}
					}
				}

				if (args.body.docItem.type === DOC_TYPE.SUBCATEGORY) {
					const batch = writeBatch(db)
					args.body.affectedItems.forEach((affectedItem) => {
						batch.update(
							doc(db, COLLECTION.DOCS, affectedItem.docId),
							{
								updatedAt: serverTimestamp(),
								...(affectedItem.type === DOC_TYPE.SUBCATEGORY)
									? { ...args.body.docItem, updatedAt: serverTimestamp() }
									: { subcategory: args.body.docItem.subcategory }
							}
						)
					})
					await batch.commit()
					return {
						data: {
							action: ACTION.UPDATE_DOC,
							id: args.body.docItem.docId,
							message: "SubCategory updated successfully"
						}
					}
				}
			} catch (e) {
				return throwError(200, ACTION.UPDATE_DOC, e, {
					id: args.body.docItem.docId
				})
			}
			break
		case ACTION.UPDATE_CONTENT:
			try {
				const batch = writeBatch(db)
				batch.update(
					doc(db, COLLECTION.DOCS, args.body.docItem.docId, "content", "current"),
					args.body.content
				)
				batch.update(
					doc(db, COLLECTION.DOCS, args.body.docItem.docId),
					{ updatedBy: args.body.docItem.updatedBy }
				)
				await batch.commit()
				return {
					data: {
						action: ACTION.UPDATE_CONTENT,
						id: args.body.docItem.docId,
						message: "DocContent updated successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.UPDATE_CONTENT, e, {
					id: args.body.docItem.docId
				})
			}
		case ACTION.DELETE_DOC:
			try {
				if (args.body.docItem.type === DOC_TYPE.EXTERNAL) {
					await deleteDoc(doc(db, COLLECTION.DOCS, args.body.docItem.docId))
					return {
						data: {
							action: ACTION.DELETE_DOC,
							id: args.body.docItem.docId,
							message: "External Link deleted successfully"
						}
					}
				}

				if (args.body.docItem.type === DOC_TYPE.DOC) {
					await deleteDoc(doc(db, COLLECTION.DOCS, args.body.docItem.docId, "content", "current"))
					await deleteDoc(doc(db, COLLECTION.DOCS, args.body.docItem.docId))
					return {
						data: {
							action: ACTION.DELETE_DOC,
							id: args.body.docItem.docId,
							message: "Doc deleted successfully"
						}
					}
				}

				if (args.body.docItem.type === DOC_TYPE.CATEGORY) {
					//query to check if category is empty or not
					//We need to check directly because deleting is serious,
					//if anything wrong, this would be unrecoverable.
					const q = query(
						collection(db, COLLECTION.DOCS),
						where("category", "==", args.body.docItem.category)
					)
					const querySnapshot = await getDocs(q)
					//Only delete category when it is empty
					if (querySnapshot.docs.length === 1) {
						await deleteDoc(doc(db, COLLECTION.DOCS, args.body.docItem.docId))
						return {
							data: {
								action: ACTION.DELETE_DOC,
								id: args.body.docItem.docId,
								message: "Category deleted successfully"
							}
						}
					}
					//if the code reach here, means... can not delete selected item
					return throwError(
						200,
						ACTION.DELETE_DOC,
						{ message: "You can only delete empty category!" },
						{ id: args.body.docItem.docId }
					)
				}

				if (args.body.docItem.type === DOC_TYPE.SUBCATEGORY) {
					//query to check if sub-category is empty or not
					//We need to check directly because deleting is serious,
					//if anything wrong, this would be unrecoverable.

					const q = query(
						collection(db, COLLECTION.DOCS),
						where("category", "==", args.body.docItem.category),
						where("subcategory", "==", args.body.docItem.subcategory)
					)
					const querySnapshot = await getDocs(q)
					//Only delete category when it is empty
					if (querySnapshot.docs.length === 1) {
						await deleteDoc(doc(db, COLLECTION.DOCS, args.body.docItem.docId))
						return {
							data: {
								action: ACTION.DELETE_DOC,
								id: args.body.docItem.docId,
								message: "SubCategory deleted successfully"
							}
						}
					}
					//if the code reach here, means... can not delete selected item
					return throwError(
						200,
						ACTION.DELETE_DOC,
						{ message: "You can only delete empty sub-category!" },
						{ id: args.body.docItem.docId }
					)
				}
			} catch (e) {
				return throwError(200, ACTION.DELETE_DOC, e, {
					id: args.body.docItem.docId
				})
			}
			break
		case ACTION.GET_APPSETTINGS:
			try {
				let settings = {}
				const docSnap = await getDoc(doc(db, COLLECTION.SETTINGS, "settings"))
				if (docSnap.exists()) settings = docSnap.data()
				return { data: settings }
			} catch (e) {
				return throwError(200, ACTION.GET_APPSETTINGS, e, null)
			}
		case ACTION.UPDATE_APPSETTINGS:
			try {
				await setDoc(
					doc(db, COLLECTION.SETTINGS, "settings"),
					{ ...args.body },
					{ merge: true }
				)
				return {
					data: {
						action: ACTION.UPDATE_APPSETTINGS,
						message: "Settings updated successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.UPDATE_APPSETTINGS, e, null)
			}
		default:
			return throwError(200, "OUT OF ACTION RANGE", { message: "OUT OF ACTION RANGE" }, null)
	}
}

export default fireStoreBaseQuery