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
import { LOCALUPDATE_DOCSLIST_ACTION, DOC_TYPE, ACTION } from "./../../helpers/constants"
import { findIndex } from "lodash"

export const initialState = {
	/* 	List all documents, used for
		1. Documentation Center
		2. Listing Documentation at frontpage!
	*/

	//sorted by category, sub-category, title
	//and grouped by category, sub-category
	docsList: [],
	//for quick access, no need to get all data and count, that would be not efficient
	isDocsListEmpty: true,
	activeDocId: null,
	//this is to hold a temporary docId for SideBarDetails Panel
	//it would be clear to be null when TocSideBarDetails hidden
	activeDocIdOfTocSideBarDetails: null,
}

const docsCenterSlice = createSlice({
	name: "docsCenter",
	initialState,
	reducers: {
		setDocsList: (state, { payload }) => {
			state.docsList = payload
		},
		//update a part of docsList
		updateDocsList: (state, { payload }) => {
			const { type, docItem, affectedItems = [] } = payload

			/******************************** ADD ********************************/

			if (type === LOCALUPDATE_DOCSLIST_ACTION.ADD_NEW_CAT ||
				type === LOCALUPDATE_DOCSLIST_ACTION.ADD_NEW_SUBCAT ||
				type === LOCALUPDATE_DOCSLIST_ACTION.ADD_NEW_EXTERNAL ||
				type === LOCALUPDATE_DOCSLIST_ACTION.ADD_NEW_DOC) {

				// state.docsListRaw = [...state.docsListRaw, docItem]
			}

			/****************************** DELETE *******************************/

			/*
			* please ensure that category or sub-category is EMPTY before using this action type
			*/
			if (type === LOCALUPDATE_DOCSLIST_ACTION.DELETE_CAT ||
				type === LOCALUPDATE_DOCSLIST_ACTION.DELETE_SUBCAT ||
				type === LOCALUPDATE_DOCSLIST_ACTION.DELETE_EXTERNAL) {
				// delete state.docsListRaw[docItem.docId]
			}

			if (type === LOCALUPDATE_DOCSLIST_ACTION.DELETE_DOC) {
				// delete state.docsListRaw[docItem.docId]
				// delete state.docsContentList[docItem.docId]
			}

			/****************************** UPDATE *******************************/

			//TODO!: Not yet update field::updatedAt
			if (type === LOCALUPDATE_DOCSLIST_ACTION.UPDATE_CAT) {
				// affectedItems.forEach((item) => {
				// 	const idx = findIndex(state.docsListRaw, { docId: item.docId })
				// 	const locatedRecord = state.docsListRaw[idx]

				// 	state.docsListRaw.splice(idx, 1, {
				// 		...locatedRecord,
				// 		...(item.type === DOC_TYPE.CATEGORY
				// 			? docItem
				// 			: { category: docItem.category })
				// 	})
				// })
			}

			//TODO!: Not yet update field::updatedAt
			if (type === LOCALUPDATE_DOCSLIST_ACTION.UPDATE_SUBCAT) {
				// affectedItems.forEach((item) => {
				// 	const idx = findIndex(state.docsListRaw, { docId: item.docId })
				// 	const locatedRecord = state.docsListRaw[idx]

				// 	state.docsListRaw.splice(idx, 1, {
				// 		...locatedRecord,
				// 		...(item.type === DOC_TYPE.SUBCATEGORY
				// 			? docItem
				// 			: { subcategory: docItem.subcategory })
				// 	})
				// })
			}

			//TODO!: Not yet update field::updatedAt
			if (type === LOCALUPDATE_DOCSLIST_ACTION.UPDATE_EXTERNAL
				|| type === LOCALUPDATE_DOCSLIST_ACTION.UPDATE_DOC) {
				// const idx = findIndex(state.docsListRaw, { docId: docItem.docId })
				// const locatedRecord = state.docsListRaw[idx]

				// state.docsListRaw.splice(idx, 1, {
				// 	...locatedRecord,
				// 	...docItem
				// })
			}
		},
		setIsDocsListEmpty: (state, { payload }) => {
			state.isDocsListEmpty = payload
		},
		setActiveDocId: (state, { payload }) => {
			state.activeDocId = payload
		},
		setActiveDocIdOfTocSideBarDetails: (state, { payload }) => {
			state.activeDocIdOfTocSideBarDetails = payload
		},

	},
})

export const {
	setDocsList,
	updateDocsList,
	setIsDocsListEmpty,
	setActiveDocId,
	setActiveDocIdOfTocSideBarDetails,
} = docsCenterSlice.actions

export default docsCenterSlice.reducer