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

import {
	collection, doc, getDoc, setDoc, getDocs, deleteDoc, query, where, writeBatch, updateDoc, serverTimestamp
} from "firebase/firestore"

//THIRD-PARTY
import { createApi } from "@reduxjs/toolkit/query/react"

//PROJECT IMPORT
import { DOC_TYPE } from "./../../helpers/constants"
import { db, fix_datetime_list, fix_datetime_single } from "./../../helpers/firebase"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const DB_COLLECTION = {
	DOCUMENTATION: "documentation",
	SETTINGS: "settings"
}

const TAGS_TYPE = {
	DOCUMENTATION: "Documentation",
	USERS: "Users",
	TICKETS: "Tickets",
	LIST: "LIST",
	SETTINGS: "Settings"
}

const ACTION_TYPE = {
	/**
	 * DOCUMENTATION
	 */
	ADD: "addDoc",
	UPDATE: "updateDoc",
	UPDATE_CONTENT: "updateDocContent",
	DELETE: "deleteDoc",
	GET_DOCS: "getDocs",
	GET_DOC: "getDoc",
	GET_CONTENT: "getDocContent",
	/**
	 * APPLICATION SETTINGS
	 */
	GET_APPSETTINGS: "getAppSettings",
	UPDATE_APPSETTINGS: "updateAppSettings",
	/**
	 * TICKETS SETTINGS
	 */
	UPDATE_TICKETS_SETTINGS_DEPARTMENT: "updateTicketSettingsDepartment"
}

