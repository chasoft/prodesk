/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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

import makeStyles from "@mui/styles/makeStyles"

//THIRD-PARTY
import PerfectScrollbar from "react-perfect-scrollbar"

//PROJECT IMPORT
import Header from "../components/BackEnd/Header"
import SideBar from "../components/BackEnd/SideBar"
import Footer from "../components/common/Footer"
import { MENU_ITEM_TYPE } from "../helpers/constants"
import AuthCheck, { ReduxRedirect } from "../components/AuthCheck"
import { getRootLayout } from "./RootLayout"
import { setScrollTop } from "../redux/slices/uiSettings"
import { getUiSettings } from "./../redux/selectors"

//ASSETS


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles({
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
})

// const backgroundInfo = {
// 	"Empty": {
// 		backgroundRepeat: "",
// 	},
// 	"AdminIndex": {
// 		backgroundImage: "",
// 		backgroundRepeat: "no-repeat",
// 	},
// 	"AdminProfile": {
// 		backgroundImage: "",
// 		backgroundRepeat: "",
// 	},
// 	"AdminTicket": {
// 		backgroundImage: "",
// 		backgroundRepeat: "",
// 	},
// 	"AdminUsers": {
// 		backgroundImage: "",
// 		backgroundRepeat: "",
// 	}
// }


const CLIENT_MENU = [
	{
		id: "menu_support",
		type: MENU_ITEM_TYPE.GROUP,
		expanded: true,
		icon: "0",
		title: "Support",
		description: "Getting supports",
		items: [
			{ id: "submenu_tickets", icon: "1", text: "All tickets", url: "/client/tickets" },
			{ id: "submenu_newticket", icon: "1", text: "Open ticket", url: "/client/tickets/new-ticket" },
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
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ClientLayout({ children }) {
	const classes = useStyles()
	const [scrolled, setScrolled] = useState(false)
	const [isSideBarExpanded, setIsSideBarExpanded] = useState(true)
	const dispatch = useDispatch()
	const { backgroundForLoggedinPage } = useSelector(getUiSettings)

	const sideBarExpanding = () => {
		setIsSideBarExpanded(window.innerWidth <= 960 ? false : true)
	}

	useEffect(() => {
		sideBarExpanding()
		window.addEventListener("resize", sideBarExpanding)
		return () => window.removeEventListener("resize", sideBarExpanding)
	}, [])

	return (
		<ReduxRedirect>
			<AuthCheck>
				<div className={classes.root}>
					<SideBar
						isExpanded={isSideBarExpanded} toggle={setIsSideBarExpanded}
						homeUrl="/client" settingsUrl=""
						data={CLIENT_MENU}
					/>

					<PerfectScrollbar
						component="div" className={classes.content}
						options={{ wheelSpeed: 1, wheelPropagation: true }}
						onScrollY={(e) => {
							if (e.scrollTop > 50) { setScrolled(true) } else { setScrolled(false) }
							dispatch(setScrollTop(e.scrollTop))
						}}
					>
						<Header isSideBarExpanded={isSideBarExpanded} scrolled={scrolled} />
						<div>
							<div style={backgroundForLoggedinPage}></div>
							{children}
							<Footer />
						</div>
					</PerfectScrollbar>
				</div>
			</AuthCheck>
		</ReduxRedirect >
	)
}
ClientLayout.propTypes = { children: PropTypes.any }

export const getLayout = page => getRootLayout(<ClientLayout>{page}</ClientLayout>)

export default ClientLayout