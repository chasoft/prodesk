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

//THIRD-PARTY
import { batch as reduxBatch } from "react-redux"

//PROJECT IMPORT
import { loginSuccess, logoutSuccess } from "../redux/slices/auth"
import { clearRedirect, setRedirect } from "../redux/slices/redirect"
import { REDIRECT_URL, USERGROUP } from "./constants"
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

const Redirect = (usernameDoc, dispatch, redirectAfterLoginURL) => {
	if (redirectAfterLoginURL === "") {
		//Check usergroup and redirect after logged in
		if (usernameDoc.group === USERGROUP.USER)
			// router.push(REDIRECT_URL.CLIENT)
			dispatch(setRedirect(REDIRECT_URL.CLIENT))
		else
			// router.push(REDIRECT_URL.ADMIN)
			dispatch(setRedirect(REDIRECT_URL.ADMIN))
	}

	dispatch(clearRedirect(redirectAfterLoginURL))
}

/**
 * TODO: there are repeated code! would be optimized (DRY) in the next release
 */
export const signInWithEmail = async ({ username, password }, { enqueueSnackbar, dispatch, redirectAfterLoginURL }) => {
	enqueueSnackbar("Connecting with Authentication Server...", { variant: "info" })
	try {
		if (username.includes("@")) {
			//Login
			const loggedin = await auth.signInWithEmailAndPassword(username, password)
			enqueueSnackbar("Logged in successfully!", { variant: "success" })

			//Check usergroup and redirect
			const userDoc = await getUserDocByUid(loggedin.user.uid)
			const userProperties = await getUsernameDocByUsername(userDoc.username)
			const usernameDoc = await getUsernameDocByUsername(userDoc.username)
			//Update Redux before do the redirecting
			dispatch(loginSuccess({
				emailVerified: loggedin.user.emailVerified,
				creationTime: loggedin.user.metadata.creationTime,
				lastSignInTime: loggedin.user.metadata.lastSignInTime,
				providerId: loggedin.user.providerData[0].providerId,
				...userProperties
			}))

			Redirect(usernameDoc, dispatch, redirectAfterLoginURL)

		} else {
			const usernameDoc = await getUsernameDocByUsername(username)
			if (usernameDoc?.email) {
				const loggedin = await auth.signInWithEmailAndPassword(usernameDoc.email, password)
				enqueueSnackbar("Logged in successfully!", { variant: "success" })

				//Check usergroup and redirect
				const userDoc = await getUserDocByUid(loggedin.user.uid)
				const userProperties = await getUsernameDocByUsername(userDoc.username)
				//Update Redux before doing the redirecting
				dispatch(loginSuccess({
					emailVerified: loggedin.user.emailVerified,
					creationTime: loggedin.user.metadata.creationTime,
					lastSignInTime: loggedin.user.metadata.lastSignInTime,
					providerId: loggedin.user.providerData[0].providerId,
					...userProperties
				}))

				Redirect(usernameDoc, dispatch, redirectAfterLoginURL)

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
	reduxBatch(() => {
		dispatch(logoutSuccess())
		dispatch(setRedirect(REDIRECT_URL.LOGIN))
	})
	enqueueSnackbar("Signed out successfully!", { variant: "success" })
}

/**
 * signUpWithEmail
 * @param {*} email 
 * @param {*} password 
 * @param {*} name 
 * @param {*} username 
 */
export const signUpWithEmail = async ({ email, password, name, username }, { enqueueSnackbar, dispatch }) => {
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
			email: userCredential.user.email,
			photoURL: userCredential.user.providerData[0].photoURL ?? "/img/default-avatar.png",
			username: username,
			group: USERGROUP.USER, //default usergroup
			nextStep: REDIRECT_URL.CREATE_PROFILE
		})
		await batch.commit()

		//TODO: verify email!!! userCredential.user.sendEmailVerification()

		//Update Redux before doing the redirecting
		// const userDoc = await getUserDocByUid(userCredential.user.uid)
		// const userProperties = await getUsernameDocByUsername(userDoc.username)

		// dispatch(loginSuccess({
		// 	emailVerified: userCredential.user.emailVerified,
		// 	creationTime: userCredential.user.metadata.creationTime,
		// 	lastSignInTime: userCredential.user.metadata.lastSignInTime,
		// 	providerId: userCredential.user.providerData[0].providerId,
		// 	...userProperties
		// }))

		// router.push(REDIRECT_URL.CREATE_PROFILE)
		dispatch(setRedirect(REDIRECT_URL.CREATE_PROFILE))
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
export const signUpViaSocialAccount = async ({ uid, email, name, username, photoURL }, { enqueueSnackbar, dispatch }) => {
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
			nextStep: REDIRECT_URL.CREATE_PROFILE
		})
		await batch.commit()

		//Go to next step -> /signup/create-profile  (to update avatar & location)
		// router.push(REDIRECT_URL.CREATE_PROFILE)
		dispatch(setRedirect(REDIRECT_URL.CREATE_PROFILE))
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