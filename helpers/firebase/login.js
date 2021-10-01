import { loginSuccess } from "./../../redux/slices/auth"
import { clearRedirect, setRedirect } from "./../../redux/slices/redirect"
import { REDIRECT_URL, USERGROUP } from "./../constants"
import { auth, googleAuthProvider } from "."
import { getUserDocByUid, getUsernameDocByUsername } from "./user"



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