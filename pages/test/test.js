/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import Link from "next/link"
import React, { useCallback, useState } from "react"

// MATERIAL-UI
import { Button, Grid, Typography, Box, TextField, Container } from "@mui/material"

//THIRD-PARTY
import { serverTimestamp } from "firebase/firestore"
import { useDispatch } from "react-redux"
import { forEach, groupBy, filter, sortBy, cloneDeep, uniqueId, update, findKey, omit, size } from "lodash"

//PROJECT IMPORT
import { getLayout } from "./../../layout/BlankLayout"
import ColorPicker from "./../../components/common/ColorPicker"
import { getPlainTextFromMarkDown } from "./../../helpers/utils"

//ASSETS
import { ImportIcon, ExportPdfIcon, NewDocIcon } from "./../../components/common/SvgIcons"
import { nanoid } from "nanoid"
import { DOC_TYPE } from "../../helpers/constants"
import { db } from "../../helpers/firebase"
import { doc, getDoc } from "@firebase/firestore"
import { getAllDocs } from "../../helpers/firebase/docs"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const dummy = [
	{
		id: 91,
		category: "Book 1",
		type: "CAT"
	},
	{
		id: 911,
		category: "Book 1",
		subcategory: "Chapter 1",
		type: "SUB"
	},
	{
		id: 912,
		category: "Book 1",
		subcategory: "Chapter 2",
		type: "SUB"
	},
	{
		id: 913,
		category: "Book 1",
		subcategory: "Chapter 3",
		type: "SUB"
	},
	{
		id: 92,
		category: "Book 2",
		type: "CAT"
	},
	{
		id: 921,
		category: "Book 2",
		subcategory: "Chapter 1",
		type: "SUB"
	},
	{
		id: 922,
		category: "Book 2",
		subcategory: "Chapter 2",
		type: "SUB"
	},
	{
		id: 923,
		category: "Book 2",
		subcategory: "Chapter 3",
		type: "SUB"
	},
	{
		id: 924,
		category: "Book 2",
		subcategory: "Chapter 4",
		type: "SUB"
	},
	{
		id: 1,
		category: "Book 1",
		subcategory: "Chapter 3",
		title: "Hello 13",
		content: "jf adsa dsjfjf",
		type: "ARTICLE"
	},
	{
		id: 2,
		category: "Book 2",
		subcategory: "Chapter 1",
		title: "Hello 21",
		content: "jf adsa dsjfjf",
		type: "ARTICLE"
	},
	{
		id: 3,
		category: "Book 1",
		subcategory: "Chapter 2",
		title: "Hello 12",
		content: "jf adsa dsjfjf",
		type: "ARTICLE"
	},
	{
		id: 4,
		category: "Book 2",
		subcategory: "Chapter 2",
		title: "Hello 22",
		content: "jf adsa dsjfjf",
		type: "ARTICLE"
	},
	{
		id: 5,
		category: "Book 2",
		subcategory: "Chapter 4",
		title: "Hello 1",
		content: "jf adsa dsjfjf",
		type: "ARTICLE"
	},
	{
		id: 6,
		category: "Book 1",
		subcategory: "Chapter 3",
		title: "Hello 133333333",
		content: "jf adsa dsjfjf",
		type: "ARTICLE"
	},
	{
		id: 7,
		category: "Book 2",
		subcategory: "Chapter 3",
		title: "Hello 23",
		content: "jf adsa dsjfjf",
		type: "ARTICLE"
	},
	{
		id: 8,
		category: "Book 1",
		subcategory: "Chapter 1",
		title: "Hello 11",
		content: "jf adsa dsjfjf",
		type: "ARTICLE"
	},
	{
		id: 9,
		category: "Book 1",
		subcategory: "000000",
		title: "Anotdfdfdfdfdher articdfdle",
		content: "jf adsa dfdsjfjf",
		type: "ARTICLE"
	},
	{
		id: 12,
		category: "Book 1",
		subcategory: "000000",
		title: "Another article dfdfdfdfd",
		content: "jf adsa dsjfjf",
		type: "ARTICLE"
	},
	{
		id: 13,
		category: "Book 1",
		subcategory: "000000",
		title: "Anothedd55555r article dfdfd",
		content: "jf adsa dsjfjf",
		type: "ARTICLE"
	},
	{
		id: 14,
		category: "Book 2",
		subcategory: "000000",
		title: "HHEHEHE article dfdfd",
		content: "jf adsa dsjfjf",
		type: "ARTICLE"
	},
	{
		id: 15,
		category: "Book X",
		type: "CAT"
	},
]

