/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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

import Link from "next/link"
import PropTypes from "prop-types"
import React, { useCallback, useState } from "react"

// MATERIAL-UI
import { Alert, Box, Button, ButtonBase, CircularProgress, Collapse, Container, FormControlLabel, IconButton, Paper, Switch, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import EditIcon from "@mui/icons-material/Edit"
import LaunchIcon from "@mui/icons-material/Launch"
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const SettingsSwitch = React.memo(function _SettingsSwitch({
	title, state, setState, stateDescription, description
}) {
	return (
		<>
			{title &&
				<Typography variant="caption" style={{ display: "block" }}>
					{title}
				</Typography>}

			<FormControlLabel
				control={<Switch
					checked={state}
					onChange={(e) => setState(e.target.checked)}
					name="checkedB"
					color="primary" />}
				label={stateDescription[state ? 1 : 0]} />

			{description &&
				<Typography
					sx={{
						color: "grey.600",
						fontSize: "0.75rem"
					}}
				>
					{description}
				</Typography>}
		</>
	)
}, (prevProps, nextProps) => prevProps.state === nextProps.state)
SettingsSwitch.propTypes = {
	title: PropTypes.string,
	state: PropTypes.bool,
	setState: PropTypes.func,
	stateDescription: PropTypes.array,
	description: PropTypes.string
}

export function ContentGroup({ title, children }) {
	return (
		<Box id="ContentGroup" sx={{
			borderBottom: "1px solid transparent",
			borderColor: "divider",
			py: 4,
		}}>
			<Typography variant="button" sx={{ display: "block", px: 4 }}>{title}</Typography>
			{children}
		</Box>
	)
}
ContentGroup.propTypes = {
	title: PropTypes.node,
	children: PropTypes.node
}

export function ContentDescription({ children }) {
	return (
		<Typography variant="caption" sx={{
			display: "block",
			px: 4,
			py: 2,
			color: "grey.600"
		}}>
			{children}
		</Typography>
	)
}
ContentDescription.propTypes = {
	children: PropTypes.node
}

export function ContentRow({
	title,
	tooltip,
	sx,
	defaultContent,
	editModeContent,
	isUpdating,
	isModified,
	handleSave,
	handleCancel,
	children
}) {

	const [isEditMode, setIsEditMode] = useState(false)

	return (
		<Box id="ContentRow" sx={{
			display: "flex",
			flexDirection: {
				xs: "column",
				md: isEditMode ? "column" : "row"
			},
			px: { xs: 2, xss: 4 },
			py: 2,
			backgroundColor: isEditMode ? "action.hover" : "",
			":hover": {
				backgroundColor: "action.hover"
			},
			transition: "height .3s cubic-bezier(0.4, 0, 0.2, 1)",
			...sx
		}}>
			{title
				? <Box id="rowHeader" sx={{
					display: "flex",
					alignItems: "center",
					...(isEditMode
						? {
							mt: -2,
							mx: { xs: -2, xss: -4 },
							px: 4,
							py: 1,
							flexGrow: 1,
							backgroundColor: "primary.main"
						}
						: {
							width: "200px"
						})
				}}>
					<Typography
						variant="caption"
						sx={{
							color: isEditMode ? "#FFF" : "grey.600",
							fontWeight: isEditMode ? "700" : "500"
						}}

					>
						{title}
					</Typography>
					{tooltip &&
						<Tooltip arrow title={tooltip} placement="top">
							<HelpOutlineIcon
								sx={{
									ml: 0.5,
									cursor: "pointer",
									fill: (theme) => isEditMode ? "#FFF" : theme.palette.grey[600],
									fontSize: "1rem"
								}} />
						</Tooltip>}
				</Box>
				: null}

			<Box id="rowContent" sx={{ width: "100%" }}>
				{children
					? children
					: <>
						<Collapse in={!isEditMode}>
							<Box sx={{
								display: "flex",
								alignItems: "center",
								visibility: isEditMode ? "hidden" : "visible"
							}}>

								{defaultContent}

								<IconButton onClick={() => { setIsEditMode(true) }} disabled={isUpdating}>
									<EditIcon fontSize="small" />
								</IconButton>

								{isUpdating && <CircularProgress size={16} />}

							</Box>
						</Collapse>

						<Collapse in={isEditMode}>
							<Box sx={{ width: "100%" }}>
								<Box sx={{ pt: 2 }}>
									{editModeContent}
								</Box>
								<Box sx={{
									display: "flex",
									justifyContent: "flex-end",
									pb: 3, pt: 2, mt: 2,
									borderTop: "1px solid transparent",
									borderColor: "divider",
								}}>
									<Button
										onClick={() => {
											if (typeof handleCancel === "function") {
												handleCancel()
											}
											setIsEditMode(false)
										}}
										variant="outlined"
										color="primary"
										size="small"
										sx={{ px: 3, minWidth: "100px" }}
									>
										Cancel
									</Button>
									<Button
										onClick={() => {
											if (typeof handleSave === "function") {
												handleSave()
											}
											setIsEditMode(false)
										}}
										type="submit"
										variant="contained"
										color="primary"
										size="small"
										sx={{ px: 3, ml: 2, minWidth: "100px" }}
										disabled={!isModified}
									>
										Save
									</Button>
								</Box>
							</Box>
						</Collapse>
					</>}
			</Box>
		</Box >
	)
}
ContentRow.propTypes = {
	title: PropTypes.node,
	tooltip: PropTypes.string,
	sx: PropTypes.object,
	defaultContent: PropTypes.node,
	editModeContent: PropTypes.node,
	isUpdating: PropTypes.bool,
	isModified: PropTypes.bool,
	handleSave: PropTypes.func,
	handleCancel: PropTypes.func,
	children: PropTypes.node
}

/*****************************************************************
 * SETTINGS PANEL                                                *
 *****************************************************************/

export function ListTitle({ children }) {
	return (
		<Box sx={{
			padding: 2,
			color: (theme) => theme.palette.grey[600],
		}}>
			<Typography variant="caption">
				{children}
			</Typography>
		</Box>
	)
} ListTitle.propTypes = { children: PropTypes.node }

export function ListItem({ selected, icon, onClick, children }) {
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
		</ButtonBase>
	)
}
ListItem.propTypes = {
	selected: PropTypes.bool,
	icon: PropTypes.node,
	onClick: PropTypes.func,
	children: PropTypes.node
}

