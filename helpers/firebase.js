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
 * FIREBASE SDK                                                  *
 *****************************************************************/

import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
//import { getAnalytics } from "firebase/analytics"

/*****************************************************************
 * THIRD-PARTY LIBRARY                                           *
 *****************************************************************/

import dayjs from "dayjs"
import { nanoid } from "nanoid"
import { useDispatch } from "react-redux"
import { updateAvatarAndLocation } from "../redux/slices/auth"
import { REDIRECT_URL, TICKET_STATUS } from "./constants"


/*****************************************************************
 * FIREBASE CONFIGURATION                                        *
 *****************************************************************/

const firebaseConfig = {
	apiKey: "AIzaSyAjxlM9UjqtmwAXIQh2EaZx2dvJLXU9SEE",
	authDomain: "prodesk-83cfe.firebaseapp.com",
	projectId: "prodesk-83cfe",
	storageBucket: "prodesk-83cfe.appspot.com",
	messagingSenderId: "183315432788",
	appId: "1:183315432788:web:44dc8c573f1bca61fc34c1",
	// measurementId: "G-GNGHNS1VEJ"
}

//this condition is to prevent double initializing for nextjs
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
	//const analytics = getAnalytics(app)
}

/*****************************************************************
 * EXPORT TO SHORTER USAGE                                       *
 *****************************************************************/

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export const db = firebase.firestore()
//use this to get consistent datetime for users in different timezones
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const fromMillis = firebase.firestore.Timestamp.fromMillis
export const increment = firebase.firestore.FieldValue.increment

export const storage = firebase.storage()
//used to track uploading status to firestorage
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED

/*****************************************************************
 * HELPER FUNCTIONS                                              *
 *****************************************************************/

/**
 * transform function for react-firebase-hooks
 * to fix datetime issue with firebase for "Tickets" collection
 */
