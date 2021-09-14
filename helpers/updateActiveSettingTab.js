/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║      DomainHub - Your Trusted Domain Partner (SaaS Platform)      ║ *
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
 * LIBRARY IMPORT                                                *
 *****************************************************************/

import { useEffect } from "react"

//THIRD-PARTY
import { useDispatch } from "react-redux"
import { setActiveSettingTab } from "../redux/slices/uiSettings"

//PROJECT IMPORT


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/**
 * Update ActiveSettingTab when a setting page is loaded
 * @param {object} props
 */
export default function updateActiveSettingTab(props) {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(setActiveSettingTab(props))
	}, [])
}
