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

import { useCallback, useRef } from "react"

//THIRD-PARTY

//PROJECT IMPORT
import { USER_SETTINGS_NAME } from "./constants"
import { useGetUserSettingsQuery } from "../redux/slices/firestoreApi"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

//TODO: add default settings for each usergroup
export default function useUserSettings(username, settingName) {

	const { data, isLoading } = useGetUserSettingsQuery(username)

	const defaultUserSettings = useRef({
		[USER_SETTINGS_NAME.hasAdminPermissions]: false
	})

	//get a setting or all if no query provided
	const getUserSettings = useCallback((settingName) => {
		const warehouse = isLoading
			? defaultUserSettings.current
			: { ...defaultUserSettings.current, ...data }
		return settingName ? warehouse[settingName] : warehouse
	}, [data, isLoading])

	return getUserSettings(settingName)
}