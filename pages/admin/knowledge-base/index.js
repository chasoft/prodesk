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
import { HTML5Backend } from "react-dnd-html5-backend"
import { DndProvider } from "react-dnd"

//PROJECT IMPORT
import { getLayout } from "./../../../layout/AdminLayout"
import updateUiSettings from "./../../../helpers/updateUiSettings"
import TocSideBar from "./../../../components/KnowledgeBase/TocSideBar"
import DocumentEditor from "./../../../components/KnowledgeBase/DocumentEditor"
import DocumentTocSideBar from "./../../../components/KnowledgeBase/DocumentTocSideBar"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const DUMMY_List = [
	{

	}
]

const DUMMY_Content = {

}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function KnowledgeBase() {



	updateUiSettings({
		title: "Knowlege Base Management",
		background: {
			backgroundImage: "",
			backgroundColor: "transparent"
		}
	})

	return (
		<Container
			maxWidth="xl"
			sx={{
				display: "flex",
				flexGrow: 1,
				// minHeight: "calc(100vh - 150px)",
				// borderBottom: "1px solid transparent",
				// borderColor: "divider"
			}}
			disableGutters
		>

			<DndProvider backend={HTML5Backend}>
				<TocSideBar />
			</DndProvider>

			<DocumentEditor />

			<DocumentTocSideBar />

		</Container>
	)
}

KnowledgeBase.getLayout = getLayout
export default KnowledgeBase