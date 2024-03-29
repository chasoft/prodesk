/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import { combineReducers } from "redux"

//PROJECT IMPORT
import authReducer from "./auth"
import pageMetaReducer from "./pageMeta"
import newTicketReducer from "./newTicket"
import uiSettingsReducer from "./uiSettings"
import redirectReducer from "./redirect"
import textEditorReducer from "./textEditor"
import docsCenterReducer from "./docsCenter"
import { firestoreApi } from "./firestoreApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const rootReducer = combineReducers({
	authState: authReducer,
	pageMetaState: pageMetaReducer,
	newTicketState: newTicketReducer,
	uiSettingsState: uiSettingsReducer,
	redirectState: redirectReducer,
	textEditorState: textEditorReducer,
	docsCenterState: docsCenterReducer,
	[firestoreApi.reducerPath]: firestoreApi.reducer,
})

export default rootReducer