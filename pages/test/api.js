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
import { forEach, groupBy, filter, sortBy, cloneDeep, uniqueId, update, findKey, omit, size } from "lodash"
import { batch as reduxBatch, useDispatch } from "react-redux"

//PROJECT IMPORT
import { useGetDocsQuery, useGetDocQuery } from "../../redux/slices/firestoreApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export default function App() {
	// Using a query hook automatically fetches data and returns query values
	const allDocs = useGetDocsQuery()
	const singleDoc = useGetDocQuery("XzCYu74")
	// Individual hooks are also accessible under the generated endpoints:
	// const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

	return (
		<div className="App">
			{allDocs.error ? (
				<>Oh no, there was an error</>
			) : allDocs.isLoading ? (
				<>Loading...</>
			) : allDocs.data ? (
				<>
					{JSON.stringify(allDocs.data, 0, 2)}
				</>
			) : null}

			<div style={{ backgroundColor: "red" }}>
				{singleDoc.data ? <>{JSON.stringify(singleDoc.data, 0, 2)}</> : <p>Empty</p>}
			</div>
		</div>
	)
}