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

import { createSlice } from "@reduxjs/toolkit"
import { GROUPBY, PRIORITY, STATUS_FILTER, TICKET_INBOXES, TICKET_STATUS } from "@helpers/constants"

const defaultBackground = {
	top: 0,
	zIndex: -1,
	width: "100%",
	// height: "300px",
	// position: "absolute",
	backgroundColor: "transparent",
	// backgroundColor: "#1a73e8",
}

export const initialState = {
	//this is used for general purposes
	isLoadingSomething: false,
	isSideBarExpanded: true,
	isSmallScreen: false,
	showSideBar: false,
	/*
		used for RegLayout
		help to switch the imageSideBar to the right of left of the main content
	*/
	flexDirection: "row",
	/*
		customize the background for each page used AdminLayout
	*/
	backgroundForLoggedinPage: defaultBackground,

	/*
		Settings for ListTicketsFilter
	*/
	ticketCounter: {
		[TICKET_INBOXES.STARTED]: 0,
		[TICKET_INBOXES.MINE]: 0,
		[TICKET_INBOXES.ASSIGNED]: 0,
		[TICKET_INBOXES.UNASSIGNED]: 0,
	},
	filteredByStatusRaw: {
		[TICKET_STATUS.OPEN]: true,
		[TICKET_STATUS.PENDING]: true,
		[TICKET_STATUS.REPLIED]: true,
		[TICKET_STATUS.CLOSED]: false
	},
	filteredByDepartment: STATUS_FILTER.ANY,
	filteredByPriority: PRIORITY.ANY,
	filteredByLabel: STATUS_FILTER.ANY,
	filteredByWord: "",
	filteredByInbox: TICKET_INBOXES.STARTED,
	filteredGroupBy: GROUPBY.STATUS.fieldname,
	//used for admins in filtering tickets
	ticketAssignee: "",
	ticketAssignor: "",

	/*
		Active Tabs for Settings Page in Admin view
		this keep the name of the Tab!
		& active Panel
	*/
	activeSettingTab: 0,
	activeSettingPanel: "",
	isAddNewPanel: false,
	selectedCrid: "",
	/*
		used in pages/admin/documentation
	*/
	//keep ref of SideBar here
	sideBarLeft: 0,
	showTocSideBarDetails: false,

	/* Ticket management for Admin */
	//keep selected tid
	selectedTickets: [],

	/* Notification Inbox */
	notificationInbox: STATUS_FILTER.ALL,

	/* Force refresh */
	forceRefreshId: undefined
}

const uiSettingsSlice = createSlice({
	name: "uiSettings",
	initialState,
	reducers: {
		setIsLoadingSomething: (state, { payload }) => {
			state.isLoadingSomething = payload
		},
		setIsSmallScreen: (state, { payload }) => {
			state.isSmallScreen = payload
		},
		setShowSideBar: (state, { payload }) => {
			state.showSideBar = payload
		},
		setIsSideBarExpanded: (state, { payload }) => {
			state.isSideBarExpanded = payload
		},
		setflexDirection: (state, { payload }) => {
			state.flexDirection = payload
		},
		setBackgroundForLoggedinPage: (state, { payload }) => {
			state.backgroundForLoggedinPage = {
				...defaultBackground,
				...payload
			}
		},
		setTicketCounter: (state, { payload }) => {
			state.ticketCounter = payload
		},
		setFilteredByDepartment: (state, { payload }) => {
			state.filteredByDepartment = payload
		},
		setFilteredByPriority: (state, { payload }) => {
			state.filteredByPriority = payload
		},
		setFilteredByLabel: (state, { payload }) => {
			state.filteredByLabel = payload
		},
		setFilteredByWord: (state, { payload }) => {
			state.filteredByWord = payload
		},
		setSelectedStatusRaw: (state, { payload }) => {
			state.filteredByStatusRaw = {
				...state.filteredByStatusRaw,
				...payload
			}
		},
		setFilteredByInbox: (state, { payload }) => {
			state.filteredByInbox = payload
		},
		setFilteredGroupBy: (state, { payload }) => {
			state.filteredGroupBy = payload
		},
		resetTicketFilters: (state) => {
			state.filteredByStatusRaw = {
				[TICKET_STATUS.OPEN]: true,
				[TICKET_STATUS.PENDING]: true,
				[TICKET_STATUS.REPLIED]: true,
				[TICKET_STATUS.CLOSED]: false
			}
			state.filteredByDepartment = PRIORITY.ANY
			state.filteredByPriority = PRIORITY.ANY
			state.filteredByWord = ""
			state.filteredByInbox = TICKET_INBOXES.STARTED
			state.selectedTickets = []
			state.filteredByLabel = STATUS_FILTER.ANY
			state.filteredGroupBy = GROUPBY.STATUS.fieldname
		},
		/* */
		setActiveSettingTab: (state, { payload }) => {
			state.activeSettingTab = payload
		},
		setActiveSettingPanel: (state, { payload }) => {
			state.activeSettingPanel = payload
		},
		setIsAddNewPanel: (state, { payload }) => {
			state.isAddNewPanel = payload
		},
		setSelectedCrid: (state, { payload }) => {
			state.selectedCrid = payload
		},

		/* */
		setSideBarLeft: (state, { payload }) => {
			state.sideBarLeft = payload
		},
		setShowTocSideBarDetails: (state, { payload }) => {
			state.showTocSideBarDetails = payload
		},
		/* */
		setSelectedTickets: (state, { payload }) => {
			state.selectedTickets = payload
		},
		/* */
		setNotificationInbox: (state, { payload }) => {
			state.notificationInbox = payload
		},
		/* */
		setForceRefreshId: (state, { payload }) => {
			state.forceRefreshId = payload
		},
	}
})

export const {
	setIsLoadingSomething,
	setIsSmallScreen,
	setShowSideBar,
	setIsSideBarExpanded,
	setflexDirection,
	setBackgroundForLoggedinPage,
	setTicketCounter, setFilteredByWord, setSelectedStatusRaw, setFilteredByDepartment, setFilteredByPriority, setFilteredByLabel, resetTicketFilters, setFilteredByInbox, setFilteredGroupBy,
	setActiveSettingTab, setActiveSettingPanel, setSelectedCrid, setIsAddNewPanel,
	setSideBarLeft, setShowTocSideBarDetails,
	setSelectedTickets,
	setNotificationInbox,
	setForceRefreshId
} = uiSettingsSlice.actions

export default uiSettingsSlice.reducer