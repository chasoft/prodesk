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

import { useRef } from "react"

//THIRD-PARTY

//PROJECT IMPORT
import { APP_SETTINGS } from "./constants"
import { THEME_NAME } from "@components/Themes/themeInfo"

import { useGetAppSettingsQuery } from "@redux/slices/firestoreApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const defaultAppSettings = {
	[APP_SETTINGS.autoGenerateSlugFromTitle]: true,
	[APP_SETTINGS.activeTheme]: THEME_NAME.themeSimplicity
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

export default function useAppSettings(settingName) {
	const {
		data: _appSettings = {},
		isLoading: isLoadingAppSettings
	} = useGetAppSettingsQuery(undefined)

	const appSettings = useRef()

	appSettings.current = { ...defaultAppSettings, ..._appSettings }

	return {
		data: appSettings.current[settingName] ?? false,
		isLoading: isLoadingAppSettings
	}
}