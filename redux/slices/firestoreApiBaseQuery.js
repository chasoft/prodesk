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

//PROJECT IMPORT
import { ACTIONS } from "./firestoreApiConstants"
import { CODE } from "@helpers/constants"

import { _addDoc, createAdminAccount, finalizeInstallation, getInstallStatus, getProfile, getProfileByEmail, getProfileByUsername, getProfiles, requestRefetching, signInWithEmail, signInWithGoogle, signUpCreateProfile, signUpSurvey, signUpViaGoogle, signUpWithEmail, updateProfile, _getDoc, _getDocs, _updateDoc, getDocSearchIndex, getDocContent, updateDocSearchIndex, updateDocContent, updateDocDnd, _deleteDoc, updateDepartment, addDepartment, getDepartments, updateUserSettings, getUserSettings, updateAppSettings, getAppSettings, deleteCannedReply, updateCannedReply, addCannedReply, getCannedReplies, deleteDepartment, updateLabel, addLabel, getLabels, getPages, deleteTicketReply, deleteTicketTemp, deleteTicket, updateTicketReply, updateTicket, addTicketReply, addTicket, getTicketReplies, getTicketsForAdmin, getTicketsForUser, deleteCategory, updateCategory, addCategory, getCategories, deleteLabel, updateThemeSettings, getThemeSettings, deleteBlogPost, updateBlogPostContent, updateBlogPost, addBlogPost, getBlogPostContent, getBlogPost, getBlogPosts, deletePage, updatePage, addPage, getPageContent, getPage, throwError } from "./firestoreApiBase"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*
* function signature
* async function fireStoreBaseQuery(args, { signal, dispatch, getState }, extraOptions) {...}
*/

