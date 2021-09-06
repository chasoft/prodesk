/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║          ProDesk - Your Elegant & Powerful Ticket System          ║ *
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

//PROJECT IMPORT
import { logoutSuccess } from "../redux/slices/auth"
import { REG_NEXT_STEP, USERGROUP } from "./constants"
import { auth, db, getUserDocByUid, getUsernameDocByUsername, googleAuthProvider } from "./firebase"

/*****************************************************************
 * LIBRARY                                                       *
 *****************************************************************/

export const signInWithGoogle = async ({ enqueueSnackbar }) => {
	try {
		await auth.signInWithPopup(googleAuthProvider)
	} catch (e) {
		console.log(e.message)
		enqueueSnackbar(e.message, { variant: "error" })
	}
}

export const signInWithEmail = async ({ username, password }, { enqueueSnackbar, router }) => {
	enqueueSnackbar("Connecting with Authentication Server...", { variant: "info" })
	try {
		if (username.includes("@")) {
			//Login
			const loggedin = await auth.signInWithEmailAndPassword(username, password)
			enqueueSnackbar("Logged in successfully!", { variant: "success" })

			//Check usergroup and redirect
			const userDoc = await getUserDocByUid(loggedin.user.uid)
			const usernameDoc = await getUsernameDocByUsername(userDoc.username)
			//Check usergroup and redirect
			if (usernameDoc.group === USERGROUP.USER) router.push("/client")
			else router.push("/admin")

		} else {
			const usernameDoc = await getUsernameDocByUsername(username)
			if (usernameDoc?.email) {
				await auth.signInWithEmailAndPassword(usernameDoc.email, password)
				enqueueSnackbar("Logged in successfully!", { variant: "success" })

				//Check usergroup and redirect
				if (usernameDoc.group === USERGROUP.USER) router.push("/client")
				else router.push("/admin")
			} else {
				throw new Error("Invalid username or not existed!")
			}
		}
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar(e.message, { variant: "error" })
	}
}

export const signOut = ({ enqueueSnackbar, dispatch }) => {
	auth.signOut()
	dispatch(logoutSuccess())
	enqueueSnackbar("Signed out successfully!", { variant: "success" })
}

/**
 * signUpWithEmail
 * @param {*} email 
 * @param {*} password 
 * @param {*} name 
 * @param {*} username 
 */
export const signUpWithEmail = async ({ email, password, name, username }, { router, enqueueSnackbar }) => {
	try {
		enqueueSnackbar("Connecting with Authentication Server...", { key: "signUpWithEmail", variant: "info" })
		const userCredential = await auth.createUserWithEmailAndPassword(email, password)

		const batch = db.batch()
		enqueueSnackbar("Updating the database...", { key: "signUpWithEmail", variant: "info" })

		batch.set(db.doc(`users/${userCredential.user.uid}`), {
			email: userCredential.user.email,
			username: username
		})
		batch.set(db.doc(`usernames/${username}`), {
			uid: JSON.stringify([userCredential.user.uid]),	//all associated account will be stored here in an Array
			displayName: name,
			photoURL: userCredential.user.providerData[0].photoURL ?? "/img/default-avatar.png",
			username: username,
			group: "user", //default usergroup
			nextStep: REG_NEXT_STEP.CREATE_PROFILE
		})
		await batch.commit()

		//TODO: verify email!!! userCredential.user.sendEmailVerification()

		//Go to next step -> /signup/create-profile  (to update avatar & location)
		//Nothing to do update with Redux here,
		//at this time, user logged successfully and just redirect to other page,
		//then... RootLayout would be activated and redux will be updated
		//so... next page will have all information in Redux!
		router.push(REG_NEXT_STEP.CREATE_PROFILE)
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar(e.message, { key: "signUpWithEmail", variant: "error" })
	}
}

/**
 * signUpViaSocialAccount
 * @param {*} uid 
 * @param {*} email 
 * @param {*} name 
 * @param {*} username 
 * @param {*} photoURL 
 */
export const signUpViaSocialAccount = async ({ uid, email, name, username, photoURL }, { enqueueSnackbar, router }) => {
	try {
		enqueueSnackbar("Creating your account with us...", { key: "signUpViaSocialAccount", variant: "info" })

		const batch = db.batch()
		batch.set(db.doc(`users/${uid}`), {
			email: email,
			username: username
		})
		batch.set(db.doc(`usernames/${username}`), {
			uid: JSON.stringify([uid]),	//all associated account will be stored here in an Array
			displayName: name,
			username: username,
			photoURL: photoURL,
			group: "user", //default usergroup
			nextStep: REG_NEXT_STEP.CREATE_PROFILE
		})
		await batch.commit()

		//Go to next step -> /signup/create-profile  (to update avatar & location)
		router.push(REG_NEXT_STEP.CREATE_PROFILE)
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar(e.message, { key: "signUpViaSocialAccount", variant: "error" })
	}
}


/**
 * createAdminAccount
 * @param {*} email 
 * @param {*} password 
 * @param {*} name 
 */
export const createAdminAccount = async ({ email, password, name }, { enqueueSnackbar, router }) => {
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
			displayName: name,
			photoURL: "/img/default-admin-avatar.png",
			username: username,
			group: username, //default usergroup
			nextStep: REG_NEXT_STEP.DONE
		})
		await batch.commit()
		router.push("/install/completed")
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar(e.message, { variant: "error" })
	}
}