let sortedDummy = []
let groupByCat = {}
let groupByCatAndSub = {}
let mappingArray = []

const Initialize = () => {

	console.clear()
	const start = window.performance.now()

	//Original
	console.log("██ Original List")
	console.log(dummy)

	//Filter
	const filtered = filter(dummy, (i) => i.id === 5)
	console.log("██ get an item by id===5", filtered)

	//--Sort the list
	//just want to distinguish between original & sorted
	const newForSort = cloneDeep(dummy)
	sortedDummy = sortBy(newForSort, ["category", "subcategory", "title"])
	console.log("██ SortedList")
	console.log(sortedDummy)

	//Step 1: Group by Cat
	groupByCat = groupBy(sortedDummy, (i) => i.category)

	//Step 2: Group by SubCat
	groupByCatAndSub = forEach(groupByCat, function (value, key) {
		groupByCat[key] = groupBy(groupByCat[key], (i) => i.subcategory)
	})
	console.log("██ Group by groupByCatAndSub")
	console.log(groupByCatAndSub)


	mappingArray = Object.entries(groupByCatAndSub)
	console.log("██ mappingArray")
	console.log(mappingArray)

	const end = window.performance.now()
	console.log(`Execution time: ${end - start} ms`)

	console.log("============================================================")

	console.log("Map Cat>>", Object.entries(groupByCatAndSub["Book 1"]))

	console.log("============================================================")
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

export default function TestPage() {
	const [activeDocId, setActiveDocId] = useState("")

	const [docItemCat, setDocItemCat] = useState("")
	const [docItemSubCat, setDocItemSubCat] = useState("")
	const [docItemExternal, setDocItemExternal] = useState("")

	return (
		<Container>
			<Box sx={{ m: 5, display: "flex", justifyContent: "center" }}>
				<Button sx={{ mr: 3 }} color="primary" variant="contained" onClick={() => { Initialize() }}>
					Start over
				</Button>
				<TextField
					label="activeDocId"
					variant="outlined"
					value={activeDocId}
					onChange={(e) => setActiveDocId(e.target.value)}
				/>
			</Box>

			<Grid container spacing={2} sx={{
				"&>div>button": { mb: 2 },
				"&>div>div": { mb: 2 }
			}}>

				<Grid item xs={4} sx={{ flexDirection: "column" }}>
					<Typography variant="h1">CATEGORY</Typography>
					<Button color="primary" variant="contained" fullWidth onClick={() => {
						/* OK nhé! */
						const docId = nanoid(7)
						const incNum = uniqueId()
						groupByCatAndSub["Untitled Category " + incNum] = {
							undefined: [
								{
									id: docId,
									category: "Untitled Category " + incNum,
									type: DOC_TYPE.CATEGORY
								}
							]
						}
						console.log("New Category Added >>> groupByCatAndSub", groupByCatAndSub)
					}}>
						Add New Category
					</Button>

					<Button color="secondary" variant="contained" fullWidth onClick={() => {
						/* OK nhé! */

						//by the time user can edit Category => they are in TocSideBarDetails,
						//there, they have activeDocIdOfTocSideBarDetails, => available: docItem
						groupByCatAndSub["Book 2 modified"] = groupByCatAndSub["Book 2"]
						update(groupByCatAndSub, "[\"Book 2 modified\"].undefined[0].category", () => "Book 2 modified")
						groupByCatAndSub = omit(groupByCatAndSub, ["Book 2"])
						console.log("Updated Book2 >>> groupByCatAndSub", groupByCatAndSub)
					}}>
						Update Category
					</Button>
					<TextField
						label="docItemCat"
						variant="outlined"
						value={docItemCat}
						multiline
						fullWidth
						rows={10}
						onChange={(e) => setDocItemCat(e.target.value)}
					/>

					<Button color="warning" variant="contained" fullWidth onClick={() => {

						if (size(groupByCatAndSub["Untitled Category 1"]) > 1) {
							//in this case, show a dialog, let user choose following options:
							//1. delete this Cat and all its related data
							//2. show a list of Categories and let user choose to transfer all to that selected Category
							// => this feature will be on version 2. Now, just not allow, user must delete alll content before it can be deleted
							console.log("can not delete category")
							return null
						}

						/* ok! nhé */
						if (size(groupByCatAndSub["Untitled Category 1"]) === 1) {
							groupByCatAndSub = omit(groupByCatAndSub, ["Untitled Category 1"])
						}
						console.log("new groupByCatAndSub", groupByCatAndSub)

					}}>
						Delete Category
					</Button>


				</Grid>

				<Grid item xs={4}>
					<Typography variant="h1">SUB-CATEGORY</Typography>

					<Button color="primary" variant="contained" fullWidth onClick={() => {
						if (!activeDocId) {
							console.log("Can not determine parent category")
							return
						}

						//get parent category -> 

						// const docId = nanoid(5)
						// const incNum = uniqueId()
						// groupByCatAndSub.push(
						// 	[
						// 		"Untitled Sub-category " + incNum,
						// 		{
						// 			undefined: [
						// 				{
						// 					id: docId,
						// 					category: "Untitled Sub-category " + incNum,
						// 					type: DOC_TYPE.CATEGORY
						// 				}
						// 			]
						// 		}
						// 	]
						// )
						// console.log("New Category Added >>> groupByCatAndSub", groupByCatAndSub)
					}}>
						Add Sub-Category
					</Button>

					<Button color="secondary" variant="contained" fullWidth onClick={() => {
						// dummy.push
					}}>
						Update Sub-category
					</Button>
					<TextField
						label="docItemSubCat"
						variant="outlined"
						value={docItemSubCat}
						multiline
						fullWidth
						rows={10}
						onChange={(e) => setDocItemSubCat(e.target.value)}
					/>

					<Button color="warning" variant="contained" fullWidth onClick={() => {
						// dummy.push
					}}>
						Delete sub-category
					</Button>

				</Grid>

				<Grid item xs={4}>
					<Typography variant="h1">EXTERNAL</Typography>

					<Button color="primary" variant="contained" fullWidth onClick={() => {
						// dummy.push
					}}>
						Add External Link
					</Button>

					<Button color="secondary" variant="contained" fullWidth onClick={() => {
						// dummy.push
					}}>
						Update External Link
					</Button>
					<TextField
						label="docItemExternal"
						variant="outlined"
						value={docItemExternal}
						multiline
						fullWidth
						rows={10}
						onChange={(e) => setDocItemExternal(e.target.value)}
					/>

					<Button color="warning" variant="contained" fullWidth onClick={() => {
						// dummy.push
					}}>
						Delete External Link
					</Button>

					<Button color="error" variant="contained" fullWidth onClick={async () => {
						let res = {}
						try {
							const docSnap = await getDoc(doc(
								db,
								"documentation", "B9edkX9uEnLk5Lrk1Y8S",
								"content", "current"
							))
							if (docSnap.exists())
								res = docSnap.data()
							else
								throw new Error("WHY! can not read provided path")
						} catch (e) {
							throw new Error("Something wrong happenned when trying to get adminUser's data.")
						}
						console.log("res", res)
					}}>
						TEST GET DATA
					</Button>
				</Grid>
			</Grid>


			<Button onClick={() => {
				// const StringifyChildrenFirstCat = Object.entries(finalArray[0][1])
				// console.log("Stringify Children First Cat", StringifyChildrenFirstCat)
			}}>Stringify Children First Cat</Button>

			<Button onClick={() => {
				const res = getAllDocs()
				console.log(res)
			}}>getAllDocs</Button>

		</Container >
	)
}
