/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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

import Link from "next/link"
import React, { useState } from "react"

// MATERIAL-UI
import { styled } from "@mui/system"
import { Box, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { Logo } from "./../../../common"

//ASSETS
import MenuIcon from "@mui/icons-material/Menu"
import MailIcon from "@mui/icons-material/Mail"
import { DUMMY_DATA_MENU_BOTTOM, DUMMY_DATA_MENU_TOP } from "./DUMMY_DATA"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const ListItemStyle = styled(ListItem)({ color: "#1a73e8" })

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function LeftIcon() {
	const [showMenu, setShowMenu] = useState(false)

	const handleClose = () => { setShowMenu(false) }

	return (
		<>
			<IconButton
				edge="start" size="large" sx={{ mr: { xs: 0, sm: 2 } }}
				onClick={() => { setShowMenu(true) }}
			>
				<Box component={MenuIcon} sx={{ fontSize: 24 }} />
			</IconButton>
			<Drawer
				anchor="left"
				open={showMenu}
				onClose={handleClose}
			>
				<Box
					sx={{ width: 300, height: "100%", display: "flex", flexDirection: "column", alignItems: "space-between" }}
					onClick={handleClose}
					onKeyDown={handleClose}
				>
					<List>
						<Link href="/" passHref>
							<a href="just-a-placeholder">
								<ListItem sx={{ p: 3 }}>
									<Logo />
								</ListItem>
							</a>
						</Link>

						{DUMMY_DATA_MENU_TOP.map((item) => (
							<Link key={item.id} href={item.url} passHref>
								<a href="just-a-placeholder">
									<ListItemStyle button sx={{ pl: 4, xy: 1 }}>
										<ListItemIcon sx={{ minWidth: 40 }}>
											<MailIcon />
										</ListItemIcon>
										<ListItemText primary={item.title} />
									</ListItemStyle>
								</a>
							</Link>
						))}

						<Link href="/" passHref>
							<a href="just-a-placeholder">
								<ListItemStyle button sx={{ pl: 4, xy: 1 }}>
									<ListItemText primary="Privacy" />
								</ListItemStyle>
							</a>
						</Link>
					</List>

					<div style={{ flexGrow: 1 }} />

					<List sx={{ mb: 3 }}>
						{DUMMY_DATA_MENU_BOTTOM.map((item) => (
							<Link key={item} href={item.url} passHref>
								<a href="just-a-placeholder">
									<ListItemStyle button sx={{ pl: 4, xy: 1 }}>
										<ListItemIcon sx={{ minWidth: 40 }}>
											<MailIcon />
										</ListItemIcon>
										<ListItemText primary={item.title} />
									</ListItemStyle>
								</a>
							</Link>
						))}
					</List>

				</Box>
			</Drawer>
		</>
	)
}

export default LeftIcon