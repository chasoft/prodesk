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

import React from "react"
import {
	collection, doc, getDoc, getDocs, deleteDoc, query, where, writeBatch, updateDoc, serverTimestamp
} from "firebase/firestore"

//THIRD-PARTY
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { forEach, groupBy, filter, sortBy, cloneDeep, uniqueId, update, findKey, omit, size } from "lodash"
import { batch as reduxBatch, useDispatch } from "react-redux"

//PROJECT IMPORT
import { db, fixDate } from "./../../helpers/firebase"
import { DOC_TYPE } from "./../../helpers/constants"
import { setIsDocsListEmpty, setDocsList } from "./docsCenter"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const firestoreApi = createApi({
	reducerPath: "firestoreApi",
	tagTypes: ["Documentation", "Users", "Tickets", "Settings"],
	baseQuery: async (args, { signal, dispatch, getState }, extraOptions) => {

		if (args === "getDocs")
			try {
				let all = []
				const querySnapshot = await getDocs(collection(db, "documentation"))
				querySnapshot.forEach((doc) => {
					all.push(doc.data())
				})
				return { data: all }
			} catch (e) {
				return { error: e.message, data: [] }
			}

		/*
			get content of provided document @ `doc(db, "documentation", args, "content", "current")`
		*/
		let docItemContent = ""
		try {
			const docSnap = await getDoc(doc(db, "documentation", args, "content", "current"))
			if (docSnap.exists()) docItemContent = docSnap.data().text
			return { data: docItemContent }
		} catch (e) {
			return { error: e.message, data: [] }
		}
	},
	endpoints: (builder) => ({
		getDocs: builder.query({
			query: () => "getDocs",
			providesTags: (result) =>
				result
					? [...result.map(({ docId }) => ({ type: "Documentation", id: docId })), "Documentation"]
					: ["Documentation"],
			transformResponse: (response) => fixDate(response),
			keepUnusedDataFor: 15 * 60,		//15 minutes
			async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
				const { data } = await cacheDataLoaded

				//sort the list first
				const sortedDocs = sortBy(data, ["category", "subcategory", "title"])
				//step 1: group by cat
				const groupByCat = groupBy(sortedDocs, (i) => i.category)
				//step 2: group by SubCat
				const groupByCatAndSub = forEach(groupByCat, function (value, key) {
					groupByCat[key] = groupBy(groupByCat[key], (i) => i.subcategory)
				})

				dispatch(setDocsList(Object.entries(groupByCatAndSub)))
				dispatch(setIsDocsListEmpty(data.length === 0))
			},
		}),
		getDoc: builder.query({
			query: (docId) => docId,
			providesTags: (result, error, id) => [{ type: "Documentation", id }],
			keepUnusedDataFor: 15 * 60,
		}),
		// addDoc: builder.mutation({
		// 	query: (body) => ({
		// 		url: "posts",
		// 		method: "POST",
		// 		body,
		// 	}),
		// 	invalidatesTags: [{ type: "Posts" }],
		// }),
	}),
})

export const { useGetDocsQuery, useGetDocQuery } = firestoreApi
