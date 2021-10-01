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
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

//THIRD-PARTY
import dayjs from "dayjs"

//FIREBASE CONFIGURATION
const firebaseConfig = {
	apiKey: "AIzaSyAjxlM9UjqtmwAXIQh2EaZx2dvJLXU9SEE",
	authDomain: "prodesk-83cfe.firebaseapp.com",
	projectId: "prodesk-83cfe",
	storageBucket: "prodesk-83cfe.appspot.com",
	messagingSenderId: "183315432788",
	appId: "1:183315432788:web:44dc8c573f1bca61fc34c1",
}

//FIX BUG FOR NEXTJS DEVELOPMENT
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
	//const analytics = getAnalytics(app)
}

//EXPORT FOR SHORTER USAGE
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

//HELPER FUNCTIONS

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