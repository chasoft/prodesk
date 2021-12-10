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

import PropTypes from "prop-types"
import React, { useEffect } from "react"

// MATERIAL-UI
import { Box } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"

//THIRD-PARTY
import { KBarProvider } from "kbar"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { AdminCommandBar } from "@components/common/kbar/kbar"
import { getRootLayout } from "@layout/RootLayout"
import { getUiSettings } from "@redux/selectors"
import { MENU_ITEM_TYPE, REDIRECT_URL } from "@helpers/constants"
import { setIsSmallScreen } from "@redux/slices/uiSettings"
import AuthCheck from "@components/AuthCheck"
import Footer from "@components/common/Footer"
import Header from "@components/BackEnd/Header"
import SideBar, { IconName } from "@components/BackEnd/SideBar"
import useDefaultKbarActions from "@components/common/kbar/useDefaultKbarActions"
import usePrefetchImmediately from "@helpers/usePrefetchImmediately"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const ADMIN_MENUS = [
	{
		id: "menu_tickets",
		type: MENU_ITEM_TYPE.ITEM,
		icon: IconName.tickets,
		title: "Tickets",
		description: "Managing all your tickets at ease",
		url: "/admin/tickets"
	},
	{
		id: "menu_documentation",
		type: MENU_ITEM_TYPE.ITEM,
		icon: IconName.documentation,
		title: "Documentation",
		description: "Managing your documentation",
		url: "/admin/documentation"
	},
	{
		id: "menu_users",
		type: MENU_ITEM_TYPE.ITEM,
		icon: IconName.users,
		title: "Users",
		description: "List all users with quick summary",
		url: "/admin/users"
	},
	{
		id: "menu_settings",
		type: MENU_ITEM_TYPE.GROUP,
		expanded: false,
		icon: IconName.settings,
		title: "Settings",
		description: "Configuring your ProDesk",
		items: [
			{ id: 1, icon: IconName.members, text: "Members", alt: "Members settings", url: "/admin/settings/members" },
			{ id: 2, icon: IconName.pages, text: "Site Pages", alt: "Site Pages settings", url: "/admin/settings/pages" },
			{ id: 3, icon: IconName.tickets, text: "Tickets", alt: "Tickets settings", url: "/admin/settings/tickets/department" },
			{ id: 4, icon: IconName.documentation, text: "Documentation", alt: "Documentation settings", url: "/admin/settings/documentation" },
			{ id: 5, icon: IconName.application, text: "Application Settings", url: "/admin/settings/application" },
		]
	},

]

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function AdminLayout({ children }) {
	const { backgroundForLoggedinPage } = useSelector(getUiSettings)

	const dispatch = useDispatch()
	const isSmallScreen = useMediaQuery("(max-width:600px)")

	const { defaultAdminActions } = useDefaultKbarActions()

	useEffect(() => {
		dispatch(setIsSmallScreen(isSmallScreen))
	}, [dispatch, isSmallScreen])

	usePrefetchImmediately("getProfiles", undefined)

	return (
		<KBarProvider actions={defaultAdminActions} >
			<AuthCheck>

				<Box id="backgroundForLoggedinPage" sx={{ ...backgroundForLoggedinPage }} />

				<Box id="mainContain" style={{ display: "flex", minHeight: "100vh" }}>

					<AdminCommandBar />

					<SideBar
						homeUrl={REDIRECT_URL.ADMIN.INDEX}
						settingsUrl=""
						settingsTooltip=""
						data={ADMIN_MENUS}
					/>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							flexGrow: 1,
							width: "100%",
						}}
					>
						<Header />
						{children}
						<Footer />
					</Box>
				</Box>

			</AuthCheck>
		</KBarProvider>
	)
}
AdminLayout.propTypes = { children: PropTypes.any }

export const getLayout = page => getRootLayout(<AdminLayout>{page}</AdminLayout>)

export default AdminLayout