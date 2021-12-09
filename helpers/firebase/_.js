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

import { collection, getDocs, doc, setDoc, writeBatch } from "firebase/firestore"

//THIRD-PARTY

//PROJECT IMPORT
import { db } from "@helpers/firebase"
import { CODE } from "@helpers/constants"
import { COLLECTION, TYPE } from "@redux/slices/firestoreApiConstants"
import { requestSilentRefetching } from "@helpers/realtimeApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/**
 * Get all documentation records directly
 * @returns array of object
 */
export async function _getAllDocs() {
	try {
		let allDocs = []
		const querySnapshot = await getDocs(collection(db,
			COLLECTION.DOCS
		))
		querySnapshot.forEach((doc) => { allDocs.push(doc.data()) })
		return allDocs
	} catch (e) {
		return e
	}
}

/**
 * Get all documentation records directly
 * @returns array of object
 */
export async function _updateDocSearchIndex(data) {
	try {
		const batch = writeBatch(db)
		batch.set(
			doc(db, COLLECTION.SETTINGS, "DocSearchIndex"),
			data
		)
		await batch.commit()
		return {
			data: {
				code: CODE.SUCCESS,
				message: "docSearchIndex updated successfully"
			}
		}
	}
	catch (e) {
		console.log("Fail to update docSearchIndex")
	}
}

export async function _updateAppSettings(data) {
	try {
		await setDoc(
			doc(db, COLLECTION.SETTINGS, "settings"),
			data,
			{ merge: true }
		)
		//refetch app settings
		const invalidatesTags = {
			trigger: "_",
			tag: [TYPE.SETTINGS],
			target: {
				isForUser: false,
				isForAdmin: true,
			}
		}
		await requestSilentRefetching(invalidatesTags)
	} catch (e) {
		console.log("Fail to update AppSettings")
	}
}