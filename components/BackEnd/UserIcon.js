
/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React, { useRef, useState } from "react"

// MATERIAL-UI
import MuiPaper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import { Avatar, Box, Tooltip, IconButton, Typography, Popper, ClickAwayListener, Grow, } from "@mui/material"

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

const Paper = styled(MuiPaper)({
	transformOrigin: "top right",
})

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const UserIcon = () => {
	const [open, setOpen] = useState(false)
	const anchorRef = useRef(null)

	const handleToggle = () => { setOpen((p) => !p) }

	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const { currentUser } = useSelector(getAuth)

	return <>
		<Tooltip title="User Menu" placement="bottom">
			<IconButton onClick={handleToggle} size="large" ref={anchorRef}>
				<Avatar src="/img/default-avatar.png" sx={{ height: (theme) => theme.spacing(3), width: (theme) => theme.spacing(3) }} />
			</IconButton>
		</Tooltip>

		<Popper
			id="userInfo-popup"
			anchorEl={anchorRef.current}
			open={open}
			placement="bottom-end"
			transition
			disablePortal
			role={undefined}
		>
			{({ TransitionProps }) => (
				<ClickAwayListener onClickAway={() => { setOpen(false) }}>
					<Grow in={open} {...TransitionProps}>
						<Paper sx={{ padding: 0, width: "300px" }}>
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
									<li onClick={() => { dispatch(setRedirect("/admin")); setOpen(false) }}><SettingsIcon />Admin Dashboard</li>
								</AuthAdminTrue>
								<AuthUserTrue>
									<li onClick={() => { dispatch(setRedirect("/client")); setOpen(false) }}><SettingsIcon />Client Dashboard</li>
								</AuthUserTrue>
								<li><SettingsIcon />Profile Settings</li>
								<li onClick={() => { signOut({ enqueueSnackbar, dispatch }); setOpen(false) }}><ExitToAppIcon />Logout</li>
							</Box>
						</Paper>
					</Grow>
				</ClickAwayListener>
			)}
		</Popper>
	</>
}

export default UserIcon