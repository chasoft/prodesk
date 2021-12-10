export const COLLECTION = {
	BLOG: "blog",
	DOCS: "documentation",
	PAGES: "pages",
	SETTINGS: "settings",
	TICKETS: "tickets",
	USERNAMES: "usernames",
	USERS: "users",
}

export const TYPE = {
	BLOG: "Blog",
	CANNED_REPLIES: "Canned-replies",
	CATEGORIES: "Categories",
	DEPARTMENTS: "Departments",
	DOCS: "Docs",
	INSTALL: "Install",
	LABELS: "Labels",
	MEMBERS: "Members",
	PAGES: "Pages",
	PROFILES: "Profiles",
	SETTINGS: "Settings",
	THEME: "Theme",
	TICKETS: "Tickets",
	USER_SETTINGS: "UserSettings",
	USERS: "Users",
}

export const GROUP = {
	PROFILES_PRIVATE: "profiles-private-group",
	PROFILES_PUBLIC: "profiles-public-group",
	TICKETS_GROUP: "tickets-group"
}

export const ACTIONS = {
	/* DOCUMENTATION => docId */
	ADD_DOC: "addDoc",
	DELETE_DOC: "deleteDoc",
	GET_CONTENT: "getDocContent",
	GET_DOC_SEARCH_INDEX: "getDocSearchIndex",
	GET_DOC: "getDoc",
	GET_DOCS: "getDocs",
	UPDATE_DOC_CONTENT: "updateDocContent",
	UPDATE_DOC_DND: "updateDocDnd",
	UPDATE_DOC_SEARCH_INDEX: "updateDocSearchIndex",
	UPDATE_DOC: "updateDoc",

	/* APPLICATION SETTINGS */
	GET_APPSETTINGS: "getAppSettings",
	UPDATE_APPSETTINGS: "updateAppSettings",

	/* USER SETTINGS */
	GET_USERSETTINGS: "getUserSettings",
	UPDATE_USERSETTINGS: "updateUserSettings",

	/* DEPARTMENTS => did */
	ADD_DEPARTMENT: "addDepartment",
	DELETE_DEPARTMENT: "deleteDepartment",
	GET_DEPARTMENTS: "getDepartments",
	UPDATE_DEPARTMENT: "updateDepartment",

	/* CANNED REPLIES  => crid */
	ADD_CANNED_REPLY: "addCannedReply",
	DELETE_CANNED_REPLY: "deleteCannedReply",
	GET_CANNED_REPLIES: "getCannedReplies",
	UPDATE_CANNED_REPLY: "updateCannedReply",

	/* LABELS => lid */
	ADD_LABEL: "addLabel",
	DELETE_LABEL: "deleteLabel",
	GET_LABELS: "getLabels",
	UPDATE_LABEL: "updateLabel",

	/* CATEGORIES => catId */
	ADD_CATEGORY: "addCategory",
	DELETE_CATEGORY: "deleteCategory",
	GET_CATEGORIES: "getCategories",
	UPDATE_CATEGORY: "updateCategory",

	/* PROFILES => uid */
	GET_PROFILE_BY_EMAIL: "getProfileByEmail",
	GET_PROFILE_BY_USERNAME: "getProfileByUsername",
	GET_PROFILE: "getProfile",
	GET_PROFILES: "getProfiles",
	UPDATE_PROFILE: "updateProfile",

	/* USER */
	// Let you query Profiles instead of Users

	/* SIGN-UP */
	SIGN_UP_CREATE_PROFILE: "signUpCreateProfile",
	SIGN_UP_SURVEY: "signUpSurvey",
	SIGN_UP_VIA_GOOGLE: "signUpViaGoogle",
	SIGN_UP_WITH_EMAIL: "signUpWithEmail",

	/* LOG-IN */
	SIGN_IN_WITH_EMAIL: "signInWithEmail",
	SIGN_IN_WITH_GOOGLE: "signInWithGoogle",

	/* INSTALL */
	INSTALL_CREATE_ADMIN: "createAdminAccount",
	INSTALL_FINALIZATION: "finalizeInstallation",
	INSTALL_GET_STATUS: "getInstallStatus",

	/* TICKETS => tid */
	ADD_TICKET_REPLY: "addTicketReply",
	ADD_TICKET: "addTicket",
	DELETE_TICKET_REPLY: "deleteTicketReply",
	DELETE_TICKET_TEMP: "deleteTicketTemp",
	DELETE_TICKET: "deleteTicket",
	GET_TICKET_REPLIES: "getTicketReplies",
	GET_TICKETS_FOR_ADMIN: "getTicketsForAdmin",
	GET_TICKETS_FOR_USER: "getTicketsForUser",
	UPDATE_TICKET_REPLY: "updateTicketReply",
	UPDATE_TICKET: "updateTicket",

	/* MEMBERS */
	//members is a sub-set of users (aka Profiles),
	//then, create hook instead
	//get members from getProfiles
	//eg. useGetMembers

	/* PAGES => pid */
	ADD_PAGE: "addPage",
	DELETE_PAGE: "deletePage",
	GET_PAGE_CONTENT: "getPageContent",
	GET_PAGE: "getPage",
	GET_PAGES: "getPages",
	UPDATE_PAGE_CONTENT: "updatePageContent",
	UPDATE_PAGE: "updatePage",

	/* BLOG => bid */
	ADD_BLOG_POST: "addBlogPost",
	DELETE_BLOG_POST: "deleteBlogPost",
	GET_BLOG_POST_CONTENT: "getBlogPostContent",
	GET_BLOG_POST: "getBlogPost",
	GET_BLOG_POSTS: "getBlogPosts",
	UPDATE_BLOG_POST_CONTENT: "updateBlogPostContent",
	UPDATE_BLOG_POST: "updateBlogPost",

	/* */
	NEW_ASSIGNMENT: "newAssignment",
	REQUEST_REFETCHING: "requestRefetching",

	/* THEME */
	GET_THEME_SETTINGS: "getThemeSettings",
	UPDATE_THEME_SETTINGS: "updateThemeSettings",
}