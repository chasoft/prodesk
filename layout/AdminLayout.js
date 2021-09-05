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

import React, { useState } from "react"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"

// MATERIAL-UI
import { makeStyles } from "@material-ui/core"

//THIRD-PARTY
import PerfectScrollbar from "react-perfect-scrollbar"

//PROJECT IMPORT
import Header from "../components/common/backend/Header"
import SideBar from "../components/common/backend/SideBar"
import Footer from "../components/common/Footer"
import { getUiSettings } from "../redux/selectors"
import { MENU_ITEM_TYPE } from "../helpers/constants"

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
		transition: "width .3s cubic-bezier(0.4, 0, 0.2, 1)",
	},
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
		]
	},
	{
		id: "menu_faqs",
		type: MENU_ITEM_TYPE.ITEM,
		icon: "0",
		title: "FAQs",
		description: "Frequently Asked Questions",
		url: "/admin/faqs"
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
			{ id: 1, icon: "1", text: "Site Pages", url: "/admin/settings/pages" },
			{ id: 1, icon: "1", text: "Application Settings", url: "/admin/settings/application" },
			{ id: 2, icon: "1", text: "SMTP", url: "/admin/settings/smtp" },
			{ id: 2, icon: "1", text: "Tools", url: "/admin/settings/tools" }, //send email to users...v.v.
		]
	},

]

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function AdminLayout({ children }) {
	const classes = useStyles()
	const [isSideBarExpanded, setLeftDrawerExpanded] = useState(true)
	const [scrolled, setScrolled] = useState(false)
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
				homeUrl="/admin" settingsUrl=""
				data={ADMIN_MENUS}
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
AdminLayout.propTypes = { children: PropTypes.any }

export const getLayout = page => <AdminLayout>{page}</AdminLayout>

export default AdminLayout