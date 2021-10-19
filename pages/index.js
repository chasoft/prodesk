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

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { FRONT_PAGE_TABS_NAME, getLayout } from "./../layout/EntryLayout"
import PromotedSearch from "../components/Themes/Google/PromotedSearch"
import FrontAccordions from "../components/Themes/Google/FrontAccordions"
import useUiSettings from "./../helpers/useUiSettings"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Home() {
	const dispatch = useDispatch()

	useUiSettings({
		activeTab: FRONT_PAGE_TABS_NAME.HOME,
	})

	return (
		<>
			<PromotedSearch />
			<FrontAccordions />
		</>
	)
}

Home.getLayout = getLayout
export default Home