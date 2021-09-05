/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║      DomainHub - Your Trusted Domain Partner (SaaS Platform)      ║ *
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
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

//import { useDispatch, useSelector } from "react-redux"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import { auth, db, googleAuthProvider } from "./firebase"
import { useSnackbar } from "notistack"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const signInWithGoogle = async () => {
	const { enqueueSnackbar } = useSnackbar()
	try {
		await auth.signInWithPopup(googleAuthProvider)
	} catch (e) {
		console.log(e.message)
		enqueueSnackbar(e.message, { variant: "error" })
	}
}

export const signInWithEmail = async (email, password) => {
	const { enqueueSnackbar } = useSnackbar()
	enqueueSnackbar("Connecting with Authentication Server...", { key: "signInWithEmail", variant: "info" })
	try {
		await auth.signInWithEmailAndPassword(email, password)
		enqueueSnackbar("Logged in successfully!", { key: "signInWithEmail", variant: "success" })
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar(e.message, { key: "signInWithEmail", variant: "error" })
	}
}

export const signOut = () => {
	const { enqueueSnackbar } = useSnackbar()
	auth.signOut()
	enqueueSnackbar("Signed out successfully!", { variant: "success" })
}

export const signUpWithEmail = async (email, password, name, username) => {
	const { enqueueSnackbar } = useSnackbar()
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
			uid: userCredential.user.uid,
			displayName: name,
			photoURL: userCredential.user.providerData[0].photoURL ?? "/img/default-avatar.png",
			username: username
		})
		await batch.commit()

		// userCredential.user.sendEmailVerification()
		enqueueSnackbar("Logged in successfully!", { key: "signUpWithEmail", variant: "success" })
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar(e.message, { key: "signUpWithEmail", variant: "error" })
	}
}



