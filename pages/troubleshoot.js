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

import React from "react"

//MATERIAL-UI
import { Container, Grid } from "@mui/material"

//THIRD-PART
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import ListTroubleshoot from "./../components/Category/ListTroubleshoot"
import { getLayout, FRONT_PAGE_TABS_NAME } from "./../layout/EntryLayout"
import AskNowFrame from "./../components/Docs/AskNowFrame"
import useUiSettings from "./../helpers/useUiSettings"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Docs() {
	const dispatch = useDispatch()
	useUiSettings({
		activeTab: FRONT_PAGE_TABS_NAME.TROUBLESHOOT,
	})

	return (
		<>
			<Container maxWidth="md" sx={{ mt: { xs: 3, md: 6 } }}>

				<Grid container>
					<Grid item xs={12} >
						<ListTroubleshoot />
					</Grid>
				</Grid>

			</Container>

			<AskNowFrame />
		</>
	)
}

Docs.getLayout = getLayout
export default Docs