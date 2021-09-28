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
import { Box, Container, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout } from "./../../../layout/AdminLayout"
import updateUiSettings from "../../../helpers/updateUiSettings"
import TocSideBar from "../../../components/KnowledgeBase/TocSideBar"
import DocumentEditor from "../../../components/KnowledgeBase/DocumentEditor"
import DocumentTocSideBar from "../../../components/KnowledgeBase/DocumentTocSideBar"

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
				minHeight: "calc(100vh - 150px)",
				mt: 4,
			}}
		>

			<TocSideBar />

			<DocumentEditor />

			<DocumentTocSideBar />

		</Container>
	)
}

KnowledgeBase.getLayout = getLayout
export default KnowledgeBase