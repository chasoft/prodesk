import AddIcon from "@mui/icons-material/Add"
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd"
import LaunchIcon from "@mui/icons-material/Launch"

export const redirectAfterLogin = "redirectAfterLogin"

export const LINK_TYPE = {
	/*
		Set the link based on ID
	*/
	ARTICLE: "Category",
	CATEGORY: "Category",
	/*
		Set the link manually
	*/
	CUSTOM: "Custom"
}

export const BACKGROUND_ID = {
	EMPTY: "Empty",
	ADMIN_INDEX: "AdminIndex",
	ADMIN_PROFILE: "AdminProfile",
	ADMIN_TICKETS: "AdminTicket",
	ADMIN_USERS: "AdminUsers"
}

export const MENU_ITEM_TYPE = {
	ITEM: "Single Item",
	GROUP: "Group of Items",
}

export const REDIRECT_URL = {
	INSTALL: {
		CREATE: "/install/create",
		COMPLETED: "/install/completed",
	},

	SIGNUP: {
		SOCIAL_CREATE_ACCOUNT: "/signup/account",
		CREATE_PROFILE: "/signup/create-profile",
		SURVEY: "/signup/survey",
		CREATE_COMPLETED: "/signup/completed",
		DONE: "DONE",
	},

	LOGIN: "/login",

	ADMIN: {
		INDEX: "/admin",
		EDIT_PROFILE: "/admin/edit-profile",
		TICKETS: "/admin/tickets",
		NEW_TICKETS: "/admin/tickets/new-ticket",
		USERS: "/admin/users",
	},

	CLIENT: {
		INDEX: "/client",
		TICKETS: "/client/tickets",
		NEW_TICKETS: "/client/tickets/new-ticket",
		EDIT_PROFILE: "/client/edit-profile",
	},

	SETTINGS: {
		CANNED_REPLIES: "/admin/settings/tickets/canned-reply"
	}
}

export const PRIORITY_URLS = [
	REDIRECT_URL.LOGIN,
	REDIRECT_URL.SIGNUP.SURVEY,
	REDIRECT_URL.SIGNUP.CREATE_PROFILE,
	REDIRECT_URL.SIGNUP.SOCIAL_CREATE_ACCOUNT,
	REDIRECT_URL.SIGNUP.CREATE_COMPLETED
]

export const DATE_FORMAT = {
	SHORT: "DD-MMM-YY",
	LONG: "DD-MMM-YY hh:mm A",
	FULL: "MMMM D, YYYY hh:mm A",
}

export const ADVANCED_TABLE_COL = {
	CHECKBOX: "CheckBox",
	SUBJECT: "Subject",
	DOMAIN: "Domain",
	STATUS: "Status",
	CREATEDAT: "Created At",
	UPDATEDAT: "Updated At",
	EXPIRATION: "Expiration",
	ACTIONS: "Actions",
	PORTFOLIO: "Portfolio",
	CATEGORY: "Category",
	AUTORENEW: "Auto-Renew",
	PRIORITY: "Priority"
}

export const STATUS_FILTER = {
	UNREAD: "Unread",
	READ: "Read",
	SAVED: "Saved",
	ALL: "All",
	ANY: "Any",
	PENDING: "Pending",
	OPEN: "Open",
	REPLIED: "Replied",
	CLOSED: "Closed",
	EXPIRED: "Expired",
	ACTIVE: "Active",
	WARNING: "Warning",
	SELECT_ALL: "Select all",
	LOCKED: "Locked",
	UNLOCKED: "Unlocked",
	PRIVATE: "Private",
	AVAILABLE: "Available",
	UNAVAILABLE: "Unavailable"
}

export const PRIORITY = {
	ANY: STATUS_FILTER.ANY,
	LOW: "Low",
	NORMAL: "Normal",
	HIGH: "High"
}

export const GROUPBY = {
	STATUS: { title: "Status", fieldname: "status" },
	DEPARTMENT: { title: "Department", fieldname: "department" },
	PRIORITY: { title: "Priority", fieldname: "priority" },
}

export const TICKET_STATUS = {
	OPEN: "Open",		//Newly created ticket
	REPLIED: "Replied",	//Ticket is replied by staff and waiting for feedback from customer
	PENDING: "Pending",	//Customer do a feecback to staff's reply. If customer send more than 1 reply, the status would be unchanged
	CLOSED: "Closed",	//Ticket is set to be closed
}

/*	I add rank for easier comparison if needed */
export const USERGROUP = {
	SUPERADMIN: { code: "superadmin", rank: 10000 },
	ADMIN: { code: "admin", rank: 1000 },
	STAFF: { code: "staff", rank: 100 },		//staff is your labor worker
	AGENT: { code: "agent", rank: 50 },		//staff is your labor worker
	MEMBER: { code: "member", rank: 1 },	//member is validated user
	USER: { code: "user", rank: 0 }		//freely register account
}

export const TICKET_INBOXES = {
	STARTED: "Started",
	MINE: "Mine",
	ASSIGNED: "Assigned",
	UNASSIGNED: "Unassigned",
}


/****************************************************************
 * SETTING PAGES
 ****************************************************************/

