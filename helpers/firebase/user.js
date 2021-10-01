
import firebase from "firebase/app"
import { auth, db } from "."


/**
 * get admin's document from `adminUsers/${uid}`
 * @param {string} uid
 * @returns Object
 */
export const getAdminDocByUid = async (uid) => {
	const query = await db.doc(`adminUsers/${uid}`).get()
	if (query.exists) {
		const res = query.data()
		return res
	} else {
		return ({})
	}
}

/**
 * Re-Authorize before any important activities
 * @param {string} email
 * @param {string} password
 * @param {string} newEmail
 */

export const reAuthenticateProviderPassword = async ({ uid, email, password, newEmail }, { enqueueSnackbar }) => {
	try {
		const credential = firebase.auth.EmailAuthProvider.credential(email, password)
		await auth.currentUser.reauthenticateWithCredential(credential)
		await auth.currentUser.updateEmail(newEmail)
		//Update email in database
		db.doc(`users/${uid}`).set({ email: newEmail }, { merge: true })
		return true
	} catch (e) {
		enqueueSnackbar(e.message, { variant: "error" })
		return false
	}
}

export const changePassword = async ({ email, password, newPassword }, { enqueueSnackbar }) => {
	try {
		const credential = firebase.auth.EmailAuthProvider.credential(email, password)
		await auth.currentUser.reauthenticateWithCredential(credential)
		await auth.currentUser.updatePassword(newPassword)
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
	const query = db
		.collection("users").where("username", "==", username)
		.limit(1)
	const userDoc = (await query.get()).docs[0]
	return userDoc
}

/**
 * Get user's document (`users/${uid}`) by uid
 * @param {string} uid
 * @returns Promise
 */
export const getUserDocByUid = async (uid) => {
	const res = await db.doc(`users/${uid}`).get()
	const data = res.data()
	return data
}

/**
 * Get user's document from `usernames/${uid}`
 * @param {string} username
 * @returns Object
 */
export const getUsernameDocByUsername = async (username) => {
	const query = await db.doc(`usernames/${username}`).get()
	if (query.exists) {
		const res = query.data()
		return res
	} else {
		return ({})
	}
}


export const isUsernameAvailable = async (username) => {
	const { exists } = await db.doc(`usernames/${username}`).get()
	if (exists) {
		return false
	}
	return true
}


export const userGetDisplayInfo = (uid) => {
	const userDoc = getUserDocByUid(uid)
	if (!userDoc.username) {
		//in case not yet set userName, then use system default
		return ({
			displayName: userDoc.displayName ? userDoc?.displayName : userDoc.email,
			photoURL: userDoc.photoURL ? userDoc.photoURL : "/img/default-avatar.png"
		})
	} else {
		const userNameDoc = getUsernameDocByUsername(userDoc.username)
		return ({
			displayName: userNameDoc.displayName ? userNameDoc.displayName
				: userDoc.displayName ? userDoc.displayName : userDoc.email,
			photoURL: userNameDoc.photoURL ? userNameDoc.photoURL
				: userDoc.photoURL ? userDoc.photoURL : "/img/default-avatar.png"
		})
	}
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

	const batch = db.batch()
	try {
		batch.set(db.doc(`users/${uid}`), { username }, { merge: true })
		batch.set(db.doc(`usernames/${username}`), { uid })
		await batch.commit()
		enqueueSnackbar("Username created successfully", { variant: "success" })
	}
	catch (e) {
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
		db.doc(`usernames/${username}`).set({ displayName }, { merge: true })
		enqueueSnackbar("Display name updated successfully", { variant: "success" })
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar("Display name updated successfully", { variant: "error" })
	}
}
