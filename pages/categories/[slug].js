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
import dynamic from "next/dynamic"

// MATERIAL-UI
// import { Container } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { getRootLayout } from "@layout/RootLayout"
import useAppSettings from "@helpers/useAppSettings"
import { CircularProgressBox } from "@components/common"
import { APP_SETTINGS } from "@helpers/constants"
import { THEME_NAME } from "@components/Themes/themeInfo"

//ASSETS


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const ThemeSimplicityCategories = dynamic(
	() => import("../../components/Themes/Simplicity/categories"),
	{ loading: () => <CircularProgressBox minHeight="70vh" /> }
)

const ThemeGoogle = dynamic(
	() => import("../../components/Themes/Google"),
	{ loading: () => <CircularProgressBox minHeight="70vh" /> }
)

const ThemeTraditional = dynamic(
	() => import("../../components/Themes/Traditional"),
	{ loading: () => <CircularProgressBox minHeight="70vh" /> }
)

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function SingleCategory() {
	const router = useRouter()
	const { slug } = router.query

	const {
		data: activeTheme,
		isLoading: isLoadingActiveTheme
	} = useAppSettings(APP_SETTINGS.activeTheme)

	if (router.isFallback || !slug) return null

	if (isLoadingActiveTheme)
		return <CircularProgressBox minHeight="70vh" />

	switch (activeTheme) {
		case THEME_NAME.themeGoogle:
			return (
				<ThemeGoogle />
			)
		case THEME_NAME.themeTraditional:
			return (
				<ThemeTraditional />
			)
		default:
			return (
				<ThemeSimplicityCategories slug={slug} />
			)
	}
}

SingleCategory.getLayout = getRootLayout

export default SingleCategory