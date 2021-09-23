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
	currentUser: {},
	isAuthenticated: false,
	error: "",
	//at the very first time, loading is TRUE,
	//then, when authen ran, out or in, loading is also set to False when completed
	//then we can use this variable to indicate that... the app just started!
	//this is used in useEffect of AuthCheck
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
		 * Temp action for Social login & Sign Up steps                  *
		 *****************************************************************/

		loginTemp: (state, { payload }) => {
			state.currentUser = payload
			state.isAuthenticated = false
			state.loading = false
		},

		updateAvatarAndLocation: (state, { payload }) => {
			state.currentUser = {
				...state.currentUser,
				...payload
			}
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
	loginTemp, updateAvatarAndLocation,
	reduxSetUsername, reduxUpdateDisplayName, reduxUpdateEmail
} = authSlice.actions

export default authSlice.reducer