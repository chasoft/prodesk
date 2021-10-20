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
	selectedDepartment: null,
	selectedPriority: PRIORITY.NORMAL,
	selectedCategory: null,
	selectedSubCategory: null,
	//Step 3
	//-- text is saved at textEditorSlice
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
			state.selectedDepartment = payload
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
			//--
			state.subject = ""
			state.selectedDepartment = null
			state.selectedPriority = null
			state.selectedCategory = null
			state.selectedSubCategory = null
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
	resetNewTicket
} = newTicketSlice.actions

export default newTicketSlice.reducer