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
export const fix_datetime_list = (items) => items.map((item) => fix_datetime_single(item))
export const fix_datetime_single = (item) => ({
	...item,
	createdAt: item?.createdAt?.toMillis() || 0,
	updatedAt: item?.updatedAt?.toMillis() || 0
})

const GENERATED_MESSAGING_KEY = "BLj-uGqeyBFLjN-R8wpzQcKD4fGvNxvNlFO5f0xwQMB4IPw74ToC8SFAuh84IWc0mWfgHnQZDN4k9MChqO2LbF4"

export function getToken(setTokenFound) {
	// [START messaging_get_token]
	const { getMessaging, getToken } = require("firebase/messaging")

	// Get registration token. Initially this makes a network call, once retrieved
	// subsequent calls to getToken will return from cache.
	const messaging = getMessaging()
	getToken(messaging, { vapidKey: GENERATED_MESSAGING_KEY }).then((currentToken) => {
		if (currentToken) {
			// Send the token to your server and update the UI if necessary
			console.log("current token for client: ", currentToken)
			setTokenFound(true)
		} else {
			// Show permission request UI
			console.log("No registration token available. Request permission to generate one.")
			setTokenFound(false)
		}
	}).catch((err) => {
		console.log("An error occurred while retrieving token. ", err)
		// ...
	})
	// [END messaging_get_token]
}

export function receiveMessage() {
	const { getMessaging, onMessage } = require("firebase/messaging")

	const messaging = getMessaging()
	onMessage(messaging, (payload) => {
		console.log("Message received. ", payload)
		// ...
	})
}