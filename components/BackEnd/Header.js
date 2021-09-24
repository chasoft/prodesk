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

import Link from "next/link"
import PropTypes from "prop-types"
import React, { useState } from "react"

//MATERIAL-UI
import withStyles from "@mui/styles/withStyles"
import { AppBar, Badge, Box, IconButton, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { useSelector } from "react-redux"

//PROJECT IMPORT
import UserIcon from "./UserIcon"
import NotificationDrawer from "./NotificationDrawer"
import { getPageMeta, getUiSettings } from "./../../redux/selectors"

//ASSETS
import NotificationsIcon from "@mui/icons-material/Notifications"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const StyledBadge = withStyles((theme) => ({
	badge: {
		right: 1,
		top: 6,
		border: `1px solid ${theme.palette.background.paper}`,
		padding: "0 4px",
		color: "white",
		backgroundColor: theme.palette.warning.dark
	},
}))(Badge)

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const Header = () => {
	const [showNotificationDrawer, setShowNotificationDraw] = useState(false)
	const { title } = useSelector(getPageMeta)
	const { scrolled } = useSelector(getUiSettings)

	return (
		<AppBar
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
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-start",
					fontFamily: "\"Google Sans\", Roboto, sans-serif"
				}}
			>
				{scrolled ? title : null}
			</Box>

			<div style={{ flexGrow: 1 }}></div>

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
					"& > *": { ml: 1 }
				}}
			>
				<Tooltip title="Help Center" placement="bottom">
					<Typography
						sx={{
							fontFamily: "\"Google Sans\", Roboto, sans-serif",
							cursor: "pointer",
							"&:hover": { fontWeight: 500 }
						}}
					>
						<Link href="/docs">Go to Docs</Link>
					</Typography>
				</Tooltip>

				<Tooltip title="Notifications" placement="bottom">
					<IconButton
						size="medium" color="inherit"
						onClick={() => setShowNotificationDraw(true)}
						sx={{ mx: 1 }}
					>
						<StyledBadge badgeContent={4} >
							<NotificationsIcon />
						</StyledBadge>
					</IconButton>
				</Tooltip>

				<NotificationDrawer
					isOpen={showNotificationDrawer}
					handleClose={() => setShowNotificationDraw(false)}
				/>

				<UserIcon />

			</Box>

		</AppBar>
	)
}
Header.propTypes = { scrolled: PropTypes.bool }

export default Header