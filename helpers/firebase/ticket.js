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

import { serverTimestamp } from "firebase/firestore"

//THIRD-PARTY
import { nanoid } from "nanoid"

//PROJECT IMPORT
import { db } from "."
import { TICKET_STATUS } from "./../constants"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/**
 * Create new support ticket!
 * @param {object} currentUser 
 * @param {object} metaData 
 * @param {string} ticketContent 
 * @returns Nothing
 */
export const ticketAddNew = async ({ currentUser, metaData, ticketContent }, { router, enqueueSnackbar }) => {
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
		const ref = db.doc(`users/${currentUser.uid[0]}/tickets/${ticketId}`)

		const ticketData = {
			id: ticketId,
			...metaData,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
			content: ticketContent,
			status: TICKET_STATUS.OPEN,
			//username: currentUser.username,
			authorUid: currentUser.uid[0]
		}
		await ref.set(ticketData)
		enqueueSnackbar("Ticket created! We will check and reply to you soon!", { variant: "success" })
		router.push("/client/tickets")
	} catch (e) {
		console.log(e.message)
		enqueueSnackbar(`Something is wrong! Error message: ${e.message}`, { variant: "error" })
	}
}

export const ticketAddReply = async ({ currentUser, ticketId, replyContent }, { enqueueSnackbar }) => {
	/* validate input */
	if (replyContent.length < 5) {
		enqueueSnackbar("Too short for a reply!", { variant: "error" })
		return
	}

	/* Preparing data to create new ticket reply  */
	const batch = db.batch()
	try {

		//Update the status && datetime of current ticket
		batch.update(db.doc(`users/${currentUser.uid[0]}/tickets/${ticketId}`), {
			status: TICKET_STATUS.OPEN,
			updatedAt: serverTimestamp()
		})

		//Add new reply
		const replyId = nanoid(10)
		batch.set(db.doc(`users/${currentUser.uid[0]}/tickets/${ticketId}/replies/${replyId}`), {
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
			content: replyContent,
			authorUid: currentUser.uid[0],
			id: replyId
		})

		await batch.commit()
		enqueueSnackbar("Your reply has been added! We will check and reply to you soon!", { variant: "success" })
	} catch (e) {
		console.log(e.message)
		enqueueSnackbar(`Something is wrong! Error message: ${e.message}`, { variant: "error" })
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
 * Delete tickets from Firestore
 * @param {string[]} idArray
 * @param {string} uid - uid of current logged in user
 */
export const ticketDeleteTicket = async ({ idArray, uid }, { enqueueSnackbar }) => {
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
 * Update status for one or more tickets
 * @param {string[]} idArray
 * @param {string} uid - uid of current logged in user
 * @param {string} newStatus - limited in STATUS_FILTER const
 */
export const ticketUpdateStatus = async ({ idArray, uid, newStatus }, { enqueueSnackbar }) => {
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

