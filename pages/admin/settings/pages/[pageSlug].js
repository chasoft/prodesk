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
import { useRouter } from "next/router"

// MATERIAL-UI
import { Box, CircularProgress, Container } from "@mui/material"

//THIRD-PARTY
// import { isEqual } from "lodash"
// import { useSelector } from "react-redux"

//PROJECT IMPORT
import { getLayout } from "@layout/AdminLayout"
import useUiSettings from "@helpers/useUiSettings"
import { EMPTY, USERGROUP } from "@helpers/constants"

//ASSETS
import useProfilesGroup from "@helpers/useProfilesGroup"
import EditPage from "@components/Settings/Pages/EditPage"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function AdminEditPage() {
	const router = useRouter()
	const { pageSlug } = router.query
	// const currentUser = useSelector(s => s.authState.currentUser, isEqual)

	const {
		userList: allAdminProfiles = EMPTY.ARRAY,
		isLoading: isLoadingAllAdminProfiles
	} = useProfilesGroup([
		USERGROUP.SUPERADMIN.code,
		USERGROUP.ADMIN.code,
		USERGROUP.STAFF.code,
		USERGROUP.AGENT.code
	])

	useUiSettings({
		title: "Edit Page",
		background: {
			backgroundImage: ""
		}
	})

	console.log(allAdminProfiles)

	if (router.isFallback || !pageSlug) return null

	if (isLoadingAllAdminProfiles) {
		return (
			<Container maxWidth="md" style={{ flexGrow: 1 }}>
				<Box sx={{
					display: "flex",
					height: "70%",
					alignItems: "center",
					justifyContent: "center"
				}}>
					<CircularProgress />
				</Box >
			</Container>
		)
	}

	return (
		<Container maxWidth="md" style={{ flexGrow: 1 }}>

			<EditPage slug={pageSlug} />

		</Container>
	)
}

AdminEditPage.getLayout = getLayout

export default AdminEditPage