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
import { keyBy } from "lodash"

//PROJECT IMPORT
import { auth, db } from "@helpers/firebase"
import { ACTIONS, COLLECTION, GROUP } from "./firestoreApiConstants"
import { CODE, DOC_TYPE, USERGROUP, REDIRECT_URL } from "@helpers/constants"
import { getUserProfile, getUserProfileByUsername, isUsernameAvailable } from "@helpers/firebase/user"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function throwError(statusCode, action, e, data) {
	console.log(e.message)
	return {
		error: {
			code: statusCode,
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

		case ACTIONS.REQUEST_REFETCHING:
			return {
				data: {
					action: ACTIONS.REQUEST_REFETCHING,
					invalidatesTags: args.invalidatesTags,
					message: "Yet another request for refetching executed successfully!"
				}
			}

		/*****************************************************************
		 * INSTALL                                                       *
		 *****************************************************************/
		case ACTIONS.INSTALL_GET_STATUS:
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
						code: CODE.SUCCESS,
						isInstalled: (res[0]?.nextStep) === REDIRECT_URL.SIGNUP.DONE,
						profile: res[0] ?? {}
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.INSTALL_GET_STATUS, e, null)
			}

		case ACTIONS.INSTALL_CREATE_ADMIN:
			try {
				const userCredential = await createUserWithEmailAndPassword(auth, args.body.email, args.body.password)

				const batch = writeBatch(db)

				batch.set(doc(db, COLLECTION.USERS, userCredential.user.uid), {
					uid: userCredential.user.uid,
					email: userCredential.user.email,
					username: "superadmin",
					displayName: args.body.name,
					photoURL: "/avatar/admin-default.png",
					group: "superadmin", //default usergroup
					nextStep: REDIRECT_URL.INSTALL.COMPLETED
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
						code: CODE.SUCCESS,
						uid: userCredential.user.uid,
						message: "SuperAdmin account created successfully",
						redirect: REDIRECT_URL.INSTALL.COMPLETED
					}
				}

			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.INSTALL_CREATE_ADMIN, e, null)
			}

		case ACTIONS.INSTALL_FINALIZATION:
			try {

				const batch = writeBatch(db)

				batch.set(doc(db, COLLECTION.USERS, args.body.uid), {
					nextStep: REDIRECT_URL.SIGNUP.DONE
				}, { merge: true })

				batch.set(doc(db, COLLECTION.USERNAMES, "superadmin"), {
					nextStep: REDIRECT_URL.SIGNUP.DONE
				}, { merge: true })

				//popular default settings
				batch.set(doc(db, COLLECTION.SETTINGS, "settings"), {
					restrictedUsernames: ["admin", "admins", "superadmin", "superadmins", "staff", "staffs", "member", "members", "user", "users", "password", "ticket", "department", "label", "labels", "category", "categories", "default", "profile", "profiles", "setting", "settings", "application"]
				}, { merge: true })

				await batch.commit()

				return { data: { justInstalled: true } } //just dummy data

			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.INSTALL_FINALIZATION, e, null)
			}

		/*****************************************************************
		 * SIGN-IN (LOGIN-IN)                                            *
		 *****************************************************************/
		case ACTIONS.SIGN_IN_WITH_EMAIL:
			if (args.body.username.includes("@")) {
				try {
					//Login
					const loggedin = await signInWithEmailAndPassword(auth, args.body.username, args.body.password)

					const userProfile = await getUserProfile(loggedin.user.uid)

					console.log("ACTION.SIGN_IN_WITH_EMAIL", { userProfile })

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
					// return throwError(CODE.FAILED, ACTION.SIGN_IN_WITH_EMAIL, e, null)
					return throwError(CODE.FAILED, ACTIONS.SIGN_IN_WITH_EMAIL, { message: "Please check your credentials and try again" }, null)
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
				return throwError(CODE.FAILED, ACTIONS.SIGN_IN_WITH_EMAIL, { message: "Account not found" }, null)

			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.SIGN_IN_WITH_EMAIL, e, null)
			}

		case ACTIONS.SIGN_IN_WITH_GOOGLE:
			try {
				const googleAuthProvider = new GoogleAuthProvider()
				// await signInWithRedirect(auth, googleAuthProvider)
				await signInWithPopup(auth, googleAuthProvider)
				//
				//nothing to do here?!!
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.SIGN_IN_WITH_GOOGLE, e, null)
			}
			break

		/*****************************************************************
		 * SIGN-UP         	                                             *
		 *****************************************************************/
		case ACTIONS.SIGN_UP_WITH_EMAIL:
			try {
				//Check username availabitity
				const res = await isUsernameAvailable(args.body.username)
				if (res.error)
					return throwError(
						200, ACTIONS.SIGN_UP_WITH_EMAIL,
						{ message: res.error }, null
					)
				if (res.isUsernameAvailable === false)
					return throwError(
						200, ACTIONS.SIGN_UP_WITH_EMAIL,
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
					photoURL: userCredential.user.providerData[0].photoURL ?? "/avatar/default.png",
					group: USERGROUP.USER.code, //default usergroup
					permissions: {},
					nextStep: REDIRECT_URL.SIGNUP.CREATE_PROFILE
				}
				batch.set(doc(db, COLLECTION.USERS, userCredential.user.uid), publicProfile)

				const privateProfile = {
					uid: userCredential.user.uid,
					username: args.body.username,
					email: userCredential.user.email,
					group: USERGROUP.USER.code, //default usergroup
					nextStep: REDIRECT_URL.SIGNUP.CREATE_PROFILE
				}
				batch.set(doc(db, COLLECTION.USERNAMES, args.body.username), privateProfile)

				await batch.commit()

				//TODO: Implement verifying email

				return {
					data: {
						message: "Account created successfully!",
						redirect: REDIRECT_URL.SIGNUP.CREATE_PROFILE,
						uid: userCredential.user.uid,
						username: args.body.username,
						email: userCredential.user.email,
						displayName: args.body.name,
						photoURL: userCredential.user.providerData[0].photoURL ?? "/avatar/default.png",
						group: USERGROUP.USER.code, //default usergroup
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.SIGN_UP_WITH_EMAIL, e, null)
			}

		case ACTIONS.SIGN_UP_VIA_GOOGLE:
			try {

				const batch = writeBatch(db)

				const publicProfile = {
					uid: args.body.uid,
					email: args.body.email,
					username: args.body.username,
					displayName: args.body.name,
					photoURL: args.body.photoURL,
					permissions: {},
					group: USERGROUP.USER.code, //default usergroup
					nextStep: REDIRECT_URL.SIGNUP.CREATE_PROFILE
				}
				batch.set(doc(db, COLLECTION.USERS, args.body.uid), publicProfile)

				const privateProfile = {
					uid: args.body.uid,
					username: args.body.username,
					email: args.body.email,
					group: USERGROUP.USER.code, //default usergroup
				}
				batch.set(doc(db, COLLECTION.USERNAMES, args.body.username), privateProfile)

				await batch.commit()

				return {
					data: {
						message: "Account created successfully",
						redirect: REDIRECT_URL.SIGNUP.CREATE_PROFILE
					}
				}

			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.SIGN_UP_VIA_GOOGLE, e, null)
			}

		case ACTIONS.SIGN_UP_CREATE_PROFILE:
			try {
				const publicProfile = {
					photoURL: args.body.avatar,
					location: args.body.location,
					nextStep: REDIRECT_URL.SIGNUP.SURVEY
				}
				await updateDoc(doc(db, COLLECTION.USERS, args.body.uid), publicProfile)

				return {
					data: {
						message: "Profile created successfully",
						redirect: REDIRECT_URL.SIGNUP.SURVEY
					}
				}
			}
			catch (e) {
				return throwError(CODE.FAILED, ACTIONS.SIGN_UP_CREATE_PROFILE, e, null)
			}

		case ACTIONS.SIGN_UP_SURVEY:
			try {
				const batch = writeBatch(db)
				batch.set(doc(db, COLLECTION.USERNAMES, args.body.username), {
					survey: JSON.stringify(args.body.payload),
					nextStep: REDIRECT_URL.SIGNUP.DONE
				}, { merge: true })
				batch.set(doc(db, COLLECTION.USERS, args.body.uid), {
					survey: JSON.stringify(args.body.payload),
					nextStep: REDIRECT_URL.SIGNUP.DONE
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
						},
						{ merge: true }
					)
				})

				//Update redux
				return {
					data: {
						redirect: REDIRECT_URL.SIGNUP.CREATE_COMPLETED
					}
				}
				// dispatch(setRedirect(REDIRECT_URL.SIGNUP.CREATE_COMPLETED))
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.SIGN_UP_SURVEY, e, null)
			}

		/*****************************************************************
		 * PROFILE => uid  	                                             *
		 *****************************************************************/
		case ACTIONS.GET_PROFILES:	//Get from GROUP.PUBLIC_PROFILES
			try {
				let res = {}
				const docSnapshot = await getDoc(doc(db, COLLECTION.USERS, GROUP.PROFILES_PUBLIC))
				if (docSnapshot.exists()) { res = docSnapshot.data() }
				return { data: res }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_PROFILES, e, null)
			}

		case ACTIONS.GET_PROFILE:
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
				return throwError(CODE.FAILED, ACTIONS.GET_PROFILE, e, null)
			}

		case ACTIONS.GET_PROFILE_BY_USERNAME:
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
				return throwError(CODE.FAILED, ACTIONS.GET_PROFILE_BY_USERNAME, e, null)
			}

		case ACTIONS.GET_PROFILE_BY_EMAIL:
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
				return throwError(CODE.FAILED, ACTIONS.GET_PROFILE_BY_EMAIL, e, null)
			}

		case ACTIONS.UPDATE_PROFILE:
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
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_PROFILE,
						id: args.body.uid,
						message: "Profile updated successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_PROFILE, e, {
					id: args.body.uid
				})
			}

		/*****************************************************************
		 * DOCUMENTATION => docId                                        *
		 *****************************************************************/
		case ACTIONS.GET_DOCS:
			try {
				let all = []
				const querySnapshot = await getDocs(collection(db,
					COLLECTION.DOCS
				))
				querySnapshot.forEach((doc) => { all.push(doc.data()) })
				return { data: all }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_DOCS, e, null)
			}

		case ACTIONS.GET_DOC:
			try {
				let docItem = {}
				const docSnap = await getDoc(
					doc(db, COLLECTION.DOCS, args.docId)
				)
				if (docSnap.exists()) { docItem = docSnap.data() }
				return { data: docItem }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_DOC, e, null)
			}

		case ACTIONS.GET_CONTENT:
			try {
				let docItemContent = {}
				const docSnap = await getDoc(
					doc(db,
						COLLECTION.DOCS, args.docId,
						"content", "current"
					)
				)
				if (docSnap.exists()) { docItemContent = docSnap.data() }
				return { data: docItemContent }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_CONTENT, e, "")
			}

		case ACTIONS.GET_DOC_SEARCH_INDEX:
			try {
				let docSearchIndex = {}
				const docSnap = await getDoc(
					doc(db, COLLECTION.SETTINGS, "DocSearchIndex")
				)
				if (docSnap.exists()) { docSearchIndex = docSnap.data() }
				return { data: docSearchIndex }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_DOC_SEARCH_INDEX, e, "")
			}

		case ACTIONS.ADD_DOC:
			try {
				const batch = writeBatch(db)
				batch.set(
					doc(db,
						COLLECTION.DOCS, args.body.docItem.docId),
					{
						...args.body.docItem,
						createdAt: serverTimestamp(),
						updatedAt: serverTimestamp()
					}
				)

				if (args.body.docItem.type === DOC_TYPE.DOC)
					batch.set(
						doc(db, COLLECTION.DOCS,
							args.body.docItem.docId,
							"content", "current"),
						{ text: "" }
					)
				await batch.commit()

				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.ADD_DOC,
						id: args.body.docItem.docId,
						message: "doc added successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.ADD_DOC, e, {
					id: args.body.docItem.docId
				})
			}

		case ACTIONS.UPDATE_DOC:	// args.body: {docItem, affectedItems<[...]>, affectedItemsData}
			try {
				const batch = writeBatch(db)
				batch.update(
					doc(db, COLLECTION.DOCS, args.body.docItem.docId),
					{
						...args.body.docItem,
						updatedAt: serverTimestamp()
					}
				)
				args.body.affectedItems.forEach((affectedItem) => {
					batch.update(
						doc(db, COLLECTION.DOCS, affectedItem.docId),
						args.body.affectedItemsData
					)
				})
				await batch.commit()
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_DOC,
						message: "documentItem updated successfully"
					}
				}
			}
			catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_DOC, e, null)
			}

		case ACTIONS.UPDATE_DOC_DND:
			// args.body: {docItem, affectedItems<[...]>, affectedItemsData}
			try {
				const batch = writeBatch(db)
				batch.update(
					doc(db, COLLECTION.DOCS, args.body.docItem.docId),
					{
						...args.body.docItem,
						updatedAt: serverTimestamp()
					}
				)
				args.body.affectedItems.forEach((affectedItem) => {
					batch.update(
						doc(db, COLLECTION.DOCS, affectedItem.docId),
						args.body.affectedItemsData
					)
				})
				await batch.commit()
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_DOC_DND,
						message: "documentItem updated successfully"
					}
				}
			}
			catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_DOC_DND, e, null)
			}

		case ACTIONS.UPDATE_DOC_CONTENT:	//body: {docId, updatedBy, content: object}
			try {
				const batch = writeBatch(db)
				batch.update(
					doc(db,
						COLLECTION.DOCS, args.body.docId,
						"content", "current"
					),
					args.body.content
				)
				batch.update(
					doc(db,
						COLLECTION.DOCS, args.body.docId
					),
					{
						updatedAt: serverTimestamp(),
						updatedBy: args.body.updatedBy,
					}
				)
				await batch.commit()
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_DOC_CONTENT,
						id: args.body.docId,
						message: "DocContent updated successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_DOC_CONTENT, e, {
					id: args.body.docId
				})
			}

		case ACTIONS.UPDATE_DOC_SEARCH_INDEX:
			try {
				const batch = writeBatch(db)
				batch.set(
					doc(db, COLLECTION.SETTINGS, "DocSearchIndex"),
					args.body
				)
				await batch.commit()
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_DOC_SEARCH_INDEX,
						message: "docSearchIndex updated successfully"
					}
				}
			}
			catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_DOC_SEARCH_INDEX, e, null)
			}


		case ACTIONS.DELETE_DOC:
			try {
				if (args.body.docItem.type === DOC_TYPE.EXTERNAL) {
					await deleteDoc(doc(db, COLLECTION.DOCS, args.body.docItem.docId))
					return {
						data: {
							code: CODE.SUCCESS,
							action: ACTIONS.DELETE_DOC,
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
							code: CODE.SUCCESS,
							action: ACTIONS.DELETE_DOC,
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
						where("category", "==", args.body.docItem.categoryId)
					)
					const querySnapshot = await getDocs(q)
					//Only delete category when it is empty
					if (querySnapshot.docs.length === 1) {
						await deleteDoc(doc(db, COLLECTION.DOCS, args.body.docItem.docId))
						return {
							data: {
								code: CODE.SUCCESS,
								action: ACTIONS.DELETE_DOC,
								id: args.body.docItem.docId,
								message: "Category deleted successfully"
							}
						}
					}
					//if the code reach here, means... can not delete selected item
					return throwError(
						200,
						ACTIONS.DELETE_DOC,
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
						where("category", "==", args.body.docItem.categoryId),
						where("subcategory", "==", args.body.docItem.subCategoryId)
					)
					const querySnapshot = await getDocs(q)
					//Only delete category when it is empty
					if (querySnapshot.docs.length === 1) {
						await deleteDoc(doc(db, COLLECTION.DOCS, args.body.docItem.docId))
						return {
							data: {
								code: CODE.SUCCESS,
								action: ACTIONS.DELETE_DOC,
								id: args.body.docItem.docId,
								message: "SubCategory deleted successfully"
							}
						}
					}
					//if the code reach here, means... can not delete selected item
					return throwError(
						200,
						ACTIONS.DELETE_DOC,
						{ message: "You can only delete empty sub-category!" },
						{ id: args.body.docItem.docId }
					)
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.DELETE_DOC, e, {
					id: args.body.docItem.docId
				})
			}
			break

		/*****************************************************************
		 * APPLICATION SETTINGS                                          *
		 *****************************************************************/
		case ACTIONS.GET_APPSETTINGS:
			try {
				let settings = {}
				const docSnap = await getDoc(
					doc(db, COLLECTION.SETTINGS, "settings")
				)
				if (docSnap.exists()) settings = docSnap.data()
				return { data: settings }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_APPSETTINGS, e, null)
			}
		case ACTIONS.UPDATE_APPSETTINGS:
			try {
				await setDoc(
					doc(db, COLLECTION.SETTINGS, "settings"),
					{ ...args.body },
					{ merge: true }
				)
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_APPSETTINGS,
						message: "Settings updated successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_APPSETTINGS, e, null)
			}

		/*****************************************************************
		 * APPLICATION SETTINGS                                          *
		 *****************************************************************/
		case ACTIONS.GET_USERSETTINGS:	//args.username
			try {
				let settings = {}
				const docSnap = await getDoc(
					doc(db, COLLECTION.USERNAMES, args.username)
				)
				if (docSnap.exists()) settings = docSnap.data()
				return { data: settings }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_USERSETTINGS, e, null)
			}
		case ACTIONS.UPDATE_USERSETTINGS:	//args.body = { username:string, settings: object}
			try {
				await setDoc(
					doc(db, COLLECTION.SETTINGS, args.body.username),
					args.body.settings,
					{ merge: true }
				)
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_USERSETTINGS,
						message: "User settings updated successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_USERSETTINGS, e, null)
			}

		/*****************************************************************
		 * DEPARTMENTS => did                                            *
		 *****************************************************************/
		case ACTIONS.GET_DEPARTMENTS:
			try {
				let departments = []
				const docSnap = await getDoc(
					doc(db, COLLECTION.SETTINGS, "departments")
				)
				if (docSnap.exists()) departments = docSnap.data()
				return { data: departments }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_DEPARTMENTS, e, null)
			}
		case ACTIONS.ADD_DEPARTMENT:
			try {
				await setDoc(
					doc(db, COLLECTION.SETTINGS, "departments"),
					{
						[args.body.did]: args.body
					},
					{ merge: true }
				)
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.ADD_DEPARTMENT,
						id: args.body.did,
						message: "Department added successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.ADD_DEPARTMENT, e, {
					id: args.body.did
				})
			}
		case ACTIONS.UPDATE_DEPARTMENT:
			try {
				const batch = writeBatch(db)
				batch.update(
					doc(db, COLLECTION.SETTINGS, "departments"),
					{
						[args.body.did]: args.body
					}
				)
				await batch.commit()

				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_DEPARTMENT,
						id: args.body.did,
						message: "Department updated successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_DEPARTMENT, e, {
					id: args.body.did
				})
			}

		//Note: do not allow to delete department if there are related canned-replies existed
		case ACTIONS.DELETE_DEPARTMENT:
			//body = {departmentItem, fullList}
			//To remove an item, we use setDoc without merge option,
			//then, all will be overwritten with provided data
			try {
				const newList = keyBy(args.body.fullList, c => c.did)
				await setDoc(
					doc(db, COLLECTION.SETTINGS, "departments"),
					newList
				)
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.DELETE_DEPARTMENT,
						id: args.body.departmentItem.did,
						message: "Department deleted successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.DELETE_DEPARTMENT, e, {
					id: args.body.departmentItem.did
				})
			}

		/*****************************************************************
		 * CANNED REPLIES => crid                                        *
		 *****************************************************************/
		case ACTIONS.GET_CANNED_REPLIES:
			try {
				let cannedReplies = []
				const docSnap = await getDoc(
					doc(db, COLLECTION.SETTINGS, "canned-replies")
				)
				if (docSnap.exists()) cannedReplies = docSnap.data()
				return { data: cannedReplies }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_CANNED_REPLIES, e, null)
			}
		case ACTIONS.ADD_CANNED_REPLY:
			try {
				await setDoc(
					doc(db, COLLECTION.SETTINGS, "canned-replies"),
					{
						[args.body.crid]: args.body
					},
					{ merge: true }
				)
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.ADD_CANNED_REPLY,
						id: args.body.crid,
						message: "Canned-reply added successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.ADD_CANNED_REPLY, e, {
					id: args.body.crid
				})
			}
		case ACTIONS.UPDATE_CANNED_REPLY:
			try {
				await updateDoc(
					doc(db, COLLECTION.SETTINGS, "canned-replies"),
					{
						[args.body.crid]: args.body
					}
				)
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_CANNED_REPLY,
						id: args.body.crid,
						message: "Canned-reply updated successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_CANNED_REPLY, e, {
					id: args.body.crid
				})
			}
		case ACTIONS.DELETE_CANNED_REPLY:
			//body = {cannedReplyItem, fullList}
			//To remove an item, we use setDoc without merge option,
			//then, all will be overwritten with provided data
			try {
				const newList = keyBy(args.body.fullList, c => c.crid)
				await setDoc(
					doc(db, COLLECTION.SETTINGS, "canned-replies"),
					newList
				)
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.DELETE_CANNED_REPLY,
						id: args.body.cannedReplyItem.crid,
						message: "Canned-reply deleted successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.DELETE_CANNED_REPLY, e, {
					id: args.body.cannedReplyItem.crid
				})
			}

		/*****************************************************************
		 * LABELS => lid                                                 *
		 *****************************************************************/
		case ACTIONS.GET_LABELS:
			try {
				let labels = {}
				const docSnap = await getDoc(
					doc(db, COLLECTION.SETTINGS, "labels")
				)
				if (docSnap.exists()) labels = docSnap.data()
				return { data: labels }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_LABELS, e, null)
			}
		case ACTIONS.ADD_LABEL:
			try {
				await setDoc(
					doc(db, COLLECTION.SETTINGS, "labels"),
					{
						[args.body.lid]: args.body
					},
					{ merge: true }
				)
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.ADD_LABEL,
						id: args.body.lid,
						message: "Label added successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.ADD_LABEL, e, {
					id: args.body.lid
				})
			}
		case ACTIONS.UPDATE_LABEL:
			try {
				await updateDoc(
					doc(db, COLLECTION.SETTINGS, "labels"),
					{
						[args.body.lid]: args.body
					},
				)
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_LABEL,
						id: args.body.lid,
						message: "Label updated successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_LABEL, e, {
					id: args.body.lid
				})
			}
		case ACTIONS.DELETE_LABEL:
			//body = {labelItem, fullList}
			//To remove an item, we use setDoc without merge option,
			//then, all will be overwritten with provided data
			try {
				const newList = keyBy(args.body.fullList, c => c.lid)
				await setDoc(
					doc(db, COLLECTION.SETTINGS, "labels"),
					newList
				)
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.DELETE_LABEL,
						id: args.body.labelItem.lid,
						message: "Label deleted successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.DELETE_LABEL, e, {
					id: args.body.labelItem.lid
				})
			}

		/*****************************************************************
		 * CATEGORIES => catId                                           *
		 *****************************************************************/
		case ACTIONS.GET_CATEGORIES:
			try {
				let categories = []
				const docSnap = await getDoc(
					doc(db, COLLECTION.SETTINGS, "categories")
				)
				if (docSnap.exists()) categories = docSnap.data()
				return { data: categories }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_CATEGORIES, e, null)
			}
		case ACTIONS.ADD_CATEGORY:
			try {
				const updatedItems = args.body.isDefault
					? keyBy(args.body.fullList, c => c.catId)
					: { [args.body.categoryItem.catId]: args.body.categoryItem }
				await setDoc(
					doc(db, COLLECTION.SETTINGS, "categories"),
					updatedItems,
					{ merge: true }
				)
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.ADD_CATEGORY,
						id: args.body.categoryItem.catId,
						message: "Category added successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.ADD_CATEGORY, e, {
					id: args.body.categoryItem.catId
				})
			}
		case ACTIONS.UPDATE_CATEGORY: //body = {isDefault, categoryItem, fullList}
			//Note: behavior of update_category & add_category are the same!
			//the only difference is that add_category use `setDoc`
			//and update_category uses `updateDoc`
			try {
				const updatedItems = args.body.isDefault
					? keyBy(args.body.fullList, c => c.catId)
					: { [args.body.categoryItem.catId]: args.body.categoryItem }

				console.log({ updatedItems })

				await updateDoc(
					doc(db, COLLECTION.SETTINGS, "categories"),
					updatedItems
				)
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_CATEGORY,
						id: args.body.categoryItem.catId,
						message: "Category updated successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_CATEGORY, e, {
					id: args.body.categoryItem.catId
				})
			}
		case ACTIONS.DELETE_CATEGORY:
			//body = {categoryItem, fullList}
			//To remove an item, we use setDoc without merge option,
			//then, all will be overwritten with provided data
			try {
				const newList = keyBy(args.body.fullList, c => c.catId)
				await setDoc(
					doc(db, COLLECTION.SETTINGS, "categories"),
					newList
				)
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.DELETE_CATEGORY,
						id: args.body.categoryItem.catId,
						message: "Category deleted successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.DELETE_CATEGORY, e, {
					id: args.body.categoryItem.catId
				})
			}

		/*****************************************************************
		 * TICKETS => tid                                                *
		 *****************************************************************/
		case ACTIONS.GET_TICKETS_FOR_USER:
			try {
				let res = []
				const querySnapshot = await getDocs(collection(db,
					COLLECTION.USERNAMES, args.username,
					"tickets"
				))
				querySnapshot.forEach((ticket) => { res.push(ticket.data()) })
				return { data: res }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_TICKETS_FOR_USER, e, null)
			}

		case ACTIONS.GET_TICKETS_FOR_ADMIN:
			try {
				let res = {}
				const docSnapshot = await getDoc(doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP))
				if (docSnapshot.exists()) { res = docSnapshot.data() }
				return { data: res }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_TICKETS_FOR_ADMIN, e, null)
			}

		case ACTIONS.GET_TICKET_REPLIES:
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
				return throwError(CODE.FAILED, ACTIONS.GET_TICKET_REPLIES, e, null)
			}

		case ACTIONS.ADD_TICKET:	//body: {...ticketItem}
			try {
				const batch = writeBatch(db)
				const newTicket = {
					...args.body,
					replyCount: 0,
					/*
						staffInCharge = [
							{
								assignee: string,
								assignor: string,
								assignedDate: serverTimestamp()
							}
						]
					 */
					staffInCharge: [],
					labels: [],
					removed: false, //used for temporarily delete feature
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
							createdAt: dayjs().valueOf(),
							updatedAt: dayjs().valueOf()
						}
					},
					{ merge: true }
				)

				await batch.commit()
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.ADD_TICKET,
						username: args.body.username,
						tid: args.body.tid,
						message: "Ticket added successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.ADD_TICKET, e, {
					username: args.body.username,
					tid: args.body.tid,
				})
			}

		case ACTIONS.ADD_TICKET_REPLY:	//body: {ticketItem, replyItem}
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
				//update reply's counter and updatedAt for USER
				batch.update(
					doc(db,
						COLLECTION.USERNAMES, args.body.ticketItem.username,
						"tickets", args.body.ticketItem.tid),
					{
						...args.body.ticketItem,
						replyCount: increment(1),
						updatedAt: serverTimestamp(),
					}
				)
				await batch.commit()

				//update reply's counter and updatedAt for ADMIN
				await runTransaction(db, async (transaction) => {
					const ticketXRef = await transaction.get(doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP))
					const ticketX = ticketXRef.data()
					transaction.update(
						doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP),
						{
							[args.body.ticketItem.tid]: {
								...ticketX[args.body.ticketItem.tid],
								...args.body.ticketItem,
								replyCount: ticketX[args.body.ticketItem.tid].replyCount + 1,
								updatedAt: dayjs().valueOf()
							}
						}
					)
				})

				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.ADD_TICKET_REPLY,
						username: args.body.ticketItem.username,
						tid: args.body.ticketItem.tid,
						message: "Ticket reply added successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.ADD_TICKET_REPLY, e, {
					username: args.body.ticketItem.username,
					tid: args.body.ticketItem.tid,
				})
			}

		case ACTIONS.UPDATE_TICKET:	//body: [{...ticketItem1}, {...ticketItem2}]
			try {
				const batch = writeBatch(db)
				args.body.forEach((ticketItem) => {
					batch.update(
						doc(db,
							COLLECTION.USERNAMES, ticketItem.username,
							"tickets", ticketItem.tid
						),
						{
							...ticketItem,
							updatedAt: serverTimestamp()
						}
					)
				})
				await batch.commit()

				//Update GROUP

				console.log("starting update Group")

				await runTransaction(db, async (transaction) => {
					const ticketXRef = await transaction.get(doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP))
					const ticketX = ticketXRef.data()
					console.log({ ticketX })
					//prepare the data
					const updatedTime = dayjs().valueOf()
					let newObject = {}
					args.body.forEach((item) => {
						newObject[item.tid] =
						{
							...ticketX[item.tid],
							...item,
							updatedAt: updatedTime,
						}
					})
					//do the update
					transaction.update(doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP), newObject)
				})

				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_TICKET,
						tickets: args.body,
						message: "Ticket(s) updated successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_TICKET, e, {
					tickets: args.body
				})
			}

		case ACTIONS.UPDATE_TICKET_REPLY:	//body: {ticketItem, replyItem}
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
								updatedAt: dayjs().valueOf(),
							}
						}
					)
				})

				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_TICKET_REPLY,
						username: args.body.ticketItem.username,
						tid: args.body.ticketItem.tid,
						message: "Ticket reply updated successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_TICKET_REPLY, e, {
					username: args.body.ticketItem.username,
					tid: args.body.ticketItem.tid,
				})
			}

		//!For safety reason, just allow to delete ticket one by one
		case ACTIONS.DELETE_TICKET:	//body: {username, tid}
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
						code: CODE.SUCCESS,
						action: ACTIONS.DELETE_TICKET,
						username: args.body.username,
						tid: args.body.tid,
						message: "Ticket deleted successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.DELETE_TICKET, e, {
					username: args.body.username,
					tid: args.body.tid,
				})
			}

		//!THIS IS A SIMPLIFIED VERSION OF UPDATE_TICKET
		case ACTIONS.DELETE_TICKET_TEMP:	//body: [{username, tid},{username, tid}]
			try {
				const batch = writeBatch(db)
				args.body.forEach((ticketItem) => {
					batch.update(
						doc(db,
							COLLECTION.USERNAMES, ticketItem.username,
							"tickets", ticketItem.tid
						),
						{
							removed: true,
							updatedAt: serverTimestamp()
						}
					)
				})
				await batch.commit()

				await runTransaction(db, async (transaction) => {
					const ticketXRef = await transaction.get(doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP))
					const ticketX = ticketXRef.data()
					console.log({ ticketX })
					//prepare the data
					const updatedTime = dayjs().valueOf()
					let newObject = {}
					args.body.forEach((item) => {
						newObject[item.tid] =
						{
							...ticketX[item.tid],
							removed: true,
							updatedAt: updatedTime,
						}
					})
					//do the update
					transaction.update(doc(db, COLLECTION.USERNAMES, GROUP.TICKETS_GROUP), newObject)
				})

				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.DELETE_TICKET_TEMP,
						tickets: args.body,
						message: "Ticket temporarily deleted successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_TICKET, e, { tickets: args.body })
			}

		case ACTIONS.DELETE_TICKET_REPLY:	//body: {username, tid, trid}
			try {
				console.log("DELETE_TICKET_REPLY", args.body)
				const batch = writeBatch(db)
				batch.delete(
					doc(db,
						COLLECTION.USERNAMES, args.body.username,
						"tickets", args.body.tid,
						"replies", args.body.trid
					))
				//update reply's counter and updatedAt for Ticket
				batch.update(
					doc(db,
						COLLECTION.USERNAMES, args.body.username,
						"tickets", args.body.tid),
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
							[args.body.tid]: {
								...ticketX[args.body.tid],
								replyCount: ticketX[args.body.tid].replyCount - 1,
								updatedAt: dayjs().valueOf()
							}
						}
					)
				})

				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.DELETE_TICKET_REPLY,
						username: args.body.username,
						tid: args.body.tid,
						trid: args.body.trid,
						message: "Ticket reply deleted successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.DELETE_TICKET_REPLY, e, {
					username: args.body.username,
					tid: args.body.tid,
					trid: args.body.trid,
				})
			}

		/*****************************************************************
		 * PAGES => pid                                                  *
		 *****************************************************************/
		case ACTIONS.GET_PAGES:
			try {
				let all = []
				const querySnapshot = await getDocs(collection(db,
					COLLECTION.PAGES
				))
				querySnapshot.forEach((page) => { all.push(page.data()) })
				return { data: all }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_PAGES, e, null)
			}

		case ACTIONS.GET_PAGE:	//body: pid
			try {
				let page = {}
				const docSnap = await getDoc(
					doc(db, COLLECTION.PAGES, args.body)
				)
				if (docSnap.exists()) page = docSnap.data()
				return { data: page }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_PAGE, e, null)
			}

		case ACTIONS.GET_PAGE_CONTENT:	//body: pid
			try {
				let pageContent = {}
				const docSnap = await getDoc(
					doc(db,
						COLLECTION.PAGES, args.body,
						"content", "current"
					)
				)
				if (docSnap.exists()) { pageContent = docSnap.data() }
				return { data: pageContent }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_PAGE_CONTENT, e, {
					pid: args.body
				})
			}

		case ACTIONS.ADD_PAGE:	// body: {pageItem, content: {text: string} }
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
						code: CODE.SUCCESS,
						action: ACTIONS.ADD_PAGE,
						pid: args.body.pageItem.pid,
						message: "Page added successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.ADD_PAGE, e, {
					pid: args.body.pageItem.pid
				})
			}

		case ACTIONS.UPDATE_PAGE:	//body: {...pageItem}
			try {
				await updateDoc(
					doc(db, COLLECTION.PAGES, args.body.pid),
					{
						...args.body,
						updatedAt: serverTimestamp()
					}
				)
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_PAGE,
						pid: args.body.pid,
						message: "Page properties updated successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_PAGE, e, {
					pid: args.body.pid,
				})
			}

		case ACTIONS.UPDATE_PAGE_CONTENT:	//body: {pageItem, content: {text:string} }
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
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_PAGE_CONTENT,
						pid: args.body.pageItem.pid,
						message: "Page content updated successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_PAGE_CONTENT, e, {
					pid: args.body.pageItem.pid
				})
			}

		case ACTIONS.DELETE_PAGE:	//body: pid
			try {
				const batch = writeBatch(db)
				batch.delete(doc(db, COLLECTION.PAGES, args.body, "content", "current"))
				batch.delete(doc(db, COLLECTION.PAGES, args.body))
				await batch.commit()
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.DELETE_PAGE,
						message: "Page deleted successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.DELETE_PAGE, e, null)
			}

		/*****************************************************************
		 * BLOG => bid                                                   *
		 *****************************************************************/
		case ACTIONS.GET_BLOG_POSTS:
			try {
				let all = []
				const querySnapshot = await getDocs(collection(db,
					COLLECTION.BLOG
				))
				querySnapshot.forEach((post) => { all.push(post.data()) })
				return { data: all }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_BLOG_POSTS, e, null)
			}

		case ACTIONS.GET_BLOG_POST:	//body: bid
			try {
				let page = {}
				const docSnap = await getDoc(
					doc(db, COLLECTION.BLOG, args.body)
				)
				if (docSnap.exists()) page = docSnap.data()
				return { data: page }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_BLOG_POST, e, null)
			}

		case ACTIONS.GET_BLOG_POST_CONTENT:	//body: bid
			try {
				let pageContent = {}
				const docSnap = await getDoc(
					doc(db,
						COLLECTION.BLOG, args.body,
						"content", "current"
					)
				)
				if (docSnap.exists()) { pageContent = docSnap.data() }
				return { data: pageContent }
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.GET_BLOG_POST_CONTENT, e, {
					bid: args.body
				})
			}

		case ACTIONS.ADD_BLOG_POST:	// body: {blogItem, content: {text: string} }
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
						code: CODE.SUCCESS,
						action: ACTIONS.ADD_BLOG_POST,
						bid: args.body.blogItem.bid,
						message: "Blog added successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.ADD_BLOG_POST, e, {
					pid: args.body.blogItem.bid
				})
			}

		case ACTIONS.UPDATE_BLOG_POST:	//body: {...blogItem}
			try {
				await updateDoc(
					doc(db, COLLECTION.BLOG, args.body.bid),
					{
						...args.body,
						updatedAt: serverTimestamp()
					}
				)
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_BLOG_POST,
						bid: args.body.bid,
						message: "Blog properties updated successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_BLOG_POST, e, {
					pid: args.body.bid,
				})
			}

		case ACTIONS.UPDATE_BLOG_POST_CONTENT:	//body: {blogItem, content: {text:string} }
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
						code: CODE.SUCCESS,
						action: ACTIONS.UPDATE_BLOG_POST_CONTENT,
						bid: args.body.blogItem.bid,
						message: "Blog content updated successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.UPDATE_BLOG_POST_CONTENT, e, {
					bid: args.body.blogItem.bid
				})
			}

		case ACTIONS.DELETE_BLOG_POST:	//body: bid
			try {
				const batch = writeBatch(db)
				batch.delete(doc(db, COLLECTION.BLOG, args.body, "content", "current"))
				batch.delete(doc(db, COLLECTION.BLOG, args.body))
				await batch.commit()
				return {
					data: {
						code: CODE.SUCCESS,
						action: ACTIONS.DELETE_BLOG_POST,
						message: "Blog post deleted successfully"
					}
				}
			} catch (e) {
				return throwError(CODE.FAILED, ACTIONS.DELETE_BLOG_POST, e, null)
			}

		default:
			return throwError(CODE.FAILED, "Action not yet implemented", { message: "Action not yet implemented" }, null)
	}
}

export default fireStoreBaseQuery