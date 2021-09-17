/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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

import React from "react"
import Link from "next/link"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Avatar, IconButton, makeStyles, Paper, Tooltip, Typography, useMediaQuery, useTheme } from "@material-ui/core"

//THIRD-PARTY


//PROJECT IMPORT

import LaunchIcon from "@material-ui/icons/Launch"
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore"


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		marginTop: theme.spacing(5),
	},
	container: {
		display: "flex",
		marginTop: theme.spacing(1),
		[theme.breakpoints.down("xs")]: {
			marginTop: theme.spacing(3),
		},
	},
	list: {
		backgroundColor: "#FAFAFA",
		borderBottomLeftRadius: "0.5rem",
		borderTopLeftRadius: "0.5rem",
		minWidth: theme.spacing(37),
		padding: theme.spacing(1, 0, 1),
		[theme.breakpoints.down("sm")]: {
			minWidth: theme.spacing(27)
		},
		[theme.breakpoints.down("xs")]: {
			display: "none",
			borderTopRightRadius: "0.5rem",
			borderBottomRightRadius: "0.5rem",
		},
	},
	content: {
		flexGrow: 1,
	},
	contentHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(2, 2, 2),
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(1),
			backgroundColor: "#FAFAFA",
		},
	},
	contentHelper: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	contentHelperText: {
		padding: theme.spacing(0, 2, 0),
		color: theme.palette.grey[600],
		paddingBottom: theme.spacing(2),
		[theme.breakpoints.down("xs")]: {
			paddingTop: theme.spacing(1),
		},
		"& > span > div:last-child": {
			marginTop: "0.5rem"
		}
	},
	learnMore: {
		display: "flex",
		alignItems: "center",
		color: theme.palette.primary.main,
		cursor: "pointer",
		textDecoration: "underline"
	},
	listTitle: {
		padding: theme.spacing(2),
		color: theme.palette.grey[600],
	},
	listItem: {
		padding: theme.spacing(1, 3, 1),
		display: "flex",
		alignItems: "center",
		"& > :first-child": {
			marginRight: "12px",
			width: theme.spacing(3),
			height: theme.spacing(3)
		},
		"&:hover": {
			backgroundColor: theme.palette.action.hover,
			cursor: "pointer",
		}
	},
	details: {
		padding: theme.spacing(2, 3, 2),
	},
	alert: {
		padding: theme.spacing(2),
	},
}))

export const ListTitle = ({ children }) => {
	const classes = useStyles()
	return (
		<div className={classes.listTitle}>
			<Typography variant="caption">
				{children}
			</Typography>
		</div>
	)
}
ListTitle.propTypes = { children: PropTypes.node }

export const ListItem = ({ icon, onClick, children }) => {
	const classes = useStyles()
	return (
		<div className={classes.listItem} onClick={onClick}>
			{
				icon ? <Avatar>{icon}</Avatar> : null
			}
			<Typography variant="button">
				{children}
			</Typography>
		</div>
	)
}
ListItem.propTypes = {
	icon: PropTypes.node,
	onClick: PropTypes.func,
	children: PropTypes.node
}

export const SettingsHeader = ({ children }) => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				marginBottom: "1rem"
			}}
		>
			{children}
		</div>
	)
}
SettingsHeader.propTypes = { children: PropTypes.node }

export const SettingsContainer = ({ children }) => {
	const classes = useStyles()
	return (
		<Paper className={classes.container}>
			{children}
		</Paper>
	)
}
SettingsContainer.propTypes = { children: PropTypes.node }

export const SettingsList = ({ children }) => {
	const classes = useStyles()
	return (
		<div className={classes.list}>
			{children}
		</div>
	)
}
SettingsList.propTypes = { children: PropTypes.node }

export const SettingsContent = ({ children }) => {
	const classes = useStyles()
	return (
		<div className={classes.content} >
			{children}
		</div>
	)
}
SettingsContent.propTypes = { children: PropTypes.node }

export const SettingsContentHeader = ({ hasBackBtn, backBtnOnClick, children }) => {
	const theme = useTheme()
	const classes = useStyles()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"))

	if (isSmallScreen && hasBackBtn) {
		return (
			<div className={classes.contentHeader}>
				<Tooltip title="Go back" placement="top">
					<IconButton size="small" onClick={backBtnOnClick} style={{ marginRight: "5px" }}>
						<NavigateBeforeIcon />
					</IconButton>
				</Tooltip>
				<Typography variant="h4" style={{ margin: 0 }}>{children}</Typography>
			</div>
		)
	}

	if (isSmallScreen && hasBackBtn === false) {
		return (
			<div className={classes.contentHeader}>
				<Typography variant="h4" style={{ margin: 0 }}>{children}</Typography>
			</div>
		)
	}

	return (
		<Typography variant="button" className={classes.contentHeader}>
			{children}
		</Typography>
	)
}
SettingsContentHeader.propTypes = {
	hasBackBtn: PropTypes.bool,
	backBtnOnClick: PropTypes.func,
	children: PropTypes.node
}

export const SettingsContentHelper = ({ children }) => {
	const classes = useStyles()
	return (
		<div className={classes.contentHelper}>
			{children}
		</div>
	)
}
SettingsContentHelper.propTypes = { children: PropTypes.node }

export const SettingsContentHelperText = ({ children }) => {
	const classes = useStyles()
	return (
		<div className={classes.contentHelperText}>
			<Typography variant="caption">
				{children}
			</Typography>
		</div>
	)
}
SettingsContentHelperText.propTypes = { children: PropTypes.node }

export const SettingsContentHelperAlert = ({ children }) => {
	const classes = useStyles()
	return (
		<div className={classes.contentHelperText}>
			<Typography variant="caption">
				{children}
			</Typography>
		</div>
	)
}
SettingsContentHelperAlert.propTypes = { children: PropTypes.node }

export const SettingsContentHelperLearnMore = ({ target, action = () => { } }) => {
	const classes = useStyles()

	if (target) {
		return (
			<span style={{ display: "inline-block", marginLeft: "5px" }} onClick={action}>
				<Link href={target ?? ""}>
					<a>
						<div className={classes.learnMore}>
							Learn more <LaunchIcon style={{ fontSize: 16, marginLeft: "2px" }} />
						</div>
					</a>
				</Link>
			</span>
		)
	}

	return (
		<span style={{ display: "inline-block", marginLeft: "5px" }} onClick={action}>
			<div className={classes.learnMore}>
				Learn more <LaunchIcon style={{ fontSize: 16, marginLeft: "2px" }} />
			</div>
		</span>
	)
}
SettingsContentHelperLearnMore.propTypes = { target: PropTypes.string, action: PropTypes.func }

export const SettingsContentActionBar = ({ children }) => {
	const classes = useStyles()
	return (
		<div className={classes.actionBar}>
			{children}
		</div>
	)
}
SettingsContentActionBar.propTypes = { children: PropTypes.node }