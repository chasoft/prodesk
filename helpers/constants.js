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
	ADMIN: "/admin",
	CLIENT: "/client",
	LOGIN: "/login",
	SURVEY: "/signup/survey",
	SOCIAL_CREATE_ACCOUNT: "/signup/account",
	CREATE_PROFILE: "/signup/create-profile",
	CREATE_COMPLETED: "/signup/completed",
	INSTALL_COMPLETED: "/install/completed",
	INSTALL_CREATE: "/install/create",
	DONE: "DONE",
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
	ALL: "All",
	LOW: "Low",
	NORMAL: "Normal",
	HIGH: "High"
}

export const TICKET_STATUS = {
	OPEN: "Open",		//Newly created ticket
	REPLIED: "Replied",	//Ticket is replied by staff and waiting for feedback from customer
	PENDING: "Pending",	//Customer do a feecback to staff's reply. If customer send more than 1 reply, the status would be unchanged
	CLOSED: "Closed",	//Ticket is set to be closed
}

export const USERGROUP = {
	SUPERADMIN: "superadmin",
	ADMIN: "admin",
	MEMBER: "member",
	USER: "user"
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
	DOC: { code: "add_document", icon: AddIcon, title: "New document", description: "Create a new plain text page" },
	CATEGORY: { code: "add_category", icon: PlaylistAddIcon, title: "New category", description: "Group pages around key topics" },
	SUB_CATEGORY: { code: "add_subCategory", icon: PlaylistAddIcon, title: "New sub-category", description: "Group pages around key topics" },
	EXTERNAL: { code: "add_externalLink", icon: LaunchIcon, title: "New external link", description: "Link to external websites" },
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
