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
import { BACKGROUND_ID } from "../../helpers/constants"

export const initialState = {
	/*
		used for RegLayout
		help to switch the imageSideBar to the right of left of the main content
	*/
	flexDirection: "row",
	/*
		customize the background for each page used AdminLayout
	*/
	adminBackgroundId: BACKGROUND_ID.ADMIN_INDEX
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
		}
	},
})

export const {
	setflexDirection,
	setAdminBackgroundId
} = uiSettingsSlice.actions

export default uiSettingsSlice.reducer