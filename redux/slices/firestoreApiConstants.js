export const COLLECTION = {
	DOCS: "documentation",
	SETTINGS: "settings"
}

export const TYPE = {
	DOCS: "Docs",
	USERS: "Users",
	TICKETS: "Tickets",
	SETTINGS: "Settings",
	DEPARTMENTS: "Departments",
	CANNED_REPLIES: "Canned-replies",
	LABELS: "Labels"
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

	/* DEPARTMENTS */
	GET_DEPARTMENTS: "getDepartments",
	ADD_DEPARTMENT: "addDepartment",
	UPDATE_DEPARTMENT: "updateDepartment",
	DELETE_DEPARTMENT: "deleteDepartment",

	/* CANNED REPLIES */
	GET_CANNED_REPLIES: "getCannedReplies",
	ADD_CANNED_REPLY: "addCannedReply",
	UPDATE_CANNED_REPLY: "updateCannedReply",
	DELETE_CANNED_REPLY: "deleteCannedReply",

	/* LABELS */
	GET_LABELS: "getLabels",
	ADD_LABEL: "addLabel",
	UPDATE_LABEL: "updateLabel",
	DELETE_LABEL: "deleteLabel",
}