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

import React, { useEffect } from "react"

// MATERIAL-UI
import { Container } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout } from "./../../../layout/AdminLayout"
import updateUiSettings from "./../../../helpers/updateUiSettings"
import TocSideBar from "./../../../components/Documentation/TocSideBar"
import DocumentEditor from "./../../../components/Documentation/DocumentEditor"
import DocumentTocSideBar from "./../../../components/Documentation/DocumentTocSideBar"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

// const DUMMY_List = [
// 	{

// 	}
// ]

// const DUMMY_Content = {

// }

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Documentation() {

	updateUiSettings({
		title: "Documentation Management",
		background: {
			backgroundImage: "",
			backgroundColor: "transparent"
		}
	})

	/*
		Flow of data as below:
		1. Load data (docsList) from DB and save to Redux[docsCenter]
		2. Components' state based on Redux[docsCenter]
		3. When there is an activeDocId, then load data from Redux[docsCenter] to TextEditor (mirror to Redux[textEditor])

		Note: at this time, there are 2 state of data of activeDoc.
			N1. data at Redux[docsCenter] (data saved)
			N2. temporary data at TextEditor (aka Redux[textEditor])
		When user save or autosave, 
		- then data from (B2) will update to DB, and update directly to N1
		- at the background refetch DB and compare to N1 (Redux[]) (imitate behavior of ReactQuery lib)
	*/
	useEffect(() => {
		//using lodash groupBy to group data before pushing to Redux!
		console.log("fetch Documentation here & keep at ReduxStore textEditor")
	}, [])

	return (
		<Container
			maxWidth="xl"
			sx={{
				display: "flex",
				flexGrow: 1
			}}
			disableGutters
		>

			<TocSideBar />

			<DocumentEditor />

			<DocumentTocSideBar />

		</Container>
	)
}

Documentation.getLayout = getLayout
export default Documentation