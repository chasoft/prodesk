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

import React, { useState } from "react"
import {
	collection, doc, getDoc, getDocs, deleteDoc, query, where, writeBatch, updateDoc, serverTimestamp
} from "firebase/firestore"
import Head from "next/head"
import { Button, CircularProgress, TextField } from "@mui/material"

//THIRD-PARTY
import { forEach, groupBy, filter, sortBy, cloneDeep, uniqueId, update, findKey, omit, size } from "lodash"
import { batch as reduxBatch, useDispatch } from "react-redux"
import { nanoid } from "nanoid"

//PROJECT IMPORT
import { useGetDocsQuery, useGetDocQuery, useAddDocMutation } from "../../redux/slices/firestoreApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const AllDocs = React.memo(function AllDocs() {
	const allDocs = useGetDocsQuery(undefined)
	return (
		<>
			{
				allDocs.error ? (
					<>Oh no, there was an error</>
				) : allDocs.isLoading ? (
					<><CircularProgress /></>
				) : allDocs.data ? (
					<>
						{allDocs.data.map(item => <p key={item.docId}>{item.docId}</p>)}
					</>
				) : null
			}
		</>
	)
})

const App = React.memo(function App() {
	// Using a query hook automatically fetches data and returns query values
	const [id, setId] = useState("")
	const [addDoc, { isLoading, data }] = useAddDocMutation()

	const aDoc = useGetDocQuery(id)

	// const singleDoc = useGetDocQuery("QGw9TeS")
	// Individual hooks are also accessible under the generated endpoints:
	// const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

	return (
		<div className="App">

			<Head>
				<title>TEST PAGE</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>

			<AllDocs />

			<div style={{ backgroundColor: "grey", padding: "50px" }}>
				{/* {singleDoc.data ? <>{JSON.stringify(singleDoc.data, 0, 2)}</> : <p>Empty</p>} */}
			</div>

			<Button onClick={
				async () => {
					try {
						await addDoc({ docItem: { docId: "54444" + nanoid(), category: "BOOK" } }).unwrap()
						// setPost(initialValue)
					} catch {
						console.log("error in addDoc")
					}
				}
			}>AddDoc</Button>
			{data ? JSON.stringify(data) : ""}



			<TextField
				value={id}
				onChange={(e) => setId(e.target.value)}
			/>
			{JSON.stringify(aDoc.data)}
		</div>
	)
})

export default App