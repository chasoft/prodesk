export const COLLECTION = {
	DOCS: "documentation",
	SETTINGS: "settings",
	USERS: "users",
	USERNAMES: "usernames",
}

export const TYPE = {
	DOCS: "Docs",
	USERS: "Users",
	PROFILES: "Profiles",
	TICKETS: "Tickets",
	SETTINGS: "Settings",
	DEPARTMENTS: "Departments",
	CANNED_REPLIES: "Canned-replies",
	LABELS: "Labels",
	CATEGORIES: "Categories"
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

	/* CATEGORIES */
	GET_CATEGORIES: "getCategories",
	ADD_CATEGORY: "addCategory",
	UPDATE_CATEGORY: "updateCategory",
	DELETE_CATEGORY: "deleteCategory",

	/* PROFILES */
	GET_PROFILES: "getProfiles",
	GET_PROFILE: "getProfile",
	GET_PROFILE_BY_USERNAME: "getProfileByUsername",
	GET_PROFILE_BY_EMAIL: "getProfileByEmail",
	UPDATE_PROFILE: "updateProfile",

	/* USER */
	GET_USER: "getUser",
	UPDATE_USER: "updateUser",

	/* SIGN-UP */
	SIGN_UP_WITH_EMAIL: "signUpWithEmail",
	SIGN_UP_VIA_GOOGLE: "signUpViaGoogle",
	SIGN_UP_CREATE_PROFILE: "signUpCreateProfile",
	SIGN_UP_SURVEY: "signUpSurvey",
}