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

import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"

//MATERIAL-UI
import { AppBar, Badge, Box, IconButton, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { useKBar } from "kbar"
import { isEqual } from "lodash"
import { useSnackbar } from "notistack"
import { isMobile } from "react-device-detect"
import { useDeepCompareEffect } from "react-use"
import { useSelector, useDispatch } from "react-redux"

//PROJECT IMPORT
import UserIcon from "./UserIcon"
import NotificationDrawer from "./NotificationDrawer"
import { useNotifications } from "@helpers/realtimeApi"
import { setShowSideBar } from "@redux/slices/uiSettings"

//ASSETS
import MenuIcon from "@mui/icons-material/Menu"
import NotificationsIcon from "@mui/icons-material/Notifications"
import SearchIcon from "@mui/icons-material/Search"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function Header() {
	const dispatch = useDispatch()
	const { enqueueSnackbar, closeSnackbar } = useSnackbar()
	const [scrolled, setScrolled] = useState(false)

	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const title = useSelector(s => s.pageMetaState.title)
	const isSmallScreen = useSelector(s => s.uiSettingsState.isSmallScreen)

	const { notis, counter } = useNotifications(currentUser.username, enqueueSnackbar, closeSnackbar)
	const [showNotificationDrawer, setShowNotificationDraw] = useState(false)

	const { query } = useKBar()

	useEffect(() => {
		const handleSetScrolled = () => {
			setScrolled(window.scrollY > 50)
		}
		window.addEventListener("scroll", handleSetScrolled)
		return () => window.removeEventListener("scroll", handleSetScrolled)
	}, [])

	useDeepCompareEffect(() => {
		console.log("Header", { notis })
	}, [notis])

	return (
		<AppBar
			id="Top"
			sx={{
				position: "sticky", top: 0,
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
				padding: (theme) => theme.spacing(0.5, 2, 0.5, 2),
				transition: "width .3s cubic-bezier(0.4, 0, 0.2, 1)",
				width: "100%"
			}}
			elevation={scrolled ? 4 : 0}
		>

			<Box sx={{
				display: isMobile ? "flex" : { xs: "flex", sm: "none" },
				alignItems: "center"
			}}>
				<IconButton
					onClick={() => {
						if (isSmallScreen || isMobile)
							dispatch(setShowSideBar(true))
					}}
				>
					<Box component={MenuIcon} sx={{ fill: "white" }} />
				</IconButton>

				<Typography variant="subtitle2">ProDesk</Typography>

			</Box>

			<Typography
				sx={{
					display: isMobile ? "none" : { xs: "none", sm: "flex" },
					flexGrow: 1,
					alignItems: "center",
					justifyContent: "flex-start",
					fontFamily: "\"Google Sans\", Roboto, sans-serif",
					fontSize: "1.1rem",
					fontWeight: 500
				}}
			>
				{title}
			</Typography>

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
					"& > *": { ml: 1 }
				}}
			>
				<Tooltip arrow title="Searching..." placement="left">
					<Typography
						sx={{
							display: "flex",
							alignItems: "center",
							fontFamily: "\"Google Sans\", Roboto, sans-serif",
							cursor: "pointer",
							fontSize: "1rem",
							"&:hover": { fontWeight: 500 }
						}}
						onClick={query.toggle}
					>
						<SearchIcon />
						Ctrl+K
					</Typography>
				</Tooltip>

				<Tooltip arrow title="Notifications" placement="bottom">
					<IconButton
						size="medium" color="inherit"
						onClick={() => setShowNotificationDraw(true)}
						sx={{ mx: 1 }}
					>
						<Badge badgeContent={counter.unreadCount} color="warning">
							<NotificationsIcon />
						</Badge>
					</IconButton>
				</Tooltip>

				<NotificationDrawer
					isOpen={showNotificationDrawer}
					handleClose={() => setShowNotificationDraw(false)}
					notis={notis}
					counter={counter} />

				<UserIcon />

			</Box>

		</AppBar>
	)
}
Header.propTypes = { scrolled: PropTypes.bool }

export default Header