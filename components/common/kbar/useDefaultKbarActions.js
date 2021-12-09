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

import React from "react"

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { setRedirect } from "@redux/slices/redirect"

//ASSETS
import HomeIcon from "@mui/icons-material/Home"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

export default function useDefaultKbarActions() {

	const dispatch = useDispatch()

	const defaultPublicActions = [
		{
			id: "phomeAction",
			name: "Documentation",
			subtitle: "Homepage",
			shortcut: [],
			keywords: "back",
			section: "Navigation",
			perform: () => dispatch(setRedirect("/")),
			icon: <HomeIcon />,
		},
		{
			id: "pdocsAction",
			name: "View all categories",
			shortcut: [],
			keywords: "help",
			section: "Navigation",
			perform: () => dispatch(setRedirect("/categories")),
		},
		{
			id: "pcontactAction",
			name: "Contact Us",
			shortcut: [],
			keywords: "email us",
			section: "Navigation",
			perform: () => dispatch(setRedirect("/contact-us")),
		}
	]

	const defaultClientActions = [
		{
			id: "homeAction",
			name: "Homepage",
			subtitle: "Client homepage",
			shortcut: [],
			keywords: "back",
			section: "Navigation",
			perform: () => dispatch(setRedirect("/client")),
			icon: <HomeIcon />,
		},
		{
			id: "viewTicketsAction",
			name: "View tickets",
			shortcut: [],
			keywords: "ticket",
			section: "Navigation",
			perform: () => dispatch(setRedirect("/client/tickets")),
		},
		{
			id: "createTicketAction",
			name: "Create new ticket",
			shortcut: [],
			keywords: "create new ticket",
			section: "Navigation",
			perform: () => dispatch(setRedirect("/client/tickets/new-ticket")),
		},
		{
			id: "myProfileAction",
			name: "My Profile",
			shortcut: [],
			keywords: "edit profile",
			section: "Navigation",
			perform: () => dispatch(setRedirect("/client/edit-profile")),
		},
		{
			id: "myAccountAction",
			name: "My Account",
			shortcut: [],
			keywords: "account",
			section: "Navigation",
			perform: () => dispatch(setRedirect("/client/account")),
		},
	]

	const defaultAdminActions = [
		{
			id: "homeAction",
			name: "Homepage",
			subtitle: "Admin homepage",
			shortcut: [],
			keywords: "back",
			section: "Navigation",
			perform: () => dispatch(setRedirect("/admin")),
			icon: <HomeIcon />,
		},
		{
			id: "manageTicketsAction",
			name: "Manage tickets",
			shortcut: [],
			keywords: "ticket",
			section: "Navigation",
			perform: () => dispatch(setRedirect("/admin/tickets")),
		},
		{
			id: "manageDocsAction",
			name: "Manage documentation",
			shortcut: [],
			keywords: "doc document documentation",
			section: "Navigation",
			perform: () => dispatch(setRedirect("/admin/documentation")),
		},
		{
			id: "manageUsersAction",
			name: "Manage users",
			shortcut: [],
			keywords: "user users",
			section: "Navigation",
			perform: () => dispatch(setRedirect("/admin/users")),
		}
	]

	return {
		defaultAdminActions,
		defaultPublicActions,
		defaultClientActions,
	}
}
