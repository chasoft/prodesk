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

import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Box, InputBase, Typography } from "@mui/material"

//THIRD-PARTY
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"
import { isEqual, random, trim } from "lodash"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import slugify from "react-slugify"

//PROJECT IMPORT
import { CircularProgressBox } from "@components/common"
import { useGetDoc } from "@helpers/useGetDocs"
import DocumentTemplate from "@components/Documentation/DocumentTemplate"
import TextEditor from "@components/common/TextEditor"
import useUpdateLinkedMenuItem from "@components/Settings/MenuSettings/useUpdateLinkedMenuItem"
import useAppSettings from "@helpers/useAppSettings"

import {
	DATE_FORMAT,
	EMPTY,
	SETTINGS_NAME
} from "@helpers/constants"

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

function DocTitle({ docId, title }) {
	const [localTitle, setLocalTitle] = useState(title)
	const [updateDoc] = useUpdateDocMutation()
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)

	const {
		data: autoGenerateSlugFromTitle
	} = useAppSettings(SETTINGS_NAME.autoGenerateSlugFromTitle)

	const {
		updateLinkedMenuItem,
		// isLoading: isLoadingUseUpdateMenuLabel
	} = useUpdateLinkedMenuItem()

	useEffect(() => {
		setLocalTitle(title)
	}, [title])

	const handleUpdateTitleOnBlur = async () => {
		if (localTitle !== title) {
			const newDocMeta = {
				docId: docId,
				title: localTitle,
				updatedBy: currentUser.username,
			}
			await updateDoc({
				docItem: newDocMeta,
				affectedItems: []
			})

			await updateLinkedMenuItem(docId, {
				newLabel: localTitle,
				...(autoGenerateSlugFromTitle
					? { newSlug: `/articles/${docId}-${slugify(localTitle)}` }
					: {})
			})
		}
	}

	return (
		<InputBase
			id="doc-title" placeholder="Page title" variant="outlined"
			value={localTitle}
			onChange={(e) => setLocalTitle(e.target.value)}
			sx={{
				fontSize: { xs: "1.5rem", md: "1.75rem" },
				lineHeight: "2rem", fontWeight: "bold",
				color: "grey.800"
			}}
			onBlur={handleUpdateTitleOnBlur} />
	)
}
DocTitle.propTypes = {
	docId: PropTypes.string,
	title: PropTypes.string
}

function DocDescription({ docId, description }) {
	const [localDescription, setLocalDescription] = useState(description)
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const [updateDoc] = useUpdateDocMutation()

	useEffect(() => {
		setLocalDescription(description)
	}, [description])

	const handleUpdateDescriptionOnBlur = async () => {
		if (localDescription !== description) {
			const newDocMeta = {
				docId: docId,
				description: localDescription,
				updatedBy: currentUser.username,
			}
			await updateDoc({
				docItem: newDocMeta,
				affectedItems: []
			})
		}
	}

	return (
		<InputBase
			id="doc-description"
			variant="outlined"
			placeholder="Page description (optional)"
			value={localDescription}
			onChange={(e) => setLocalDescription(e.target.value)}
			multiline={true}
			sx={{
				fontSize: "1rem",
				fontWeight: "500",
				lineHeight: "2rem"
			}}
			onBlur={handleUpdateDescriptionOnBlur} />
	)
}
DocDescription.propTypes = {
	docId: PropTypes.string,
	description: PropTypes.string
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function DocumentEditor() {
	const dispatch = useDispatch()
	const editorRef = useRef(null)
	//
	const [updateDocContent] = useUpdateDocContentMutation()
	// Current document
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const activeDocId = useSelector(s => s.docsCenterState.activeDocId)
	const editorDataHeadings = useSelector(s => s.textEditorState.editorDataHeadings, isEqual)
	// Get all required data from database
	const {
		data: docItem, isLoading: isLoadingDocItem
	} = useGetDoc(activeDocId)

	const {
		data: docItemContent = EMPTY.OBJECT, isLoading: isLoadingDocItemContent
	} = useGetDocContentQuery(activeDocId)
	//
	const editorData = useSelector(s => s.textEditorState.editorData)
	const editorDefaultData = useSelector(s => s.textEditorState.editorDefaultData)

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

	if (docItem === undefined)
		return null

	dayjs.extend(relativeTime)

	const isEmptyContent = !trim(editorData) || trim(editorData) === "\\"

	console.log("DocumentEditor - re-render")

	//fix bug
	// if (prevActiveDocId !== activeDocId) {
	// 	const text = docItemContent?.data + " ".repeat(random(20))
	// 	reduxBatch(() => {
	// 		dispatch(setEditorData(text))
	// 		dispatch(setEditorDefaultData(text))
	// 	})
	// }

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
				content: {
					text: editorData,
					headings: editorDataHeadings
				}
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
			zIndex: 149
		}}>

			<DocTitle
				docId={docItem.docId}
				title={docItem.title}
			/>

			<DocDescription
				docId={docItem.docId}
				description={docItem.description}
			/>

			<Box id="doc-content" sx={{
				my: 2,
				borderTop: "1px solid transparent",
				borderColor: "divider"
			}} />

			{isLoadingDocItemContent || isLoadingDocItem
				? <CircularProgressBox />
				: <>
					<Box sx={{
						"& .ProseMirror > p": {
							marginBottom: "10px",
							lineHeight: "1.2rem"
						},
						"& .ProseMirror li": {
							marginBottom: "8px",
						},
						"& .ProseMirror ul": {
							marginTop: "8px"
						}
					}}>
						<TextEditor
							ref={editorRef}
							value={editorDefaultData ?? ""}
							placeholder="Enter your content here..."
							onBlur={handleUpdateContentOnBlur} />
					</Box>

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