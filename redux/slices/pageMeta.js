/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║          ProDesk - Your Elegent & Powerful Ticket System          ║ *
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
	title: "ProDesk",
	subTitle: "Your Elegent & Powerful Ticket System"
}

const pageMetaSlice = createSlice({
	name: "pageMeta",
	initialState,
	reducers: {
		setTitle: (state, { payload }) => {
			state.title = payload
		},
		setSubTitle: (state, { payload }) => {
			state.subTitle = payload
		}
	},
})

export const {
	setTitle, setSubTitle
} = pageMetaSlice.actions

export default pageMetaSlice.reducer