export function SettingsHeader({ children }) {
	return (
		<Box sx={{
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			marginBottom: "1rem"
		}}
		>{children}</Box>
	)
}
SettingsHeader.propTypes = {
	children: PropTypes.node
}

export function SettingsContainer({ children }) {
	return (
		<Paper sx={{
			display: "flex",
			mt: { xs: 3, md: 1 },
			borderRadius: 2
		}}
		>{children}</Paper>
	)
}
SettingsContainer.propTypes = {
	children: PropTypes.node
}

export function SettingsList({ showContent, sx, children }) {
	return (
		<Box
			sx={{
				backgroundColor: "#F0F0F0",
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
}
SettingsList.propTypes = {
	showContent: PropTypes.bool,
	sx: PropTypes.object,
	children: PropTypes.node
}

export function SettingsContent({ showContent = true, children }) {
	// const theme = useTheme()
	// const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
	return (
		<Box
			id="SettingsContent"
			sx={{
				// flexGrow: 1,
				// borderBottomLeftRadius: 1,
				// borderBottomRightRadius: 1,
				// flexGrow: showContent ? 1 : 0,
				display: {
					xs: showContent ? "initial" : "none", sm: "initial",
				},
				width: "100%"
			}}
		>
			{children}
		</Box>
	)
}
SettingsContent.propTypes = {
	showContent: PropTypes.bool,
	children: PropTypes.node
}

export function SettingsContentDetails({ sx, children }) {
	return (
		<Container sx={{ py: { xs: 3, sm: 2 }, ...sx }}>
			{children}
		</Container>
	)
}
SettingsContentDetails.propTypes = {
	sx: PropTypes.any,
	children: PropTypes.node
}

function ContentHeader({ sx, children }) {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				px: 3,
				py: { xs: 1, sm: 2 },
				borderTopLeftRadius: 8,
				borderTopRightRadius: 8,
				backgroundColor: { xs: "#F0F0F0", sm: "transparent" },
				...sx
			}}
		>
			{children}
		</Box>
	)
}
ContentHeader.propTypes = {
	sx: PropTypes.object,
	children: PropTypes.node
}

