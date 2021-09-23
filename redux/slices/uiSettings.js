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
import { PRIORITY, TICKET_STATUS } from "../../helpers/constants"

const defaultBackground = {
	top: 0,
	zIndex: -1,
	width: "100%",
	height: "300px",
	position: "absolute",
	backgroundColor: "#1a73e8",
}

export const initialState = {
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
		Note the PerfectScrollbar.scrollTop for component's usage
	*/
	scrollTop: 0,

	/*
		Settings for ListTicketsFilter
	*/
	selectedStatus: {
		[TICKET_STATUS.OPEN]: true,
		[TICKET_STATUS.PENDING]: true,
		[TICKET_STATUS.REPLIED]: true,
		[TICKET_STATUS.CLOSED]: false
	},
	selectedPriority: PRIORITY.ALL,
	ticketSearchTerm: "",

	/*
		Active Tabs for Settings Page in Admin view
		this keep the name of the Tab!
		& active Panel
	*/
	activeSettingTab: "",
	activeSettingPanel: ""
}

const uiSettingsSlice = createSlice({
	name: "uiSettings",
	initialState,
	reducers: {
		setflexDirection: (state, { payload }) => {
			state.flexDirection = payload
		},
		setBackgroundForLoggedinPage: (state, { payload }) => {
			state.backgroundForLoggedinPage = {
				...defaultBackground,
				...payload
			}
		},
		setScrollTop: (state, { payload }) => {
			state.scrollTop = payload
		},
		setSelectedPriority: (state, { payload }) => {
			state.selectedPriority = payload
		},
		setTicketSearchTerm: (state, { payload }) => {
			state.ticketSearchTerm = payload
		},
		setSelectedStatus: (state, { payload }) => {
			state.selectedStatus = {
				...state.selectedStatus,
				...payload
			}
		},
		resetTicketsFilter: (state) => {
			state.selectedStatus = {
				[TICKET_STATUS.OPEN]: true,
				[TICKET_STATUS.PENDING]: true,
				[TICKET_STATUS.REPLIED]: true,
				[TICKET_STATUS.CLOSED]: false
			}
			state.selectedPriority = PRIORITY.ALL
			state.ticketSearchTerm = ""
		},
		setActiveSettingTab: (state, { payload }) => {
			state.activeSettingTab = payload
		},
		setActiveSettingPanel: (state, { payload }) => {
			state.activeSettingPanel = payload
		},
	}
})

export const {
	setflexDirection,
	setBackgroundForLoggedinPage,
	setScrollTop,
	setTicketSearchTerm, setSelectedStatus, setSelectedPriority, resetTicketsFilter,
	setActiveSettingTab, setActiveSettingPanel
} = uiSettingsSlice.actions

export default uiSettingsSlice.reducer