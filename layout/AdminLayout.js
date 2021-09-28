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

import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import { useRouter } from "next/router"

// MATERIAL-UI
import { Box } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"

//THIRD-PARTY

//PROJECT IMPORT
import Header from "../components/BackEnd/Header"
import SideBar from "../components/BackEnd/SideBar"
import Footer from "../components/common/Footer"
import { getUiSettings } from "../redux/selectors"
import { MENU_ITEM_TYPE } from "../helpers/constants"
import AuthCheck, { ReduxRedirect } from "../components/AuthCheck"
import { getRootLayout } from "./RootLayout"

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
		id: "menu_knowledgebase",
		type: MENU_ITEM_TYPE.GROUP,
		expanded: false,
		icon: "0",
		title: "Knowledge Base",
		description: "Managing your knowledge base",
		items: [
			{ id: "submenu_alldocs", icon: "1", text: "All documents", url: "/admin/knowledge-base" },
			{ id: "submenu_adddoc", icon: "1", text: "Add new document", url: "/admin/knowledge-base/add-new" },
			{ id: "submenu_categories", icon: "2", text: "Categories", url: "/admin/knowledge-base/categories" },
			{ id: "submenu_tags", icon: "2", text: "Tags", url: "/admin/knowledge-base/tags" },
			{ id: "submenu_faqs", icon: "2", text: "Frequently Asked Questions", url: "/admin/faqs" },
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
			{ id: 3, icon: "1", text: "Tickets", url: "/admin/settings/tickets" },
			{ id: 4, icon: "1", text: "Application Settings", url: "/admin/settings/application" },
			{ id: 6, icon: "1", text: "Tools", url: "/admin/settings/tools" }, //send email to users...v.v.
		]
	},

]

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function AdminLayout({ children }) {
	const [isSideBarExpanded, setIsSideBarExpanded] = useState(true)
	const { backgroundForLoggedinPage } = useSelector(getUiSettings)
	const router = useRouter()
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"))

	const sideBarExpanding = () => {
		setIsSideBarExpanded(window.innerWidth <= 960 ? false : true)
	}

	useEffect(() => {
		sideBarExpanding()
		window.addEventListener("resize", sideBarExpanding)
		return () => window.removeEventListener("resize", sideBarExpanding)
	}, [])

	useEffect(() => {
		if (router.pathname === "/admin/knowledge-base" && isSmallScreen)
			setIsSideBarExpanded(false)
	}, [router])

	return (
		<ReduxRedirect>
			<AuthCheck>

				<Box sx={{ ...backgroundForLoggedinPage }} />

				<Box style={{ display: "flex", minHeight: "100vh" }}>

					<SideBar
						isExpanded={isSideBarExpanded} toggle={setIsSideBarExpanded}
						homeUrl="/admin" settingsUrl="/admin/settings"
						data={ADMIN_MENUS}
					/>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							flexGrow: 1,
							width: "100%",
							overflowX: "hidden"
						}}
					>
						<Header isSideBarExpanded={isSideBarExpanded} />
						{children}
						<Footer />
					</Box>
				</Box>

			</AuthCheck>
		</ReduxRedirect>
	)
}
AdminLayout.propTypes = { children: PropTypes.any }

export const getLayout = page => getRootLayout(<AdminLayout>{page}</AdminLayout>)

export default AdminLayout