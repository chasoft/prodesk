import { setRedirect } from "./../../redux/slices/redirect"
import { REDIRECT_URL } from "./../constants"
import { auth, db } from "."

export const getInstallStatus = async () => {
	const query = await db.doc("usernames/superadmin").get()
	if (query.exists) {
		const res = query.data()
		if (res.nextStep === REDIRECT_URL.DONE)
			return true
		else
			return false
	} else {
		return false
	}
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
		const userCredential = await auth.createUserWithEmailAndPassword(email, password)

		const batch = db.batch()
		enqueueSnackbar("Updating the database...", { variant: "info" })

		batch.set(db.doc(`users/${userCredential.user.uid}`), {
			email: userCredential.user.email,
			username: username
		})
		batch.set(db.doc(`usernames/${username}`), {
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
		const batch = db.batch()
		batch.set(db.doc("usernames/superadmin"), {
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