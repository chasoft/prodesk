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
import SettingsHeader from "./SettingsHeader"
import SettingsList from "./SettingsList"

//THIRD-PARTY


//PROJECT IMPORT

import LaunchIcon from '@material-ui/icons/Launch';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		marginTop: theme.spacing(5),
	},
	paper: {
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
	contentHelper: {
		borderBottom: `1px solid ${theme.palette.divider}`,
	},
	contentHelperTitle: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(2, 2, 2),
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(1),
			backgroundColor: "#FAFAFA",
		},
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
	rightAction: {
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: "1rem"
	},
	alert: {
		padding: theme.spacing(2),
	},
	actionBar: {
		textAlign: "right",
		padding: theme.spacing(2),
		borderTop: `1px solid ${theme.palette.divider}`,
	}
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
				icon
					? <Avatar>
						{icon}
					</Avatar>
					: null
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

export const ContentHelper = ({ title, alert, onClick, children }) => {
	const classes = useStyles()
	const theme = useTheme()
	const showBackButton = useMediaQuery(theme.breakpoints.down("xs"))

	return (
		<div className={classes.contentHelper}>
			{
				showBackButton
					? <div className={classes.contentHelperTitle}>
						<Tooltip title="Go back" placement="top">
							<IconButton size="small" onClick={onClick} style={{ marginRight: "5px" }}>
								<NavigateBeforeIcon />
							</IconButton>
						</Tooltip>
						<Typography variant="h4" style={{ margin: 0 }}>{title}</Typography>
					</div>
					: <Typography variant="button" className={classes.contentHelperTitle}>
						{title}
					</Typography>
			}

			{
				alert
					? <div className={classes.alert}>{alert}</div>
					: null
			}

			{
				children
					? <div className={classes.contentHelperText}>
						<Typography variant="caption">
							{children}
						</Typography>
					</div>
					: null
			}

		</div>
	)
}
ContentHelper.propTypes = {
	title: PropTypes.string,
	alert: PropTypes.node,
	onClick: PropTypes.func,
	children: PropTypes.node
}

export const ContentHelperLearnMore = ({ url, onClick = () => { } }) => {
	const classes = useStyles()
	return (
		<span style={{ display: "inline-block", marginLeft: "5px" }} onClick={onClick}>
			{
				url
					? <Link href={url ?? ""}>
						<a>
							<div className={classes.learnMore}>
								Learn more <LaunchIcon style={{ fontSize: 16, marginLeft: "2px" }} />
							</div>
						</a>
					</Link>
					: <div className={classes.learnMore}>
						Learn more <LaunchIcon style={{ fontSize: 16, marginLeft: "2px" }} />
					</div>
			}
		</span>
	)
}
ContentHelperLearnMore.propTypes = {
	url: PropTypes.string,
	onClick: PropTypes.func,
}

/**
 * Use this block directly inside Children of SettingsPanel
 */
export const ActionBar = ({ children }) => {
	const classes = useStyles()
	return (
		<>
			{
				children
					? <div className={classes.actionBar}>
						{children}
					</div>
					: null
			}
		</>
	)
}
ActionBar.propTypes = { children: PropTypes.node }


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const SettingsPanel = (
	{
		/* header on the top of the Box */
		title,
		titleHeading = "h2",
		rightAction,
		actionBar,
		/* List of items */
		list,
		/* content */
		helper,
		style = {},
		children,
	}
) => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			{
				(title || rightAction)
					? <div className={classes.rightAction}>
						<Typography variant={titleHeading}>{title ?? ""}</Typography>
						<div>{rightAction ?? ""}</div>
					</div>
					: null
			}

			<Paper className={classes.paper}>

				{
					list
						? <div className={classes.list}>
							{list}
						</div>
						: null
				}

				<div className={classes.content}>

					{helper ?? null}

					<div className={classes.details} style={{ ...style }}>
						{children}
					</div>

					{
						(actionBar)
							? <div className={classes.actionBar}>
								{actionBar ?? ""}
							</div>
							: null
					}

				</div>
			</Paper>
		</div>
	)
}

SettingsPanel.propTypes = {
	title: PropTypes.string,
	titleHeading: PropTypes.string,
	rightAction: PropTypes.node,
	actionBar: PropTypes.node,
	list: PropTypes.node,
	helper: PropTypes.node,
	style: PropTypes.object,
	children: PropTypes.node,
}

export default SettingsPanel