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
import { nanoid } from "nanoid"

const isReadyNextStep = (currentStep, subject, message) => {
	switch (currentStep) {
		case 0: return (subject.length >= 10)
		case 1: return true
		case 2: return (message.length >= 20)
		default: return false
	}
}

export const initialState = {
	newTicket: {
		currentStep: 0,	//to keep current step
		isReadyNextStep: false,
		/* Unique Ticket ID ================================= */
		tid: "",

		/* User Inputed value =============================== */
		subject: "",
		message: "<p></p>",

		/* Selection ======================================== */
		categories: {},
		priorities: [],
		departments: [],

		/* SelectedValue ==================================== */
		selectedCategory: {
			cat: "",
			subCat: ""
		},
		selectedPriority: "",
		selectedDepartment: "",

		/* defaultValue ===================================== */
		defaultCategory: "",

		/* Structure for defaultSubCategory as below
			{
				"domain": ".org",
				"Hosting": "Dedicated Server",
				"SSL": "TypeB",
				"DNS": "CNAME RECORD",
			}
		*/
		defaultSubCategory: {},
		defaultPriority: "",
		defaultDepartment: ""
	}
}

const newTicketSlice = createSlice({
	name: "newTicket",
	initialState,
	reducers: {
		setCurrentStep: (state, { payload }) => {
			state.newTicket.currentStep = payload
			state.newTicket.isReadyNextStep = isReadyNextStep(state.newTicket.currentStep, state.newTicket.subject, state.newTicket.message)

			if (payload === 2) {
				if (state.newTicket.selectedDepartment === "") state.newTicket.selectedDepartment = state.newTicket.defaultDepartment
				if (state.newTicket.selectedPriority === "") state.newTicket.selectedPriority = state.newTicket.defaultPriority

				let selectedCategoryCat = state.newTicket.selectedCategory.cat
				if (state.newTicket.selectedCategory.cat === "") {
					state.newTicket.selectedCategory.cat = state.newTicket.defaultCategory
					selectedCategoryCat = state.newTicket.defaultCategory
				}

				if (state.newTicket.selectedCategory.subCat === "") {
					state.newTicket.selectedCategory.subCat = state.newTicket.defaultSubCategory[selectedCategoryCat] ?? ""
				} else {
					if (state.newTicket.categories[selectedCategoryCat].indexOf(state.newTicket.selectedCategory.subCat) === -1)
						state.newTicket.selectedCategory.subCat = (state.newTicket.defaultSubCategory[selectedCategoryCat] ?? "")
				}
			}
		},
		setInitNewTicketData: (state, { payload }) => { merge(state.newTicket, payload) },
		setSubject: (state, { payload }) => {
			state.newTicket.subject = payload
			state.newTicket.isReadyNextStep = isReadyNextStep(state.newTicket.currentStep, state.newTicket.subject, state.newTicket.message)
		},
		setMessage: (state, { payload }) => {
			state.newTicket.message = payload
			state.newTicket.isReadyNextStep = isReadyNextStep(state.newTicket.currentStep, state.newTicket.subject, state.newTicket.message)
		},
		setSelectedCategory: (state, { payload }) => { state.newTicket.selectedCategory.cat = payload },
		setSelectedSubCategory: (state, { payload }) => { state.newTicket.selectedCategory.subCat = payload },
		setSelectedPriority: (state, { payload }) => { state.newTicket.selectedPriority = payload },
		setSelectedDepartment: (state, { payload }) => { state.newTicket.selectedDepartment = payload },

		resetNewTicket: (state) => {
			state.newTicket = {
				...state.newTicket,
				currentStep: 0,
				isReadyNextStep: false,
				tid: nanoid(10),
				subject: "",
				message: "<p></p>",
				selectedCategory: {
					cat: "",
					subCat: ""
				},
				selectedPriority: "",
				selectedDepartment: "",
			}
		},
	}
})

export const {
	setCurrentStep,
	setInitNewTicketData,
	setSubject,
	setMessage,
	setSelectedCategory, setSelectedSubCategory,
	setSelectedPriority,
	setSelectedDepartment,
	resetNewTicket
} = newTicketSlice.actions

export default newTicketSlice.reducer