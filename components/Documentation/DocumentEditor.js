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

import React, { useEffect, useRef, useState } from "react"

// MATERIAL-UI
import { Box, CircularProgress, InputBase } from "@mui/material"

//THIRD-PARTY
import { random, trim } from "lodash"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import TextEditor from "./../common/TextEditor"
import DocumentTemplate from "./DocumentTemplate"
import { getAuth, getDocsCenter, getTextEditor } from "./../../redux/selectors"
import { setEditorData, setEditorDefaultData, setEditorDataHeadings } from "./../../redux/slices/textEditor"
import { useGetDocContentQuery, useGetDocsQuery, useUpdateDocContentMutation, useUpdateDocMutation } from "./../../redux/slices/firestoreApi"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const DocumentEditor = () => {
	/*
		Prepare all necessary variables 
	*/
	const dispatch = useDispatch()
	const editorRef = useRef(null)
	//
	const [updateDoc] = useUpdateDocMutation()
	const [updateDocContent] = useUpdateDocContentMutation()
	// Current document
	const { currentUser } = useSelector(getAuth)
	const { activeDocId } = useSelector(getDocsCenter)
	// Get all required data from database
	const { docItem } = useGetDocsQuery(undefined, {
		selectFromResult: ({ data }) => ({
			docItem: data?.find((post) => post.docId === activeDocId) ?? {},
		})
	})
	const docItemContent = useGetDocContentQuery(activeDocId)
	//
	const { editorData, editorDefaultData } = useSelector(getTextEditor)
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")

	/*
		Effect, to update status of mounted controls
	*/

	useEffect(() => {
		setTitle(docItem.title)
		setDescription(docItem.description)
	}, [docItem.title, docItem.description, activeDocId])

	useEffect(() => {
		const text = docItemContent?.data?.text + " ".repeat(random(20))
		reduxBatch(() => {
			dispatch(setEditorData(text))
			dispatch(setEditorDefaultData(text))
		})
	}, [dispatch, docItemContent?.data?.text])

	useEffect(() => {
		const headings = editorRef?.current?.getHeadings() ?? []
		dispatch(setEditorDataHeadings(headings))
	}, [dispatch, editorData])

	if (docItem === undefined) return null

	//fix bug
	// if (prevActiveDocId !== activeDocId) {
	// 	const text = docItemContent?.data + " ".repeat(random(20))
	// 	reduxBatch(() => {
	// 		dispatch(setEditorData(text))
	// 		dispatch(setEditorDefaultData(text))
	// 	})
	// }

	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			backgroundColor: "#FFF",
			flexGrow: 1,
			px: 5, py: 4,
			zIndex: 10
		}}>
			<InputBase
				id="doc-title" placeholder="Page title" variant="outlined"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				sx={{
					fontSize: { xs: "1.5rem", md: "1.75rem" },
					lineHeight: "2rem", fontWeight: "bold",
					color: "grey.800"
				}}
				onBlur={() => {
					if (title !== docItem.title) {
						const newDocMeta = {
							docId: docItem.docId,	//must be included
							type: docItem.type,		//must be included
							title: title,
							updatedBy: currentUser.username,
						}
						updateDoc({
							docItem: newDocMeta,
							affectedItems: [/* no affectedItems! */]
						})
						console.log("onBlur->Title")
					}
				}}
			/>

			{/* {Max 200 characters} */}
			<InputBase
				id="doc-title" placeholder="Page description (optional)" variant="outlined"
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				multiline={true}
				sx={{
					fontSize: "1rem", fontWeight: "bold",
					lineHeight: "2rem"
				}}
				onBlur={() => {
					if (description !== docItem.description) {
						const newDocMeta = {
							docId: docItem.docId,	//must be included
							type: docItem.type,		//must be included
							description: description,
							updatedBy: currentUser.username,
						}
						updateDoc({
							docItem: newDocMeta,
							affectedItems: [/* no affectedItems! */]
						})
					}
				}}
			/>

			<Box sx={{
				my: 2,
				borderTop: "1px solid transparent",
				borderColor: "divider"
			}} />

			{docItemContent.isLoading
				? <Box sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					minHeight: "200px"
				}}>
					<CircularProgress />
				</Box>
				: <TextEditor
					ref={editorRef}
					value={editorDefaultData}
					placeholder="Enter your content here..."
					onBlur={() => {
						/*******************************
						 * TODO: !! Bug here
						 * khi đang ở Editor, xóa trắng, sau đó click vào nút template thì 
						 * ứng dụng sẽ 1. save data rỗng (vì onBlur)... v.v. sau đó mới apply data mới từ Template
						 * như vậy, 1 thao tác mà 2 hành động, rất là không hợp lý và trùng lặp.
						 */
						if (trim(editorData) !== trim(docItemContent.data.text)) {
							const newDocMeta = {
								docId: docItem.docId,	//must be included
								updatedBy: currentUser.username,
							}
							updateDocContent({
								docItem: newDocMeta,
								content: { text: editorData }
							})

							console.log("Updated doc's content", editorData)
						}
					}}
				/>}

			{(!trim(editorData) || trim(editorData) === "\\")
				&& <DocumentTemplate />}

		</Box>
	)
}

export default DocumentEditor