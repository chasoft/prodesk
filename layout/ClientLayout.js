/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║          ProDesk - Your Elegant & Powerful Ticket System          ║ *
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

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import PropTypes from "prop-types"


// MATERIAL-UI
import { Container, makeStyles } from "@material-ui/core"

//THIRD-PARTY
import PerfectScrollbar from "react-perfect-scrollbar"

//PROJECT IMPORT
import Header from "../components/common/backend/Header"
import SideBar from "../components/common/backend/SideBar"
import Footer from "../components/common/Footer"
import { getUiSettings } from "../redux/selectors"
import { BACKGROUND_ID, MENU_ITEM_TYPE } from "../helpers/constants"

//ASSETS


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "row",
		minHeight: "100vh"
	},
	content: {
		width: "100%",
		height: "100vh",
		transition: "margin .3s cubic-bezier(0.4, 0, 0.2, 1)"
	}
}))

const backgroundInfo = {
	"Empty": {
		backgroundImage: "",
		backgroundRepeat: "",
	},
	"AdminIndex": {
		backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2500 600'%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill:%23${"1a73e8"};%7D%3C/style%3E%3C/defs%3E%3Crect class='cls-1' x='0.5' y='0.5' width='2500' height='600'/%3E%3C/svg%3E")`,
		backgroundRepeat: "no-repeat",
	},
	"AdminProfile": {
		backgroundImage: "",
		backgroundRepeat: "",
	},
	"AdminTicket": {
		backgroundImage: "",
		backgroundRepeat: "",
	},
	"AdminUsers": {
		backgroundImage: "",
		backgroundRepeat: "",
	}
}


const CLIENT_MENU = [
	{
		id: "menu_support",
		type: MENU_ITEM_TYPE.GROUP,
		expanded: true,
		icon: "0",
		title: "Support",
		description: "Getting supports",
		items: [
			{ id: "submenu_newticket", icon: "1", text: "Open ticket", url: "/client/new-ticket" },
			{ id: "submenu_tickets", icon: "1", text: "All tickets", url: "/client/tickets" },
		]
	},
	{
		id: "menu_profile",
		type: MENU_ITEM_TYPE.GROUP,
		expanded: false,
		icon: "0",
		title: "Account",
		description: "Managing your account",
		items: [
			{ id: "submenu_editprofile", icon: "1", text: "Edit profile", url: "/client/edit-profile" },
			{ id: "submenu_account", icon: "1", text: "Accounts", url: "/client/account" },
		]
	},
]

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function ClientLayout({ children }) {
	const classes = useStyles()
	const [scrolled, setScrolled] = useState(false)
	const [isSideBarExpanded, setLeftDrawerExpanded] = useState(true)

	const { adminBackgroundId } = useSelector(getUiSettings)

	return (
		<div
			className={classes.root}
			style={{
				backgroundImage: backgroundInfo[adminBackgroundId].backgroundImage,
				backgroundRepeat: backgroundInfo[adminBackgroundId].backgroundRepeat
			}}
		>
			<SideBar
				isExpanded={isSideBarExpanded} toggle={setLeftDrawerExpanded}
				homeUrl="/client" settingsUrl=""
				data={CLIENT_MENU}
			/>

			<PerfectScrollbar
				component="div" className={classes.content}
				onScrollY={(e) => { if (e.scrollTop > 50) { setScrolled(true) } else { setScrolled(false) } }}
			>

				<Header isSideBarExpanded={isSideBarExpanded} scrolled={scrolled} />

				{children}

				<Footer />
			</PerfectScrollbar>
		</div>
	)
}
ClientLayout.propTypes = { children: PropTypes.any }

export const getLayout = page => <ClientLayout>{page}</ClientLayout>

export default ClientLayout