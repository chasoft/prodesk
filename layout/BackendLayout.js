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

const DUMMYDATA = [
	{
		id: "1",
		type: MENU_ITEM_TYPE.ITEM,
		icon: "0",
		title: "Tickets",
		url: "/admin/tickets"
	},
	{
		id: "2",
		type: MENU_ITEM_TYPE.ITEM,
		icon: "0",
		title: "Users",
		url: "/admin/users"
	},
	{
		id: "3",
		type: MENU_ITEM_TYPE.GROUP,
		expanded: false,
		icon: "0",
		title: "Blog",
		description: "Managing your blogs",
		items: [
			{ id: 1, icon: "1", text: "Blogs", url: "" },
			{ id: 2, icon: "1", text: "Add a blog post", url: "" },
			{ id: 2, icon: "1", text: "Categories", url: "" }
		]
	},
	{
		id: "4",
		type: MENU_ITEM_TYPE.GROUP,
		expanded: false,
		icon: "0",
		title: "Pages",
		description: "Managing custom pages",
		items: [
			{ id: 1, icon: "1", text: "Pages", url: "" },
			{ id: 2, icon: "1", text: "Add a page", url: "" },
		]
	},
	{
		id: "5",
		type: MENU_ITEM_TYPE.GROUP,
		expanded: false,
		icon: "0",
		title: "Knowledge Base",
		description: "Configuring the app....",
		items: [
			{ id: 1, icon: "1", text: "All documents", url: "" },
			{ id: 2, icon: "1", text: "Add new document", url: "" },
			{ id: 3, icon: "2", text: "Categories", url: "" },
			{ id: 4, icon: "2", text: "Tags", url: "" },
		]
	},
	{
		id: "6",
		type: MENU_ITEM_TYPE.GROUP,
		expanded: false,
		icon: "0",
		title: "Settings",
		description: "Configuring ProDesk",
		items: [
			{ id: 1, icon: "1", text: "Application Settings", url: "" },
			{ id: 2, icon: "1", text: "SMTP", url: "" },
		]
	},

]

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function BackendLayout({ children }) {
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
				data={DUMMYDATA}
			/>

			<PerfectScrollbar
				component="div" className={classes.content}
				onScrollY={(e) => { if (e.scrollTop > 50) { setScrolled(true) } else { setScrolled(false) } }}
			>

				<Header isSideBarExpanded={isSideBarExpanded} scrolled={scrolled} />

				<Container maxWidth="md" style={{ minHeight: "100vh" }}>

					{children}

				</Container>

				<Footer />
			</PerfectScrollbar>

		</div>
	)
}
BackendLayout.propTypes = { children: PropTypes.any }

export const getLayout = page => <BackendLayout>{page}</BackendLayout>

export default BackendLayout