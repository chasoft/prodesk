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

export const initialState = {
	/* 	List all documents, used for
		1. Documentation Center
		2. Listing Documentation at frontpage!
	*/

	/* this array is sorted/grouped by lodash.groupBy
		[
			{Category: "": }
		]
	*/
	docsList: [],

	activeDocId: null,
}

const docsCenterSlice = createSlice({
	name: "docsCenter",
	initialState,
	reducers: {
		setDocsList: (state, { payload }) => {
			state.docsList = payload
		},
		setActiveDocId: (state, { payload }) => {
			state.activeDocId = payload
		},
	},
})

export const {
	setDocsList,
	setActiveDocId,
} = docsCenterSlice.actions

export default docsCenterSlice.reducer