export function fixDateTickets(data) {
	return {
		...data,
		createdAt: dayjs(data?.createdAt?.toMillis()).format("DD-MMM-YY HH:mm") || 0,
		updatedAt: dayjs(data?.updatedAt?.toMillis()).format("DD-MMM-YY HH:mm") || 0
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

/*****************************************************************
 * ADMIN                                                         *
 *****************************************************************/

export const getInstallStatus = async () => {
	const res = await db.doc("usernames/superadmin").get()
	console.log(res.exists)
	if (res.exists) {
		return true
	} else {
		return false
	}
}

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

/*****************************************************************
 * USERS                                                         *
 *****************************************************************/


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

export const createProfileRegStep = async ({ username, avatar, location }, { router, enqueueSnackbar }) => {
	const dispatch = useDispatch()
	const batch = db.batch()
	try {
		batch.set(db.doc(`usernames/${username}`), {
			photoURL: avatar,
			location: location,
			nextStep: REDIRECT_URL.SURVEY
		})
		await batch.commit()

		//Update redux
		dispatch(updateAvatarAndLocation({
			photoURL: avatar,
			location: location,
			nextStep: REDIRECT_URL.SURVEY
		}))

		router.push(REDIRECT_URL.SURVEY)
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar(`Something is wrong! Error message: ${e.message}`, { variant: "error" })
	}
}

export const doInitSurvey = async ({ username, payload }, { enqueueSnackbar, dispatch, router }) => {
	const batch = db.batch()
	try {
		batch.set(db.doc(`usernames/${username}`), {
			survey: JSON.stringify(payload),
			nextStep: REDIRECT_URL.DONE
		})
		await batch.commit()

		//Update redux
		dispatch(updateAvatarAndLocation({
			survey: JSON.stringify(payload),
			nextStep: REDIRECT_URL.DONE
		}))

		router.push("/client")
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar(`Something is wrong! Error message: ${e.message}`, { variant: "error" })
	}
}



export const isUsernameAvailable = async (username) => {
	const { exists } = await db.doc(`usernames/${username}`).get()
	if (exists) {
		return false
	}
	return true
}

/**
 * User can set username once, after that, username cannot be changed
 * Anyway, user can adjust his/her displayName for decoration
 * @param {*} uid 
 * @param {*} username 
 * @returns Nothing
 */
export const setUsername = async ({ uid, username }, { enqueueSnackbar }) => {
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

export const getUserDisplayInfo = (uid) => {
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
 * Update displayName at `usernames/${username}`
 * @param {string} username
 * @param {string} displayName
 */
export const updateDisplayName = async ({ username, displayName }, { enqueueSnackbar }) => {
	try {
		db.doc(`usernames/${username}`).set({ displayName }, { merge: true })
		enqueueSnackbar("Display name updated successfully", { variant: "success" })
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar("Display name updated successfully", { variant: "error" })
	}
}

/*****************************************************************
 * TICKETS                                                       *
 *****************************************************************/

/**
 * Location of Tickets of a specific user
 * @param {string} uid - uid of current logged in user
 * @returns Firebase collection reference
 */
export const ticketsRef = (uid) => {
	return db
		.collection("users").doc(uid)
		.collection("tickets")
		.orderBy("updatedAt", "desc")
}

/**
 * Location of a Ticket's replies
 * @param {string} uid - uid of current logged in user
 * @param {string} ticketId
 * @returns Firebase collection reference
 */
export const ticketRepliesRef = (uid, ticketId) => {
	console.log({ uid, ticketId })
	return db
		.collection("users").doc(uid)
		.collection("tickets").doc(ticketId)
		.collection("replies")
		.orderBy("createdAt", "asc")
}

/**
 * Update status for one or more tickets
 * @param {string[]} idArray
 * @param {string} uid - uid of current logged in user
 * @param {string} newStatus - limited in STATUS_FILTER const
 */
export const updateTicketsStatus = async ({ idArray, uid, newStatus }, { enqueueSnackbar }) => {
	const batch = db.batch()

	try {
		idArray.forEach((id) => {
			batch.update(
				db.doc(`users/${uid}/tickets/${id}`),
				{
					status: newStatus,
					updatedAt: serverTimestamp()
				}
			)
		})
		await batch.commit()
		enqueueSnackbar(`Ticket's status updated to ${newStatus}`, { variant: "success" })
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar(`Something is wrong! Error message: ${e.message}`, { variant: "error" })
	}
}

/**
 * Delete tickets from Firestore
 * @param {string[]} idArray
 * @param {string} uid - uid of current logged in user
 */
export const deleteTickets = async ({ idArray, uid }, { enqueueSnackbar }) => {
	const batch = db.batch()
	try {
		idArray.forEach((id) => {
			batch.delete(db.doc(`users/${uid}/tickets/${id}`))
		})
		await batch.commit()
		enqueueSnackbar("Tickets removed from database successfully", { variant: "success" })
	}
	catch (e) {
		console.log(e.message)
		enqueueSnackbar(`Something is wrong! Error message: ${e.message}`, { variant: "error" })
	}
}


/**
 * Create new support ticket!
 * @param {object} currentUser 
 * @param {object} metaData 
 * @param {string} ticketContent 
 * @returns Nothing
 */
export const createNewTicket = async ({ currentUser, metaData, ticketContent }, { router, enqueueSnackbar }) => {
	/* validate input */
	if (metaData.subject.length < 10) {
		enqueueSnackbar("Please enter meaningful subject for your new ticket!", { variant: "error" })
		return
	}
	if (ticketContent.length < 15) {
		enqueueSnackbar("Please provide more details about your problem!", { variant: "error" })
		return
	}

	/* Preparing data to create new ticket */
	try {
		const ticketId = nanoid(10)
		const ref = db.doc(`users/${currentUser.uid}/tickets/${ticketId}`)

		const ticketData = {
			id: ticketId,
			...metaData,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
			content: ticketContent,
			status: TICKET_STATUS.OPEN,
			//username: currentUser.username,
			authorUid: currentUser.uid
		}
		await ref.set(ticketData)
		enqueueSnackbar("Ticket created! We will check and reply to you soon!", { variant: "success" })
		router.push("/client/tickets")
	} catch (e) {
		console.log(e.message)
		enqueueSnackbar(`Something is wrong! Error message: ${e.message}`, { variant: "error" })
	}
}


export const createNewTicketReply = async ({ currentUser, ticketId, replyContent }, { enqueueSnackbar }) => {
	/* validate input */
	if (replyContent.length < 5) {
		enqueueSnackbar("Too short for a reply!", { variant: "error" })
		return
	}

	/* Preparing data to create new ticket reply  */
	const batch = db.batch()
	try {

		//Update the status && datetime of current ticket
		batch.update(db.doc(`users/${currentUser.uid}/tickets/${ticketId}`), {
			status: TICKET_STATUS.OPEN,
			updatedAt: serverTimestamp()
		})

		//Add new reply
		const replyId = nanoid(10)
		batch.set(db.doc(`users/${currentUser.uid}/tickets/${ticketId}/replies/${replyId}`), {
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
			content: replyContent,
			authorUid: currentUser.uid,
			id: replyId
		})

		await batch.commit()
		enqueueSnackbar("Your reply has been added! We will check and reply to you soon!", { variant: "success" })
	} catch (e) {
		console.log(e.message)
		enqueueSnackbar(`Something is wrong! Error message: ${e.message}`, { variant: "error" })
	}
}


// export const updateTicketsStatus = async (idArray, uid, newStatus) => {
// 	const batch = db.batch()

// 	try {
// 		idArray.forEach((id) => {
// 			batch.update(
// 				db.doc(`users/${uid}/tickets/${id}`),
// 				{
// 					status: newStatus,
// 					updatedAt: serverTimestamp()
// 				}
// 			)
// 		})
// 		await batch.commit()
// 		toast.success(`Ticket's status updated to ${newStatus}`)
// 	}
// 	catch (e) {
// 		console.log(e.message)
// 		toast.error(`Something is wrong! Error message: ${e.message}`)
// 	}
// }