// export const SETTINGS_NAMES = {
// 	MEMBERs: "Members",
// 	PAGE: "Site Pages",
// 	TICKETS: "Tickets",
// 	SMTP: "SMTP",
// 	ADS: "Advertisement",
// }

// export const SETTING_TABS = [
// 	["Members", "/admin/settings/members"],
// 	["Site Pages", "/admin/settings/pages"],
// 	["Tickets", "/admin/settings/tickets"],
// 	["Application Settings", "/admin/settings/application"],
// 	["Tools", "/admin/settings/tools"]
// ]

/****************************************************************
 * DOCS CENTER
 ****************************************************************/

//DO NOT CHANGE `value of "code"`
export const DOCS_ADD = {
	DOC: {
		code: "add_document",
		icon: AddIcon,
		title: "New document",
		description: "Create a new plain text page"
	},
	CATEGORY: {
		code: "add_category",
		icon: PlaylistAddIcon,
		title: "New category",
		description: "Group pages around key topics"
	},
	SUB_CATEGORY: {
		code: "add_subCategory",
		icon: PlaylistAddIcon,
		title: "New sub-category",
		description: "Group pages around key topics"
	},
	EXTERNAL: {
		code: "add_externalLink",
		icon: LaunchIcon,
		title: "New external link",
		description: "Link to external websites"
	},
}

//DO NOT CHANGE ANY VALUE BELOW
export const DOC_TYPE = {
	CATEGORY: "Category",		// non-selectable
	SUBCATEGORY: "SubCategory",	// non-selectable | if SubCat is empty => write as WWWWWW (6W) to sort this type of subcat to the end of the list of subcats
	DOC: "Document",			// selectable => only this case, activeDocId != null
	EXTERNAL: "External Link",	// non-selectable
}

//DO NOT CHANGE ANY VALUE BELOW
export const DOC_STATUS = {
	DRAFT: "Draft",
	PUBLISHED: "Published",
}

export const LOCALUPDATE_DOCSLIST_ACTION = {
	//
	ADD_NEW_CAT: "Add New Category",
	DELETE_CAT: "Delete Category",
	UPDATE_CAT: "Update Category",
	//
	ADD_NEW_SUBCAT: "Add New Subcategory",
	DELETE_SUBCAT: "Delete Subcategory",
	UPDATE_SUBCAT: "Update Subcategory",
	//
	ADD_NEW_DOC: "Add New Document",
	DELETE_DOC: "Delete Document",
	UPDATE_DOC: "Update Document",
	//
	ADD_NEW_EXTERNAL: "Add New External Link",
	DELETE_EXTERNAL: "Delete External Link",
	UPDATE_EXTERNAL: "Update External Link",
}

export const RESERVED_KEYWORDS = {
	CAT: "undefined",
	CAT_CHILDREN: "000000",
	SUB_CAT_NAME: ["undefined", "000000"],
}

//Common actions for general purpose
export const ACTION = {
	SET: "Add",
	GET: "Get",
	DELETE: "Delete",
	UPDATE: "Update",
	CLEAR: "Clear",
}

export const APP_SETTINGS_NAME = {
	/* DOCUMENTATION */
	autoGenerateSlugFromTitle: "autoGenerateSlugFromTitle"
}

export const PERMISSIONS_LEVELS = {
	FALSE: false,
	TRUE: true,
	NONE: 0,
	VIEWER: 1,
	AGENT: 2,
	ADMIN: 3,
}

export const SETTINGS_NAME = {
	/* GENERAL */
	hasAdminPermissions: "hasAdminPermissions",
	departments: "departments",

	/* TICKET */
	createTicket: "createTicket",
	updateTicket: "updateTicket",
	deleteTicket: "deleteTicket",

	/* USER */

	/* DOCUMENTATION */

	/* BLOG */

}

export const CODE = {
	SUCCESS: 300,	//Successful API operation
	FAILED: 100,	//Failed API operation in general
}

export const DEFAULT_USER_SETTINGS = {
	[SETTINGS_NAME.createTicket]: false,
	[SETTINGS_NAME.updateTicket]: false,
	[SETTINGS_NAME.deleteTicket]: false,
}
export const DEFAULT_MEMBER_SETTINGS = {
	...DEFAULT_USER_SETTINGS,
	//Member's permissions
	[SETTINGS_NAME.createTicket]: true,

}
export const DEFAULT_AGENT_SETTINGS = {
	...DEFAULT_MEMBER_SETTINGS,
	//Agent's permissions
	[SETTINGS_NAME.updateTicket]: true,
	//
}
export const DEFAULT_STAFF_SETTINGS = {
	...DEFAULT_AGENT_SETTINGS,
	//Agent's permissions
	[SETTINGS_NAME.updateTicket]: true,
	//
}
export const DEFAULT_ADMIN_SETTINGS = {
	...DEFAULT_STAFF_SETTINGS,
	//Admin's permissions
	[SETTINGS_NAME.deleteTicket]: true,
}

export const DEFAULT_SUPERADMIN_SETTINGS = {
	...DEFAULT_ADMIN_SETTINGS,
	//Superadmin's permissions

}