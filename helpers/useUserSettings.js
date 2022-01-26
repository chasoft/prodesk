/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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

//PROJECT IMPORT
import useGetProfileByUsername from "./useGetProfileByUsername"
import {
	USERGROUP,
	DEFAULT_USER_SETTINGS,
	DEFAULT_MEMBER_SETTINGS,
	DEFAULT_AGENT_SETTINGS,
	DEFAULT_STAFF_SETTINGS,
	DEFAULT_ADMIN_SETTINGS,
	DEFAULT_SUPERADMIN_SETTINGS,
	EMPTY
} from "./constants"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export default function useUserSettings(username, settingName) {
	const {
		permissions = EMPTY.OBJECT,
		group
	} = useGetProfileByUsername(username)

	let defaultPermissions = EMPTY.OBJECT

	switch (group) {
		case USERGROUP.SUPERADMIN.code:
			defaultPermissions = DEFAULT_SUPERADMIN_SETTINGS
			break
		case USERGROUP.ADMIN.code:
			defaultPermissions = DEFAULT_ADMIN_SETTINGS
			break
		case USERGROUP.STAFF.code:
			defaultPermissions = DEFAULT_STAFF_SETTINGS
			break
		case USERGROUP.AGENT.code:
			defaultPermissions = DEFAULT_AGENT_SETTINGS
			break
		case USERGROUP.MEMBER.code:
			defaultPermissions = DEFAULT_MEMBER_SETTINGS
			break
		default:
			defaultPermissions = DEFAULT_USER_SETTINGS
	}

	const finalPermissions = { ...defaultPermissions, ...permissions }

	if (settingName) {
		if (username === "superadmin") return true
		return finalPermissions[settingName] ?? false
	}

	return finalPermissions
}