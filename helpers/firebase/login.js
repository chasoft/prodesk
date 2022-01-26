/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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

// import { signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth"

//PROJECT IMPORT
// import { auth } from "."
// import { getUserProfile } from "./user"
// import { loginSuccess } from "@redux/slices/auth"
// import { REDIRECT_URL, USERGROUP } from "./../constants"
// import { clearRedirect, setRedirect } from "@redux/slices/redirect"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

// export const signInWithGoogle = async ({ enqueueSnackbar }) => {
// 	try {
// 		const googleAuthProvider = new GoogleAuthProvider()
// 		await signInWithPopup(auth, googleAuthProvider)

// 		/* Or we can take Google Access Token to access Google API check demonstration code below:
// 		const logResult = await signInWithPopup(auth, googleAuthProvider)
// 		const credential = GoogleAuthProvider.credentialFromResult(logResult)
// 		const token = credential.accessToken
// 		// The signed-in user info.
// 		const user = result.user
// 		*/

// 	} catch (e) {
// 		console.log(e.message)
// 		enqueueSnackbar(e.message, { variant: "error" })
// 	}
// }

// const Redirect = (usernameDoc, dispatch, redirectAfterLoginURL) => {
// 	if (redirectAfterLoginURL === "") {
// 		//Check usergroup and redirect after logged in
// 		if (usernameDoc.group === USERGROUP.USER.code)
// 			// router.push(REDIRECT_URL.CLIENT)
// 			dispatch(setRedirect(REDIRECT_URL.CLIENT))
// 		else
// 			// router.push(REDIRECT_URL.ADMIN)
// 			dispatch(setRedirect(REDIRECT_URL.ADMIN))
// 	}
// dispatch(clearRedirect(redirectAfterLoginURL))
// }



/**
 * TODO: there are repeated code! would be optimized (DRY) in the next release
 */
// export const signInWithEmail = async ({ username, password }) => {
// 	if (username.includes("@")) {
// 		try {
// 			//Login
// 			const loggedin = await signInWithEmailAndPassword(auth, username, password)
// 			const userProfile = await getUserProfile(loggedin.user.uid)
// 			//Update Redux before do the redirecting
// 			dispatch(loginSuccess({
// 				emailVerified: loggedin.user.emailVerified,
// 				creationTime: loggedin.user.metadata.creationTime,
// 				lastSignInTime: loggedin.user.metadata.lastSignInTime,
// 				providerId: loggedin.user.providerData[0].providerId,
// 				...userProfile?.data
// 			}))

// 			Redirect(usernameDoc, dispatch, redirectAfterLoginURL)
// 		}
// 		catch (e) {
// 			console.log(e.message)
// 			enqueueSnackbar(e.message, { variant: "error" })
// 		}
// 		return
// 	}

// 	try {
// 		const usernameDoc = await getUsernameDocByUsername(username)
// 		if (usernameDoc?.email) {
// 			const loggedin = await signInWithEmailAndPassword(auth, usernameDoc.email, password)
// 			enqueueSnackbar("Logged in successfully!", { variant: "success" })

// 			//Check usergroup and redirect
// 			const userDoc = await getUserDocByUid(loggedin.user.uid)
// 			const userProperties = await getUsernameDocByUsername(userDoc.username)
// 			//Update Redux before doing the redirecting
// 			dispatch(loginSuccess({
// 				emailVerified: loggedin.user.emailVerified,
// 				creationTime: loggedin.user.metadata.creationTime,
// 				lastSignInTime: loggedin.user.metadata.lastSignInTime,
// 				providerId: loggedin.user.providerData[0].providerId,
// 				...userProperties
// 			}))

// 			Redirect(usernameDoc, dispatch, redirectAfterLoginURL)
// 		} else {
// 			throw new Error("Invalid username or not existed!")
// 		}
// 	}
// 	catch (e) {
// 		console.log(e.message)
// 		enqueueSnackbar(e.message, { variant: "error" })
// 	}
// }