import { batch as reduxBatch } from "react-redux"
import { auth, db } from "."
import { updateAvatarAndLocation } from "./../../redux/slices/auth"
import { setRedirect } from "./../../redux/slices/redirect"
import { REDIRECT_URL, USERGROUP } from "./../constants"


export const signupCreateProfile = async ({ username, avatar, location }, { dispatch, enqueueSnackbar }) => {
	const batch = db.batch()
	try {
		batch.set(db.doc(`usernames/${username}`), {
			photoURL: avatar,
			location: location,
			nextStep: REDIRECT_URL.SURVEY
		}, { merge: true })
		await batch.commit()

		//Update redux
		reduxBatch(() => {
			dispatch(updateAvatarAndLocation({
				photoURL: avatar,
				location: location,
				// nextStep: REDIRECT_URL.SURVEY
			}))
			dispatch(setRedirect(REDIRECT_URL.SURVEY))
		})

		// router.push(REDIRECT_URL.SURVEY)
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar(`Something is wrong! Error message: ${e.message}`, { variant: "error" })
	}
}



export const signupInitSurvey = async ({ username, payload }, { enqueueSnackbar, dispatch }) => {
	const batch = db.batch()
	try {
		batch.set(db.doc(`usernames/${username}`), {
			survey: JSON.stringify(payload),
			nextStep: REDIRECT_URL.DONE
		}, { merge: true })
		await batch.commit()

		//Update redux
		reduxBatch(() => {
			dispatch(updateAvatarAndLocation({
				survey: JSON.stringify(payload),
				nextStep: REDIRECT_URL.DONE
			}))
			dispatch(setRedirect(REDIRECT_URL.CREATE_COMPLETED))
		})
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar(`Something is wrong! Error message: ${e.message}`, { variant: "error" })
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
