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
import PropTypes from "prop-types"
import Link from "next/link"

//MATERIAL-UI
import { IconButton, makeStyles, Paper, Typography } from "@material-ui/core"
import { Avatar } from "@material-ui/core"
import { AppBar } from "@material-ui/core"

//THIRD-PARTY
import clsx from "clsx"


//PROJECT IMPORT


//ASSETS
import NotificationsIcon from "@material-ui/icons/Notifications"
import NotificationDrawer from "./NotificationDrawer"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: theme.spacing(0.5, 2, 0.5, 2),
		// width: `calc(100% - ${68}px)`,
		transition: "width .3s cubic-bezier(0.4, 0, 0.2, 1)"
	},
	headerLeft: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
	},
	headerRight: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		"& > *": {
			marginLeft: theme.spacing(1)
		}
	},
	avatar: {
		height: theme.spacing(4),
		width: theme.spacing(4),
	},
	avatarOutline: {
		border: "1px dashed ",
		borderRadius: "50%",
		padding: theme.spacing(0.4),
		"&:hover": {
			cursor: "pointer",
			borderColor: "blue"
		}
	},
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const Header = ({ isSideBarExpanded, scrolled }) => {
	const classes = useStyles()
	// const [scrolled, setScrolled] = useState(false)
	const [showNotificationDrawer, setShowNotificationDraw] = useState(false)

	// const animateHeader = () => {
	// 	setScrolled(window.scrollY > 50 ? true : false)
	// }

	// useEffect(() => {
	// 	window.addEventListener("scroll", animateHeader)
	// 	return () => window.removeEventListener("scroll", animateHeader)
	// }, [])

	return (
		<AppBar
			position="sticky"
			className={clsx([classes.root, classes.nav_bg])}
			elevation={scrolled ? 4 : 0}
		>
			<div className={classes.headerLeft}>
				LeftAAA
			</div>

			<div style={{ flexGrow: 1 }}></div>

			<div className={classes.headerRight}>
				<Link href="/"><Typography>Go to docs</Typography></Link>

				<IconButton
					aria-label="delete" color="inherit"
					onClick={() => setShowNotificationDraw(p => !p)}
				>
					<NotificationsIcon />
				</IconButton>
				<NotificationDrawer isOpen={showNotificationDrawer} toggle={setShowNotificationDraw} />

				<Link href="/admin/profile">
					<IconButton aria-label="delete" color="primary" className={classes.avatarOutline}>
						<Avatar className={classes.avatar} src="/img/default-avatar.png" />
					</IconButton>
				</Link>
			</div>


		</AppBar>
	)
}
Header.propTypes = { isSideBarExpanded: PropTypes.bool, scrolled: PropTypes.bool }

export default Header