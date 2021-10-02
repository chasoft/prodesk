/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import Link from "next/link"
import React, { useCallback, useState } from "react"

// MATERIAL-UI
import Box from "@mui/material/Box"
import { Button } from "@mui/material"

//THIRD-PARTY
import { useDispatch } from "react-redux"
import { forEach, groupBy, filter, sortBy, cloneDeep } from "lodash"

//PROJECT IMPORT
import { getLayout } from "./../../layout/BlankLayout"
import ColorPicker from "./../../components/common/ColorPicker"
import { getPlainTextFromMarkDown } from "./../../helpers/utils"

//ASSETS
import { ImportIcon, ExportPdfIcon, NewArticleIcon } from "./../../components/common/SvgIcons"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const activeId = 3

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
		subcategory: "Chapter 3",
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
]

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

export default function TestPage() {

	const anAction = useCallback(() => {

		console.clear()
		const start = window.performance.now()

		//Original
		console.log("Original List", dummy)

		//Get the activeItem based on activeId
		const activeItem = filter(dummy, (i) => i.id === activeId)
		console.log("activeItem", activeItem)

		//--Sort the list
		//just want to distinguish between original & sorted
		const newForSort = cloneDeep(dummy)
		const sortedDummy = sortBy(newForSort, ["category", "subcategory", "title"])
		console.log("SortedList", sortedDummy)

		//Step 1: Group by Cat
		const groupByCat = groupBy(sortedDummy, (i) => i.category)

		//Step 2: Group by SubCat
		const groupByCatAndSub = forEach(groupByCat, function (value, key) {
			groupByCat[key] = groupBy(groupByCat[key], (i) => i.subcategory)
		})
		console.log("Group by groupByCatAndSub", groupByCatAndSub)


		const finalArray = Object.entries(groupByCatAndSub)
		console.log("finalArray", finalArray)


		/*******/

		const a = Object.entries(finalArray[0][1])

		console.log("a", a)


		const end = window.performance.now()
		console.log(`Execution time: ${end - start} ms`)

	}, [])

	return (
		<div style={{ position: "absolute", top: "100px", left: "200px" }}>

			<Button onClick={() => {
				anAction()
			}}>
				Do Now
			</Button>


			<Button onClick={() => {
				dummy.push
			}}>
				Do Now
			</Button>

		</div>
	)
}
