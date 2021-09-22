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
import { styled } from "@mui/material/styles"
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
				onClick={onClick}
				sx={{
					padding: (theme) => theme.spacing(1, 3, 1),
					display: "flex",
					alignItems: "center",
					"&:hover": {
						backgroundColor: selected ? "#e8f0fe" : "action.hover",
						cursor: "pointer",
					},
					bgcolor: selected ? "#e8f0fe" : "",
					color: selected ? "#1967d2" : ""
				}}
			>
				{icon}
				<Typography variant="button" sx={{ ml: 2 }}>
					{children}
				</Typography>
			</Box>
		</ButtonBase>
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

export const SettingsList = ({ sx, children }) => (
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
			...sx
		}}
	>{children}</Box>
); SettingsList.propTypes = { sx: PropTypes.object, children: PropTypes.node }

export const SettingsContent = ({ sx, children }) => {
	// const theme = useTheme()
	// const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
	return (
		<Box
			sx={{
				flexGrow: 1,
				// borderBottomLeftRadius: 1,
				// borderBottomRightRadius: 1,
				...sx
			}}>
			{children}
		</Box>
	)
}; SettingsContent.propTypes = { sx: PropTypes.object, children: PropTypes.node }

export const SettingsContentDetails = ({ sx, children }) => (
	<Container sx={{ py: { xs: 3, sm: 2 }, ...sx }}>
		{children}
	</Container>
); SettingsContentDetails.propTypes = { sx: PropTypes.any, children: PropTypes.node }

const ContentHeader = ({ children }) => (
	<Box sx={{
		display: "flex",
		alignItems: "center",
		px: 3,
		py: { xs: 1, sm: 2 },
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		backgroundColor: { xs: "#FAFAFA", sm: "transparent" },
	}}> {children} </Box>
); ContentHeader.propTypes = { children: PropTypes.node }

export const SettingsContentHeader = ({ hasBackBtn = true, backBtnOnClick = () => { }, children }) => {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

	if (isSmallScreen && hasBackBtn) {
		return (
			<ContentHeader>
				<Tooltip title="Go back" placement="top">
					<IconButton size="small" onClick={() => backBtnOnClick()} style={{ marginRight: "5px" }}>
						<NavigateBeforeIcon />
					</IconButton>
				</Tooltip>
				<Typography variant="h4" style={{ margin: 0 }}>{children}</Typography>
			</ContentHeader>
		)
	}

	if (isSmallScreen && hasBackBtn === false) {
		return (
			<ContentHeader>
				<Typography variant="h4" style={{ margin: 0 }}>{children}</Typography>
			</ContentHeader>
		)
	}

	return (
		<ContentHeader>
			<Typography variant="button">{children}</Typography>
		</ContentHeader>
	)
}
SettingsContentHeader.propTypes = {
	hasBackBtn: PropTypes.bool,
	backBtnOnClick: PropTypes.func,
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
		<Typography variant="caption">
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

const LearnMore = styled(Box)({
	display: "flex",
	alignItems: "center",
	color: "primary.main",
	cursor: "pointer",
	textDecoration: "underline"
})

export const SettingsContentHelperLearnMore = ({ target, action = () => { } }) => {
	if (target) {
		return (
			<span style={{ display: "inline-block", marginLeft: "5px" }} onClick={action}>
				<Link href={target ?? ""}>
					<a>
						<LearnMore>
							Learn more <LaunchIcon style={{ fontSize: 16, marginLeft: "2px" }} />
						</LearnMore>
					</a>
				</Link>
			</span>
		)
	}

	return (
		<span style={{ display: "inline-block", marginLeft: "5px" }} onClick={action}>
			<LearnMore>
				Learn more <LaunchIcon style={{ fontSize: 16, marginLeft: "2px" }} />
			</LearnMore>
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
		backgroundColor: { xs: "#FAFAFA", sm: "transparent" },
		"> *:last-child": {
			ml: 2,
			minWidth: 100
		},
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
	}}>{children}</Box>
); SettingsContentActionBar.propTypes = { children: PropTypes.node }