export const COLLECTION = {
	DOCS: "documentation",
	SETTINGS: "settings"
}

export const TYPE = {
	DOCS: "Docs",
	USERS: "Users",
	TICKETS: "Tickets",
	SETTINGS: "Settings",
}

export const ACTION = {
	/* DOCUMENTATION */
	GET_DOCS: "getDocs",
	GET_DOC: "getDoc",
	GET_CONTENT: "getDocContent",
	ADD_DOC: "addDoc",
	UPDATE_DOC: "updateDoc",
	UPDATE_CONTENT: "updateDocContent",
	DELETE_DOC: "deleteDoc",

	/* APPLICATION SETTINGS */
	GET_APPSETTINGS: "getAppSettings",
	UPDATE_APPSETTINGS: "updateAppSettings",

	/* TICKETS SETTINGS */
	GET_TICKETS_SETTINGS_DEPARTMENT: "getTicketSettingsDepartment",
	UPDATE_TICKETS_SETTINGS_DEPARTMENT: "updateTicketSettingsDepartment"
}