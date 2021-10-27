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
import React, { useCallback, useEffect } from "react"

// MATERIAL-UI
import { Box } from "@mui/material"
import useMediaQuery from "@mui/material/useMediaQuery"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getRootLayout } from "./RootLayout"
import AuthCheck from "./../components/AuthCheck"
import Footer from "./../components/common/Footer"
import Header from "./../components/BackEnd/Header"
import { getUiSettings } from "./../redux/selectors"
import SideBar from "./../components/BackEnd/SideBar"
import { MENU_ITEM_TYPE, REDIRECT_URL } from "./../helpers/constants"
import { setIsSmallScreen, setScrolled } from "./../redux/slices/uiSettings"
import usePrefetchImmediately from "../helpers/usePrefetchImmediately"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const ADMIN_MENUS = [
	{
		id: "menu_tickets",
		type: MENU_ITEM_TYPE.ITEM,
		icon: "0",
		title: "Tickets",
		description: "Managing all your tickets at ease",
		url: "/admin/tickets"
	},
	{
		id: "menu_blog",
		type: MENU_ITEM_TYPE.GROUP,
		expanded: false,
		icon: "0",
		title: "Blog",
		description: "Managing your blog content",
		items: [
			{ id: "submenu_blog", icon: "1", text: "Blog", url: "/admin/blog" },
			{ id: "submenu_addpost", icon: "1", text: "Add a blog post", url: "/admin/blog/add-new" },
			{ id: "submenu_blogcategories", icon: "1", text: "Categories", url: "/admin/blog/categories" },
			{ id: "submenu_comments", icon: "1", text: "Comments", url: "/admin/blog/comments" }
		]
	},
	{
		id: "menu_documentation",
		type: MENU_ITEM_TYPE.GROUP,
		expanded: false,
		icon: "0",
		title: "Documentation",
		description: "Managing your documentation",
		items: [
			{ id: "submenu_alldocs", icon: "1", text: "All documents", url: "/admin/documentation" },
			{ id: "submenu_categories", icon: "2", text: "Categories", url: "/admin/documentation/categories" },
			{ id: "submenu_tags", icon: "2", text: "Tags", url: "/admin/documentation/tags" }
		]
	},
	{
		id: "menu_users",
		type: MENU_ITEM_TYPE.ITEM,
		icon: "0",
		title: "Users",
		description: "List all users with quick summary",
		url: "/admin/users"
	},
	{
		id: "menu_settings",
		type: MENU_ITEM_TYPE.GROUP,
		expanded: false,
		icon: "0",
		title: "Settings",
		description: "Configuring your ProDesk",
		items: [
			{ id: 1, icon: "1", text: "Members", url: "/admin/settings/members" },
			{ id: 2, icon: "1", text: "Site Pages", url: "/admin/settings/pages" },
			{ id: 3, icon: "1", text: "Tickets", url: "/admin/settings/tickets/department" },
			{ id: 4, icon: "1", text: "Documentation", url: "/admin/settings/documentation" },
			{ id: 5, icon: "1", text: "Application Settings", url: "/admin/settings/application" },
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

	const handleSetScrolled = useCallback(() => {
		dispatch(setScrolled(window.scrollY > 50))
	}, [dispatch])

	useEffect(() => {
		window.addEventListener("scroll", handleSetScrolled)
		return () => window.removeEventListener("scroll", handleSetScrolled)
	}, [handleSetScrolled])

	useEffect(() => {
		dispatch(setIsSmallScreen(isSmallScreen))
	}, [dispatch, isSmallScreen])

	usePrefetchImmediately("getProfiles", undefined)

	return (
		<AuthCheck>

			<Box sx={{ ...backgroundForLoggedinPage }} />

			<Box style={{ display: "flex", minHeight: "100vh" }}>

				<SideBar
					homeUrl={REDIRECT_URL.ADMIN}
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
	)
}
AdminLayout.propTypes = { children: PropTypes.any }

export const getLayout = page => getRootLayout(<AdminLayout>{page}</AdminLayout>)

export default AdminLayout