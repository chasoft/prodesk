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
import { createUserWithEmailAndPassword } from "firebase/auth"

//THIRD-PARTY

//PROJECT IMPORT
import { DOC_TYPE, USERGROUP, REDIRECT_URL } from "./../../helpers/constants"
import { auth, db } from "./../../helpers/firebase"
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

		/*****************************************************************
		 * SIGN-UP         	                                             *
		 *****************************************************************/
		case ACTION.SIGN_UP_WITH_EMAIL:
			try {
				//Check username availabitity
				const res = await isUsernameAvailable(username)
				if (res.error)
					return throwError(
						200, ACTION.SIGN_UP_WITH_EMAIL,
						{ message: res.error }, null
					)

				if (res.isUsernameAvailable === false)
					return throwError(
						200, ACTION.SIGN_UP_WITH_EMAIL,
						{ message: "Username existed." }, null
					)

				const userCredential = createUserWithEmailAndPassword(auth, args.email, args.password)

				const batch = writeBatch(db)
				batch.set(doc(db, COLLECTION.USERS, userCredential.user.uid), {
					uid: [userCredential.user.uid],	//!all associated account will be stored here in an Array
					username: args.username,
					email: userCredential.user.email,
					displayName: args.name,
					photoURL: userCredential.user.providerData[0].photoURL ?? "/img/default-avatar.png",
				})
				batch.set(doc(db, COLLECTION.USERNAMES, args.username), {
					uid: [userCredential.user.uid],	//!all associated account will be stored here in an Array
					username: args.username,
					email: userCredential.user.email,
					group: USERGROUP.USER, //default usergroup
					nextStep: REDIRECT_URL.CREATE_PROFILE
				})
				await batch.commit()

				//TODO: verify email!!! userCredential.user.sendEmailVerification()

				return { data: "Account created successfully!", redirect: REDIRECT_URL.CREATE_PROFILE }
			} catch (e) {
				return throwError(200, ACTION.SIGN_UP_WITH_EMAIL, e, null)
			}

		case ACTION.SIGN_UP_VIA_GOOGLE:
			try {
				const batch = writeBatch(db)
				batch.set(doc(db, COLLECTION.USERS, args.uid), {
					uid: [args.uid],
					email: args.email,
					username: args.username,
					displayName: args.name,
					photoURL: args.photoURL,
				})
				batch.set(doc(db, COLLECTION.USERNAMES, args.username), {
					uid: [args.uid],	//all associated account will be stored here in an Array
					username: args.username,
					email: args.email,
					group: "user", //default usergroup
					nextStep: REDIRECT_URL.CREATE_PROFILE
				})
				await batch.commit()

				//Go to next step -> /signup/create-profile  (to update avatar & location)
				// router.push(REDIRECT_URL.CREATE_PROFILE)
				dispatch(setRedirect(REDIRECT_URL.CREATE_PROFILE))
				// }
				// catch (e) {
				// 	console.log(e.message)
				// 	enqueueSnackbar(e.message, { key: "signUpViaSocialAccount", variant: "error" })
				// }

			} catch (e) {
				return throwError(200, ACTION.SIGN_UP_VIA_SOCIAL, e, null)
			}
			break

		case ACTION.SIGN_UP_CREATE_PROFILE:
			try {
				//
			} catch (e) {
				return throwError(200, ACTION.SIGN_UP_CREATE_PROFILE, e, null)
			}
			break

		case ACTION.SIGN_UP_SURVEY:
			try {
				//
			} catch (e) {
				return throwError(200, ACTION.SIGN_UP_SURVEY, e, null)
			}
			break

		/*****************************************************************
		 * PROFILE         	                                             *
		 *****************************************************************/
		case ACTION.GET_PROFILES:
			try {
				let all = []
				const querySnapshot = await getDocs(collection(db, COLLECTION.USERS))
				querySnapshot.forEach((user) => { all.push(user.data()) })
				return { data: all }
			} catch (e) {
				return throwError(200, ACTION.GET_PROFILES, e, null)
			}

		case ACTION.GET_PROFILE:
			try {
				let res = []
				const q = query(
					collection(db, COLLECTION.USERS),
					where("uid", "in", [args.uid])
				)
				const querySnapshot = await getDocs(q)
				querySnapshot.forEach((user) => { res.push(user.data()) })
				return { data: res[0] ?? {} }
			} catch (e) {
				return throwError(200, ACTION.GET_PROFILE, e, null)
			}

		case ACTION.GET_PROFILE_BY_USERNAME:
			try {
				let res = []
				const q = query(
					collection(db, COLLECTION.USERS),
					where("username", "==", args.username)
				)
				const querySnapshot = await getDocs(q)
				querySnapshot.forEach((user) => { res.push(user.data()) })
				return { data: res[0] ?? {} }
			} catch (e) {
				return throwError(200, ACTION.GET_PROFILE_BY_USERNAME, e, null)
			}

		case ACTION.GET_PROFILE_BY_EMAIL:
			try {
				let res = []
				const q = query(
					collection(db, COLLECTION.USERS),
					where("email", "==", args.email)
				)
				const querySnapshot = await getDocs(q)
				querySnapshot.forEach((user) => { res.push(user.data()) })
				return { data: res[0] ?? {} }
			} catch (e) {
				return throwError(200, ACTION.GET_PROFILE_BY_EMAIL, e, null)
			}

		case ACTION.UPDATE_PROFILE:
			try {
				updateDoc(
					doc(db, COLLECTION.USERS, args.body.uid),
					args.body
				)
				return {
					data: {
						action: ACTION.UPDATE_PROFILE,
						id: args.body.uid,
						message: "Profile updated successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.UPDATE_PROFILE, e, {
					id: args.body.uid
				})
			}

		/*****************************************************************
		 * DOCUMENTATION                                                 *
		 *****************************************************************/
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
								...(affectedItem.type === DOC_TYPE.CATEGORY)
									? { ...args.body.docItem, updatedAt: serverTimestamp() }
									: { category: args.body.docItem.category },
								updatedAt: serverTimestamp()
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
								...(affectedItem.type === DOC_TYPE.SUBCATEGORY)
									? { ...args.body.docItem, updatedAt: serverTimestamp() }
									: { subcategory: args.body.docItem.subcategory },
								updatedAt: serverTimestamp()
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

		/*****************************************************************
		 * APPLICATION SETTINGS                                          *
		 *****************************************************************/
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

		/*****************************************************************
		 * DEPARTMENTS                                                   *
		 *****************************************************************/
		case ACTION.GET_DEPARTMENTS:
			try {
				let all = []
				const querySnapshot = await getDocs(collection(db, COLLECTION.SETTINGS, "settings", "departments"))
				querySnapshot.forEach((department) => { all.push(department.data()) })
				return { data: all }
			} catch (e) {
				return throwError(200, ACTION.GET_DEPARTMENTS, e, null)
			}
		case ACTION.ADD_DEPARTMENT:
			try {
				await setDoc(
					doc(db, COLLECTION.SETTINGS, "settings", "departments", args.body.did),
					{
						...args.body,
						createdAt: serverTimestamp(),
						updatedAt: serverTimestamp()
					}
				)
				return {
					data: {
						action: ACTION.ADD_DEPARTMENT,
						id: args.body.did,
						message: "department added successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.ADD_DEPARTMENT, e, {
					id: args.body.did
				})
			}
		case ACTION.UPDATE_DEPARTMENT:
			try {
				const batch = writeBatch(db)

				batch.update(
					doc(db, COLLECTION.SETTINGS, "settings", "departments", args.body.departmentItem.did),
					{ ...args.body.departmentItem, updatedAt: serverTimestamp() }
				)

				args.body.affectedCannedReplies.forEach((affectedItem) => {
					batch.update(
						doc(db, COLLECTION.SETTINGS, "settings", "canned-replies", affectedItem.crid),
						{ department: args.body.departmentItem.department }
					)
				})
				await batch.commit()

				return {
					data: {
						action: ACTION.UPDATE_DEPARTMENT,
						id: args.body.departmentItem.did,
						message: "Department updated successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.UPDATE_DEPARTMENT, e, {
					id: args.body.departmentItem.did
				})
			}
		case ACTION.DELETE_DEPARTMENT:
			try {
				await deleteDoc(doc(db, COLLECTION.SETTINGS, "settings", "departments", args.body.did))
				return {
					data: {
						action: ACTION.DELETE_DEPARTMENT,
						id: args.body.did,
						message: "Department deleted successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.DELETE_DEPARTMENT, e, {
					id: args.body.did
				})
			}

		/*****************************************************************
		 * CANNED REPLIES                                                *
		 *****************************************************************/
		case ACTION.GET_CANNED_REPLIES:
			try {
				let all = []
				const querySnapshot = await getDocs(collection(db, COLLECTION.SETTINGS, "settings", "canned-replies"))
				querySnapshot.forEach((cannedreply) => { all.push(cannedreply.data()) })
				return { data: all }
			} catch (e) {
				return throwError(200, ACTION.GET_CANNED_REPLIES, e, null)
			}
		case ACTION.ADD_CANNED_REPLY:
			try {
				await setDoc(
					doc(db, COLLECTION.SETTINGS, "settings", "canned-replies", args.body.crid),
					{
						...args.body,
						createdAt: serverTimestamp(),
						updatedAt: serverTimestamp()
					}
				)
				return {
					data: {
						action: ACTION.ADD_CANNED_REPLY,
						id: args.body.crid,
						message: "Canned-reply added successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.ADD_CANNED_REPLY, e, {
					id: args.body.crid
				})
			}
		case ACTION.UPDATE_CANNED_REPLY:
			try {
				updateDoc(
					doc(db, COLLECTION.SETTINGS, "settings", "canned-replies", args.body.crid),
					{ ...args.body, updatedAt: serverTimestamp() }
				)
				return {
					data: {
						action: ACTION.UPDATE_CANNED_REPLY,
						id: args.body.crid,
						message: "Canned-reply updated successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.UPDATE_CANNED_REPLY, e, {
					id: args.body.crid
				})
			}
		case ACTION.DELETE_CANNED_REPLY:
			try {
				await deleteDoc(doc(db, COLLECTION.SETTINGS, "settings", "canned-replies", args.body.crid))
				return {
					data: {
						action: ACTION.DELETE_CANNED_REPLY,
						id: args.body.crid,
						message: "Canned-reply deleted successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.DELETE_CANNED_REPLY, e, {
					id: args.body.crid
				})
			}

		/*****************************************************************
		 * LABELS                                                        *
		 *****************************************************************/
		case ACTION.GET_LABELS:
			try {
				let all = []
				const querySnapshot = await getDocs(collection(db, COLLECTION.SETTINGS, "settings", "labels"))
				querySnapshot.forEach((label) => { all.push(label.data()) })
				return { data: all }
			} catch (e) {
				return throwError(200, ACTION.GET_LABELS, e, null)
			}
		case ACTION.ADD_LABEL:
			try {
				await setDoc(
					doc(db, COLLECTION.SETTINGS, "settings", "labels", args.body.lid),
					{
						...args.body,
						createdAt: serverTimestamp(),
						updatedAt: serverTimestamp()
					}
				)
				return {
					data: {
						action: ACTION.ADD_LABEL,
						id: args.body.lid,
						message: "Label added successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.ADD_LABEL, e, {
					id: args.body.lid
				})
			}
		case ACTION.UPDATE_LABEL:
			try {
				updateDoc(
					doc(db, COLLECTION.SETTINGS, "settings", "labels", args.body.lid),
					args.body
				)
				return {
					data: {
						action: ACTION.UPDATE_LABEL,
						id: args.body.lid,
						message: "Label updated successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.UPDATE_LABEL, e, {
					id: args.body.lid
				})
			}
		case ACTION.DELETE_LABEL:
			try {
				await deleteDoc(doc(db, COLLECTION.SETTINGS, "settings", "labels", args.body.lid))
				return {
					data: {
						action: ACTION.DELETE_LABEL,
						id: args.body.lid,
						message: "Label deleted successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.DELETE_LABEL, e, {
					id: args.body.lid
				})
			}

		/*****************************************************************
		 * CATEGORIES                                                    *
		 *****************************************************************/
		case ACTION.GET_CATEGORIES:
			try {
				let all = []
				const querySnapshot = await getDocs(collection(db, COLLECTION.SETTINGS, "settings", "categories"))
				querySnapshot.forEach((category) => { all.push(category.data()) })
				return { data: all }
			} catch (e) {
				return throwError(200, ACTION.GET_CATEGORIES, e, null)
			}
		case ACTION.ADD_CATEGORY:
			try {
				await setDoc(
					doc(db, COLLECTION.SETTINGS, "settings", "categories", args.body.catId),
					{
						...args.body,
						createdAt: serverTimestamp(),
						updatedAt: serverTimestamp()
					}
				)
				return {
					data: {
						action: ACTION.ADD_CATEGORY,
						id: args.body.catId,
						message: "Category added successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.ADD_CATEGORY, e, {
					id: args.body.catId
				})
			}
		case ACTION.UPDATE_CATEGORY:
			try {
				if (args.body.affectedItems.length === 0) {
					await updateDoc(
						doc(db, COLLECTION.SETTINGS, "settings", "categories", args.body.categoryItem.catId),
						{ ...args.body.categoryItem, updatedAt: serverTimestamp() }
					)
				} else {
					const batch = writeBatch(db)
					args.body.affectedItems.forEach((affectedItem) => {
						batch.update(
							doc(db, COLLECTION.SETTINGS, "settings", "categories", affectedItem.catId),
							{ ...affectedItem }
						)
					})
					await batch.commit()
				}

				return {
					data: {
						action: ACTION.UPDATE_CATEGORY,
						id: args.body.categoryItem.catId,
						message: "Category updated successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.UPDATE_CATEGORY, e, {
					id: args.body.catId
				})
			}
		case ACTION.DELETE_CATEGORY:
			try {
				await deleteDoc(doc(db, COLLECTION.SETTINGS, "settings", "categories", args.body.catId))
				return {
					data: {
						action: ACTION.DELETE_CATEGORY,
						id: args.body.catId,
						message: "Category deleted successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.DELETE_CATEGORY, e, {
					id: args.body.catId
				})
			}


		default:
			return throwError(200, "OUT OF ACTION RANGE", { message: "OUT OF ACTION RANGE" }, null)
	}
}

export default fireStoreBaseQuery