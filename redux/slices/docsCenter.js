/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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

export const initialState = {
	activeDocId: null,
	//this is to hold a temporary docId for SideBarDetails Panel
	//it would be cleared to be null when TocSideBarDetails hidden
	activeDocIdOfTocSideBarDetails: null,
}

const docsCenterSlice = createSlice({
	name: "docsCenter",
	initialState,
	reducers: {
		setActiveDocId: (state, { payload }) => {
			state.activeDocId = payload
		},
		setActiveDocIdOfTocSideBarDetails: (state, { payload }) => {
			state.activeDocIdOfTocSideBarDetails = payload
		}
	}
})

export const {
	setActiveDocId,
	setActiveDocIdOfTocSideBarDetails,
} = docsCenterSlice.actions

export default docsCenterSlice.reducer