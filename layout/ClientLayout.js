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
import { useDispatch, useSelector } from "react-redux"

// MATERIAL-UI
import { Box, useMediaQuery } from "@mui/material"

//THIRD-PARTY
import { isEqual } from "lodash"
import { KBarProvider } from "kbar"

//PROJECT IMPORT
import { ClientCommandBar } from "@components/common/kbar/kbar"
import { getRootLayout } from "@layout/RootLayout"
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

const CLIENT_MENU = [
	{
		id: "menu_support",
		type: MENU_ITEM_TYPE.GROUP,
		expanded: true,
		icon: IconName.support,
		title: "Support",
		description: "Getting supports",
		items: [
			{ id: "submenu_tickets", icon: IconName.tickets, text: "All tickets", url: "/client/tickets" },
			{ id: "submenu_newticket", icon: IconName.newTicket, text: "Open ticket", url: "/client/tickets/new-ticket" },
		]
	},
	{
		id: "menu_profile",
		type: MENU_ITEM_TYPE.GROUP,
		expanded: false,
		icon: IconName.account,
		title: "Account",
		description: "Managing your account",
		items: [
			{ id: "submenu_editprofile", icon: IconName.profile, text: "Edit profile", url: "/client/edit-profile" },
			{ id: "submenu_account", icon: IconName.account, text: "Accounts", url: "/client/account" },
		]
	},
]

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ClientLayout({ children }) {
	const backgroundForLoggedinPage = useSelector(s => s.uiSettingsState.backgroundForLoggedinPage, isEqual)

	const dispatch = useDispatch()
	const isSmallScreen = useMediaQuery("(max-width:600px)")

	const { defaultClientActions } = useDefaultKbarActions()

	useEffect(() => {
		dispatch(setIsSmallScreen(isSmallScreen))
	}, [dispatch, isSmallScreen])

	usePrefetchImmediately("getProfiles", undefined)

	return (
		<KBarProvider actions={defaultClientActions} >
			<AuthCheck>

				<Box sx={{ ...backgroundForLoggedinPage }} />

				<Box style={{ display: "flex", minHeight: "100vh" }}>

					<ClientCommandBar />

					<SideBar
						homeUrl={REDIRECT_URL.CLIENT.INDEX}
						settingsUrl={REDIRECT_URL.CLIENT.EDIT_PROFILE}
						settingsTooltip="Account settings"
						data={CLIENT_MENU}
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
ClientLayout.propTypes = { children: PropTypes.any }

export const getLayout = page => getRootLayout(<ClientLayout>{page}</ClientLayout>)

export default ClientLayout