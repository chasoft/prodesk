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

import React, { useCallback, useEffect, useRef, useState } from "react"

// MATERIAL-UI
import { Box, InputBase } from "@mui/material"
import TextEditor from "./../common/TextEditor"
import DocumentTemplate from "./DocumentTemplate"
import { getTextEditor } from "./../../redux/selectors"
import { useDispatch, useSelector } from "react-redux"
import { setEditorDataHeadings } from "./../../redux/slices/textEditor"

//THIRD-PARTY


//PROJECT IMPORT


//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const DocumentEditor = () => {
	const editorRef = useRef(null)
	const [defaultEditorData, setDefaultEditorData] = useState("")

	const dispatch = useDispatch()
	const { editorData } = useSelector(getTextEditor)

	const handleSetDefaultEditorData = useCallback((data) => {
		setDefaultEditorData(data)
		editorRef.current.focusAtEnd()
	}, [])

	useEffect(() => {
		const h = editorRef.current.getHeadings()
		dispatch(setEditorDataHeadings(h))
	}, [dispatch, editorData])

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
				sx={{
					fontSize: { xs: "1.5rem", md: "1.75rem" },
					lineHeight: "2rem", fontWeight: "bold",
					color: "grey.800"
				}}
			/>

			{/* {Max 200 characters} */}
			<InputBase
				id="doc-title" placeholder="Page description (optional)" variant="outlined"
				multiline={true}
				sx={{
					fontSize: "1rem", fontWeight: "bold",
					lineHeight: "2rem"
				}}
			/>

			<Box sx={{
				my: 2,
				borderTop: "1px solid transparent",
				borderColor: "divider"
			}} />

			<TextEditor
				ref={editorRef}
				value={defaultEditorData}
				placeholder="Enter your content here..."
			/>

			{(editorData === "" ||
				editorData.trim() === "\\") &&
				<DocumentTemplate setDefaultEditorData={handleSetDefaultEditorData} />}

		</Box>
	)
}
// DocumentEditor.propTypes = { children: PropTypes.node }

export default DocumentEditor