async function fireStoreBaseQuery(args) {

	switch (args.action) {

		case ACTIONS.REQUEST_REFETCHING: return requestRefetching(args)

		//INSTALL
		case ACTIONS.INSTALL_CREATE_ADMIN: return createAdminAccount(args)
		case ACTIONS.INSTALL_FINALIZATION: return finalizeInstallation(args)
		case ACTIONS.INSTALL_GET_STATUS: return getInstallStatus()

		//SIGN-IN (LOGIN-IN)
		case ACTIONS.SIGN_IN_WITH_EMAIL: return signInWithEmail(args)
		case ACTIONS.SIGN_IN_WITH_GOOGLE: return signInWithGoogle()

		//SIGN-UP
		case ACTIONS.SIGN_UP_CREATE_PROFILE: return signUpCreateProfile(args)
		case ACTIONS.SIGN_UP_SURVEY: return signUpSurvey(args)
		case ACTIONS.SIGN_UP_VIA_GOOGLE: return signUpViaGoogle(args)
		case ACTIONS.SIGN_UP_WITH_EMAIL: return signUpWithEmail(args)

		//PROFILE => uid || //Get from GROUP.PUBLIC_PROFILES
		case ACTIONS.GET_PROFILE_BY_EMAIL: return getProfileByEmail(args)
		case ACTIONS.GET_PROFILE_BY_USERNAME: return getProfileByUsername(args)
		case ACTIONS.GET_PROFILE: return getProfile(args)
		case ACTIONS.GET_PROFILES: return getProfiles()
		case ACTIONS.UPDATE_PROFILE: return updateProfile(args)

		//DOCUMENTATION => docId
		case ACTIONS.ADD_DOC: return _addDoc(args)
		case ACTIONS.DELETE_DOC: return _deleteDoc(args)
		case ACTIONS.GET_CONTENT: return getDocContent(args)
		case ACTIONS.GET_DOC_SEARCH_INDEX: return getDocSearchIndex()
		case ACTIONS.GET_DOC: return _getDoc(args)
		case ACTIONS.GET_DOCS: return _getDocs()
		case ACTIONS.UPDATE_DOC_CONTENT: return updateDocContent(args)
		case ACTIONS.UPDATE_DOC_DND: return updateDocDnd(args)
		case ACTIONS.UPDATE_DOC_SEARCH_INDEX: return updateDocSearchIndex(args)
		case ACTIONS.UPDATE_DOC: return _updateDoc(args)

		//APPLICATION SETTINGS
		case ACTIONS.GET_APPSETTINGS: return getAppSettings(args)
		case ACTIONS.UPDATE_APPSETTINGS: return updateAppSettings(args)

		//USER SETTINGS
		case ACTIONS.GET_USERSETTINGS: return getUserSettings(args)
		case ACTIONS.UPDATE_USERSETTINGS: return updateUserSettings(args)

		//DEPARTMENTS => did
		case ACTIONS.ADD_DEPARTMENT: return addDepartment(args)
		case ACTIONS.DELETE_DEPARTMENT: return deleteDepartment(args)
		case ACTIONS.GET_DEPARTMENTS: return getDepartments()
		case ACTIONS.UPDATE_DEPARTMENT: return updateDepartment(args)

		//CANNED REPLIES => crid
		case ACTIONS.ADD_CANNED_REPLY: return addCannedReply(args)
		case ACTIONS.DELETE_CANNED_REPLY: return deleteCannedReply(args)
		case ACTIONS.GET_CANNED_REPLIES: return getCannedReplies()
		case ACTIONS.UPDATE_CANNED_REPLY: return updateCannedReply(args)

		//LABELS => lid
		case ACTIONS.ADD_LABEL: return addLabel(args)
		case ACTIONS.DELETE_LABEL: return deleteLabel(args)
		case ACTIONS.GET_LABELS: return getLabels()
		case ACTIONS.UPDATE_LABEL: return updateLabel(args)

		//CATEGORIES => catId
		case ACTIONS.ADD_CATEGORY: return addCategory(args)
		case ACTIONS.DELETE_CATEGORY: return deleteCategory(args)
		case ACTIONS.GET_CATEGORIES: return getCategories()
		case ACTIONS.UPDATE_CATEGORY: return updateCategory(args)

		//TICKETS => tid
		case ACTIONS.ADD_TICKET_REPLY: return addTicketReply(args)
		case ACTIONS.ADD_TICKET: return addTicket(args)
		case ACTIONS.DELETE_TICKET_REPLY: return deleteTicketReply(args)
		case ACTIONS.DELETE_TICKET_TEMP: return deleteTicketTemp(args)
		case ACTIONS.DELETE_TICKET: return deleteTicket(args)
		case ACTIONS.GET_TICKET_REPLIES: return getTicketReplies(args)
		case ACTIONS.GET_TICKETS_FOR_ADMIN: return getTicketsForAdmin()
		case ACTIONS.GET_TICKETS_FOR_USER: return getTicketsForUser(args)
		case ACTIONS.UPDATE_TICKET_REPLY: return updateTicketReply(args)
		case ACTIONS.UPDATE_TICKET: return updateTicket(args)

		//PAGES => pid
		case ACTIONS.ADD_PAGE: return addPage(args)
		case ACTIONS.DELETE_PAGE: return deletePage(args)
		case ACTIONS.GET_PAGE_CONTENT: return getPageContent(args)
		case ACTIONS.GET_PAGE: return getPage(args)
		case ACTIONS.GET_PAGES: return getPages()
		case ACTIONS.UPDATE_PAGE: return updatePage(args)

		//BLOG => bid
		case ACTIONS.ADD_BLOG_POST: return addBlogPost(args)
		case ACTIONS.DELETE_BLOG_POST: return deleteBlogPost(args)
		case ACTIONS.GET_BLOG_POST_CONTENT: return getBlogPostContent(args)
		case ACTIONS.GET_BLOG_POST: return getBlogPost(args)
		case ACTIONS.GET_BLOG_POSTS: return getBlogPosts()
		case ACTIONS.UPDATE_BLOG_POST_CONTENT: return updateBlogPostContent(args)
		case ACTIONS.UPDATE_BLOG_POST: return updateBlogPost(args)

		//APPLICATION SETTINGS
		case ACTIONS.GET_THEME_SETTINGS: return getThemeSettings(args)
		case ACTIONS.UPDATE_THEME_SETTINGS: return updateThemeSettings(args)

		//DEFAULT SWITCH
		default:
			return throwError(
				CODE.FAILED,
				"Action not yet implemented",
				{ message: "Action not yet implemented" },
				null
			)
	}
}

export default fireStoreBaseQuery