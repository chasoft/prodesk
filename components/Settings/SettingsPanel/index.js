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

import React from "react"
import Link from "next/link"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Alert, Box, ButtonBase, Container, IconButton, Paper, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import LaunchIcon from "@mui/icons-material/Launch"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const ListTitle = ({ children }) => (
	<Box sx={{
		padding: 2,
		color: (theme) => theme.palette.grey[600],
	}}>
		<Typography variant="caption">
			{children}
		</Typography>
	</Box>
); ListTitle.propTypes = { children: PropTypes.node }

export const ListItem = ({ selected, icon, onClick, children }) => {
	return (
		<ButtonBase sx={{ display: "block", width: "100%", textAlign: "left" }}>
			<Box
				onClick={onClick ?? (() => { })}
				sx={{
					padding: (theme) => theme.spacing(1, 3, 1),
					display: "flex",
					alignItems: "center",
					"&:hover": {
						backgroundColor: selected ? "#e8f0fe" : "action.hover",
						transition: "background-color 400ms cubic-bezier(0.4, 0, 0.2, 1)",
						cursor: "pointer",
					},
					bgcolor: selected ? "#e8f0fe" : "",
					color: selected ? "#1967d2" : ""
				}}
			>
				{icon ?? ""}
				<Typography variant="button" sx={{ ml: 2 }}>
					{children}
				</Typography>
			</Box>
		</ButtonBase >
	)
}
ListItem.propTypes = {
	selected: PropTypes.bool,
	icon: PropTypes.node,
	onClick: PropTypes.func,
	children: PropTypes.node
}

export const SettingsHeader = ({ children }) => (
	<Box sx={{
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: "1rem"
	}}
	>{children}</Box>
); SettingsHeader.propTypes = { children: PropTypes.node }

export const SettingsContainer = ({ children }) => (
	<Paper sx={{
		display: "flex",
		mt: { xs: 3, md: 1 },
		borderRadius: 2
	}}
	>{children}</Paper>
); SettingsContainer.propTypes = { children: PropTypes.node }

export const SettingsList = ({ showContent, sx, children }) => (
	<Box
		sx={{
			backgroundColor: "#FAFAFA",
			borderTopLeftRadius: "0.5rem",
			borderBottomLeftRadius: "0.5rem",
			minWidth: {
				xs: 20 * 8,
				sm: 27 * 8,
				lg: 37 * 8
			},
			maxWidth: {
				xs: "100%",
				sm: 27 * 8,
				lg: 37 * 8
			},
			padding: (theme) => theme.spacing(1, 0, 1),
			// display: { xs: "none", sm: "initial" },
			borderTopRightRadius: { xs: "0.5rem", md: 0 },
			borderBottomRightRadius: { xs: "0.5rem", md: 0 },
			//
			flexGrow: showContent ? 0 : 1,
			display: {
				xs: showContent ? "none" : "initial",
				sm: "initial",
			},
			...sx
		}}
	>
		{children}
	</Box>
)
SettingsList.propTypes = {
	showContent: PropTypes.bool,
	sx: PropTypes.object,
	children: PropTypes.node
}

export const SettingsContent = ({ showContent = true, children }) => {
	// const theme = useTheme()
	// const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
	return (
		<Box
			sx={{
				flexGrow: 1,
				// borderBottomLeftRadius: 1,
				// borderBottomRightRadius: 1,
				// flexGrow: showContent ? 1 : 0,
				display: {
					xs: showContent ? "initial" : "none", sm: "initial",
				}
			}}
		>
			{children}
		</Box>
	)
}; SettingsContent.propTypes = { showContent: PropTypes.bool, children: PropTypes.node }

export const SettingsContentDetails = ({ sx, children }) => (
	<Container sx={{ py: { xs: 3, sm: 2 }, ...sx }}>
		{children}
	</Container>
); SettingsContentDetails.propTypes = { sx: PropTypes.any, children: PropTypes.node }

const ContentHeader = ({ children }) => (
	<Box sx={{
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		px: 3,
		py: { xs: 1, sm: 2 },
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		backgroundColor: { xs: "#FAFAFA", sm: "transparent" },
	}}> {children} </Box>
); ContentHeader.propTypes = { children: PropTypes.node }

