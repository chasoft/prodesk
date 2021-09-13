/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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
import { BACKGROUND_ID, PRIORITY, TICKET_STATUS } from "../../helpers/constants"

export const initialState = {
	/*
		used for RegLayout
		help to switch the imageSideBar to the right of left of the main content
	*/
	flexDirection: "row",
	/*
		customize the background for each page used AdminLayout
	*/
	adminBackgroundId: BACKGROUND_ID.ADMIN_INDEX,

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
	ticketSearchTerm: ""
}

const uiSettingsSlice = createSlice({
	name: "uiSettings",
	initialState,
	reducers: {
		setflexDirection: (state, { payload }) => {
			state.flexDirection = payload
		},
		setAdminBackgroundId: (state, { payload }) => {
			state.adminBackgroundId = payload
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
		}
	}
})

export const {
	setflexDirection,
	setAdminBackgroundId,
	setScrollTop,
	setTicketSearchTerm, setSelectedStatus, setSelectedPriority, resetTicketsFilter
} = uiSettingsSlice.actions

export default uiSettingsSlice.reducer