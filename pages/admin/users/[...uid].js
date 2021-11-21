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
import DefaultErrorPage from "next/error"
import { useRouter } from "next/router"

// MATERIAL-UI
import { Container } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout } from "@layout/AdminLayout"
import { REDIRECT_URL } from "@helpers/constants"
import useUiSettings from "@helpers/useUiSettings"
import useGetProfileByUsername from "@helpers/useGetProfileByUsername"
import IconBreadcrumbs, { BreadcrumbsBox } from "@components/BackEnd/IconBreadcrumbs"

//ASSETS
import HomeIcon from "@mui/icons-material/Home"
import PersonIcon from "@mui/icons-material/Person"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function AdminViewUser() {
	const router = useRouter()
	const { uid } = router.query

	const profile = useGetProfileByUsername(uid ? uid[0] : "")

	useUiSettings({
		title: "View User Profile",
		background: {
			backgroundImage: ""
		}
	})

	if (router.isFallback || !uid) return null

	if (profile === undefined) return <DefaultErrorPage statusCode={404} />

	return (
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>

			<BreadcrumbsBox>
				<IconBreadcrumbs
					icon={<PersonIcon sx={{ fontSize: 18 }} />}
					title="Users"
					items={[
						{
							icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
							title: "Home",
							url: REDIRECT_URL.ADMIN.INDEX
						}
					]}
				/>
			</BreadcrumbsBox>

			{JSON.stringify(profile)}

		</Container >
	)
}

AdminViewUser.getLayout = getLayout

export default AdminViewUser