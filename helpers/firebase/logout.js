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

import { signOut as signOutApp } from "firebase/auth"

//THIRD-PARTY
import { batch as reduxBatch } from "react-redux"

//PROJECT IMPORT
import { logoutSuccess } from "./../../redux/slices/auth"
import { clearRedirectAfterLoginURL, setRedirect } from "./../../redux/slices/redirect"
import { auth } from "."

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const signOut = ({ enqueueSnackbar, dispatch }) => {
	signOutApp(auth)
	reduxBatch(() => {
		dispatch(logoutSuccess())
		dispatch(setRedirect(""))
		dispatch(clearRedirectAfterLoginURL())
	})
	enqueueSnackbar("Signed out successfully!", { variant: "success" })
}