export const SettingsContentHeader = ({ hasBackBtn = true, backBtnOnClick = () => { }, rightButton, children }) => {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

	if (isSmallScreen && hasBackBtn) {
		return (
			<ContentHeader>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Tooltip title="Go back" placement="top">
						<IconButton size="small" onClick={() => backBtnOnClick()} style={{ marginRight: "5px" }}>
							<NavigateBeforeIcon />
						</IconButton>
					</Tooltip>
					<Typography variant="h4" style={{ margin: 0 }}>{children}</Typography>
				</Box>
			</ContentHeader>
		)
	}

	if (isSmallScreen && hasBackBtn === false) {
		return (
			<ContentHeader>
				<Typography variant="h4" style={{ margin: 0 }}>{children}</Typography>
				{rightButton}
			</ContentHeader>
		)
	}

	return (
		<ContentHeader>
			<Typography variant="button">{children}</Typography>
			{rightButton}
		</ContentHeader>
	)
}
SettingsContentHeader.propTypes = {
	hasBackBtn: PropTypes.bool,
	backBtnOnClick: PropTypes.func,
	rightButton: PropTypes.node,
	children: PropTypes.node
}

export const SettingsContentHelper = ({ children }) => (
	<Box sx={{
		borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
		"& > div:last-child": { pt: 0 }
	}}>{children}</Box>
); SettingsContentHelper.propTypes = { children: PropTypes.node }

const ContentHelperText = ({ children }) => (
	<Box sx={{
		color: (theme) => theme.palette.grey[600],
		px: 3,
		pb: 2,
		pt: { xs: 2, sm: 0 },
		"& > span > div:last-child": {
			marginTop: "0.5rem"
		}
	}}> {children} </Box>
); ContentHelperText.propTypes = { children: PropTypes.node }

export const SettingsContentHelperText = ({ children }) => (
	<ContentHelperText>
		<Typography component="div" variant="caption">
			{children}
		</Typography>
	</ContentHelperText>
); SettingsContentHelperText.propTypes = { children: PropTypes.node }

export const SettingsContentHelperAlert = ({ severity, children }) => (
	<ContentHelperText>
		<Alert severity={severity}>
			<Typography variant="caption">
				{children}
			</Typography>
		</Alert>
	</ContentHelperText>
)
SettingsContentHelperAlert.propTypes = {
	severity: PropTypes.oneOf(["error", "warning", "info", "success"]),
	children: PropTypes.node
}

export const SettingsContentHelperLearnMore = ({ target, action = () => { } }) => {
	if (target) {
		return (
			<Box
				onClick={action}
				sx={{
					display: "inline-block",
					marginLeft: "5px",
				}}
			>
				<Link href={target ?? ""} passHref>
					<a href="just-a-placeholder">
						<Box sx={{
							display: "flex",
							alignItems: "center",
							color: "primary.main",
							cursor: "pointer",
							":hover": {
								textDecoration: "underline",
							}
						}}>
							Learn more <LaunchIcon style={{ fontSize: 16, marginLeft: "2px" }} />
						</Box>
					</a>
				</Link>
			</Box>
		)
	}

	return (
		<span style={{ display: "inline-block", marginLeft: "5px" }} onClick={action}>
			<Box sx={{
				display: "flex",
				alignItems: "center",
				color: "primary.main",
				cursor: "pointer",
				":hover": {
					textDecoration: "underline",
				}
			}}>
				Learn more <LaunchIcon style={{ fontSize: 16, marginLeft: "2px" }} />
			</Box>
		</span>
	)
}
SettingsContentHelperLearnMore.propTypes = { target: PropTypes.string, action: PropTypes.func }

export const SettingsContentActionBar = ({ children }) => (
	<Box sx={{
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		px: 3,
		py: { xs: 1, sm: 2 },
		backgroundColor: "#FAFAFA",
		// backgroundColor: { xs: "#FAFAFA", sm: "transparent" },
		"> *:last-child": {
			ml: 2,
			minWidth: 100
		},
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
	}}>{children}</Box>
); SettingsContentActionBar.propTypes = { children: PropTypes.node }