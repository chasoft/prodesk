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
	redirectURL: "",
	redirectAfterLoginURL: ""
}

const redirectSlice = createSlice({
	name: "redirect",
	initialState,
	reducers: {
		setRedirect: (state, { payload }) => {
			state.redirectURL = payload
		},

		setRedirectAfterLoginURL: (state, { payload }) => {
			state.redirectAfterLoginURL = payload
		},

		clearRedirect: (state) => {
			state.redirectURL = ""
		},

		clearRedirectAfterLoginURL: (state) => {
			state.redirectAfterLoginURL = ""
		}
	},
})

export const {
	setRedirect, clearRedirect,
	setRedirectAfterLoginURL, clearRedirectAfterLoginURL
} = redirectSlice.actions

export default redirectSlice.reducer