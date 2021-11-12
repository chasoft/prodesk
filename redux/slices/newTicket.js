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
import { PRIORITY } from "../../helpers/constants"

export const initialState = {
	currentStep: 0,
	//Step 1
	subject: "",
	//Step 2
	selectedDepartmentId: null,
	selectedPriority: PRIORITY.NORMAL,
	selectedCategory: null,
	selectedSubCategory: null,
	//Step 3
	//-- text is saved at textEditorSlice
	newlyAddedTicketSlug: null,
	onBehalf: null
}

const newTicketSlice = createSlice({
	name: "newTicket",
	initialState,
	reducers: {
		setCurrentStep: (state, { payload }) => {
			state.currentStep = payload
		},
		//--step1
		setSubject: (state, { payload }) => {
			state.subject = payload
		},
		//--step2
		setSelectedDepartment: (state, { payload }) => {
			state.selectedDepartmentId = payload
		},
		setSelectedPriority: (state, { payload }) => {
			state.selectedPriority = payload
		},
		setSelectedCategory: (state, { payload }) => {
			state.selectedCategory = payload
		},
		setSelectedSubCategory: (state, { payload }) => {
			state.selectedSubCategory = payload
		},
		//
		resetNewTicket: (state) => {
			state.currentStep = 0
			//---
			state.subject = ""
			state.selectedDepartmentId = null
			state.selectedPriority = PRIORITY.NORMAL
			state.selectedCategory = null
			state.selectedSubCategory = null
			state.onBehalf = null
			state.newlyAddedTicketSlug = null
		},
		setOnBehalf: (state, { payload }) => {
			state.onBehalf = payload
		},
		setNewlyAddedTicketSlug: (state, { payload }) => {
			state.newlyAddedTicketSlug = payload
		},
	}
})

export const {
	setCurrentStep,
	//
	setSubject,
	setSelectedDepartment,
	setSelectedPriority,
	setSelectedCategory,
	setSelectedSubCategory,
	setTicketContent,
	//--
	resetNewTicket,
	setOnBehalf,
	setNewlyAddedTicketSlug
} = newTicketSlice.actions

export default newTicketSlice.reducer