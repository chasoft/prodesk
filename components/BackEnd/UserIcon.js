
/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React from "react"
import Link from "next/link"

// MATERIAL-UI
import { Avatar, Box, Tooltip, IconButton, Typography } from "@mui/material"

//THIRD-PARTY
import { useSnackbar } from "notistack"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import useAdmin from "@helpers/useAdmin"
import { getAuth } from "@redux/selectors"
import { REDIRECT_URL } from "@helpers/constants"
import { signOut } from "@helpers/firebase/logout"
import usePopupContainer from "@components/common/usePopupContainer"
import { AuthStaffTrue, AuthUserTrue } from "@components/AuthCheck"

//ASSETS
import SettingsIcon from "@mui/icons-material/Settings"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import AccountBoxIcon from "@mui/icons-material/AccountBox"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const UserIcon = () => {
	const [
		PopupContainer,
		open,
		anchorRef,
		{
			handleToggle,
			handleClose
		}
	] = usePopupContainer()

	const dispatch = useDispatch()
	const { isAdminURL } = useAdmin()
	const { enqueueSnackbar } = useSnackbar()
	const { currentUser } = useSelector(getAuth)

	return <>
		<Tooltip arrow title="User Menu" placement="bottom">
			<IconButton
				size="small"
				ref={anchorRef}
				onClick={handleToggle}
			>
				<Avatar
					alt={currentUser.displayName}
					src={currentUser.photoURL ?? "/avatar/default.png"}
				/>
			</IconButton>
		</Tooltip>

		<PopupContainer
			open={open}
			anchorRef={anchorRef}
			handleClose={handleClose}
			placement="bottom-end"
			transformOrigin="top right"
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
					src={currentUser.photoURL ?? "/avatar/default.png"}
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
				onClick={handleClose}
			>
				<AuthStaffTrue>
					<Link href={REDIRECT_URL.ADMIN.INDEX} passHref>
						<li>
							<SettingsIcon />Admin Dashboard
						</li>
					</Link>
				</AuthStaffTrue>

				<AuthUserTrue>
					<Link href={REDIRECT_URL.CLIENT.INDEX} passHref>
						<li>
							<SettingsIcon />Client Dashboard
						</li>
					</Link>
				</AuthUserTrue>

				<Link href={isAdminURL ? REDIRECT_URL.ADMIN.EDIT_PROFILE : REDIRECT_URL.CLIENT.EDIT_PROFILE} passHref>
					<li>
						<AccountBoxIcon />Profile Settings
					</li>
				</Link>

				<Box
					component="li"
					onClick={() => { signOut({ enqueueSnackbar, dispatch }) }}
					style={{ borderBottomLeftRadius: "4px", borderBottomRightRadius: "4px" }}
				>
					<ExitToAppIcon />Logout
				</Box>

			</Box>

		</PopupContainer>
	</>
}

export default UserIcon