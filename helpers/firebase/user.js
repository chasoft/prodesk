
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

import { collection, doc, getDocs, query, where, writeBatch } from "firebase/firestore"
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth"

//THIRD-PARTY

//PROJECT IMPORT
import { auth, db } from "."
import { COLLECTION } from "../../redux/slices/firestoreApiConstants"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const changePassword = async ({ email, password, newPassword }) => {
	try {
		const credential = EmailAuthProvider.credential(email, password)
		await reauthenticateWithCredential(auth.currentUser, credential)
		await updatePassword(auth.currentUser, newPassword)
		return { data: "Password changed successfully." }
	} catch (e) {
		return { error: e.message }
	}
}

export const getUserProfile = async (uid) => {
	try {
		let res = []
		const q = query(
			collection(db, COLLECTION.USERS),
			where("uid", "in", [uid])
		)
		const querySnapshot = await getDocs(q)
		querySnapshot.forEach((user) => { res.push(user.data()) })
		if (res[0]) return { data: res[0] }
		//---
		return { error: "User not existed." }
	} catch (e) {
		return { error: e.message }
	}
}

export const getUserProfileByUsername = async (username) => {
	try {
		let res = []
		const q = query(
			collection(db, COLLECTION.USERS),
			where("username", "==", username)
		)
		const querySnapshot = await getDocs(q)
		querySnapshot.forEach((user) => { res.push(user.data()) })
		if (res[0]) return { data: res[0] }
		//---
		return { error: "User not existed." }
	} catch (e) {
		return { error: e.message }
	}
}

export const isUsernameAvailable = async (username) => {
	try {
		let res = []
		const q = query(
			collection(db, COLLECTION.USERS),
			where("username", "==", username)
		)
		const querySnapshot = await getDocs(q)
		querySnapshot.forEach((user) => { res.push(user.data()) })
		if (res[0]) return { isUsernameAvailable: false, data: res[0] }
		//---
		return { isUsernameAvailable: true }
	} catch (e) {
		return { error: e.message }
	}
}

export const setUsername = async (uid, username) => {
	const res = await isUsernameAvailable(username)

	if (res.error) return res.error
	if (res.isUsernameAvailable === false) return { error: "Username existed." }

	try {
		const batch = writeBatch(db)
		batch.set(doc(db, COLLECTION.USERS, uid), { username }, { merge: true })
		batch.set(doc(db, COLLECTION.USERNAMES, username), { uid: [uid] }, { merge: true })
		await batch.commit()
		//---
		return { data: "Username created successfully" }
	} catch (e) {
		return { error: e.message }
	}
}