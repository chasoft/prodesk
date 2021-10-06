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
import { setDocsListRaw, setDocsList } from "./docsCenter"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const storageApi = createApi({
	reducerPath: "storageApi",
	tagTypes: ["uploads"],
	baseQuery: (args, { signal, dispatch, getState }, extraOptions) => {
		// if (args === "allDocs") {
		// 	console.log("aaaaaaaaaaaaaaaaaaaaa")
		// 	return { data: [{ hello: "ALL__World" }] }
		// }

		// console.log("only single")
		return { data: [{ hello: "world" }] }
	},
	endpoints: (builder) => ({
		uploadImage: builder.query({
			query: () => "allDocs",
			providesTags: () => [{ type: "Documentation", id: "allDocs" }],
			// transformResponse: (response) => {
			// 	response[0].hello = "world0"
			// }
		}),
	}),
})

export const { useGetDocsQuery, useGetDocQuery } = storageApi
