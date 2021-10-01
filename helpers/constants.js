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

export const DOCS_ADD = {
	ARTICLE: { code: "article", icon: AddIcon, title: "New article", description: "Create a new plain text page" },
	CATEGORY: { code: "category", icon: PlaylistAddIcon, title: "New category", description: "Group pages around key topics" },
	SUB_CATEGORY: { code: "sub_category", icon: PlaylistAddIcon, title: "New sub-category", description: "Group pages around key topics" },
	EXTERNAL: { code: "external", icon: LaunchIcon, title: "New external link", description: "Link to external websites" },
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

