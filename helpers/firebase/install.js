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

import { doc, getDoc, writeBatch } from "firebase/firestore"
import { createUserWithEmailAndPassword } from "firebase/auth"

//THIRD-PARTY

//PROJECT IMPORT
import { auth, db } from "."
import { REDIRECT_URL } from "./../constants"
import { setRedirect } from "./../../redux/slices/redirect"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const getInstallStatus = async () => {
	const docSnap = await getDoc(doc(db, "usernames", "superadmin"))
	if (docSnap.exists) {
		const res = docSnap.data()
		return res.nextStep === REDIRECT_URL.DONE
	}
	return false
}

/**
 * createAdminAccount
 * @param {*} email 
 * @param {*} password 
 * @param {*} name 
 */
export const createAdminAccount = async ({ email, password, name }, { enqueueSnackbar, dispatch }) => {
	const username = "superadmin"
	try {
		enqueueSnackbar("Connecting with Authentication Server...", { variant: "info" })
		const userCredential = await createUserWithEmailAndPassword(auth, email, password)

		const batch = writeBatch(db)
		enqueueSnackbar("Updating the database...", { variant: "info" })

		batch.set(doc(db, "users", userCredential.user.uid), {
			email: userCredential.user.email,
			username: username
		})
		batch.set(doc(db, "usernames", username), {
			uid: JSON.stringify([userCredential.user.uid]),	//all associated account will be stored here in an Array
			email: userCredential.user.email,
			displayName: name,
			photoURL: "/img/default-admin-avatar.png",
			username: username,
			group: username, //default usergroup
			nextStep: REDIRECT_URL.INSTALL_COMPLETED
		})
		await batch.commit()
		dispatch(setRedirect(REDIRECT_URL.INSTALL_COMPLETED))
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar(e.message, { variant: "error" })
	}
}

export const installCompleted = async ({ enqueueSnackbar, dispatch }) => {
	try {
		const batch = writeBatch(db)
		batch.set(doc(db, "usernames", "superadmin"), {
			nextStep: REDIRECT_URL.DONE
		}, { merge: true })
		await batch.commit()
		dispatch(setRedirect(REDIRECT_URL.ADMIN))
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar(e.message, { variant: "error" })
	}
}