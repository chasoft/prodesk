export const COLLECTION = {
	DOCS: "documentation",
	SETTINGS: "settings",
	USERS: "users",
	USERNAMES: "usernames",
	TICKETS: "tickets",
	PAGES: "pages",
	BLOG: "blog",
}

export const TYPE = {
	DOCS: "Docs",
	USERS: "Users",
	MEMBERS: "Members",
	PROFILES: "Profiles",
	TICKETS: "Tickets",
	SETTINGS: "Settings",
	USER_SETTINGS: "UserSettings",
	DEPARTMENTS: "Departments",
	CANNED_REPLIES: "Canned-replies",
	LABELS: "Labels",
	CATEGORIES: "Categories",
	INSTALL: "Install",
	PAGES: "Pages",
	BLOG: "Blog"
}

export const GROUP = {
	PROFILES_PUBLIC: "profiles-public-group",
	PROFILES_PRIVATE: "profiles-private-group",
	TICKETS_GROUP: "tickets-group"
}

export const ACTIONS = {
	/* DOCUMENTATION => docId */
	GET_DOCS: "getDocs",
	GET_DOC: "getDoc",
	GET_CONTENT: "getDocContent",
	ADD_DOC: "addDoc",
	UPDATE_DOC: "updateDoc",
	UPDATE_DOC_CONTENT: "updateDocContent",
	DELETE_DOC: "deleteDoc",

	/* APPLICATION SETTINGS */
	GET_APPSETTINGS: "getAppSettings",
	UPDATE_APPSETTINGS: "updateAppSettings",

	/* USER SETTINGS */
	GET_USERSETTINGS: "getUserSettings",
	UPDATE_USERSETTINGS: "updateUserSettings",

	/* DEPARTMENTS => did */
	GET_DEPARTMENTS: "getDepartments",
	ADD_DEPARTMENT: "addDepartment",
	UPDATE_DEPARTMENT: "updateDepartment",
	DELETE_DEPARTMENT: "deleteDepartment",

	/* CANNED REPLIES  => crid */
	GET_CANNED_REPLIES: "getCannedReplies",
	ADD_CANNED_REPLY: "addCannedReply",
	UPDATE_CANNED_REPLY: "updateCannedReply",
	DELETE_CANNED_REPLY: "deleteCannedReply",

	/* LABELS => lid */
	GET_LABELS: "getLabels",
	ADD_LABEL: "addLabel",
	UPDATE_LABEL: "updateLabel",
	DELETE_LABEL: "deleteLabel",

	/* CATEGORIES => catId */
	GET_CATEGORIES: "getCategories",
	ADD_CATEGORY: "addCategory",
	UPDATE_CATEGORY: "updateCategory",
	DELETE_CATEGORY: "deleteCategory",

	/* PROFILES => uid */
	GET_PROFILES: "getProfiles",
	GET_PROFILE: "getProfile",
	GET_PROFILE_BY_USERNAME: "getProfileByUsername",
	GET_PROFILE_BY_EMAIL: "getProfileByEmail",
	UPDATE_PROFILE: "updateProfile",

	/* USER */
	// Let you query Profiles instead of Users

	/* SIGN-UP */
	SIGN_UP_WITH_EMAIL: "signUpWithEmail",
	SIGN_UP_VIA_GOOGLE: "signUpViaGoogle",
	SIGN_UP_CREATE_PROFILE: "signUpCreateProfile",
	SIGN_UP_SURVEY: "signUpSurvey",

	/* LOG-IN */
	SIGN_IN_WITH_GOOGLE: "signInWithGoogle",
	SIGN_IN_WITH_EMAIL: "signInWithEmail",

	/* INSTALL */
	INSTALL_CREATE_ADMIN: "createAdminAccount",
	INSTALL_GET_STATUS: "getInstallStatus",
	INSTALL_FINALIZATION: "finalizeInstallation",

	/* TICKETS => tid */
	GET_TICKETS_FOR_ADMIN: "getTicketsForAdmin",
	GET_TICKETS_FOR_USER: "getTicketsForUser",
	GET_TICKET_REPLIES: "getTicketReplies",
	ADD_TICKET: "addTicket",
	ADD_TICKET_REPLY: "addTicketReply",
	UPDATE_TICKET: "updateTicket",
	UPDATE_TICKET_REPLY: "updateTicketReply",
	DELETE_TICKET: "deleteTicket",
	DELETE_TICKET_TEMP: "deleteTicketTemp",
	DELETE_TICKET_REPLY: "deleteTicketReply",

	/* MEMBERS */
	//members is a sub-set of users (aka Profiles),
	//then, create hook instead
	//get members from getProfiles
	//eg. useGetMembers

	/* PAGES => pid */
	GET_PAGES: "getPages",
	GET_PAGE: "getPage",
	GET_PAGE_CONTENT: "getPageContent",
	ADD_PAGE: "addPage",
	UPDATE_PAGE: "updatePage",
	UPDATE_PAGE_CONTENT: "updatePageContent",
	DELETE_PAGE: "deletePage",

	/* BLOG => bid */
	GET_BLOG_POSTS: "getBlogPosts",
	GET_BLOG_POST: "getBlogPost",
	GET_BLOG_POST_CONTENT: "getBlogPostContent",
	ADD_BLOG_POST: "addBlogPost",
	UPDATE_BLOG_POST: "updateBlogPost",
	UPDATE_BLOG_POST_CONTENT: "updateBlogPostContent",
	DELETE_BLOG_POST: "deleteBlogPost",

	/* */
	REQUEST_REFETCHING: "requestRefetching",
	NEW_ASSIGNMENT: "newAssignment"
}