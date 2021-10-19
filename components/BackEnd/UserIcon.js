
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
import { signOut } from "./../../helpers/firebase/logout"
import { setRedirect } from "./../../redux/slices/redirect"
import { AuthAdminTrue, AuthUserTrue } from "./../AuthCheck"

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
	const [anchorEl, setAnchorEl] = useState(null)

	const handleToggle = (e) => {
		setAnchorEl(e.currentTarget)
		setOpen(prev => !prev)
	}

	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const { currentUser } = useSelector(getAuth)

	return <>
		<Tooltip title="User Menu" placement="bottom">
			<IconButton onClick={handleToggle} size="large">
				<Avatar
					src="/img/default-avatar.png"
					sx={{
						height: (theme) => theme.spacing(3),
						width: (theme) => theme.spacing(3)
					}}
				/>
			</IconButton>
		</Tooltip>

		<Popper
			id="userInfo-popup"
			open={open}
			anchorEl={anchorEl}
			placement="bottom-end"
			transition
			disablePortal
			role={undefined}
		>
			{({ TransitionProps }) => (
				<ClickAwayListener onClickAway={() => { setOpen(false) }}>
					<Grow in={open} {...TransitionProps}>
						<Paper
							elevation={0}
							sx={{
								overflow: "visible",
								filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
								mt: 1.5,
								padding: 0, width: "300px",
								"&:before": {
									content: "\"\"",
									display: "block",
									position: "absolute",
									top: 0,
									right: 18,
									width: 10,
									height: 10,
									bgcolor: "background.paper",
									transform: "translateY(-50%) rotate(45deg)",
									zIndex: 0,
								}
							}}
						>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									padding: (theme) => theme.spacing(3, 2, 0),
								}}
							>
								<Avatar
									src="/img/default-avatar.png"
									sx={{
										height: (theme) => theme.spacing(11),
										width: (theme) => theme.spacing(11)
									}}
								/>
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
									<li onClick={() => {
										dispatch(setRedirect("/admin"))
										setOpen(false)
									}}>
										<SettingsIcon />Admin Dashboard
									</li>
								</AuthAdminTrue>

								<AuthUserTrue>
									<li onClick={() => {
										dispatch(setRedirect("/client"))
										setOpen(false)
									}}>
										<SettingsIcon />Client Dashboard
									</li>
								</AuthUserTrue>

								<li><SettingsIcon />Profile Settings</li>

								<li
									onClick={() => {
										signOut({ enqueueSnackbar, dispatch })
										setOpen(false)
									}}
									style={{ borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}
								>
									<ExitToAppIcon />Logout
								</li>

							</Box>
						</Paper>
					</Grow>
				</ClickAwayListener>
			)}
		</Popper>
	</>
}

export default UserIcon