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
	collection, deleteDoc, doc, getDoc, getDocs, increment, query, runTransaction, serverTimestamp, setDoc, updateDoc, where, writeBatch
} from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth"

//THIRD-PARTY
import dayjs from "dayjs"

//PROJECT IMPORT
import { auth, db } from "./../../helpers/firebase"
import { ACTION, COLLECTION, GROUP } from "./firestoreApiConstants"
import { DOC_TYPE, USERGROUP, REDIRECT_URL, STATUS_FILTER } from "./../../helpers/constants"
import { getUserProfile, getUserProfileByUsername, isUsernameAvailable } from "../../helpers/firebase/user"

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
		 * INSTALL                                                       *
		 *****************************************************************/
		case ACTION.INSTALL_GET_STATUS:
			try {
				let res = []
				const q = query(
					collection(db, COLLECTION.USERS),
					where("username", "==", "superadmin")
				)
				const querySnapshot = await getDocs(q)
				querySnapshot.forEach((user) => { res.push(user.data()) })
				return {
					data: {
						isInstalled: (res[0]?.nextStep) === REDIRECT_URL.DONE,
						profile: res[0] ?? {}
					}
				}
			} catch (e) {
				return throwError(200, ACTION.INSTALL_GET_STATUS, e, null)
			}

		case ACTION.INSTALL_CREATE_ADMIN:
			try {
				const userCredential = await createUserWithEmailAndPassword(auth, args.body.email, args.body.password)

				const batch = writeBatch(db)

				batch.set(doc(db, COLLECTION.USERS, userCredential.user.uid), {
					uid: userCredential.user.uid,
					email: userCredential.user.email,
					username: "superadmin",
					displayName: args.body.name,
					photoURL: "/img/default-admin-avatar.png",
					group: "superadmin", //default usergroup
					nextStep: REDIRECT_URL.INSTALL_COMPLETED
				})

				batch.set(doc(db, COLLECTION.USERNAMES, "superadmin"), {
					uid: userCredential.user.uid,
					email: userCredential.user.email,
					username: "superadmin",
					group: "superadmin", //default usergroup
				})
				await batch.commit()

				return {
					data: {
						uid: userCredential.user.uid,
						message: "SuperAdmin account created successfully",
						redirect: REDIRECT_URL.INSTALL_COMPLETED
					}
				}

			} catch (e) {
				return throwError(200, ACTION.INSTALL_CREATE_ADMIN, e, null)
			}

		case ACTION.INSTALL_FINALIZATION:
			try {

				const batch = writeBatch(db)

				batch.set(doc(db, COLLECTION.USERS, args.body.uid), {
					nextStep: REDIRECT_URL.DONE
				}, { merge: true })

				batch.set(doc(db, COLLECTION.USERNAMES, "superadmin"), {
					nextStep: REDIRECT_URL.DONE
				}, { merge: true })

				//popular default settings
				batch.set(doc(db, COLLECTION.SETTINGS, "settings"), {
					restrictedUsernames: ["admin", "admins", "superadmin", "superadmins", "staff", "staffs", "member", "members", "user", "users", "key", "password", "ticket", "department", "label", "labels", "category", "categories", "default", "profile", "profiles", "setting", "settings", "application"]
				}, { merge: true })

				await batch.commit()

				return { data: { justInstalled: true } } //just dummy data

			} catch (e) {
				return throwError(200, ACTION.INSTALL_FINALIZATION, e, null)
			}

		/*****************************************************************
		 * SIGN-IN (LOGIN-IN)                                            *
		 *****************************************************************/
		case ACTION.SIGN_IN_WITH_EMAIL:
			if (args.body.username.includes("@")) {
				try {
					//Login
					const loggedin = await signInWithEmailAndPassword(auth, args.body.username, args.body.password)

					const userProfile = await getUserProfile(loggedin.user.uid)

					return {
						data: {
							userProfile: {
								emailVerified: loggedin.user.emailVerified,
								creationTime: loggedin.user.metadata.creationTime,
								lastSignInTime: loggedin.user.metadata.lastSignInTime,
								providerId: loggedin.user.providerData[0].providerId,
								...userProfile?.data
							},
							message: "Login success successfully"
						},
					}
				}
				catch (e) {
					// return throwError(200, ACTION.SIGN_IN_WITH_EMAIL, e, null)
					return throwError(200, ACTION.SIGN_IN_WITH_EMAIL, { message: "Please check your credentials and try again" }, null)
				}
			}

			try {
				const userProfile = await getUserProfileByUsername(args.body.username)
				if (userProfile.data) {
					const loggedin = await signInWithEmailAndPassword(auth, userProfile.data.email, args.body.password)
					return {
						data: {
							userProfile: {
								emailVerified: loggedin.user.emailVerified,
								creationTime: loggedin.user.metadata.creationTime,
								lastSignInTime: loggedin.user.metadata.lastSignInTime,
								providerId: loggedin.user.providerData[0].providerId,
								...userProfile.data
							},
							message: "Login success successfully"
						},
					}
				}
				return throwError(200, ACTION.SIGN_IN_WITH_EMAIL, { message: "Account not found" }, null)

			} catch (e) {
				return throwError(200, ACTION.SIGN_IN_WITH_EMAIL, e, null)
			}

		case ACTION.SIGN_IN_WITH_GOOGLE:
			try {
				const googleAuthProvider = new GoogleAuthProvider()
				// await signInWithRedirect(auth, googleAuthProvider)
				await signInWithPopup(auth, googleAuthProvider)
				//
				//nothing to do here?!!
			} catch (e) {
				return throwError(200, ACTION.SIGN_IN_WITH_GOOGLE, e, null)
			}
			break

		/*****************************************************************
		 * SIGN-UP         	                                             *
		 *****************************************************************/
		case ACTION.SIGN_UP_WITH_EMAIL:
			try {
				//Check username availabitity
				const res = await isUsernameAvailable(args.body.username)
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

				//You are good to go for now
				const userCredential = await createUserWithEmailAndPassword(auth, args.body.email, args.body.password)

				const batch = writeBatch(db)

				const publicProfile = {
					uid: userCredential.user.uid,
					username: args.body.username,
					email: userCredential.user.email,
					displayName: args.body.name,
					photoURL: userCredential.user.providerData[0].photoURL ?? "/img/default-avatar.png",
					group: USERGROUP.USER, //default usergroup
					permission: [],
					nextStep: REDIRECT_URL.CREATE_PROFILE
				}
				batch.set(doc(db, COLLECTION.USERS, userCredential.user.uid), publicProfile)

				const privateProfile = {
					uid: userCredential.user.uid,
					username: args.body.username,
					email: userCredential.user.email,
					group: USERGROUP.USER, //default usergroup
					nextStep: REDIRECT_URL.CREATE_PROFILE
				}
				batch.set(doc(db, COLLECTION.USERNAMES, args.body.username), privateProfile)

				await batch.commit()

				//TODO: verify email!!! userCredential.user.sendEmailVerification()

				return {
					data: {
						message: "Account created successfully!",
						redirect: REDIRECT_URL.CREATE_PROFILE,
						uid: userCredential.user.uid,
						username: args.body.username,
						email: userCredential.user.email,
						displayName: args.body.name,
						photoURL: userCredential.user.providerData[0].photoURL ?? "/img/default-avatar.png",
						group: USERGROUP.USER, //default usergroup
					}
				}
			} catch (e) {
				return throwError(200, ACTION.SIGN_UP_WITH_EMAIL, e, null)
			}

		case ACTION.SIGN_UP_VIA_GOOGLE:
			try {

				const batch = writeBatch(db)

				const publicProfile = {
					uid: args.body.uid,
					email: args.body.email,
					username: args.body.username,
					displayName: args.body.name,
					photoURL: args.body.photoURL,
					permission: [],
					group: USERGROUP.USER, //default usergroup
					nextStep: REDIRECT_URL.CREATE_PROFILE
				}
				batch.set(doc(db, COLLECTION.USERS, args.body.uid), publicProfile)

				const privateProfile = {
					uid: args.body.uid,
					username: args.body.username,
					email: args.body.email,
					group: USERGROUP.USER, //default usergroup
				}
				batch.set(doc(db, COLLECTION.USERNAMES, args.body.username), privateProfile)

				await batch.commit()

				return {
					data: {
						message: "Account created successfully",
						redirect: REDIRECT_URL.CREATE_PROFILE
					}
				}

			} catch (e) {
				return throwError(200, ACTION.SIGN_UP_VIA_GOOGLE, e, null)
			}

		case ACTION.SIGN_UP_CREATE_PROFILE:
			try {
				const publicProfile = {
					photoURL: args.body.avatar,
					location: args.body.location,
					nextStep: REDIRECT_URL.SURVEY
				}
				await updateDoc(doc(db, COLLECTION.USERS, args.body.uid), publicProfile)

				return {
					data: {
						message: "Profile created successfully",
						redirect: REDIRECT_URL.SURVEY
					}
				}
			}
			catch (e) {
				return throwError(200, ACTION.SIGN_UP_CREATE_PROFILE, e, null)
			}

		case ACTION.SIGN_UP_SURVEY:
			try {
				const batch = writeBatch(db)
				batch.set(doc(db, COLLECTION.USERNAMES, args.body.username), {
					survey: JSON.stringify(args.body.payload),
					nextStep: REDIRECT_URL.DONE
				}, { merge: true })
				batch.set(doc(db, COLLECTION.USERS, args.body.uid), {
					survey: JSON.stringify(args.body.payload),
					nextStep: REDIRECT_URL.DONE
				}, { merge: true })
				await batch.commit()

				//UPDATE `GROUP` when account sign-up completed
				//By this time, just create PUBLIC_PROFILES
				//cause by default, all accounts are clients only
				//Only set change usergroup, then add/create PRIVATE_PROFILES
				await runTransaction(db, async (transaction) => {
					const profileRef = await transaction.get(doc(db, COLLECTION.USERS, args.body.uid))
					const profile = profileRef.data()
					transaction.set(
						doc(db, COLLECTION.USERS, GROUP.PROFILES_PUBLIC),
						{
							[args.body.uid]: profile
						}
					)
				})

				//Update redux
				return {
					data: {
						redirect: REDIRECT_URL.CREATE_COMPLETED
					}
				}
				// dispatch(setRedirect(REDIRECT_URL.CREATE_COMPLETED))
			} catch (e) {
				return throwError(200, ACTION.SIGN_UP_SURVEY, e, null)
			}

		/*****************************************************************
		 * PROFILE => uid  	                                             *
		 *****************************************************************/
		case ACTION.GET_PROFILES:	//Get from GROUP.PUBLIC_PROFILES
			try {
				let res = {}
				const docSnapshot = await getDoc(doc(db, COLLECTION.USERS, GROUP.PROFILES_PUBLIC))
				if (docSnapshot.exists()) { res = docSnapshot.data() }
				return { data: res }
			} catch (e) {
				return throwError(200, ACTION.GET_PROFILES, e, null)
			}

		case ACTION.GET_PROFILE:
			try {
				let res = []
				const q = query(
					collection(db, COLLECTION.USERS),
					where("uid", "array-contains", args.uid)
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
				await updateDoc(
					doc(db, COLLECTION.USERS, args.body.uid),
					args.body
				)

				//UPDATE bigPublicProfiles
				await runTransaction(db, async (transaction) => {
					const profileSnapshot = await transaction.get(doc(db, COLLECTION.USERS, args.body.uid))
					const profileData = profileSnapshot.data()
					transaction.update(
						doc(db, COLLECTION.USERS, GROUP.PROFILES_PUBLIC),
						{
							[args.body.uid]: profileData
						}
					)
				})

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
		 * DOCUMENTATION => docId                                        *
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
				let docItemContent = {}
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

		case ACTION.UPDATE_DOC_CONTENT:	//body: {docItem, content: object}
			try {
				const batch = writeBatch(db)
				batch.update(
					doc(db,
						COLLECTION.DOCS, args.body.docItem.docId,
						"content", "current"
					),
					args.body.content
				)
				batch.update(
					doc(db, COLLECTION.DOCS, args.body.docItem.docId),
					{
						updatedAt: serverTimestamp(),
						updatedBy: args.body.docItem.updatedBy,
					}
				)
				await batch.commit()
				return {
					data: {
						action: ACTION.UPDATE_DOC_CONTENT,
						id: args.body.docItem.docId,
						message: "DocContent updated successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.UPDATE_DOC_CONTENT, e, {
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
		 * DEPARTMENTS => did                                            *
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
					{
						...args.body.departmentItem,
						updatedAt: serverTimestamp()
					}
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

		//Note: do not allow to delete department if there are related canned-replies existed
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
		 * CANNED REPLIES => crid                                        *
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
					{
						...args.body,
						updatedAt: serverTimestamp()
					}
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
		 * LABELS => lid                                                 *
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
		 * CATEGORIES => catId                                           *
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

		/*****************************************************************
		 * TICKETS => tid                                                *
		 *****************************************************************/
		case ACTION.GET_TICKETS_FOR_ADMIN:	//Get from GROUP.TICKETS_GROUP
			try {
				let res = {}
				const docSnapshot = await getDoc(doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP))
				if (docSnapshot.exists()) { res = docSnapshot.data() }
				return { data: res }
			} catch (e) {
				return throwError(200, ACTION.GET_TICKETS_FOR_ADMIN, e, null)
			}

		case ACTION.GET_TICKETS:
			try {
				let all = []
				const querySnapshot = await getDocs(collection(db,
					COLLECTION.USERNAMES, args.username,
					"tickets")
				)
				querySnapshot.forEach((ticket) => { all.push(ticket.data()) })
				return { data: all }
			} catch (e) {
				return throwError(200, ACTION.GET_TICKETS, e, null)
			}

		case ACTION.GET_TICKET_REPLIES:
			try {
				let all = []
				const querySnapshot = await getDocs(collection(db,
					COLLECTION.USERNAMES, args.body.username,
					"tickets", args.body.tid,
					"replies")
				)
				querySnapshot.forEach((reply) => { all.push(reply.data()) })
				return { data: all }
			} catch (e) {
				return throwError(200, ACTION.GET_TICKET_REPLIES, e, null)
			}

		case ACTION.ADD_TICKET:	//body: {...ticketItem}
			try {
				const batch = writeBatch(db)
				const newTicket = {
					...args.body,
					replyCount: 0,
					createdAt: serverTimestamp(),
					updatedAt: serverTimestamp()
				}
				batch.set(
					doc(db,
						COLLECTION.USERNAMES, args.body.username,
						"tickets", args.body.tid),
					newTicket
				)
				//GROUP
				batch.set(
					doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP),
					{
						[args.body.tid]: {
							...newTicket,
							createdAt: dayjs().format("MMMM D, YYYY h:mm A"),
							updatedAt: dayjs().format("MMMM D, YYYY h:mm A")
						}
					},
					{ merge: true }
				)

				await batch.commit()
				return {
					data: {
						action: ACTION.ADD_TICKET,
						username: args.body.username,
						tid: args.body.tid,
						message: "Ticket added successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.ADD_TICKET, e, {
					username: args.body.username,
					tid: args.body.tid,
				})
			}

		case ACTION.ADD_TICKET_REPLY:	//body: {ticketItem, replyItem}
			try {
				const batch = writeBatch(db)
				batch.set(
					doc(db,
						COLLECTION.USERNAMES, args.body.ticketItem.username,
						"tickets", args.body.ticketItem.tid,
						"replies", args.body.replyItem.trid),
					{
						...args.body.replyItem,
						createdAt: serverTimestamp(),
						updatedAt: serverTimestamp()
					}
				)
				//update reply's counter and updatedAt for Ticket
				batch.update(
					doc(db,
						COLLECTION.USERNAMES, args.body.ticketItem.username,
						"tickets", args.body.ticketItem.tid),
					{
						replyCount: increment(1),
						updatedAt: serverTimestamp(),
						//whenever, new reply added, then, status of the ticket always is `pending`
						status: STATUS_FILTER.PENDING,
					}
				)
				await batch.commit()

				//update reply's counter and updatedAt for Group
				await runTransaction(db, async (transaction) => {
					const ticketXRef = await transaction.get(doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP))
					const ticketX = ticketXRef.data()
					transaction.update(
						doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP),
						{
							[args.body.ticketItem.tid]: {
								...ticketX[args.body.ticketItem.tid],
								replyCount: ticketX[args.body.ticketItem.tid].replyCount + 1,
								updatedAt: dayjs().format("MMMM D, YYYY h:mm A"),
								status: STATUS_FILTER.PENDING,
							}
						}
					)
				})

				return {
					data: {
						action: ACTION.ADD_TICKET_REPLY,
						username: args.body.ticketItem.username,
						tid: args.body.ticketItem.tid,
						message: "Ticket reply added successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.ADD_TICKET_REPLY, e, {
					username: args.body.ticketItem.username,
					tid: args.body.ticketItem.tid,
				})
			}

		case ACTION.UPDATE_TICKET:	//body: {...ticketItem}
			try {
				const batch = writeBatch(db)
				batch.update(
					doc(db,
						COLLECTION.USERNAMES, args.body.username,
						"tickets", args.body.tid
					),
					{
						...args.body,
						updatedAt: serverTimestamp()
					}
				)
				await batch.commit()

				//Update GROUP
				await runTransaction(db, async (transaction) => {
					const ticketXRef = await transaction.get(doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP))
					const ticketX = ticketXRef.data()
					transaction.update(
						doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP),
						{
							[args.body.tid]: {
								...ticketX[args.body.tid],
								...args.body,
								updatedAt: dayjs().format("MMMM D, YYYY h:mm A"),
							}
						}
					)
				})

				return {
					data: {
						action: ACTION.UPDATE_TICKET,
						username: args.body.username,
						tid: args.body.tid,
						message: "Ticket updated successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.UPDATE_TICKET, e, {
					username: args.body.username,
					tid: args.body.tid,
				})
			}

		case ACTION.UPDATE_TICKET_REPLY:	//body: {ticketItem, replyItem}
			try {
				await updateDoc(
					doc(db,
						COLLECTION.USERNAMES, args.body.ticketItem.username,
						"tickets", args.body.ticketItem.tid,
						"replies", args.body.replyItem.trid
					),
					{
						...args.body.replyItem,
						updatedAt: serverTimestamp()
					}
				)

				//Update GROUP (updatedAt)
				await runTransaction(db, async (transaction) => {
					const ticketXRef = await transaction.get(doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP))
					const ticketX = ticketXRef.data()
					transaction.update(
						doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP),
						{
							[args.body.ticketItem.tid]: {
								...ticketX[args.body.ticketItem.tid],
								updatedAt: dayjs().format("MMMM D, YYYY h:mm A"),
							}
						}
					)
				})

				return {
					data: {
						action: ACTION.UPDATE_TICKET_REPLY,
						username: args.body.ticketItem.username,
						tid: args.body.ticketItem.tid,
						message: "Ticket reply updated successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.UPDATE_TICKET_REPLY, e, {
					username: args.body.ticketItem.username,
					tid: args.body.ticketItem.tid,
				})
			}

		case ACTION.DELETE_TICKET:	//body: {username, tid}
			try {
				const batch = writeBatch(db)
				//delete ticket's replies
				//get all replies first
				const querySnapshot = await getDocs(collection(db,
					COLLECTION.USERNAMES, args.body.username,
					"tickets", args.body.tid,
					"replies")
				)
				//delete all related replies
				querySnapshot.forEach((reply) => {
					batch.delete(reply.ref)
				})
				//finally, delete main record
				batch.delete(doc(db,
					COLLECTION.USERNAMES, args.body.username,
					"tickets", args.body.tid))

				//delete GROUP by set it's data to null
				batch.set(
					doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP),
					{
						[args.body.tid]: null
					},
					{ merge: true }
				)
				await batch.commit()
				return {
					data: {
						action: ACTION.DELETE_TICKET,
						username: args.body.username,
						tid: args.body.tid,
						message: "Ticket deleted successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.DELETE_TICKET, e, {
					username: args.body.username,
					tid: args.body.tid,
				})
			}

		case ACTION.DELETE_TICKET_REPLY:	//body: {username, tid, trid}
			try {
				const batch = writeBatch(db)
				batch.delete(doc(db,
					COLLECTION.USERNAMES, args.body.username,
					"tickets", args.body.tid,
					"replies", args.body.trid
				))
				//update reply's counter and updatedAt for Ticket & Group
				batch.update(
					doc(db,
						COLLECTION.USERNAMES, args.body.ticketItem.username,
						"tickets", args.body.ticketItem.tid),
					{
						replyCount: increment(-1),
						updatedAt: serverTimestamp()
					}
				)
				await batch.commit()

				//update reply's counter and updatedAt for Group
				await runTransaction(db, async (transaction) => {
					const ticketXRef = await transaction.get(doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP))
					const ticketX = ticketXRef.data()
					transaction.update(
						doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP),
						{
							[args.body.ticketItem.tid]: {
								...ticketX[args.body.ticketItem.tid],
								replyCount: ticketX[args.body.ticketItem.tid].replyCount - 1,
								updatedAt: dayjs().format("MMMM D, YYYY h:mm A")
							}
						}
					)
				})

				return {
					data: {
						action: ACTION.DELETE_TICKET_REPLY,
						username: args.body.username,
						tid: args.body.tid,
						trid: args.body.trid,
						message: "Ticket reply deleted successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.DELETE_TICKET_REPLY, e, {
					username: args.body.username,
					tid: args.body.tid,
					trid: args.body.trid,
				})
			}

		/*****************************************************************
		 * PAGES => pid                                                  *
		 *****************************************************************/
		case ACTION.GET_PAGES:
			try {
				let all = []
				const querySnapshot = await getDocs(collection(db, COLLECTION.PAGES))
				querySnapshot.forEach((page) => { all.push(page.data()) })
				return { data: all }
			} catch (e) {
				return throwError(200, ACTION.GET_PAGES, e, null)
			}

		case ACTION.GET_PAGE:	//body: pid
			try {
				let page = {}
				const docSnap = await getDoc(doc(db, COLLECTION.PAGES, args.body))
				if (docSnap.exists()) page = docSnap.data()
				return { data: page }
			} catch (e) {
				return throwError(200, ACTION.GET_PAGE, e, null)
			}

		case ACTION.GET_PAGE_CONTENT:	//body: pid
			try {
				let pageContent = {}
				const docSnap = await getDoc(doc(db,
					COLLECTION.PAGES, args.body,
					"content", "current"
				))
				if (docSnap.exists()) { pageContent = docSnap.data() }
				return { data: pageContent }
			} catch (e) {
				return throwError(200, ACTION.GET_PAGE_CONTENT, e, {
					pid: args.body
				})
			}

		case ACTION.ADD_PAGE:	// body: {pageItem, content: {text: string} }
			try {
				const batch = writeBatch(db)
				batch.set(
					doc(db, COLLECTION.PAGES, args.body.pageItem.pid),
					{
						...args.body.pageItem,
						createdAt: serverTimestamp(),
						updatedAt: serverTimestamp()
					}
				)
				batch.set(
					doc(db,
						COLLECTION.PAGES, args.body.pageItem.pid,
						"content", "current"
					),
					args.body.content
				)
				await batch.commit()
				return {
					data: {
						action: ACTION.ADD_PAGE,
						pid: args.body.pageItem.pid,
						message: "Page added successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.ADD_PAGE, e, {
					pid: args.body.pageItem.pid
				})
			}

		case ACTION.UPDATE_PAGE:	//body: {...pageItem}
			try {
				updateDoc(
					doc(db, COLLECTION.PAGES, args.body.pid),
					{
						...args.body,
						updatedAt: serverTimestamp()
					}
				)
				return {
					data: {
						action: ACTION.UPDATE_PAGE,
						pid: args.body.pid,
						message: "Page properties updated successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.UPDATE_PAGE, e, {
					pid: args.body.pid,
				})
			}

		case ACTION.UPDATE_PAGE_CONTENT:	//body: {pageItem, content: {text:string} }
			try {
				const batch = writeBatch(db)
				batch.update(
					doc(db,
						COLLECTION.PAGES, args.body.pageItem.pid,
						"content", "current"
					),
					args.body.content
				)
				batch.update(
					doc(db, COLLECTION.PAGES, args.body.pageItem.pid),
					{ updatedAt: serverTimestamp() }
				)
				await batch.commit()
				return {
					data: {
						action: ACTION.UPDATE_PAGE_CONTENT,
						pid: args.body.pageItem.pid,
						message: "Page content updated successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.UPDATE_PAGE_CONTENT, e, {
					pid: args.body.pageItem.pid
				})
			}

		case ACTION.DELETE_PAGE:	//body: pid
			try {
				const batch = writeBatch(db)
				batch.delete(doc(db, COLLECTION.PAGES, args.body, "content", "current"))
				batch.delete(doc(db, COLLECTION.PAGES, args.body))
				await batch.commit()
				return {
					data: {
						action: ACTION.DELETE_PAGE,
						message: "Page deleted successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.DELETE_PAGE, e, null)
			}

		/*****************************************************************
		 * BLOG => bid                                                   *
		 *****************************************************************/
		case ACTION.GET_BLOG_POSTS:
			try {
				let all = []
				const querySnapshot = await getDocs(collection(db, COLLECTION.BLOG))
				querySnapshot.forEach((post) => { all.push(post.data()) })
				return { data: all }
			} catch (e) {
				return throwError(200, ACTION.GET_BLOG_POSTS, e, null)
			}

		case ACTION.GET_BLOG_POST:	//body: bid
			try {
				let page = {}
				const docSnap = await getDoc(doc(db, COLLECTION.BLOG, args.body))
				if (docSnap.exists()) page = docSnap.data()
				return { data: page }
			} catch (e) {
				return throwError(200, ACTION.GET_BLOG_POST, e, null)
			}

		case ACTION.GET_BLOG_POST_CONTENT:	//body: bid
			try {
				let pageContent = {}
				const docSnap = await getDoc(doc(db,
					COLLECTION.BLOG, args.body,
					"content", "current"
				))
				if (docSnap.exists()) { pageContent = docSnap.data() }
				return { data: pageContent }
			} catch (e) {
				return throwError(200, ACTION.GET_BLOG_POST_CONTENT, e, {
					bid: args.body
				})
			}

		case ACTION.ADD_BLOG_POST:	// body: {blogItem, content: {text: string} }
			try {
				const batch = writeBatch(db)
				batch.set(
					doc(db, COLLECTION.BLOG, args.body.blogItem.bid),
					{
						...args.body.blogItem,
						createdAt: serverTimestamp(),
						updatedAt: serverTimestamp()
					}
				)
				batch.set(
					doc(db,
						COLLECTION.BLOG, args.body.blogItem.bid,
						"content", "current"
					),
					args.body.content
				)
				await batch.commit()
				return {
					data: {
						action: ACTION.ADD_BLOG_POST,
						bid: args.body.blogItem.bid,
						message: "Blog added successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.ADD_BLOG_POST, e, {
					pid: args.body.blogItem.bid
				})
			}

		case ACTION.UPDATE_BLOG_POST:	//body: {...blogItem}
			try {
				updateDoc(
					doc(db, COLLECTION.BLOG, args.body.bid),
					{
						...args.body,
						updatedAt: serverTimestamp()
					}
				)
				return {
					data: {
						action: ACTION.UPDATE_BLOG_POST,
						bid: args.body.bid,
						message: "Blog properties updated successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.UPDATE_BLOG_POST, e, {
					pid: args.body.bid,
				})
			}

		case ACTION.UPDATE_BLOG_POST_CONTENT:	//body: {blogItem, content: {text:string} }
			try {
				const batch = writeBatch(db)
				batch.update(
					doc(db,
						COLLECTION.BLOG, args.body.blogItem.bid,
						"content", "current"
					),
					args.body.content
				)
				batch.update(
					doc(db, COLLECTION.BLOG, args.body.blogItem.bid),
					{ updatedAt: serverTimestamp() }
				)
				await batch.commit()
				return {
					data: {
						action: ACTION.UPDATE_BLOG_POST_CONTENT,
						bid: args.body.blogItem.bid,
						message: "Blog content updated successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.UPDATE_BLOG_POST_CONTENT, e, {
					bid: args.body.blogItem.bid
				})
			}

		case ACTION.DELETE_BLOG_POST:	//body: bid
			try {
				const batch = writeBatch(db)
				batch.delete(doc(db, COLLECTION.BLOG, args.body, "content", "current"))
				batch.delete(doc(db, COLLECTION.BLOG, args.body))
				await batch.commit()
				return {
					data: {
						action: ACTION.DELETE_BLOG_POST,
						message: "Blog post deleted successfully"
					}
				}
			} catch (e) {
				return throwError(200, ACTION.DELETE_BLOG_POST, e, null)
			}

		default:
			return throwError(200, "Action not yet implemented", { message: "Action not yet implemented" }, null)
	}
}

export default fireStoreBaseQuery