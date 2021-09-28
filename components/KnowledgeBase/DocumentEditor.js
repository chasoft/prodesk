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

import React, { useCallback, useState } from "react"

// MATERIAL-UI
import { Box, InputBase } from "@mui/material"
import TextEditor from "../common/TextEditor"
import DocumentTemplate from "./DocumentTemplate"

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
	const [textEditorData, setTextEditorData] = useState("")

	const handleGetEditorData = useCallback((data) => {
		setTextEditorData(data)
	}, [])

	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			flexGrow: 1,
			px: 5
		}}>
			<InputBase
				id="doc-title" placeholder="Page title" variant="outlined"
				sx={{
					fontSize: { xs: "1.5rem", md: "1.75rem" },
					lineHeight: "2rem", fontWeight: "bold",
				}}
			/>

			<InputBase
				id="doc-title" placeholder="Page description (optional)" variant="outlined"
				sx={{
					fontSize: "1rem", fontWeight: "bold",
					lineHeight: "2rem"
				}}
			/>

			<Box sx={{
				my: 2,
				borderTop: "2px solid",
				borderColor: "divider"
			}} />


			<TextEditor
				placeholder="Enter your content here..."
				pullEditorData={handleGetEditorData}
			/>

			{(textEditorData === "" ||
				textEditorData.trim() === "\\") &&
				<DocumentTemplate setTextEditorData={setDefautEditorData} />}

		</Box>
	)
}
// DocumentEditor.propTypes = { children: PropTypes.node }

export default DocumentEditor