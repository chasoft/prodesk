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
	/* List all documents */
	docList: [],
	activeDocId: null,

	/* Editor */

	// editorData: "",
	// editorDataHeadings: [],
	// /*  */
	// pageTitle: "",
	// pageDescription: "",
	// pageSlug: "",
	// pageId: null,
	// pageCategory: null,
	// pageTags: [],
	// pageStatus: "draft"
}

const textEditorSlice = createSlice({
	name: "textEditor",
	initialState,
	reducers: {
		setEditorData: (state, { payload }) => {
			state.editorData = payload
		},
		setEditorDataHeadings: (state, { payload }) => {
			state.editorDataHeadings = payload
		},
	},
})

export const {
	setEditorData,
	setEditorDataHeadings,
} = textEditorSlice.actions

export default textEditorSlice.reducer