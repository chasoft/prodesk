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

// import { doc, writeBatch } from "firebase/firestore"
// import { createUserWithEmailAndPassword } from "firebase/auth"

//THIRD-PARTY
// import { batch as reduxBatch } from "react-redux"

//PROJECT IMPORT
// import { auth, db } from "."
// import { REDIRECT_URL, USERGROUP } from "./../constants"
// import { setRedirect } from "./../../redux/slices/redirect"
// import { updateAvatarAndLocation } from "./../../redux/slices/auth"
// import { isUsernameAvailable } from "./user"
// import { COLLECTION } from "../../redux/slices/firestoreApiConstants"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

// export const db = firebase.firestore();
// db.settings({
// 	cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
// 	ignoreUndefinedProperties: true,
// });
// db.enablePersistence({ synchronizeTabs: true });

// export const functions = firebase.functions();


// export const googleProvider =
// 	new firebase.auth.GoogleAuthProvider().setCustomParameters({
// 		prompt: "select_account",
// 	});

// export const signupCreateProfile = async ({ uid, username, avatar, location }, { dispatch, enqueueSnackbar }) => {
// 	try {
// 		const batch = writeBatch(db)

// 		batch.set(doc(db, "users", uid), {
// 			photoURL: avatar,
// 			location: location,
// 		}, { merge: true })

// 		batch.set(doc(db, "usernames", username), {
// 			nextStep: REDIRECT_URL.SURVEY
// 		}, { merge: true })
// 		await batch.commit()

// 		dispatch(setRedirect(REDIRECT_URL.SURVEY))
// 		// router.push(REDIRECT_URL.SURVEY)
// 	}
// 	catch (e) {
// 		console.log(e.message)
// 		enqueueSnackbar(`Something is wrong! Error message: ${e.message}`, { variant: "error" })
// 	}
// }

// export const signupInitSurvey = async ({ username, payload }, { enqueueSnackbar, dispatch }) => {
// 	const batch = writeBatch(db)
// 	try {
// 		batch.set(doc(db, "usernames", username), {
// 			survey: JSON.stringify(payload),
// 			nextStep: REDIRECT_URL.DONE
// 		}, { merge: true })
// 		await batch.commit()

// 		//Update redux
// 		reduxBatch(() => {
// 			dispatch(updateAvatarAndLocation({
// 				survey: JSON.stringify(payload),
// 				nextStep: REDIRECT_URL.DONE
// 			}))
// 			dispatch(setRedirect(REDIRECT_URL.CREATE_COMPLETED))
// 		})
// 	}
// 	catch (e) {
// 		console.log(e.message)
// 		enqueueSnackbar(`Something is wrong! Error message: ${e.message}`, { variant: "error" })
// 	}
// }

/**
 * signUpViaSocialAccount
 * @param {*} uid
 * @param {*} email
 * @param {*} name
 * @param {*} username
 * @param {*} photoURL
 */
// export const signUpViaSocialAccount = async ({ uid, email, name, username, photoURL }, { enqueueSnackbar, dispatch }) => {
// 	try {
// 		const batch = writeBatch(db)
// 		batch.set(doc(db, "users", uid), {
// 			uid: uid,
// 			email: email,
// 			username: username,
// 			displayName: name,
// 			photoURL: photoURL,
// 		})
// 		batch.set(doc(db, "usernames", username), {
// 			uid: uid,	
// 			username: username,
// 			email: email,
// 			group: "user", //default usergroup
// 			nextStep: REDIRECT_URL.CREATE_PROFILE
// 		})
// 		await batch.commit()

// 		//Go to next step -> /signup/create-profile  (to update avatar & location)
// 		// router.push(REDIRECT_URL.CREATE_PROFILE)
// 		dispatch(setRedirect(REDIRECT_URL.CREATE_PROFILE))
// 	}
// 	catch (e) {
// 		console.log(e.message)
// 		enqueueSnackbar(e.message, { key: "signUpViaSocialAccount", variant: "error" })
// 	}
// }

// export const signUpWithEmail = async ({ email, password, name, username }) => {
// 	try {

// 		//Check username availability
// 		const res = await isUsernameAvailable(username)
// 		if (res.error) return res.error
// 		if (res.isUsernameAvailable === false) return { error: "Username existed." }

// 		const userCredential = createUserWithEmailAndPassword(auth, email, password)

// 		const batch = writeBatch(db)
// 		batch.set(doc(db, COLLECTION.USERS, userCredential.user.uid), {
// 			uid: userCredential.user.uid,
// 			username: username,
// 			email: userCredential.user.email,
// 			displayName: name,
// 			photoURL: userCredential.user.providerData[0].photoURL ?? "/avatar/default.png",
// 		})
// 		batch.set(doc(db, COLLECTION.USERNAMES, username), {
// 			uid: userCredential.user.uid,
// 			username: username,
// 			email: userCredential.user.email,
// 			group: USERGROUP.USER.code, //default usergroup
// 			nextStep: REDIRECT_URL.CREATE_PROFILE
// 		})
// 		await batch.commit()

// 		//Update Redux before doing the redirecting
// 		// const userDoc = await getUserDocByUid(userCredential.user.uid)
// 		// const userProperties = await getUsernameDocByUsername(userDoc.username)

// 		// dispatch(loginSuccess({
// 		// 	emailVerified: userCredential.user.emailVerified,
// 		// 	creationTime: userCredential.user.metadata.creationTime,
// 		// 	lastSignInTime: userCredential.user.metadata.lastSignInTime,
// 		// 	providerId: userCredential.user.providerData[0].providerId,
// 		// 	...userProperties
// 		// }))

// 		// router.push(REDIRECT_URL.CREATE_PROFILE)
// 		// dispatch(setRedirect(REDIRECT_URL.CREATE_PROFILE))
// 	}
// 	catch (e) {
// 		console.log(e.message)
// 		// enqueueSnackbar(e.message, { key: "signUpWithEmail", variant: "error" })
// 	}
// }
