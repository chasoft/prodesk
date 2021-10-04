
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

import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword } from "firebase/auth"
import { collection, doc, getDoc, getDocs, query, where, limit, setDoc, writeBatch } from "firebase/firestore"

//THIRD-PARTY

//PROJECT IMPORT
import { auth, db } from "."

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/**
 * get admin's document from `adminUsers/${uid}`
 * @param {string} uid
 * @returns Object
 */
export const getAdminDocByUid = async (uid) => {
	let adminDoc = {}
	try {
		const docSnap = await getDoc(doc(db, "adminUsers", uid))
		if (docSnap.exists())
			adminDoc = docSnap.data()
		else
			throw new Error("adminUserId not existed.")
	} catch (e) {
		throw new Error("Something wrong happenned when trying to get adminUser's data.")
	}
	return adminDoc
}

/**
 * Re-Authorize before any important activities
 * @param {string} email
 * @param {string} password
 * @param {string} newEmail
 */

export const reAuthenticateProviderPassword = async ({ uid, email, password, newEmail }, { enqueueSnackbar }) => {
	try {
		const credential = EmailAuthProvider.credential(email, password)
		await reauthenticateWithCredential(auth.currentUser, credential)
		await updateEmail(auth.currentUser, newEmail)
		//Update email in database
		await setDoc(doc(db, "users", uid), { newEmail }, { merge: true })
		return true
	} catch (e) {
		enqueueSnackbar(e.message, { variant: "error" })
		return false
	}
}

export const changePassword = async ({ email, password, newPassword }, { enqueueSnackbar }) => {
	try {
		const credential = EmailAuthProvider.credential(email, password)
		await reauthenticateWithCredential(auth.currentUser, credential)
		await updatePassword(auth.currentUser, newPassword)
		return true
	} catch (e) {
		enqueueSnackbar(e.message, { variant: "error" })
		return false
	}
}

/**
 * Get user's document (`users/${uid}`) by username
 * @param {string} username
 * @returns Object
 */
export async function getUserDocByUsername(username) {
	const q = query(collection(db, "users"), where("username", "==", username), limit(1))
	const querySnapshot = await getDocs(q)
	const userDoc = querySnapshot[0].data()
	return userDoc
}

/**
 * Get user's document (`users/${uid}`) by uid
 * @param {string} uid
 * @returns Promise
 */
export const getUserDocByUid = async (uid) => {
	let userDoc
	try {
		const docSnap = await getDoc(doc(db, "users", uid))
		if (docSnap.exists()) {
			userDoc = docSnap.data()
		} else {
			throw new Error("User not existed!")
		}
	} catch (e) {
		throw new Error("Something wrong happenned when trying to get user's data")
	}
	return userDoc
}

/**
 * Get user's document from `usernames/${uid}`
 * @param {string} username
 * @returns Object
 */
export const getUsernameDocByUsername = async (username) => {
	let usernameDoc = {}
	try {
		const docSnap = await getDoc(doc(db, "usernames", username))
		if (docSnap.exists())
			usernameDoc = docSnap.data()
	} catch (e) {
		throw new Error("Something wrong happenned when trying to get username's data")
	}
	return usernameDoc
}

export const isUsernameAvailable = async (username) => {
	let usernameAvailability = false
	try {
		const docSnap = await getDoc(doc(db, "usernames", username))
		if (docSnap.exists())
			usernameAvailability = true
	} catch (e) {
		throw new Error("Something wrong happenned when checking username availability")
	}
	return usernameAvailability
}

export const userGetDisplayInfo = (uid) => {
	const userDoc = getUserDocByUid(uid)
	//in case not yet set userName, then use system default
	if (!userDoc.username) {
		return ({
			displayName: userDoc.displayName ? userDoc?.displayName : userDoc.email,
			photoURL: userDoc.photoURL ? userDoc.photoURL : "/img/default-avatar.png"
		})
	}

	const userNameDoc = getUsernameDocByUsername(userDoc.username)
	return ({
		displayName: userNameDoc.displayName ? userNameDoc.displayName
			: userDoc.displayName ? userDoc.displayName : userDoc.email,
		photoURL: userNameDoc.photoURL ? userNameDoc.photoURL
			: userDoc.photoURL ? userDoc.photoURL : "/img/default-avatar.png"
	})
}

/**
 * User can set username once, after that, username cannot be changed
 * Anyway, user can adjust his/her displayName for decoration
 * @param {*} uid 
 * @param {*} username 
 * @returns Nothing
 */
export const userSetUsername = async ({ uid, username }, { enqueueSnackbar }) => {
	// const { exists } = await db.doc(`usernames/${username}`).get()
	if (!isUsernameAvailable(username)) {
		enqueueSnackbar("Username is existed. Please choose another one!", { variant: "error" })
		return
	}

	const batch = writeBatch(db)
	try {
		batch.set(doc(db, "users", uid), { username }, { merge: true })
		batch.set(doc(db, "usernames", username), { uid })
		await batch.commit()
		enqueueSnackbar("Username created successfully", { variant: "success" })
	} catch (e) {
		console.log(e.message)
		enqueueSnackbar(`Something is wrong! Error message: ${e.message}`, { variant: "error" })
	}
}


/**
 * Update displayName at `usernames/${username}`
 * @param {string} username
 * @param {string} displayName
 */
export const userUpdateDisplayName = async ({ username, displayName }, { enqueueSnackbar }) => {
	try {
		await setDoc(doc(db, "usernames", username), { displayName }, { merge: true })
		enqueueSnackbar("Display name updated successfully", { variant: "success" })
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar("Display name updated successfully", { variant: "error" })
	}
}
