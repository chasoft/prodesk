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
import { LOCALUPDATE_DOCSLIST_ACTION } from "./../../helpers/constants"

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
	isDocsListEmpty: true,
	/*
		activeDoc structure
		{
			docId: <NANOID>
			type: <DOC_TYPE>,
			category: string,
			subcategory: string,
			title: string,
			description: string,
			slug: string,
			tags: array<string>,
			status: <DOC_STATUS>
			createdAt: datetime,
			updatedAt: datetime,
			status: datetime,
			description: string,
			description: string,
		}
	*/
	activeDoc: {},
	activeDocId: null,
	//this is to hold a temporary docId for SideBarDetails Panel
	//it would be clear to be null when TocSideBarDetails hidden
	activeDocIdOfTocSideBarDetails: null,
}

const docsCenterSlice = createSlice({
	name: "docsCenter",
	initialState,
	reducers: {
		/* set and overwrite docsList */
		setDocsList: (state, { payload }) => {
			state.docsList = payload
		},
		//update a part of docsList
		updateDocsList: (state, { payload }) => {
			const { type, docItem } = payload

			/******************************** ADD ********************************/

			if (type === LOCALUPDATE_DOCSLIST_ACTION.ADD_NEW_CAT) {
				//
			}

			if (type === LOCALUPDATE_DOCSLIST_ACTION.ADD_NEW_SUBCAT) {
				//
			}

			if (type === LOCALUPDATE_DOCSLIST_ACTION.ADD_NEW_EXTERNAL) {
				//
			}

			if (type === LOCALUPDATE_DOCSLIST_ACTION.ADD_NEW_DOC) {
				//
			}

			/****************************** DELETE *******************************/

			if (type === LOCALUPDATE_DOCSLIST_ACTION.DELETE_CAT) {
				//
			}

			if (type === LOCALUPDATE_DOCSLIST_ACTION.DELETE_SUBCAT) {
				//
			}

			if (type === LOCALUPDATE_DOCSLIST_ACTION.DELETE_EXTERNAL) {
				//
			}

			if (type === LOCALUPDATE_DOCSLIST_ACTION.DELETE_DOC) {
				//
			}

			/****************************** UPDATE *******************************/

			if (type === LOCALUPDATE_DOCSLIST_ACTION.UPDATE_CAT) {
				//
			}

			if (type === LOCALUPDATE_DOCSLIST_ACTION.UPDATE_SUBCAT) {
				//
			}

			if (type === LOCALUPDATE_DOCSLIST_ACTION.UPDATE_EXTERNAL) {
				//
			}

			if (type === LOCALUPDATE_DOCSLIST_ACTION.UPDATE_DOC) {
				//
			}
		},

		setActiveDoc: (state, { payload }) => {
			state.activeDoc = payload
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
	setDocsList, updateDocsList,
	setActiveDoc,
	setActiveDocId,
	setActiveDocIdOfTocSideBarDetails,
} = docsCenterSlice.actions

export default docsCenterSlice.reducer