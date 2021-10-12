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

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

//THIRD-PARTY
import { createApi } from "@reduxjs/toolkit/query/react"

//PROJECT IMPORT
import { fix_datetime_list, fix_datetime_single } from "./../../helpers/firebase"
import { ACTION, TYPE } from "./firestoreApiConstants"
import fireStoreBaseQuery from "./firestoreApiBaseQuery"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const firestoreApi = createApi({
	reducerPath: "firestoreApi",
	tagTypes: [
		TYPE.DOCS,
		TYPE.USERS,
		TYPE.TICKETS,
		TYPE.SETTINGS,
		TYPE.DEPARTMENTS,
		TYPE.CANNED_REPLIES,
		TYPE.LABELS
	],
	baseQuery: fireStoreBaseQuery,
	keepUnusedDataFor: 15 * 60,//15 minutes
	endpoints: (builder) => ({

		/* DOCUMENTATION */
		getDocs: builder.query({
			query: () => ({ action: ACTION.GET_DOCS }),
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
			query: (docId) => ({ action: ACTION.GET_DOC, docId: docId }),
			providesTags: (result, error, docId) => { return [{ type: TYPE.DOCS, id: docId }] },
			transformResponse: (response) => fix_datetime_single(response)
		}),

		getDocContent: builder.query({
			query: (docId) => ({ action: ACTION.GET_CONTENT, docId: docId }),
			providesTags: (result, error, docId) => [{ type: TYPE.DOCS, id: docId.concat("_content") }],
		}),

		addDoc: builder.mutation({
			query: (body) => ({ action: ACTION.ADD_DOC, body }), // body: {docItem, affectedItems<[...]>}
			invalidatesTags: (result, error, body) => {
				return [{ type: TYPE.DOCS, id: body.docItem.docId }]
			},
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(ACTION.GET_DOCS, undefined,
						(draft) => { draft.push(body.docItem) }
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		updateDoc: builder.mutation({
			query: (body) => ({ action: ACTION.UPDATE_DOC, body }), // body: {docItem, affectedItems<[...]>}
			invalidatesTags: (result, error, body) => {
				console.log("invalidatesTags", [{ type: TYPE.DOCS, id: body.docItem.docId }])
				return [{ type: TYPE.DOCS, id: body.docItem.docId }]
			},
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(ACTION.GET_DOCS, undefined,
						(draft) => {
							//Update docItem
							let obj = draft.find(e => e.docId === body.docItem.docId)
							Object.assign(obj, body.docItem)
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

		updateDocContent: builder.mutation({
			query: (body) => ({ action: ACTION.UPDATE_CONTENT, body }), //body: {docItem: object, content: { text: <string> } }
			invalidatesTags: (result, error, arg) => [{ type: TYPE.DOCS, id: arg.docItem.docId.concat("_content") }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(ACTION.GET_CONTENT, body.docItem.docId.concat("_content"),
						(draft) => { Object.assign(draft, body.content) }
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		deleteDoc: builder.mutation({
			query: (body) => ({ action: ACTION.DELETE_DOC, body }),
			invalidatesTags: [{ type: TYPE.DOCS, id: "LIST" }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(ACTION.GET_DOCS, undefined,
						(draft) => draft.filter(e => e.docId !== body.docItem.docId)
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		/* APPLICATION SETTINGS */
		getAppSettings: builder.query({
			query: () => ({ action: ACTION.GET_APPSETTINGS }),
			providesTags: [TYPE.SETTINGS],
			keepUnusedDataFor: 60 * 60,
		}),

		updateAppSettings: builder.mutation({
			query: (body) => ({ action: ACTION.UPDATE_APPSETTINGS, body }),
			invalidatesTags: [TYPE.SETTINGS],
			async onQueryStarted(newSettings, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(ACTION.GET_APPSETTINGS, undefined,
						(draft) => { Object.assign(draft, newSettings) }
					)
				)
				try { await queryFulfilled }
				catch {
					console.log("error when updating cache of AppSettings and undo")
					patchResult.undo()
				}
			},
		}),

		/* TICKET SETTINGS */
		getDepartments: builder.query({
			query: () => ({ action: ACTION.GET_DEPARTMENTS }),
			providesTags: (result) => {
				return result
					? [
						...result.map(({ did }) => ({ type: TYPE.DEPARTMENTS, id: did })),
						{ type: TYPE.DEPARTMENTS, id: "LIST" }
					]
					: [{ type: TYPE.DEPARTMENTS, id: "LIST" }]
			},
			keepUnusedDataFor: 60 * 60,
			transformResponse: (response) => fix_datetime_list(response),
		}),

		addDepartment: builder.mutation({
			query: (body) => ({ action: ACTION.ADD_DEPARTMENT, body }), // body: {...}>}
			invalidatesTags: (result, error, body) => {
				return [{ type: TYPE.DEPARTMENTS, id: body.did }]
			},
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(ACTION.GET_DEPARTMENTS, undefined,
						(draft) => { draft.push(body) }
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		updateDepartment: builder.mutation({
			query: (body) => ({ action: ACTION.UPDATE_DEPARTMENT, body }), //body: {departmentItem, affectedCannedReplies}
			invalidatesTags: (result, error, arg) => ([{ type: TYPE.DEPARTMENTS, id: arg.departmentItem.did }]),
			async onQueryStarted({ departmentItem, affectedCannedReplies }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTION.GET_DEPARTMENTS, undefined,
						(draft) => {
							let obj = draft.find(e => e.did === departmentItem.did)
							Object.assign(obj, departmentItem)
							//Update affectedItems
							affectedCannedReplies.forEach((affectedItem) => {
								let obj = draft.find(e => e.did === affectedItem.did)
								Object.assign(obj, { department: departmentItem.department })
							})
						})
				)
				try { await queryFulfilled }
				catch {
					console.log("error when updating cache of department and undo")
					patchResult.undo()
				}
			},
		}),

		deleteDepartment: builder.mutation({
			query: (body) => ({ action: ACTION.DELETE_DEPARTMENT, body }), //body: {...}
			invalidatesTags: (result, error, arg) => ([{ type: TYPE.DEPARTMENTS, id: arg.did }]),
			async onQueryStarted({ did }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTION.GET_DEPARTMENTS, undefined,
						(draft) => draft.filter(e => e.did !== did)
					)
				)
				try { await queryFulfilled }
				catch {
					console.log("error when delete cache of department and undo")
					patchResult.undo()
				}
			},
		}),

		/* CANNED REPLIES */
		getCannedReplies: builder.query({
			query: () => ({ action: ACTION.GET_CANNED_REPLIES }),
			providesTags: (result) => {
				return result
					? [
						...result.map(({ crid }) => ({ type: TYPE.CANNED_REPLIES, id: crid })),
						{ type: TYPE.CANNED_REPLIES, id: "LIST" }
					]
					: [{ type: TYPE.CANNED_REPLIES, id: "LIST" }]
			},
			keepUnusedDataFor: 60 * 60,
			transformResponse: (response) => fix_datetime_list(response),
		}),

		addCannedReply: builder.mutation({
			query: (body) => ({ action: ACTION.ADD_CANNED_REPLY, body }),
			invalidatesTags: (result, error, body) => {
				return [{ type: TYPE.CANNED_REPLIES, id: body.crid }]
			},
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(ACTION.GET_CANNED_REPLIES, undefined,
						(draft) => { draft.push(body) }
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		updateCannedReply: builder.mutation({
			query: (body) => ({ action: ACTION.UPDATE_CANNED_REPLY, body }), //body: {...}
			invalidatesTags: (result, error, arg) => ([{ type: TYPE.CANNED_REPLIES, id: arg.crid }]),
			async onQueryStarted(cannedReply, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTION.GET_CANNED_REPLIES, undefined,
						(draft) => {
							let obj = draft.find(e => e.crid === cannedReply.crid)
							Object.assign(obj, cannedReply)
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
			query: (body) => ({ action: ACTION.DELETE_CANNED_REPLY, body }), //body: {...}
			invalidatesTags: (result, error, arg) => ([{ type: TYPE.CANNED_REPLIES, id: arg.crid }]),
			async onQueryStarted({ crid }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTION.GET_CANNED_REPLIES, undefined,
						(draft) => draft.filter(e => e.crid !== crid)
					)
				)
				try { await queryFulfilled }
				catch {
					console.log("error when delete cache of canned-reply and undo")
					patchResult.undo()
				}
			},
		}),


		/* LABELS */
		getLabels: builder.query({
			query: () => ({ action: ACTION.GET_LABELS }),
			providesTags: (result) => {
				return result
					? [
						...result.map(({ lid }) => ({ type: TYPE.LABELS, id: lid })),
						{ type: TYPE.LABELS, id: "LIST" }
					]
					: [{ type: TYPE.LABELS, id: "LIST" }]
			},
			keepUnusedDataFor: 60 * 60,
			transformResponse: (response) => fix_datetime_list(response),
		}),

		addLabel: builder.mutation({
			query: (body) => ({ action: ACTION.ADD_LABEL, body }),
			invalidatesTags: (result, error, body) => {
				return [{ type: TYPE.LABELS, id: body.lid }]
			},
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(ACTION.GET_LABELS, undefined,
						(draft) => { draft.push(body) }
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		updateLabel: builder.mutation({
			query: (body) => ({ action: ACTION.UPDATE_LABEL, body }), //body: {...}
			invalidatesTags: (result, error, arg) => ([{ type: TYPE.LABELS, id: arg.lid }]),
			async onQueryStarted(label, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTION.GET_LABELS, undefined,
						(draft) => { Object.assign(draft, label) })
				)
				try { await queryFulfilled }
				catch {
					console.log("error when updating cache of label and undo")
					patchResult.undo()
				}
			},
		}),

		deleteLabel: builder.mutation({
			query: (body) => ({ action: ACTION.DELETE_LABEL, body }), //body: {...}
			invalidatesTags: (result, error, arg) => ([{ type: TYPE.LABELS, id: arg.lid }]),
			async onQueryStarted({ lid }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData(
						ACTION.GET_LABELS, undefined,
						(draft) => draft.filter(e => e.lid !== lid)
					)
				)
				try { await queryFulfilled }
				catch {
					console.log("error when delete cache of label and undo")
					patchResult.undo()
				}
			},
		}),
	}),
})

export const {
	useGetDocQuery,
	useGetDocsQuery,
	useGetDocContentQuery,
	//
	useAddDocMutation,
	useUpdateDocMutation,
	useUpdateDocContentMutation,
	useDeleteDocMutation,
	//
	useGetAppSettingsQuery,
	useUpdateAppSettingsMutation,
	//
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
} = firestoreApi
