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

//THIRD-PARTY
import { useSelector } from "react-redux"
import { useRegisterActions } from "kbar"
import { useSnackbar } from "notistack"

//PROJECT IMPORT
import { _createDocSearchIndex } from "@helpers/docSearchIndex"
import { updateAppSettings } from "@redux/slices/firestoreApiBase"
import { APP_SETTINGS } from "@helpers/constants"
import { getAuth } from "@redux/selectors"
import { THEME_NAME } from "@components/Themes/themeInfo"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const ID_GROUP = {
	DOCUMENTATION: "docSettingsGroupId",
	APPLICATION: "appSettingsGroupId"
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/


export default function useAdminActions() {
	const { enqueueSnackbar } = useSnackbar()
	const { currentUser } = useSelector(getAuth)

	useRegisterActions(
		[
			//DOCUMENTATION
			{
				id: ID_GROUP.DOCUMENTATION,
				name: "Documentation...",
				shortcut: [],
				keywords: "preference documentation",
				section: "Preferences",
			},
			{
				name: "Simplicity theme",
				section: "",
				parent: ID_GROUP.DOCUMENTATION,
				perform: async () => {
					await updateAppSettings({
						[APP_SETTINGS.activeTheme]: THEME_NAME.themeSimplicity
					})
					enqueueSnackbar("Simplicity theme selected successfully", { variant: "success" })
				}
			},
			{
				name: "Traditional theme",
				section: "",
				parent: ID_GROUP.DOCUMENTATION,
				perform: async () => {
					await updateAppSettings({
						[APP_SETTINGS.activeTheme]: THEME_NAME.themeTraditional
					})
					enqueueSnackbar("Traditional theme selected successfully", { variant: "success" })
				}
			},
			{
				name: "Google theme",
				section: "",
				parent: ID_GROUP.DOCUMENTATION,
				perform: async () => {
					await updateAppSettings({
						[APP_SETTINGS.activeTheme]: THEME_NAME.themeGoogle
					})
					enqueueSnackbar("Google theme selected successfully", { variant: "success" })
				}
			},
			{
				name: "Create searching index",
				section: "Searching Index",
				parent: ID_GROUP.DOCUMENTATION,
				perform: async () => {
					await _createDocSearchIndex(currentUser.username)
					enqueueSnackbar("Searching Index created successfully", { variant: "success" })
				}
			},

			//APLLICATION
			{
				id: ID_GROUP.APPLICATION,
				name: "Application...",
				keywords: "application",
				section: "Preferences",
			},
			{
				name: "Setting1",
				section: "",
				parent: ID_GROUP.APPLICATION,
				perform: () => {
					console.log("Setting1 selected!")
				},
			},
			{
				name: "Setting2",
				section: "",
				parent: ID_GROUP.APPLICATION,
				perform: () => {
					console.log("Setting2 selected!")
				}
			},
			{
				name: "Setting3",
				section: "",
				parent: ID_GROUP.APPLICATION,
				perform: () => {
					console.log("Setting3 selected!")
				}
			},
		]
	)
}
