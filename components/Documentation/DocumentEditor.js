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

import React, { useEffect, useRef } from "react"

// MATERIAL-UI
import { Box, InputBase, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { random, trim } from "lodash"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import TextEditor from "@components/common/TextEditor"
import DocumentTemplate from "@components/Documentation/DocumentTemplate"
import { CircularProgressBox } from "@components/common"

import useGetDoc from "@helpers/useGetDocs"
import useLocalComponentCache from "@helpers/useLocalComponentCache"

import {
	DATE_FORMAT,
} from "@helpers/constants"

import {
	getAuth,
	getDocsCenter,
	getTextEditor
} from "@redux/selectors"

import {
	setEditorData,
	setEditorDefaultData,
	setEditorDataHeadings
} from "@redux/slices/textEditor"

import {
	useGetDocContentQuery,
	useUpdateDocMutation,
	useUpdateDocContentMutation,
} from "@redux/slices/firestoreApi"

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
	const {
		data: docItem,
		isLoading: isLoadingDocItem
	} = useGetDoc(activeDocId)

	const {
		data: docItemContent = {},
		isLoading: isLoadingDocItemContent
	} = useGetDocContentQuery(activeDocId)
	//
	const { editorData, editorDefaultData } = useSelector(getTextEditor)

	const {
		localCache,
		handlers: { setLocalCache }
	} = useLocalComponentCache({
		title: docItem?.title,
		description: docItem?.description
	})

	/*
		Effect, to update status of mounted controls
	*/

	useEffect(() => {
		const text = (docItemContent?.text ?? "") + " ".repeat(random(20))
		reduxBatch(() => {
			dispatch(setEditorData(text))
			dispatch(setEditorDefaultData(text))
		})
	}, [dispatch, docItemContent?.text])

	useEffect(() => {
		const headings = editorRef?.current?.getHeadings() ?? []
		dispatch(setEditorDataHeadings(headings))
	}, [dispatch, editorData])

	if (docItem === undefined) return null

	dayjs.extend(relativeTime)

	const isEmptyContent = !trim(editorData) || trim(editorData) === "\\"

	//fix bug
	// if (prevActiveDocId !== activeDocId) {
	// 	const text = docItemContent?.data + " ".repeat(random(20))
	// 	reduxBatch(() => {
	// 		dispatch(setEditorData(text))
	// 		dispatch(setEditorDefaultData(text))
	// 	})
	// }

	const handleUpdateTitleOnBlur = async () => {
		if (localCache.title !== docItem.title) {
			const newDocMeta = {
				docId: docItem.docId,	//must be included
				title: localCache.title,
				updatedBy: currentUser.username,
			}
			await updateDoc({
				docItem: newDocMeta,
				affectedItems: []
			})
		}
	}

	const handleUpdateDescriptionOnBlur = async () => {
		if (localCache.description !== docItem.description) {
			const newDocMeta = {
				docId: docItem.docId,	//must be included
				description: localCache.description,
				updatedBy: currentUser.username,
			}
			await updateDoc({
				docItem: newDocMeta,
				affectedItems: []
			})
		}
	}

	const handleUpdateContentOnBlur = async () => {
		/*******************************
		 * TODO: !! Bug here
		 * khi đang ở Editor, xóa trắng, sau đó click vào nút template thì 
		 * ứng dụng sẽ 1. save data rỗng (vì onBlur)... v.v. sau đó mới apply data mới từ Template
		 * như vậy, 1 thao tác mà 2 hành động, rất là không hợp lý và trùng lặp.
		 */
		if (trim(editorData) !== trim(docItemContent.text)) {
			await updateDocContent({
				docId: docItem.docId,
				updatedBy: currentUser.username,
				content: { text: editorData }
			})
		}
	}

	return (
		<Box id="DocumentEditor" sx={{
			display: "flex",
			flexDirection: "column",
			backgroundColor: "#FFF",
			flexGrow: 1,
			px: 5, py: 4,
			zIndex: 10
		}}>
			<InputBase
				id="doc-title" placeholder="Page title" variant="outlined"
				value={localCache.title}
				onChange={(e) => setLocalCache(e.target.value, "title")}
				sx={{
					fontSize: { xs: "1.5rem", md: "1.75rem" },
					lineHeight: "2rem", fontWeight: "bold",
					color: "grey.800"
				}}
				onBlur={handleUpdateTitleOnBlur}
			/>

			{/* {Max 200 characters} */}
			<InputBase
				id="doc-description"
				variant="outlined"
				placeholder="Page description (optional)"
				value={localCache.description}
				onChange={(e) => setLocalCache(e.target.value, "description")}
				multiline={true}
				sx={{
					fontSize: "1rem",
					fontWeight: "500",
					lineHeight: "2rem"
				}}
				onBlur={handleUpdateDescriptionOnBlur}
			/>

			<Box id="doc-content" sx={{
				my: 2,
				borderTop: "1px solid transparent",
				borderColor: "divider"
			}} />

			{isLoadingDocItemContent || isLoadingDocItem
				? <CircularProgressBox />
				: <>
					<TextEditor
						ref={editorRef}
						value={editorDefaultData ?? ""}
						placeholder="Enter your content here..."
						onBlur={handleUpdateContentOnBlur}
					/>

					{!isEmptyContent &&
						<Typography sx={{
							pt: 12,
							fontSize: "0.8rem",
							color: "text.secondary",
							marginTop: "auto"
						}}>
							Created at {dayjs(docItem.createdAt).format(DATE_FORMAT.LONG)} by {docItem.createdBy}
							{(docItem.createdAt !== docItem.updatedAt) &&
								<span style={{ display: "block" }}>
									Updated at {dayjs(docItem.createdAt).format(DATE_FORMAT.LONG)} by {docItem.updatedBy}&nbsp;
									<span style={{ fontStyle: "italic" }}>({dayjs(docItem.updatedAt).fromNow()})</span>
								</span>}
						</Typography>}
				</>}

			{isEmptyContent && <DocumentTemplate />}

		</Box>
	)
}

export default DocumentEditor