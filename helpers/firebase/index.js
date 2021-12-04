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

//FIREBASE SDK
import { getAuth } from "firebase/auth"
import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"

//THIRD-PARTY

//FIREBASE CONFIGURATION
const firebaseConfig = {
	apiKey: "AIzaSyAjxlM9UjqtmwAXIQh2EaZx2dvJLXU9SEE",
	authDomain: "prodesk-83cfe.firebaseapp.com",
	projectId: "prodesk-83cfe",
	storageBucket: "prodesk-83cfe.appspot.com",
	messagingSenderId: "183315432788",
	appId: "1:183315432788:web:44dc8c573f1bca61fc34c1",
}

const firebaseApp = initializeApp(firebaseConfig)

//EXPORT FOR QUICK REFERENCING
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
export const realtimeDB = getDatabase(firebaseApp)

//use this to get consistent datetime for users in different timezones
// export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp => import { serverTimestamp } from "firebase/firestore"
// export const increment = firebase.firestore.FieldValue.increment => import { increment } from "firebase/firestore"
// export const fromMillis = firebase.firestore.Timestamp.fromMillis ???!!! >
// => fromMillis is method của Timestamp  =>> import { Timestamp} from "firebase/firestore"

export const storage = getStorage(firebaseApp)
//used to track uploading status to firestorage
export const STATE_CHANGED = "state_changed"

//HELPER FUNCTIONS
//Convert sang Milis, to use this data, use this => dayjs(millis).format(DATE_FORMAT.LONG)

export function fix_datetime_list(items) {
	return items.map((item) => fix_datetime_single(item))
}

export function fix_datetime_single(item) {
	return ({
		...item,
		createdAt: item?.createdAt?.toMillis() || 0,
		updatedAt: item?.updatedAt?.toMillis() || 0
	})
}