export const SettingsContentHeader = React.memo(function _SettingsContentHeader({ hasBackBtn = true, backBtnOnClick, rightButton, children }) {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

	const handleBackButton = useCallback(() => {
		if (typeof backBtnOnClick === "function")
			backBtnOnClick()
	}, [backBtnOnClick])

	if (isSmallScreen && hasBackBtn) {
		return (
			<ContentHeader sx={{ mb: 2 }}>
				<Box sx={{
					display: "flex",
					alignItems: "center",
					flexGrow: 1,
				}}>

					<Box sx={{
						display: "flex",
						alignItems: "center",
						flexGrow: 1
					}}>
						<Tooltip title="Go back" placement="top">
							<IconButton size="small" onClick={handleBackButton} style={{ marginRight: "5px" }}>
								<NavigateBeforeIcon />
							</IconButton>
						</Tooltip>
						<Typography variant="h4" style={{ margin: 0 }}>{children}</Typography>
					</Box>

					{rightButton}

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
})
SettingsContentHeader.propTypes = {
	hasBackBtn: PropTypes.bool,
	backBtnOnClick: PropTypes.func,
	rightButton: PropTypes.node,
	children: PropTypes.node
}

export function SettingsContentHelper({ children }) {
	return (
		<Box sx={{
			borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
			"& > div:last-child": { pt: 0 }
		}}>{children}</Box>
	)
}
SettingsContentHelper.propTypes = {
	children: PropTypes.node
}

export function ContentHelperText({ children }) {
	return (
		<Box sx={{
			color: (theme) => theme.palette.grey[600],
			px: 3,
			pb: 2,
			pt: { xs: 2, sm: 0 },
			"& > span > div:last-child": {
				marginTop: "0.5rem"
			}
		}}> {children} </Box>
	)
}
ContentHelperText.propTypes = {
	children: PropTypes.node
}

export function SettingsContentHelperText({ children }) {
	return (
		<ContentHelperText>
			<Typography component="div" variant="caption">
				{children}
			</Typography>
		</ContentHelperText>
	)
}
SettingsContentHelperText.propTypes = {
	children: PropTypes.node
}

export function SettingsContentHelperAlert({ severity, children }) {
	return (
		<ContentHelperText>
			<Alert severity={severity}>
				<Typography variant="caption">
					{children}
				</Typography>
			</Alert>
		</ContentHelperText>
	)
}
SettingsContentHelperAlert.propTypes = {
	severity: PropTypes.oneOf(["error", "warning", "info", "success"]),
	children: PropTypes.node
}

export function SettingsContentHelperLearnMore({ target, action = () => { } }) {
	if (target) {
		return (
			<Box
				component="span"
				onClick={action}
				sx={{
					display: "inline-block",
					marginLeft: "5px",
				}}
			>
				<Link href={target ?? ""} passHref>
					<a href="just-a-placeholder">
						<Box
							component="span"
							sx={{
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
		<Box
			component="span"
			onClick={action}
			sx={{ display: "inline-block", ml: "5px" }}
		>
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
		</Box>
	)
}
SettingsContentHelperLearnMore.propTypes = {
	target: PropTypes.string,
	action: PropTypes.func
}

export function SettingsContentActionBar({ children }) {
	return (
		<Box sx={{
			display: "flex",
			alignItems: "center",
			justifyContent: "flex-end",
			px: 3,
			py: { xs: 1, sm: 2 },
			backgroundColor: "#F0F0F0",
			// backgroundColor: { xs: "#F0F0F0", sm: "transparent" },
			"> *:last-child": {
				ml: 2,
				minWidth: 100
			},
			borderBottomLeftRadius: 8,
			borderBottomRightRadius: 8,
		}}>{children}</Box>
	)
}

SettingsContentActionBar.propTypes = {
	children: PropTypes.node
}