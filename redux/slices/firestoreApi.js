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

//THIRD-PARTY
import dayjs from "dayjs"
import { forEach, omit, orderBy } from "lodash"
import { createApi } from "@reduxjs/toolkit/query/react"

//PROJECT IMPORT
import { ACTIONS, TYPE } from "./firestoreApiConstants"
import fireStoreBaseQuery from "./firestoreApiBaseQuery"
import { fix_datetime_list, fix_datetime_single } from "@helpers/firebase"
import { APP_SETTINGS, DOC_TYPE, STATUS_FILTER } from "@helpers/constants"
import { setActiveDocId, setActiveDocIdOfTocSideBarDetails } from "@redux/slices/docsCenter"
import { setShowTocSideBarDetails } from "@redux/slices/uiSettings"
import { setEditorDefaultData } from "@redux/slices/textEditor"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const firestoreApi = createApi({
	reducerPath: "firestoreApi",
	tagTypes: [
		TYPE.DOCS,
		TYPE.USERS,
		TYPE.TICKETS,
		TYPE.PROFILES,
		TYPE.SETTINGS,
		TYPE.USER_SETTINGS,
		TYPE.DEPARTMENTS,
		TYPE.CANNED_REPLIES,
		TYPE.LABELS,
		TYPE.CATEGORIES,
		TYPE.INSTALL,
		TYPE.THEME,
	],
	baseQuery: fireStoreBaseQuery,
	keepUnusedDataFor: 3 * 60,	//default 3 minutes
	endpoints: (builder) => ({

		requestRefetching: builder.mutation({
			query: (invalidatesTags) => ({ action: ACTIONS.REQUEST_REFETCHING, invalidatesTags }),
			invalidatesTags: (result, error, invalidatesTags) => invalidatesTags
		}),

		/*****************************************************************
		 * SIGN-IN (LOG-IN)                                              *
		 *****************************************************************/

		getInstallStatus: builder.query({
			query: () => ({ action: ACTIONS.INSTALL_GET_STATUS }),
			providesTags: [{ type: TYPE.INSTALL }],
		}),

		createAdminAccount: builder.mutation({
			query: (body) => ({ action: ACTIONS.INSTALL_CREATE_ADMIN, body })
		}),

		finalizeInstallation: builder.mutation({
			query: (body) => ({ action: ACTIONS.INSTALL_FINALIZATION, body }),
			invalidatesTags: () => [{ type: TYPE.INSTALL }],
		}),

		/*****************************************************************
		 * SIGN-IN (LOG-IN)                                              *
		 *****************************************************************/
		signInWithEmail: builder.mutation({
			query: (body) => ({ action: ACTIONS.SIGN_IN_WITH_EMAIL, body })
		}),

		signInWithGoogle: builder.mutation({
			query: (body) => ({ action: ACTIONS.SIGN_IN_VIA_GOOGLE, body })
		}),

		/*****************************************************************
		 * SIGN-UP                                                       *
		 *****************************************************************/

		signUpWithEmail: builder.mutation({
			query: (body) => ({ action: ACTIONS.SIGN_UP_WITH_EMAIL, body })
		}),

		signUpViaGoogle: builder.mutation({
			query: (body) => ({ action: ACTIONS.SIGN_UP_VIA_GOOGLE, body })
		}),

		signUpCreateProfile: builder.mutation({
			query: (body) => ({ action: ACTIONS.SIGN_UP_CREATE_PROFILE, body })
		}),

		signUpSurvey: builder.mutation({
			query: (body) => ({ action: ACTIONS.SIGN_UP_SURVEY, body })
		}),

		/*****************************************************************
		 * USER                                                          *
		 *****************************************************************/

		// Let you query Profiles instead of Users

		/*****************************************************************
		 * PROFILE				                                         *
		 *****************************************************************/

		getProfiles: builder.query({
			query: () => ({ action: ACTIONS.GET_PROFILES }),
			providesTags: [{ type: TYPE.PROFILES, id: "LIST" }],
			transformResponse: (response) => {
				const converted = Object.entries(response).map(i => i[1])
				return orderBy(fix_datetime_list(converted), ["displayName"])
			}
		}),

		getProfile: builder.query({
			query: (uid) => ({ action: ACTIONS.GET_PROFILE, uid }),
			providesTags: (result, error, uid) => { return [{ type: TYPE.PROFILES, id: uid }] },
			transformResponse: (response) => fix_datetime_single(response)
		}),

		getProfileByUsername: builder.query({
			query: (username) => ({ action: ACTIONS.GET_PROFILE_BY_USERNAME, username }),
			// providesTags: (result, error, username) => { return [{ type: TYPE.USERS, id: username }] },
			transformResponse: (response) => fix_datetime_single(response)
		}),

		getProfileByEmail: builder.query({
			query: (email) => ({ action: ACTIONS.GET_PROFILE_BY_EMAIL, email }),
			// providesTags: (result, error, email) => { return [{ type: TYPE.USERS, id: email }] },
			transformResponse: (response) => fix_datetime_single(response)
		}),

		updateProfile: builder.mutation({
			query: (body) => ({ action: ACTIONS.UPDATE_PROFILE, body }), //body: {...}
			invalidatesTags: (result, error, body) => ([
				{ type: TYPE.PROFILES, id: body.uid },
				{ type: TYPE.PROFILES, id: "LIST" },
			]),
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_PROFILE,
						body.uid,
						(draft) => {
							Object.assign(draft, body)
						}
					)
				)
				try { await queryFulfilled }
				catch {
					console.log("error when updating cache of user's profile and undo")
					patchResult.undo()
				}
			},
		}),

		/*****************************************************************
		 * DOCUMENTATION                                                 *
		 *****************************************************************/

		getDocs: builder.query({
			query: () => ({ action: ACTIONS.GET_DOCS }),
			providesTags: (result) => {
				return result ?
					[
						...result.map(({ docId }) => ({ type: TYPE.DOCS, id: docId })),
						{ type: TYPE.DOCS, id: "LIST" }
					]
					:
					[{ type: TYPE.DOCS, id: "LIST" }]
			},
			transformResponse: (response) => fix_datetime_list(response)
		}),

		getDoc: builder.query({
			query: (docId) => ({ action: ACTIONS.GET_DOC, docId: docId }),
			providesTags: (result, error, docId) => { return [{ type: TYPE.DOCS, id: docId }] },
			transformResponse: (response) => fix_datetime_single(response)
		}),

		getDocContent: builder.query({
			query: (docId) => ({ action: ACTIONS.GET_CONTENT, docId: docId }),
			providesTags: (result, error, docId) => [{ type: TYPE.DOCS, id: docId.concat("_content") }],
		}),

		getDocSearchIndex: builder.query({
			query: () => ({ action: ACTIONS.GET_DOC_SEARCH_INDEX }),
			providesTags: () => [{ type: TYPE.DOCS, id: ACTIONS.GET_DOC_SEARCH_INDEX }],
		}),

		addDoc: builder.mutation({
			query: (body) => ({ action: ACTIONS.ADD_DOC, body }), // body: {docItem, affectedItems<[...]>}
			invalidatesTags: (result, error, body) => {
				return [{ type: TYPE.DOCS, id: body.docItem.docId }]
			},
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_DOCS,
						undefined,
						(draft) => { draft.push(body.docItem) }
					)
				)

				if (body.docItem.type === DOC_TYPE.DOC) {
					dispatch(setActiveDocId(body.docItem.docId))
					dispatch(setShowTocSideBarDetails(false))
					dispatch(setActiveDocIdOfTocSideBarDetails(null))
					dispatch(setEditorDefaultData(""))
				} else {
					dispatch(setActiveDocId(null))
					dispatch(setShowTocSideBarDetails(true))
					dispatch(setActiveDocIdOfTocSideBarDetails(body.docItem.docId))
				}

				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		updateDoc: builder.mutation({
			// body: {docItem, affectedItems<[...]>, affectedItemsData}
			query: (body) => ({ action: ACTIONS.UPDATE_DOC, body }),
			invalidatesTags: (result, error, body) => {
				return [
					{ type: TYPE.DOCS, id: body.docItem.docId },
					...body.affectedItems.map((item) => ({ type: TYPE.DOCS, id: item.docId }))
				]
			},
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_DOCS,
						undefined,
						(draft) => {
							//Update docItem
							let obj = draft.find(e => e.docId === body.docItem.docId)
							Object.assign(obj, {
								...body.docItem,
								updatedAt: dayjs().valueOf()
							})
							//Update affectedItems
							body.affectedItems.forEach((affectedItem) => {
								let obj = draft.find(e => e.docId === affectedItem.docId)
								Object.assign(obj, affectedItem)
							})
						}
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		updateDocDnd: builder.mutation({
			// body: {docItem, affectedItems<[...]>, affectedItemsData}
			query: (body) => ({ action: ACTIONS.UPDATE_DOC, body }),
			invalidatesTags: (result, error, body) => {
				return [
					{ type: TYPE.DOCS, id: body.docItem.docId },
					...body.affectedItems.map((item) => ({ type: TYPE.DOCS, id: item.docId }))
				]
			}
		}),

		updateDocContent: builder.mutation({
			//body: {docId, updatedBy, content: { text: <string> } }
			query: (body) => ({ action: ACTIONS.UPDATE_DOC_CONTENT, body }),
			invalidatesTags: (result, error, body) => [{ type: TYPE.DOCS, id: body.docId.concat("_content") }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {

				const patchContent = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_CONTENT,
						body.docId.concat("_content"),
						(draft) => {
							Object.assign(draft, body.content)
						}
					)
				)

				const patchItem = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_DOCS,
						undefined,
						(draft) => {
							let obj = draft.find(e => e.docId === body.docId)
							Object.assign(obj, {
								updatedBy: body.updatedBy,
								updatedAt: dayjs().valueOf()
							})
						}
					)
				)

				try { await queryFulfilled }
				catch {
					patchItem.undo()
					patchContent.undo()
				}
			},
		}),

		updateDocSearchIndex: builder.mutation({
			query: (body) => ({ action: ACTIONS.UPDATE_DOC_SEARCH_INDEX, body }),
			invalidatesTags: () => {
				return [{ type: TYPE.DOCS, id: ACTIONS.GET_DOC_SEARCH_INDEX }]
			}
		}),

		deleteDoc: builder.mutation({
			query: (body) => ({ action: ACTIONS.DELETE_DOC, body }),
			invalidatesTags: () => [{ type: TYPE.DOCS, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_DOCS,
						undefined,
						(draft) => draft.filter(e => e.docId !== body.docItem.docId)
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		/*****************************************************************
		 * APPLICATION SETTINGS                                          *
		 *****************************************************************/

		getAppSettings: builder.query({
			/*
			body = string (docName)
			*/
			query: (docName) => ({ action: ACTIONS.GET_APPSETTINGS, docName }),
			providesTags: (result, error, docName) => {
				return [
					{
						type: TYPE.SETTINGS,
						id: docName ?? APP_SETTINGS.defaultDocName
					}
				]
			},
			keepUnusedDataFor: 60 * 60,
		}),

		updateAppSettings: builder.mutation({
			/*
			body = 	{
						data: { settingNames: string },
						options: {
									docName : string
									merge: bool 
								}
					}
			*/
			query: (body) => ({ action: ACTIONS.UPDATE_APPSETTINGS, body }),
			invalidatesTags: (result, error, body) => [
				{
					type: TYPE.SETTINGS,
					id: body?.options?.docName ?? APP_SETTINGS.defaultDocName
				}
			],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_APPSETTINGS,
						body?.options?.docName ?? APP_SETTINGS.defaultDocName,
						(draft) => {
							Object.assign(draft, body.data)
						}
					)
				)
				try { await queryFulfilled }
				catch {
					console.log("error when updating cache of AppSettings and undo")
					patchResult.undo()
				}
			},
		}),


		/*****************************************************************
		 * APPLICATION SETTINGS                                          *
		 *****************************************************************/

		getUserSettings: builder.query({
			query: (username) => ({ action: ACTIONS.GET_USERSETTINGS, username: username }),
			providesTags: (result) => ([{ type: TYPE.USER_SETTINGS, id: result.username }]),
			keepUnusedDataFor: 60 * 60,
		}),

		updateUserSettings: builder.mutation({
			query: (body) => ({ action: ACTIONS.UPDATE_USERSETTINGS, body }),	//body = { username:string, settings: object}
			invalidatesTags: (result, error, body) => ([{ type: TYPE.USER_SETTINGS, id: body.username }]),
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_USERSETTINGS,
						body.username,
						(draft) => {
							Object.assign(draft, body.settings)
						}
					)
				)
				try { await queryFulfilled }
				catch {
					console.log("error when updating cache of UserSettings and undo")
					patchResult.undo()
				}
			},
		}),

		/*****************************************************************
		 * DEPARTMENTS                                                   *
		 *****************************************************************/

		getDepartments: builder.query({
			query: () => ({ action: ACTIONS.GET_DEPARTMENTS }),
			providesTags: () => [{ type: TYPE.DEPARTMENTS, id: "LIST" }],
			keepUnusedDataFor: 60 * 60,
			transformResponse: (response) => {
				const res = []
				forEach(response, v => { res.push(v) })
				return orderBy(res, ["name"])
			},
		}),

		addDepartment: builder.mutation({
			query: (body) => ({ action: ACTIONS.ADD_DEPARTMENT, body }), // body: {...}
			invalidatesTags: () => [{ type: TYPE.DEPARTMENTS, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				console.log("Optimistic addDepartment")
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_DEPARTMENTS,
						undefined,
						(draft) => {
							draft.push(body)
						}
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		updateDepartment: builder.mutation({
			query: (body) => ({ action: ACTIONS.UPDATE_DEPARTMENT, body }), //body: {...}
			invalidatesTags: () => [{ type: TYPE.DEPARTMENTS, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				console.log("Optimistic updateDepartment")
				//Update cache of modified department
				const patchDepartment = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_DEPARTMENTS,
						undefined,
						(draft) => {
							let obj = draft.find(department => department.did === body.did)
							Object.assign(obj, body)
						})
				)
				try { await queryFulfilled }
				catch {
					console.log("error when updating cache of department and undo")
					patchDepartment.undo()
				}
			},
		}),

		deleteDepartment: builder.mutation({
			query: (body) => ({ action: ACTIONS.DELETE_DEPARTMENT, body }), //body: {departmentItem, fullList}
			invalidatesTags: () => [{ type: TYPE.DEPARTMENTS, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				console.log("Optimistic deleteDepartment")
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_DEPARTMENTS,
						undefined,
						(draft) => draft.filter(e => e.did !== body.departmentItem.did)
					)
				)
				try { await queryFulfilled }
				catch {
					console.log("error when delete cache of department and undo")
					patchResult.undo()
				}
			},
		}),

		/*****************************************************************
		 * CANNED REPLIES                                                *
		 *****************************************************************/

		getCannedReplies: builder.query({
			query: () => ({ action: ACTIONS.GET_CANNED_REPLIES }),
			providesTags: () => [{ type: TYPE.CANNED_REPLIES, id: "LIST" }],
			keepUnusedDataFor: 60 * 60,
			transformResponse: (response) => {
				const res = []
				forEach(response, v => { res.push(v) })
				return orderBy(res, ["updatedAt"], ["desc"])
			},
		}),

		addCannedReply: builder.mutation({
			query: (body) => ({ action: ACTIONS.ADD_CANNED_REPLY, body }),
			invalidatesTags: () => [{ type: TYPE.CANNED_REPLIES, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_CANNED_REPLIES,
						undefined,
						(draft) => {
							draft.push(body)
						}
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		updateCannedReply: builder.mutation({
			//body: {...}
			query: (body) => ({ action: ACTIONS.UPDATE_CANNED_REPLY, body }),
			invalidatesTags: () => [{ type: TYPE.CANNED_REPLIES, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_CANNED_REPLIES,
						undefined,
						(draft) => {
							let obj = draft.find(i => i.crid === body.crid)
							Object.assign(obj, body)
						})
				)
				try { await queryFulfilled }
				catch {
					console.log("error when updating cache of canned-reply and undo")
					patchResult.undo()
				}
			},
		}),

		deleteCannedReply: builder.mutation({
			//body = { cannedReplyItem, fullList }
			query: (body) => ({ action: ACTIONS.DELETE_CANNED_REPLY, body }),
			invalidatesTags: () => [{ type: TYPE.CANNED_REPLIES, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_CANNED_REPLIES,
						undefined,
						(draft) => draft.filter(e => e.crid !== body.cannedReplyItem.crid)
					)
				)
				try { await queryFulfilled }
				catch {
					console.log("error when delete cache of canned-reply and undo")
					patchResult.undo()
				}
			},
		}),


		/*****************************************************************
		 * LABELS                                                        *
		 *****************************************************************/

		getLabels: builder.query({
			query: () => ({ action: ACTIONS.GET_LABELS }),
			providesTags: () => [{ type: TYPE.LABELS, id: "LIST" }],
			keepUnusedDataFor: 60 * 60,
			transformResponse: (response) => {
				const res = []
				forEach(response, v => { res.push(v) })
				return orderBy(res, ["createdAt"])
			},
		}),

		addLabel: builder.mutation({
			query: (body) => ({ action: ACTIONS.ADD_LABEL, body }),
			invalidatesTags: () => [{ type: TYPE.LABELS, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				console.log("Optimistic addLabel")
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_LABELS,
						undefined,
						(draft) => { draft.push(body) }
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		updateLabel: builder.mutation({
			//body: {...}
			query: (body) => ({ action: ACTIONS.UPDATE_LABEL, body }),
			invalidatesTags: () => [{ type: TYPE.LABELS, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				console.log("Optimistic updateLabel")
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_LABELS,
						undefined,
						(draft) => {
							let obj = draft.find(i => i.lid === body.lid)
							Object.assign(obj, body)
						})
				)
				try { await queryFulfilled }
				catch {
					console.log("error when updating cache of label and undo")
					patchResult.undo()
				}
			},
		}),

		deleteLabel: builder.mutation({
			//body = { labelItem, fullList }
			query: (body) => ({ action: ACTIONS.DELETE_LABEL, body }),
			invalidatesTags: () => [{ type: TYPE.LABELS, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				console.log("Optimistic deleteLabel")
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_LABELS,
						undefined,
						(draft) => draft.filter(e => e.lid !== body.labelItem.lid)
					)
				)
				try { await queryFulfilled }
				catch {
					console.log("error when delete cache of label and undo")
					patchResult.undo()
				}
			},
		}),

		/*****************************************************************
		 * CATEGORIES                                                    *
		 *****************************************************************/

		//return an array of objects
		getCategories: builder.query({
			query: () => ({ action: ACTIONS.GET_CATEGORIES }),
			providesTags: () => [{ type: TYPE.CATEGORIES, id: "LIST" }],
			keepUnusedDataFor: 60 * 60,
			transformResponse: (response) => {
				const res = []
				forEach(response, v => { res.push(v) })
				return orderBy(res, ["createdAt"])
			}
		}),

		addCategory: builder.mutation({
			//body = {isDefault, categoryItem, fullList}
			query: (body) => ({ action: ACTIONS.ADD_CATEGORY, body }),
			invalidatesTags: () => [{ type: TYPE.CATEGORIES, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				console.log("Optimistic addCategory")
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_CATEGORIES,
						undefined,
						(draft) => {
							if (body.isDefault) {
								draft.forEach((e) => {
									Object.assign(e, { default: false })
								})
							}
							draft.push(body.categoryItem)
						}
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		updateCategory: builder.mutation({
			//body = {isDefault, categoryItem, fullList}
			query: (body) => ({ action: ACTIONS.UPDATE_CATEGORY, body }),
			invalidatesTags: () => [{ type: TYPE.CATEGORIES, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_CATEGORIES,
						undefined,
						(draft) => {
							//update default
							if (body.isDefault) {
								draft.forEach((e) => {
									Object.assign(e, { default: false })
								})
							}
							//update modified category
							const updatedItem = draft.find(c => c.catId === body.categoryItem.catId)
							Object.assign(updatedItem, body.categoryItem)
						})
				)
				try { await queryFulfilled }
				catch {
					console.log("error when updating cache of category and undo")
					patchResult.undo()
				}
			},
		}),

		deleteCategory: builder.mutation({
			//body = {categoryItem, fullList}
			query: (body) => ({ action: ACTIONS.DELETE_CATEGORY, body }),
			invalidatesTags: () => [{ type: TYPE.CATEGORIES, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_CATEGORIES,
						undefined,
						(draft) => draft.filter(e => e.catId !== body.categoryItem.catId)
					)
				)
				try { await queryFulfilled }
				catch {
					console.log("error when delete cache of category and undo")
					patchResult.undo()
				}
			},
		}),

		/*****************************************************************
		 * TICKETS                                                       *
		 *****************************************************************/

		getTicketsForUser: builder.query({
			query: (username) => ({ action: ACTIONS.GET_TICKETS_FOR_USER, username }),
			providesTags: () => [{ type: TYPE.TICKETS, id: "LIST" }],
			transformResponse: (response) => {
				const fixedDate = fix_datetime_list(response)
				return fixedDate.filter(i => i.removed === false)
			}
		}),

		getTicketsForAdmin: builder.query({
			query: () => ({ action: ACTIONS.GET_TICKETS_FOR_ADMIN }),
			providesTags: () => [{ type: TYPE.TICKETS, id: "LIST" }],
			transformResponse: (response) => {
				forEach(response, function (value, key) {
					if (value.removed === true) {
						delete response[key]
					}
				})
				return (response)
			}
		}),

		getTicketReplies: builder.query({
			query: (body) => ({ action: ACTIONS.GET_TICKET_REPLIES, body }),	//body: {username, tid}
			providesTags: (result, error, body) => {
				return [{ type: TYPE.TICKETS, id: body.tid.concat("_replies") }]
			},
			transformResponse: (response) => {
				const res = fix_datetime_list(response)
				return orderBy(res, ["createdAt"])
			}
		}),

		addTicket: builder.mutation({
			query: (body) => ({ action: ACTIONS.ADD_TICKET, body }),	//body: {...ticketItem}
			invalidatesTags: () => [{ type: TYPE.TICKETS, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchTicketsForUser = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_TICKETS_FOR_USER,
						body.username,
						(draft) => { draft.push(body) }
					)
				)
				const patchTicketsForAdmin = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_TICKETS_FOR_ADMIN,
						undefined,
						(draft) => {
							Object.assign(draft,
								{
									[body.tid]: body
								}
							)
						}
					)
				)
				try { await queryFulfilled }
				catch {
					patchTicketsForUser.undo()
					patchTicketsForAdmin.undo()
				}
			},
		}),

		addTicketReply: builder.mutation({
			query: (body) => ({ action: ACTIONS.ADD_TICKET_REPLY, body }),//body: {ticketItem, replyItem}
			invalidatesTags: (result, error, body) => {
				return [{ type: TYPE.TICKETS, id: body.ticketItem.tid.concat("_replies") }]
			},
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				//Update ticket relies
				const patchReplies = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_TICKET_REPLIES,
						{
							username: body.ticketItem.username,
							tid: body.ticketItem.tid
						},
						(draft) => { draft.push(body.replyItem) }
					)
				)
				// Update (replyCount & updatedAt) for USER
				const patchRepliesUser = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_TICKETS_FOR_USER, body.ticketItem.username,
						(draft) => {
							let obj = draft.find(i => i.tid === body.ticketItem.tid)
							Object.assign(obj, {
								replyCount: obj.replyCount + 1,
								updatedAt: dayjs().valueOf(),
								status: STATUS_FILTER.PENDING
							})
						}
					)
				)
				//Update (replyCount & updatedAt) for ADMIN
				const patchRepliesAdmin = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_TICKETS_FOR_ADMIN,
						undefined,
						(draft) => {
							let obj = draft[body.ticketItem.tid]
							Object.assign(obj,
								{
									replyCount: obj.replyCount + 1,
									updatedAt: dayjs().valueOf(),
									status: STATUS_FILTER.PENDING
								}
							)
						}
					)
				)

				try { await queryFulfilled }
				catch {
					patchReplies.undo()
					patchRepliesUser.undo()
					patchRepliesAdmin.undo()
				}
			},
		}),

		updateTicket: builder.mutation({
			//body: [{...ticketItem1}, {...ticketItem2}]
			query: (body) => ({ action: ACTIONS.UPDATE_TICKET, body }),
			invalidatesTags: () => [{ type: TYPE.TICKETS, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				//Update cache tickets for User
				//When comes to updating cache for User,
				//all tickets would be the same owner, then,
				//we get default username is body[0].username
				const patchResultForUser = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_TICKETS_FOR_USER,
						body[0].username,
						(draft) => {
							const updatedAt = dayjs().valueOf()
							body.forEach((ticket) => {
								let obj = draft.find(e => e.tid === ticket.tid)
								Object.assign(obj, {
									...ticket,
									updatedAt
								})
							})
						}
					)
				)
				//Update cache tickets for Admin
				const patchResultForAdmin = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_TICKETS_FOR_ADMIN,
						undefined,
						(draft) => {
							const updatedAt = dayjs().valueOf()
							body.forEach((ticket) => {
								let obj = draft[ticket.tid]
								Object.assign(obj, {
									...ticket,
									updatedAt
								})
							})
						}
					)
				)

				try { await queryFulfilled }
				catch {
					patchResultForUser.undo()
					patchResultForAdmin.undo()
				}
			},
		}),

		updateTicketReply: builder.mutation({
			//body: {ticketItem, replyItem}
			query: (body) => ({ action: ACTIONS.UPDATE_TICKET_REPLY, body }),
			invalidatesTags: (result, error, body) => [{ type: TYPE.TICKETS, id: body.ticketItem.tid.concat("_replies") }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_TICKET_REPLIES,
						{
							username: body.ticketItem.username,
							tid: body.ticketItem.tid
						},
						(draft) => {
							let obj = draft.find(e => e.trid === body.replyItem.trid) //trid, for we're updating replyItem
							Object.assign(obj, body.replyItem)
						}
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		//Only admin can use this function
		//for user, they just need to close the ticket, then done
		deleteTicket: builder.mutation({
			//body: [{username, tid},{username, tid}]
			query: (body) => ({ action: ACTIONS.DELETE_TICKET, body }),
			invalidatesTags: () => [{ type: TYPE.TICKETS, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const tids = body.map(i => i.tid)
				//Update ticket cache for User
				const patchTicketsForUser = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_TICKETS_FOR_USER,
						body.username,
						(draft) => {
							draft.filter(e => tids.includes(e.tid) === false)
						}
					)
				)
				//Update ticket cache for Admin
				const patchTicketsForAdmin = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_TICKETS_FOR_ADMIN,
						undefined,
						(draft) => {
							omit(draft, tids)
						}
					)
				)

				try { await queryFulfilled }
				catch {
					patchTicketsForUser.undo()
					patchTicketsForAdmin.undo()
				}
			},
		}),

		//Mark ticket as deleted ~ updateTicket
		deleteTicketTemp: builder.mutation({
			//body: [{username, tid},{username, tid}]
			query: (body) => ({ action: ACTIONS.DELETE_TICKET_TEMP, body }),
			invalidatesTags: () => [{ type: TYPE.TICKETS, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const tids = body.map(i => i.tid)
				//Update ticket cache for User
				const patchTicketsForUser = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_TICKETS_FOR_USER,
						body.username,
						(draft) => {
							draft.filter(e => tids.includes(e.tid) === false)
						}
					)
				)
				//Update ticket cache for Admin
				const patchTicketsForAdmin = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_TICKETS_FOR_ADMIN,
						undefined,
						(draft) => {
							omit(draft, tids)
						}
					)
				)
				try { await queryFulfilled }
				catch {
					patchTicketsForUser.undo()
					patchTicketsForAdmin.undo()
				}
			},
		}),

		//Only admin can use this function
		deleteTicketReply: builder.mutation({
			query: (body) => ({ action: ACTIONS.DELETE_TICKET_REPLY, body }),  //body: {username, tid, trid}
			invalidatesTags: (result, error, body) => [{ type: TYPE.TICKETS, id: body.tid.concat("_replies") }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				//Update cache of TicketReplies
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_TICKET_REPLIES,
						{
							username: body.username,
							tid: body.tid
						},
						(draft) => draft.filter(replyItem => replyItem.trid !== body.trid)
					)
				)
				//Update ticket cache for User
				const patchTicketsForUser = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_TICKETS_FOR_USER,
						body.username,
						(draft) => {
							let obj = draft.find(ticketItem => ticketItem.tid === body.tid)
							Object.assign(obj, {
								replyCount: obj.replyCount - 1,
								updatedAt: dayjs().valueOf()
							})
						}
					)
				)
				//Update ticket cache for Admin
				const patchTicketsForAdmin = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_TICKETS_FOR_ADMIN,
						undefined,
						(draft) => {
							Object.assign(draft, {
								[body.tid]: {
									...draft[body.tid],
									replyCount: draft[body.tid].replyCount - 1,
									updatedAt: dayjs().valueOf()
								}
							})
						}
					)
				)

				try { await queryFulfilled }
				catch {
					patchResult.undo()
					patchTicketsForUser.undo()
					patchTicketsForAdmin.undo()
				}
			},
		}),

		/*****************************************************************
		 * PAGES                                                         *
		 *****************************************************************/

		getPages: builder.query({
			query: () => ({ action: ACTIONS.GET_PAGES }),
			providesTags: (result) => {
				return result
					? [
						...result.map(({ pid }) => ({ type: TYPE.PAGES, id: pid })),
						{ type: TYPE.PAGES, id: "LIST" }
					]
					: [{ type: TYPE.PAGES, id: "LIST" }]
			},
			keepUnusedDataFor: 60 * 60,
			// transformResponse: (response) => fix_datetime_list(response)
		}),

		getPage: builder.query({
			query: (pid) => ({ action: ACTIONS.GET_PAGE, pid }),	//body: pid
			providesTags: (result, error, pid) => { return [{ type: TYPE.PAGES, id: pid }] },
			// transformResponse: (response) => fix_datetime_single(response)
		}),

		addPage: builder.mutation({
			query: (body) => ({ action: ACTIONS.ADD_PAGE, body }), // body: {...pageDetails }
			invalidatesTags: (result, error, body) => [{ type: TYPE.PAGES, id: body.pid }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_PAGES,
						undefined,
						(draft) => {
							draft.push(body)
						}
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		updatePage: builder.mutation({
			query: (body) => ({ action: ACTIONS.UPDATE_PAGE, body }), //body: { ...pageDetails }
			invalidatesTags: (result, error, body) => [{ type: TYPE.PAGES, id: body.pid }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_PAGES,
						undefined,
						(draft) => {
							let obj = draft.find(e => e.pid === body.pid)
							Object.assign(obj, body)
						}
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		deletePage: builder.mutation({
			query: (pid) => ({ action: ACTIONS.DELETE_PAGE, pid }),
			invalidatesTags: () => [{ type: TYPE.PAGES, id: "LIST" }],
			async onQueryStarted(pid, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_PAGES,
						undefined,
						(draft) => draft.filter(e => e.pid !== pid)
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		/*****************************************************************
		 * BLOG                                                          *
		 *****************************************************************/

		getBlogPosts: builder.query({
			query: () => ({ action: ACTIONS.GET_BLOG_POSTS }),
			providesTags: (result) => {
				return result
					? [
						...result.map(({ bid }) => ({ type: TYPE.BLOG, id: bid })),
						{ type: TYPE.BLOG, id: "LIST" }
					]
					: [{ type: TYPE.BLOG, id: "LIST" }]
			},
			keepUnusedDataFor: 60 * 60,
			transformResponse: (response) => fix_datetime_list(response)
		}),

		getBlogPost: builder.query({
			query: (bid) => ({ action: ACTIONS.GET_BLOG_POST, bid }),
			providesTags: (result, error, bid) => { return [{ type: TYPE.BLOG, id: bid }] },
			transformResponse: (response) => fix_datetime_single(response)
		}),

		getBlogPostContent: builder.query({
			query: (bid) => ({ action: ACTIONS.GET_BLOG_POST_CONTENT, bid }),
			providesTags: (result, error, bid) => [{ type: TYPE.BLOG, id: bid.concat("_content") }],
		}),

		addBlogPost: builder.mutation({
			query: (body) => ({ action: ACTIONS.ADD_BLOG_POST, body }),	//body: {...blogItem}
			invalidatesTags: (result, error, body) => {
				return [{ type: TYPE.BLOG, id: body.bid }]
			},
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_BLOG_POSTS,
						undefined,
						(draft) => {
							draft.push(body)
						}
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		updateBlogPost: builder.mutation({
			query: (body) => ({ action: ACTIONS.UPDATE_BLOG_POST, body }), //body: {...blogItem}
			invalidatesTags: (result, error, body) => [{ type: TYPE.BLOG, id: body.bid }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_BLOG_POSTS,
						undefined,
						(draft) => {
							let obj = draft.find(e => e.bid === body.bid)
							Object.assign(obj, body)
						}
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		updateBlogPostContent: builder.mutation({
			query: (body) => ({ action: ACTIONS.UPDATE_BLOG_POST_CONTENT, body }), //body: {blogItem: object, content: { text: <string> } }
			invalidatesTags: (result, error, body) => [{ type: TYPE.BLOG, id: body.blogItem.bid.concat("_content") }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_BLOG_POST_CONTENT,
						body.blogItem.bid.concat("_content"),
						(draft) => { Object.assign(draft, body.content) }
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		deleteBlogPost: builder.mutation({
			query: (bid) => ({ action: ACTIONS.DELETE_BLOG_POST, bid }),
			invalidatesTags: () => [{ type: TYPE.BLOG, id: "LIST" }],
			async onQueryStarted(bid, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_BLOG_POSTS,
						undefined,
						(draft) => draft.filter(e => e.bid !== bid)
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		/*****************************************************************
		 * THEME                                                         *
		 *****************************************************************/

		getThemeSettings: builder.query({
			query: (themeName) => ({ action: ACTIONS.GET_THEME_SETTINGS, themeName }),
			providesTags: (result, error, themeName) => [{ type: TYPE.THEME, id: themeName }],
			keepUnusedDataFor: 60 * 60,
		}),

		updateThemeSettings: builder.mutation({
			//body = { themeName: "...", blockA: {...}, blockB: {..}}
			query: (body) => ({ action: ACTIONS.UPDATE_THEME_SETTINGS, body }),
			invalidatesTags: (result, error, body) => [{ type: TYPE.THEME, id: body.themeName }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTIONS.GET_THEME_SETTINGS,
						body.themeName,
						(draft) => { Object.assign(draft, body) }
					)
				)
				try { await queryFulfilled }
				catch {
					console.log("error when updating theme settings and undo")
					patchResult.undo()
				}
			},
		}),


	}),
})

export const {
	/* APPLICATION INSTALLATION */
	useGetInstallStatusQuery,
	useCreateAdminAccountMutation,
	useFinalizeInstallationMutation,

	/* SIGN-IN & SIGN-UP */
	useSignInWithEmailMutation,
	useSignInWithGoogleMutation,
	//
	useSignUpWithEmailMutation,
	useSignUpViaGoogleMutation,
	useSignUpCreateProfileMutation,
	useSignUpSurveyMutation,

	/* APPLICATION SETTINGS */
	useGetAppSettingsQuery,
	useUpdateAppSettingsMutation,

	/* USER SETTINGS */
	useGetUserSettingsQuery,
	useUpdateUserSettingsMutation,

	/* PROFILES */
	useGetProfilesQuery,
	useGetProfileQuery,
	useGetProfileByUsernameQuery,
	useGetProfileByEmailQuery,
	useUpdateProfileMutation,

	/* DOCUMENTATION */
	useGetDocQuery,
	useGetDocsQuery,
	useGetDocContentQuery,
	useGetDocSearchIndexQuery,
	//
	useAddDocMutation,
	useUpdateDocMutation,
	useUpdateDocDndMutation,
	useUpdateDocContentMutation,
	useDeleteDocMutation,
	useUpdateDocSearchIndexMutation,

	/* TICKET SETTINGS */
	useGetDepartmentsQuery,
	useAddDepartmentMutation,
	useUpdateDepartmentMutation,
	useDeleteDepartmentMutation,
	//
	useGetCannedRepliesQuery,
	useAddCannedReplyMutation,
	useUpdateCannedReplyMutation,
	useDeleteCannedReplyMutation,
	//
	useGetLabelsQuery,
	useAddLabelMutation,
	useUpdateLabelMutation,
	useDeleteLabelMutation,
	//
	useGetCategoriesQuery,
	useAddCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,

	/* TICKETS */
	useGetTicketsForUserQuery,
	useGetTicketsForAdminQuery,
	useGetTicketRepliesQuery,
	useAddTicketMutation,
	useAddTicketReplyMutation,
	useUpdateTicketMutation,
	useUpdateTicketReplyMutation,
	useDeleteTicketMutation,
	useDeleteTicketTempMutation,
	useDeleteTicketReplyMutation,

	/* PAGES */
	useGetPagesQuery,
	useGetPageQuery,
	useAddPageMutation,
	useUpdatePageMutation,
	useDeletePageMutation,

	/* BLOG */
	useGetBlogPostsQuery,
	useGetBlogPostQuery,
	useGetBlogPostContentQuery,
	useAddBlogPostMutation,
	useUpdateBlogPostMutation,
	useUpdateBlogPostContentMutation,
	useDeleteBlogPostMutation,

	/* */
	useRequestRefetchingMutation,

	/* THEME */
	useGetThemeSettingsQuery,
	useUpdateThemeSettingsMutation,

} = firestoreApi
