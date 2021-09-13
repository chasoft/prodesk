
/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React, { useState } from "react"
import Link from "next/link"

// MATERIAL-UI
import { Avatar, Box, Tooltip, Chip, ClickAwayListener, Divider, Grid, IconButton, List, ListItemIcon, ListItemText, makeStyles, Paper, Popover, Popper, Typography } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { getAuth } from "../../../redux/selectors"

//THIRD-PARTY


//PROJECT IMPORT


//ASSETS
import SettingsIcon from "@material-ui/icons/Settings"
import { useTheme } from "@material-ui/styles"
import { useSnackbar } from "notistack"
import { signOut } from "../../../helpers/userAuthentication"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AuthAdminTrue, AuthUserTrue } from "../../AuthCheck"
import { setRedirect } from "../../../redux/slices/redirect"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	typography: {
		padding: theme.spacing(2)
	},
	box: {
		padding: theme.spacing(0),
		width: "300px"
	},
	info: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: theme.spacing(3, 2, 0),

	},
	avatar: {
		height: theme.spacing(11),
		width: theme.spacing(11)
	},
	avatarIcon: {
		height: theme.spacing(3),
		width: theme.spacing(3)
	},
	widget: {
		padding: theme.spacing(1, 3, 1)
	},
	menu: {
		borderTop: "1px solid #E8EAED",
		borderBottom: "1px solid #E8EAED",
		padding: theme.spacing(0),
		fontSize: "0.875rem",
		listStyle: "none",
		marginBottom: 0,
		"& > li": {
			display: "flex",
			alignItems: "center",
			fontWeight: 500,
			color: "#3c4043",
			padding: theme.spacing(1.5, 3, 1.5),
			"& > svg": {
				marginRight: theme.spacing(1),
				color: "#5F6368",
				width: theme.spacing(3),
				height: theme.spacing(3)
			}

		},
		"& > li:hover": {
			backgroundColor: "#F7F8F8",
			cursor: "pointer",
		}
	},
	terms: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: theme.spacing(2)
		// padding: theme.spacing(0, 3, 0.5),
		// "& > *": {
		// 	margin: theme.spacing(0.5)
		// }
	},
	link: {
		color: theme.palette.primary.main,
		padding: theme.spacing(0.5),
		"&:hover": {
			backgroundColor: "#f7f8f8",
			cursor: "pointer",
		}
	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const UserIcon = () => {
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = useState(null)

	const dispatch = useDispatch()
	const { enqueueSnackbar } = useSnackbar()
	const { currentUser } = useSelector(getAuth)

	const handleClick = (event) => { setAnchorEl(event.currentTarget) }
	const handleClose = () => { setAnchorEl(null) }
	const open = Boolean(anchorEl)
	const id = open ? "UserMenuPopover" : undefined

	return (
		<>
			<Tooltip title="User Menu" placement="bottom">
				<IconButton onClick={handleClick}>
					<Avatar src="/img/default-avatar.png" className={classes.avatarIcon} />
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
				<Box className={classes.box}>
					<div className={classes.info}>
						<Avatar src="/img/default-avatar.png" className={classes.avatar} />
						<Typography variant="button">{currentUser.displayName}</Typography>
						<Typography variant="caption">{currentUser.email}</Typography>
						<Typography variant="caption">{currentUser.group} {currentUser?.role ? <> | {currentUser?.role}</> : null}</Typography>
					</div>

					<ul className={classes.menu}>
						<AuthAdminTrue>
							<li onClick={() => { dispatch(setRedirect("/admin")) }}><SettingsIcon />Admin Dashboard</li>
						</AuthAdminTrue>
						<AuthUserTrue>
							<li onClick={() => { dispatch(setRedirect("/client")) }}><SettingsIcon />Client Dashboard</li>
						</AuthUserTrue>
						<li><SettingsIcon />Profile Settings</li>
						<li onClick={() => { signOut({ enqueueSnackbar, dispatch }) }}><ExitToAppIcon />Logout</li>
					</ul>
					<div className={classes.terms}>
						{/* <Typography className={classes.link}>Terms</Typography> • <Typography className={classes.link}>Privacy</Typography> */}
					</div>
				</Box>

			</Popover>
		</>
	)
}

export default UserIcon