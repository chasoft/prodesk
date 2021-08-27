/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║          ProDesk - Your Elegant & Powerful Ticket System          ║ *
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
	/* Authentication */
	currentUser: {},
	isAuthenticated: false,
	error: "",
	loading: true,
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {

		/*****************************************************************
		 * Authentication                                                *
		 *****************************************************************/

		login: (state) => {
			state.loading = true
		},

		/**
		 * @param {object} payload - Object of properties
		 */
		loginSuccess: (state, { payload }) => {
			state.currentUser = payload
			state.isAuthenticated = true
			state.loading = false
		},

		loginError: (state, { payload }) => {
			state.error = payload
			state.isAuthenticated = false
			state.loading = false
		},

		logout: (state) => {
			state.loading = true
		},

		logoutSuccess: (state) => {
			state.isAuthenticated = false
			state.currentUser = {}
			state.error = ""
			state.loading = false
		},

		/*****************************************************************
		 * User                                                          *
		 *****************************************************************/
		/**
		 * @param {string} payload - a string of username
		 */
		reduxSetUsername: (state, { payload }) => {
			state.currentUser = {
				...state.currentUser,
				username: payload
			}
		},
		/**
		 * @param {string} payload - a string of displayName
		 */
		reduxUpdateDisplayName: (state, { payload }) => {
			state.currentUser = {
				...state.currentUser,
				displayName: payload
			}
		},
		/**
		 * @param {string} payload - a string of email
		 */
		reduxUpdateEmail: (state, { payload }) => {
			state.currentUser = {
				...state.currentUser,
				email: payload
			}
		},

	},
})

export const {
	login, loginError, loginSuccess,
	logout, logoutSuccess,
	reduxSetUsername, reduxUpdateDisplayName, reduxUpdateEmail
} = authSlice.actions

export default authSlice.reducer