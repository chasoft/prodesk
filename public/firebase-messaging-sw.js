importScripts("https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js")

firebase.initializeApp({
	apiKey: "AIzaSyAjxlM9UjqtmwAXIQh2EaZx2dvJLXU9SEE",
	authDomain: "prodesk-83cfe.firebaseapp.com",
	projectId: "prodesk-83cfe",
	storageBucket: "prodesk-83cfe.appspot.com",
	messagingSenderId: "183315432788",
	appId: "1:183315432788:web:44dc8c573f1bca61fc34c1",
})

const isSupported = firebase.messaging.isSupported()

if (isSupported) {
	const messaging = firebase.messaging()

	messaging.onBackgroundMessage(messaging, (payload) => {

		console.log("[firebase-messaging-sw.js] Received background message ", { payload })

		// Customize notification here
		const notificationTitle = "Background Message Title"
		const notificationOptions = {
			body: "Background Message body.",
			icon: "/firebase-logo.png"
		}

		self.registration.showNotification(notificationTitle,
			notificationOptions)
	})
} else {
	console.log("Not support firebase messaging")
}