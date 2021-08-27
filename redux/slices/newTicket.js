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
import merge from "lodash.merge"


export const initialState = {
	newTicket: {
		/* Unique Ticket ID */
		tid: "",

		/* User Inputed value */
		subject: "",
		message: "<p></p>",

		/* Selection */
		category: {},
		priority: [],
		department: [],

		/* SelectedValue */
		selectedCategory: {
			cat: "",
			subCat: ""
		},
		selectedPriority: "",
		selectedDepartment: "",

		/* defaultValue */
		defaultCategory: "",
		defaultSubCategory: {},
		defaultPriority: "",
		defaultDepartment: ""
	}
}

const newTicketSlice = createSlice({
	name: "newTicket",
	initialState,
	reducers: {

		/**
		 * Use this function for all updating activities
		 * @param {*} state 
		 * @param {object} payload 
		 */
		setNewTicketData: (state, { payload }) => { merge(state.newTicket, payload) },

		/**
		 * set selected Category
		 * @param {*} state 
		 * @param {object} payload - { cat:"", subCat: ""}
		 */
		setSelectedCategory: (state, { payload }) => { state.newTicket.selectedCategory = { ...payload } }
	},

	/**
	 * set default Sub Category
	 * @param {*} state 
	 * @param {array of Objects} payload
	 * @note:	{
	 *				"domain": ".org",
	 *				"Hosting": "Dedicated Server",
	 *				"SSL": "TypeB",
	 * 				"DNS": "CNAME RECORD",
	 *			}
	 */
	setDefaultSubCategory: (state, { payload }) => { state.newTicket.defaultCategory = { ...payload } }

})

export const {
	setNewTicketData, setSelectedCategory, setDefaultSubCategory, setTid
} = newTicketSlice.actions

export default newTicketSlice.reducer