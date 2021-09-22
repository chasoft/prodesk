
/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React, { useState } from "react"

// MATERIAL-UI
import { Avatar, Box, Tooltip, IconButton, Popover, Typography, } from "@mui/material"

//THIRD-PARTY
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getAuth } from "./../../redux/selectors"
import { setRedirect } from "./../../redux/slices/redirect"
import { AuthAdminTrue, AuthUserTrue } from "./../AuthCheck"
import { signOut } from "./../../helpers/userAuthentication"

//ASSETS
import SettingsIcon from "@mui/icons-material/Settings"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const UserIcon = () => {
	const [anchorEl, setAnchorEl] = useState(null)

	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const { currentUser } = useSelector(getAuth)

	const handleClick = (event) => { setAnchorEl(event.currentTarget) }
	const handleClose = () => { setAnchorEl(null) }
	const open = Boolean(anchorEl)
	const id = open ? "UserMenuPopover" : undefined

	return <>
		<Tooltip title="User Menu" placement="bottom">
			<IconButton onClick={handleClick} size="large">
				<Avatar src="/img/default-avatar.png" sx={{ height: (theme) => theme.spacing(3), width: (theme) => theme.spacing(3) }} />
			</IconButton>
		</Tooltip>

		<Popover
			id={id}
			open={open}
			anchorEl={anchorEl}
			onClose={handleClose}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "center",
			}}
			elevation={4}
		>
			<Box sx={{ padding: 0, width: "300px" }}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						padding: (theme) => theme.spacing(3, 2, 0),
					}}
				>
					<Avatar src="/img/default-avatar.png" sx={{ height: (theme) => theme.spacing(11), width: (theme) => theme.spacing(11) }} />
					<Typography variant="button">{currentUser.displayName}</Typography>
					<Typography variant="caption">{currentUser.email}</Typography>
					<Typography variant="caption">{currentUser.group} {currentUser?.role ? <> | {currentUser?.role}</> : null}</Typography>
				</Box>

				<Box
					component="ul"
					sx={{
						borderTop: "1px solid #E8EAED",
						borderBottom: "1px solid #E8EAED",
						p: 0,
						fontSize: "0.875rem",
						listStyle: "none",
						mb: 2,
						"& > li": {
							display: "flex",
							alignItems: "center",
							fontWeight: 500,
							color: "#3c4043",
							padding: (theme) => theme.spacing(1.5, 3, 1.5),
							"& > svg": {
								mr: 1,
								color: "#5F6368",
								width: (theme) => theme.spacing(3),
								height: (theme) => theme.spacing(3)
							}

						},
						"& > li:hover": {
							backgroundColor: "#F7F8F8",
							cursor: "pointer",
						}
					}}
				>
					<AuthAdminTrue>
						<li onClick={() => { dispatch(setRedirect("/admin")) }}><SettingsIcon />Admin Dashboard</li>
					</AuthAdminTrue>
					<AuthUserTrue>
						<li onClick={() => { dispatch(setRedirect("/client")) }}><SettingsIcon />Client Dashboard</li>
					</AuthUserTrue>
					<li><SettingsIcon />Profile Settings</li>
					<li onClick={() => { signOut({ enqueueSnackbar, dispatch }) }}><ExitToAppIcon />Logout</li>
				</Box>
			</Box>

		</Popover>
	</>
}

export default UserIcon