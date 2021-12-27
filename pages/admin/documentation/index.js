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

// MATERIAL-UI
import { Container } from "@mui/material"

//THIRD-PARTY
import { useSelector } from "react-redux"

//PROJECT IMPORT
import { getLayout } from "@layout/AdminLayout"
import useUiSettings from "@helpers/useUiSettings"
import TocSideBar from "@components/Documentation/TocSideBar"
import DocumentEditor from "@components/Documentation/DocumentEditor"
import DocumentTocSideBar from "@components/Documentation/DocumentTocSideBar"
import DocumentEditorNoActiveDocId from "@components/Documentation/DocumentEditorNoActiveDocId"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Documentation() {
	useUiSettings({
		title: "Documentation Management",
		background: {
			backgroundImage: "",
			backgroundColor: "transparent"
		}
	})

	const activeDocId = useSelector(s => s.docsCenterState.activeDocId)

	return (
		<Container
			id="documentation"
			maxWidth="xl"
			sx={{
				display: "flex",
				flexGrow: 1
			}}
			disableGutters
		>
			<TocSideBar />

			{(activeDocId !== null)
				? <DocumentEditor />
				: <DocumentEditorNoActiveDocId />}

			<DocumentTocSideBar />

		</Container>
	)
}

Documentation.getLayout = getLayout
export default Documentation