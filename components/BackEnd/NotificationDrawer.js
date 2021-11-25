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

import React, { useRef } from "react"
import Link from "next/link"
import PropTypes from "prop-types"

// MATERIAL-UI
import { makeStyles } from "@mui/styles"
import { alpha } from "@mui/material/styles"
import { Avatar, Box, Button, Drawer, IconButton, ListItem, ListItemAvatar, ListItemText, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import PerfectScrollbar from "react-perfect-scrollbar"
import { useDispatch, useSelector } from "react-redux"
import { CSSTransition, TransitionGroup } from "react-transition-group"

//PROJECT IMPORT
import useAdmin from "@helpers/useAdmin"
import { getAuth, getUiSettings } from "@redux/selectors"
import { ACTIONS } from "@redux/slices/firestoreApiConstants"
import { STATUS_FILTER, DATE_FORMAT } from "@helpers/constants"
import { setForceRefreshId, setNotificationInbox } from "@redux/slices/uiSettings"
import { readAllNotifications, readNotification, removeNotifications } from "@helpers/realtimeApi"

//ASSETS
import CloseIcon from "@mui/icons-material/Close"
import SettingsIcon from "@mui/icons-material/Settings"
import { replyLinkBuilder } from "@helpers/utils"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const NOTIFICATION_INBOXES_LIST = [
	{
		name: STATUS_FILTER.ALL,
		title: "All notifications",
		counter: "allCount",
		color: "primary"
	},
	{
		name: STATUS_FILTER.UNREAD,
		title: "Unread notifications",
		counter: "unreadCount",
		color: "primary"
	},
	{
		name: STATUS_FILTER.READ,
		title: "Read notifications",
		counter: "readCount",
		color: "primary"
	},
]

const NotificationInbox = ({ counter }) => {
	const dispatch = useDispatch()
	const { notificationInbox } = useSelector(getUiSettings)

	return (
		<ToggleButtonGroup
			exclusive
			size="small"
			color="primary"
			value={notificationInbox}
			onClick={(e) => { e.stopPropagation() }}
			onChange={(e, selectedInbox) => {
				dispatch(setNotificationInbox(selectedInbox))
			}}
			sx={{
				display: "flex",
				mb: 1,
				px: 2
			}}
		>
			{NOTIFICATION_INBOXES_LIST.map((item) => {
				return (
					<ToggleButton
						key={item.name}
						value={item.name}
						sx={{ flexGrow: 1 }}
					>
						{(item.name === STATUS_FILTER.UNREAD && counter.unreadCount > 0) &&
							<Avatar sx={{
								width: 16,
								height: 16,
								mr: 0.5,
								fontSize: 12,
								color: "white",
								backgroundColor: "warning.main"
							}}>
								{counter.unreadCount}
							</Avatar>}
						{item.name}
					</ToggleButton>
				)
			})}
		</ToggleButtonGroup>
	)
}
NotificationInbox.propTypes = {
	counter: PropTypes.object.isRequired
}

const useStyles = makeStyles({
	"enterActive": {
		opacity: 1,
		maxHeight: "135px",
		transition: "all 500ms ease-in-out"
	},
	"exitActive": {
		opacity: 0,
		height: 0,
		transition: "all 500ms ease-in-out"
	},
	"enter": {
		height: 0,
		opacity: 0
	},
	"exit": {
		// maxHeight: "135px",
		// opacity: 1
	},
	"list": {
		paddingLeft: 0
	}
})

const NotisItemContainer = ({ children, ...props }) => {
	const classes = useStyles()
	const nodeRef = useRef(null)
	return (
		<CSSTransition
			nodeRef={nodeRef}
			timeout={500}
			classNames={{
				exitActive: classes.exitActive,
				enterActive: classes.enterActive,
				enter: classes.enter,
				exit: classes.exit,
			}}
			{...props}
		>
			<div ref={nodeRef}>
				{children}
			</div>
		</CSSTransition>
	)
}
NotisItemContainer.propTypes = {
	children: PropTypes.node.isRequired,
}

const NotisItemLink = ({ notisContent }) => {
	const { isAdminURL } = useAdmin()

	const link = replyLinkBuilder({
		isAdminURL,
		actionType: notisContent.actionType,
		slug: notisContent.slug,
		trid: notisContent.trid
	})

	return (
		<Link
			passHref
			href={link}
			scroll={notisContent.actionType !== ACTIONS.ADD_TICKET_REPLY}
		>
			<Typography
				component="a"
				variant="h4"
				sx={{
					my: 0,
					color: "primary.main",
					":hover": { textDecoration: "underline", }
				}}
			>
				{notisContent.title}
				<Typography component="span" variant="body1">
					{notisContent.description}
				</Typography>
			</Typography>
		</Link >
	)
}
NotisItemLink.propTypes = {
	notisContent: PropTypes.object.isRequired,
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const NotificationDrawer = ({ isOpen, handleClose, notis, counter }) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const { currentUser } = useSelector(getAuth)
	const { notificationInbox } = useSelector(getUiSettings)

	dayjs.extend(relativeTime)

	return (
		<Drawer
			anchor="right"
			open={isOpen}
			onClose={handleClose}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "space-between",
					height: "100%",
					width: 300,
				}}
				onClick={handleClose}
				onKeyDown={handleClose}
			>
				<Box sx={{
					display: "flex",
					alignItems: "center",
					my: 1, px: 2
				}}>
					<Typography variant="h4" style={{ flexGrow: 1, fontWeight: 500 }}>
						Notifications
					</Typography>
					<Button
						size="small"
						onClick={async (e) => {
							e.stopPropagation()
							await readAllNotifications(currentUser.username)
							dispatch(setForceRefreshId(Math.random()))
						}}
						sx={{ px: 1 }}
						disabled={counter.unreadCount === 0}
					>
						Read all
					</Button>
				</Box>

				<NotificationInbox counter={counter} />

				{(notis.length === 0) &&
					<Box sx={{
						display: "flex",
						alignItems: "center",
						my: 1, px: 2
					}}>
						<Typography>
							You don&apos;t have any {(notificationInbox !== STATUS_FILTER.ALL) ? ` ${notificationInbox?.toLowerCase() ?? ""} ` : ""}  notifications
						</Typography>
					</Box>}

				<PerfectScrollbar component="div" style={{ height: "calc(100vh - 88px)" }}>
					<TransitionGroup component="ul" className={classes.list}>
						{notis.map(i => (
							<NotisItemContainer key={i.nid}>
								<ListItem
									button
									secondaryAction={
										<IconButton
											id="closeButton"
											edge="end"
											size="small"
											aria-label="delete"
											onClick={async (e) => {
												e.stopPropagation()
												await removeNotifications(currentUser.username, i.nid)
											}}
										>
											<CloseIcon />
										</IconButton>
									}
									sx={{
										"&>.MuiListItemSecondaryAction-root": { display: "none" },
										":hover": {
											"&>.MuiListItemSecondaryAction-root": {
												display: "block",
												top: "32px",
											},
											backgroundColor: i.hasBeenRead
												? "action.hover"
												: (theme) => alpha(theme.palette.primary.main, 0.2)
										},
										backgroundColor: i.hasBeenRead
											? ""
											: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
									}}
								>
									<ListItemAvatar>
										<Avatar
											alt={i.content.description}
											src={i.content.iconURL}
										/>
									</ListItemAvatar>
									<Box
										onClick={async () => {
											await readNotification(currentUser.username, i.nid)
											dispatch(setForceRefreshId(Math.random()))
										}}
										sx={{
											display: "flex",
											flexDirection: "column",
											mr: -4,
										}}
									>
										<ListItemText
											primary={
												i.content.link
													? <NotisItemLink notisContent={i.content} />
													: <Typography variant="h4" sx={{ my: 0 }}>
														{i.content.title}
														<Typography component="span" variant="body1">
															{i.content.description}
														</Typography>
													</Typography>}
										/>
										<Typography variant="body1" sx={{
											color: "grey.500",
											fontSize: "0.8rem",
											fontStyle: "italic",
										}}>
											{dayjs(i.createdAt).format(DATE_FORMAT.LONG)}
										</Typography>
										<Typography variant="body1" sx={{
											color: "grey.500",
											fontSize: "0.8rem",
											fontStyle: "italic",
										}}>
											{dayjs(i.createdAt).fromNow()}
										</Typography>
									</Box>
								</ListItem>
							</NotisItemContainer>
						))}
					</TransitionGroup>
				</PerfectScrollbar>

				<Box sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					my: 1, px: 2
				}}>
					<Button
						size="small"
						onClick={async (e) => {
							e.stopPropagation()
							await removeNotifications(currentUser.username)
						}}
						sx={{ px: 1 }}
						disabled={counter.allCount === 0}
					>
						Remove all
					</Button>
					<IconButton
						size="small"
						onClick={(e) => {
							e.stopPropagation()
							//
						}}
					>
						<SettingsIcon />
					</IconButton>
				</Box>
			</Box>
		</Drawer >
	)
}

NotificationDrawer.propTypes = {
	isOpen: PropTypes.bool,
	handleClose: PropTypes.func,
	notis: PropTypes.array,
	counter: PropTypes.object,
}

export default NotificationDrawer