export const firestoreApi = createApi({
	reducerPath: "firestoreApi",
	tagTypes: [
		TAGS_TYPE.DOCUMENTATION,
		TAGS_TYPE.USERS,
		TAGS_TYPE.TICKETS,
		TAGS_TYPE.SETTINGS,
	],
	baseQuery: async (args, { signal, dispatch, getState }, extraOptions) => {

		if (typeof args === "object") {
			/**
			 * args = { action: "addDoc", body: {docItem: Object, affectedItems: <[]> }
			 */
			if (args.action === ACTION_TYPE.ADD) {
				const batch = writeBatch(db)
				try {
					batch.set(
						doc(db, DB_COLLECTION.DOCUMENTATION, args.body.docItem.docId),
						{
							...args.body.docItem,
							createdAt: serverTimestamp(),
							updatedAt: serverTimestamp()
						}
					)
					if (args.body.docItem.type === DOC_TYPE.DOC)
						batch.set(doc(db, DB_COLLECTION.DOCUMENTATION, args.body.docItem.docId, "content", "current"), { text: "" })
					await batch.commit()
					return {
						data: {
							action: ACTION_TYPE.ADD,
							id: args.body.docItem.docId,
							message: "added successfully"
						}
					}
				} catch (e) {
					return {
						error: {
							status: 200,
							data: {
								action: ACTION_TYPE.ADD,
								id: args.body.docItem.docId,
								message: e.message
							}
						}
					}
				}
			}

			/**
			 * args = { action: "updateDoc", body: {docItem: <Object>, affectedItems: <[]> }
			 */
			if (args.action === ACTION_TYPE.UPDATE) {
				if (args.body.docItem.type === DOC_TYPE.EXTERNAL || args.body.docItem.type === DOC_TYPE.DOC) {
					try {
						await updateDoc(
							doc(db, DB_COLLECTION.DOCUMENTATION, args.body.docItem.docId),
							{
								...args.body.docItem,
								updatedAt: serverTimestamp()
							}
						)

						return {
							data: {
								action: ACTION_TYPE.UPDATE,
								id: args.body.docItem.docId,
								message: "External Or Doc updated successfully"
							}
						}
					} catch (e) {
						return {
							error: {
								status: 200,
								data: {
									action: ACTION_TYPE.UPDATE,
									id: args.body.docItem.docId,
									message: e.message
								}
							}
						}
					}
				}

				if (args.body.docItem.type === DOC_TYPE.CATEGORY) {
					const batch = writeBatch(db)
					try {
						args.body.affectedItems.forEach((affectedItem) => {
							batch.update(
								doc(db, DB_COLLECTION.DOCUMENTATION, affectedItem.docId),
								{
									updatedAt: serverTimestamp(),
									...(affectedItem.type === DOC_TYPE.CATEGORY)
										? { ...args.body.docItem, updatedAt: serverTimestamp() }
										: { category: args.body.docItem.category }
								}
							)
						})
						await batch.commit()
						return {
							data: {
								action: ACTION_TYPE.UPDATE,
								id: args.body.docItem.docId,
								message: "category updated successfully"
							}
						}
					} catch (e) {
						return {
							error: {
								status: 200,
								data: {
									action: ACTION_TYPE.UPDATE,
									id: args.body.docItem.docId,
									message: e.message
								}
							}
						}
					}
				}

				if (args.body.docItem.type === DOC_TYPE.SUBCATEGORY) {
					const batch = writeBatch(db)
					try {

						args.body.affectedItems.forEach((affectedItem) => {
							batch.update(
								doc(db, DB_COLLECTION.DOCUMENTATION, affectedItem.docId),
								{
									updatedAt: serverTimestamp(),
									...(affectedItem.type === DOC_TYPE.SUBCATEGORY)
										? { ...args.body.docItem, updatedAt: serverTimestamp() }
										: { subcategory: args.body.docItem.subcategory }
								}
							)
						})
						await batch.commit()
						return {
							data: {
								action: ACTION_TYPE.UPDATE,
								id: args.body.docItem.docId,
								message: "SubCategory updated successfully"
							}
						}
					} catch (e) {
						return {
							error: {
								status: 200,
								data: {
									action: ACTION_TYPE.UPDATE,
									id: args.body.docItem.docId,
									message: e.message
								}
							}
						}
					}
				}
			}

			/**
			 * args = { action: "updateDocContent", body: {docItem: object, content: string} }
			 * this action will update at 2 locations: 
			 * 		1. content
			 * 		2. updatedBy
			 */
			if (args.action === ACTION_TYPE.UPDATE_CONTENT) {
				const batch = writeBatch(db)
				try {
					batch.update(
						doc(db, DB_COLLECTION.DOCUMENTATION, args.body.docItem.docId, "content", "current"),
						args.body.content
					)
					batch.update(
						doc(db, DB_COLLECTION.DOCUMENTATION, args.body.docItem.docId),
						{ updatedBy: args.body.docItem.updatedBy }
					)
					await batch.commit()

					return {
						data: {
							action: ACTION_TYPE.UPDATE_CONTENT,
							id: args.body.docItem.docId,
							message: "DocContent updated successfully"
						}
					}
				} catch (e) {
					return {
						error: {
							status: 200,
							data: {
								action: ACTION_TYPE.UPDATE_CONTENT,
								id: args.body.docItem.docId,
								message: e.message
							}
						}
					}
				}
			}

			/**
			 * args = { action: "deleteDoc", body: { docItem: <Object> } }
			 */
			if (args.action === ACTION_TYPE.DELETE) {
				if (args.body.docItem.type === DOC_TYPE.EXTERNAL) {
					try {
						await deleteDoc(doc(db, DB_COLLECTION.DOCUMENTATION, args.body.docItem.docId))
						return {
							data: {
								action: ACTION_TYPE.DELETE,
								id: args.body.docItem.docId,
								message: "External Link deleted successfully"
							}
						}
					} catch (e) {
						return {
							error: {
								status: 200,
								data: {
									action: ACTION_TYPE.DELETE,
									id: args.body.docItem.docId,
									message: e.message
								}
							}
						}
					}
				}

				if (args.body.docItem.type === DOC_TYPE.DOC) {
					try {
						await deleteDoc(doc(db, DB_COLLECTION.DOCUMENTATION, args.body.docItem.docId, "content", "current"))
						await deleteDoc(doc(db, DB_COLLECTION.DOCUMENTATION, args.body.docItem.docId))
						return {
							data: {
								action: ACTION_TYPE.DELETE,
								id: args.body.docItem.docId,
								message: "Doc deleted successfully"
							}
						}
					} catch (e) {
						return {
							error: {
								status: 200,
								data: {
									action: ACTION_TYPE.DELETE,
									id: args.body.docItem.docId,
									message: e.message
								}
							}
						}
					}
				}

				if (args.body.docItem.type === DOC_TYPE.CATEGORY) {
					try {
						//query to check if category is empty or not
						//We need to check directly because deleting is serious,
						//if anything wrong, this would be unrecoverable.
						const q = query(
							collection(db, DB_COLLECTION.DOCUMENTATION),
							where("category", "==", args.body.docItem.category)
						)
						const querySnapshot = await getDocs(q)
						//Only delete category when it is empty
						if (querySnapshot.docs.length === 1) {
							await deleteDoc(doc(db, DB_COLLECTION.DOCUMENTATION, args.body.docItem.docId))
							return {
								data: {
									action: ACTION_TYPE.DELETE,
									id: args.body.docItem.docId,
									message: "Category deleted successfully"
								}
							}
						}
						//if the code reach here, means... can not delete selected item
						return {
							error: {
								status: 200,
								data: {
									action: ACTION_TYPE.DELETE,
									id: args.body.docItem.docId,
									message: "You can only delete empty category!"
								}
							}
						}
					} catch (e) {
						return {
							error: {
								status: 200,
								data: {
									action: ACTION_TYPE.DELETE,
									id: args.body.docItem.docId,
									message: e.message
								}
							}
						}
					}
				}

				if (args.body.docItem.type === DOC_TYPE.SUBCATEGORY) {
					try {
						//query to check if sub-category is empty or not
						//We need to check directly because deleting is serious,
						//if anything wrong, this would be unrecoverable.

						const q = query(
							collection(db, DB_COLLECTION.DOCUMENTATION),
							where("category", "==", args.body.docItem.category),
							where("subcategory", "==", args.body.docItem.subcategory)
						)
						const querySnapshot = await getDocs(q)
						//Only delete category when it is empty

						if (querySnapshot.docs.length === 1) {
							await deleteDoc(doc(db, DB_COLLECTION.DOCUMENTATION, args.body.docItem.docId))
							return {
								data: {
									action: ACTION_TYPE.DELETE,
									id: args.body.docItem.docId,
									message: "SubCategory deleted successfully"
								}
							}
						}
						//if the code reach here, means... can not delete selected item
						return {
							error: {
								status: 200,
								data: {
									action: ACTION_TYPE.DELETE,
									id: args.body.docItem.docId,
									message: "You can only delete empty sub-category!"
								}
							}
						}
					} catch (e) {
						return {
							error: {
								status: 200,
								data: {
									action: ACTION_TYPE.DELETE,
									id: args.body.docItem.docId,
									message: e.message
								}
							}
						}
					}
				}
			}

			/**
			 * args = { action: "updateAppSettings", body: {...} }
			 */
			if (args.action === ACTION_TYPE.UPDATE_APPSETTINGS) {
				try {
					await setDoc(
						doc(db, DB_COLLECTION.SETTINGS, "settings"),
						{ ...args.body },
						{ merge: true }
					)
					return {
						data: {
							action: ACTION_TYPE.UPDATE_APPSETTINGS,
							message: "Settings updated successfully"
						}
					}
				} catch (e) {
					return {
						error: {
							status: 200,
							data: {
								action: ACTION_TYPE.UPDATE_APPSETTINGS,
								message: e.message
							}
						}
					}
				}
			}

			return { data: ["Ops, it seems you set wrong action key"] }
		}

		//get all settings
		if (args === ACTION_TYPE.GET_APPSETTINGS) {
			let settings = {}
			try {
				const docSnap = await getDoc(doc(db, DB_COLLECTION.SETTINGS, "settings"))
				if (docSnap.exists()) settings = docSnap.data()
				return { data: settings }
			} catch (e) {
				return {
					error: {
						status: 200,
						data: {
							action: ACTION_TYPE.GET_DOC,
							message: e.message
						}
					}
				}
			}
		}

		//get all documents
		if (args === ACTION_TYPE.GET_DOCS) {
			try {
				let all = []
				const querySnapshot = await getDocs(collection(db, DB_COLLECTION.DOCUMENTATION))
				console.log("Real query")
				querySnapshot.forEach((doc) => {
					all.push(doc.data())
				})

				return { data: all }
			} catch (e) {
				return {
					error: {
						status: 200,
						data: {
							action: ACTION_TYPE.GET_DOCS,
							message: e.message
						}
					}
				}
			}
		}

		const argsArray = args.split("/")

		//get document's meta
		if (argsArray[1] === "meta") {
			let docItem = {}
			try {
				const docSnap = await getDoc(doc(db, DB_COLLECTION.DOCUMENTATION, argsArray[0]))
				console.log("just get data from Firebase - getDoc")
				if (docSnap.exists()) docItem = docSnap.data()
				return { data: docItem }
			} catch (e) {
				return {
					error: {
						status: 200,
						data: {
							action: ACTION_TYPE.GET_DOC,
							message: e.message
						}
					}
				}
			}
		}

		//get content of provided document @ `doc(db, "documentation", args, "content", "current")`
		if (argsArray[1] === "content") {
			let docItemContent = ""
			try {
				const docSnap = await getDoc(doc(db, DB_COLLECTION.DOCUMENTATION, argsArray[0], "content", "current"))
				if (docSnap.exists()) docItemContent = docSnap.data()//.text
				console.log({ docItemContent })
				return { data: docItemContent }
			} catch (e) {
				return {
					error: {
						status: 200,
						data: {
							action: ACTION_TYPE.GET_CONTENT,
							message: e.message
						}
					}
				}
			}
		}
	},
	endpoints: (builder) => ({
		/**************************************************************
		 * DOCUMENTATION
		 **************************************************************/
		getDocs: builder.query({
			query: () => ACTION_TYPE.GET_DOCS,
			providesTags: (result) => {
				return result ?
					[
						...result.map(({ docId }) => ({ type: TAGS_TYPE.DOCUMENTATION, id: docId })),
						{ type: TAGS_TYPE.DOCUMENTATION, id: TAGS_TYPE.LIST }
					]
					:
					[{ type: TAGS_TYPE.DOCUMENTATION, id: TAGS_TYPE.LIST }]
			},
			transformResponse: (response) => fix_datetime_list(response),
			keepUnusedDataFor: 15 * 60,		//15 minutes
		}),

		getDoc: builder.query({
			query: (docId) => `${docId}/meta`,
			providesTags: (result, error, docId) => {
				return [{ type: TAGS_TYPE.DOCUMENTATION, id: docId }]
			},
			transformResponse: (response) => fix_datetime_single(response),
			keepUnusedDataFor: 15 * 60,
		}),

		getDocContent: builder.query({
			query: (docId) => `${docId}/content`,
			providesTags: (result, error, docId) => [{ type: TAGS_TYPE.DOCUMENTATION, id: docId.concat("_content") }],
			keepUnusedDataFor: 15 * 60,
		}),

		/**
		 * body -> (docItem, affectedItems<[...]>)
		 */
		addDoc: builder.mutation({
			query: (body) => ({
				action: ACTION_TYPE.ADD,
				body
			}),
			invalidatesTags: (result, error, body) => {
				return [{ type: TAGS_TYPE.DOCUMENTATION, id: body.docItem.docId }]
			},
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData("getDocs", undefined,
						(draft) => { draft.push(body.docItem) }
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		/**
		 * body -> (docItem, affectedItems<[...]>)
		 */
		updateDoc: builder.mutation({
			query: (body) => ({ action: ACTION_TYPE.UPDATE, body }),
			invalidatesTags: (result, error, body) => {
				console.log("invalidatesTags", [{ type: TAGS_TYPE.DOCUMENTATION, id: body.docItem.docId }])
				return [{ type: TAGS_TYPE.DOCUMENTATION, id: body.docItem.docId }]
			},
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData("getDocs", undefined,
						(draft) => {
							//TODO! đây chỉ là mới edit bản thân docItem, chưa check và xử lý affectedItems
							let obj = draft.find(e => e.docId === body.docItem.docId)
							Object.assign(obj, body.docItem)
						}
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		/**
		 * body -> {docItem: object, content: { text: string } }
		 */
		updateDocContent: builder.mutation({
			query: (body) => ({ action: ACTION_TYPE.UPDATE_CONTENT, body }),
			invalidatesTags: (result, error, arg) => [{ type: TAGS_TYPE.DOCUMENTATION, id: arg.docItem.docId.concat("_content") }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData("getDocContent", body.docItem.docId.concat("_content"),
						(draft) => { Object.assign(draft, body.content) }
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		deleteDoc: builder.mutation({
			query: (body) => ({ action: ACTION_TYPE.DELETE, body }),
			invalidatesTags: [{ type: TAGS_TYPE.DOCUMENTATION, id: TAGS_TYPE.LIST }],
			async onQueryStarted(body, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData("getDocs", undefined,
						(draft) => draft.filter(e => e.docId !== body.docItem.docId)
					)
				)
				try { await queryFulfilled }
				catch { patchResult.undo() }
			},
		}),

		/**************************************************************
		 * APPLICATION SETTINGS
		 **************************************************************/
		getAppSettings: builder.query({
			query: () => "getAppSettings",
			providesTags: () => {
				console.log([TAGS_TYPE.SETTINGS])
				return [TAGS_TYPE.SETTINGS]
			},
			keepUnusedDataFor: 60 * 60, // 60 minutes
		}),
		/**
		* body -> ({...}) <= object of settings
		*/
		updateAppSettings: builder.mutation({
			query: (body) => ({ action: ACTION_TYPE.UPDATE_APPSETTINGS, body }),
			invalidatesTags: () => {
				console.log([TAGS_TYPE.SETTINGS])
				return [TAGS_TYPE.SETTINGS]
			},
			async onQueryStarted(newSettings, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData("getAppSettings", undefined,
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

		/**
		 * 
		 */
		getTicketSettingsDepartments: builder.query({
			query: () => "getTicketSettingsDepartments",
			providesTags: (result) => {
				const t = result
					? [
						...result.map(({ id }) => ({ type: TAGS_TYPE.SETTINGS, id: id })),
						{ type: TAGS_TYPE.SETTINGS, id: TAGS_TYPE.LIST }
					]
					: [{ type: TAGS_TYPE.SETTINGS, id: TAGS_TYPE.LIST }]
				console.log(t)
				return t
			},
			keepUnusedDataFor: 60 * 60, // 60 minutes
		}),
		/**
		* body -> ({...}) <= object of settings
		*/
		updateTicketSettingsDepartment: builder.mutation({
			query: (body) => ({ action: ACTION_TYPE.UPDATE_TICKETS_SETTINGS_DEPARTMENT, body }),
			invalidatesTags: (result, error, arg) => {
				console.log([{ type: TAGS_TYPE.SETTINGS, id: arg.id }])
				return [{ type: TAGS_TYPE.SETTINGS, id: arg.id }]
			},
			async onQueryStarted(newSettings, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					firestoreApi.util.updateQueryData("getTicketSettingsDepartments", undefined, (draft) => {
						Object.assign(draft, newSettings)
						console.log("update TicketSettingsDepartments Cache")
					})
				)
				try { await queryFulfilled }
				catch {
					console.log("error when updating cache of TicketSettingsDepartments and undo")
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
	useAddDocMutation,
	useUpdateDocMutation,
	useUpdateDocContentMutation,
	useDeleteDocMutation,
	//
	useGetAppSettingsQuery,
	useUpdateAppSettingsMutation,
	//

} = firestoreApi
