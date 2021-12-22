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

import React, { useState } from "react"
import PropTypes from "prop-types"
import Link from "next/link"

// MATERIAL-UI
import { Avatar, Box, CircularProgress, Collapse, Grid, LinearProgress, TextField, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { REDIRECT_URL } from "@helpers/constants"

//ASSETS
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

/*****************************************************************
 * CONTENT                                                       *
 *****************************************************************/

function LearnMoreAdvancedTextEditor({ text, linkText }) {
	const innerText = text ?? "If you are not familiar with our advanced text editor, learn more"
	const innerLinkText = linkText ?? "here"
	return (
		<Typography variant="caption" sx={{
			mr: 2,
			fontStyle: "italic",
			"&>a": {
				color: "primary.main"
			}
		}}>
			{innerText}
			<Link href="/docs/text-editor" passHref>
				<a href="just-a-placeholder" target="_blank" rel="noopener noreferrer" style={{ marginLeft: "5px" }}>
					{innerLinkText}
				</a>
			</Link>
		</Typography>
	)
}
LearnMoreAdvancedTextEditor.propTypes = { text: PropTypes.string, linkText: PropTypes.string }

function Copyright({ title = null, url = null }) {
	return (
		<Typography color="textSecondary" align="center">
			{"Copyright © "}
			{new Date().getFullYear()}
			{" - "}
			<Link color="inherit" href={url ?? "https://labs.chasoft.net"}>
				{title ?? "Chasoft Labs"}
			</Link>
		</Typography>
	)
}
Copyright.propTypes = { title: PropTypes.string, url: PropTypes.string }

function ForgotPasswordLink() {
	return <Typography><Link href="/forgot-password">Forgot password?</Link></Typography>
}

function LoginLink() {
	return <Typography>Already a member? <Link href={REDIRECT_URL.LOGIN}>Log in</Link></Typography>
}

function SignUpLink() {
	return <Typography>Not yet a member? <Link href="/signup">Sign up</Link></Typography>
}

function Logo({ isSmall = false, theme = "light", height = "30px", style = {} }) {
	if (isSmall) {
		return (
			<Link href="/" passHref>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={`/ProDesk-logo-${theme}-square.png`}
					height={height} width={height}
					alt="Logo of ProDesk"
					style={{ cursor: "pointer", ...style }}
				/>
			</Link>
		)
	}

	return (
		<Link href="/" passHref>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={`/ProDesk-logo-${theme}.png`}
				height={height} width={Math.round(height * 5.25).toString()}
				alt="Logo of ProDesk"
				style={{ cursor: "pointer", ...style }}
			/>
		</Link>
	)
}
Logo.propTypes = {
	isSmall: PropTypes.bool,
	theme: PropTypes.string,
	height: PropTypes.string,
	style: PropTypes.object
}

function SimpleTogglePanel({ title, children, isExpanded = false }) {
	const [expanded, setExpanded] = useState(isExpanded)
	return (
		<Box sx={{ marginTop: "0.5rem" }}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					cursor: "pointer",
					mb: 1
				}}
				onClick={() => setExpanded(p => !p)}
			>
				{expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
				{title}
			</Box>

			<Collapse in={expanded}>
				{children}
			</Collapse>
		</Box>
	)
}
SimpleTogglePanel.propTypes = {
	title: PropTypes.string,
	isExpanded: PropTypes.bool,
	children: PropTypes.any,
}

function DefaultAvatarPanel({ size = 45, callback }) {

	const DefaultAvatarList = [
		{ id: 0, alt: "Default Avatar", url: "/avatar/default.png" },
		{ id: 2, alt: "Avatar 2", src: "/avatar/2.png" },
		{ id: 1, alt: "Avatar 1", src: "/avatar/1.png" },
		{ id: 3, alt: "Avatar 3", src: "/avatar/3.png" },
		{ id: 4, alt: "Avatar 4", src: "/avatar/4.png" },
		{ id: 5, alt: "Avatar 5", src: "/avatar/5.png" },
	]

	return (
		<Grid container spacing={1} alignContent="space-between">

			{DefaultAvatarList.map((avatar) => (
				<Grid item key={avatar.id}>
					<Avatar
						alt={avatar.alt}
						src={avatar.src}
						sx={{
							cursor: "pointer",
							border: "1px solid transparent",
							"&:hover": {
								border: "3px solid",
								borderColor: "white",
								borderRadius: "50%",
								boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
							},
							width: size,
							height: size
						}}
						onClick={() => callback(avatar.src)}
					/>
				</Grid>
			))}

		</Grid>
	)
}
DefaultAvatarPanel.propTypes = { size: PropTypes.number, callback: PropTypes.func, defaultAvatar: PropTypes.string }

function CircularProgressBox({ text, minHeight = "200px", sx }) {
	return (
		<Box sx={{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			minHeight: { minHeight },
			...sx
		}}>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<CircularProgress />{text ? <Typography ml={2}>{text}</Typography> : null}
			</Box>
		</Box>
	)
}
CircularProgressBox.propTypes = {
	text: PropTypes.string,
	minHeight: PropTypes.string,
	sx: PropTypes.object
}

function LinearProgressWithLabel(props) {
	return (
		<Box display="flex" alignItems="center" sx={{ ...props.sx }}>
			<Box width="100%" mr={1}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box minWidth={35}>
				<Typography variant="body2" color="textSecondary">
					{`${Math.round(props.value)}%`}
				</Typography>
			</Box>
		</Box>
	)
}
LinearProgressWithLabel.propTypes = {
	value: PropTypes.number.isRequired,
	sx: PropTypes.object
}

export function InputBaseStyled({ sx, ...others }) {
	const [minRows, setMinRows] = useState(1)
	return (
		<TextField
			fullWidth
			variant="outlined"
			minRows={minRows}
			onBlur={() => setMinRows(1)}
			onFocus={() => setMinRows(3)}
			sx={{
				color: "grey.800",
				borderColor: "divider",
				"& > div input": {
					padding: "12px 14px"
				},
				...sx
			}}
			{...others} />
	)
}
InputBaseStyled.propTypes = {
	sx: PropTypes.object
}

export {
	/********************************/
	Logo,
	Copyright,
	LoginLink,
	SignUpLink,
	ForgotPasswordLink,
	/********************************/
	DefaultAvatarPanel,
	/********************************/
	LearnMoreAdvancedTextEditor,
	/********************************/
	CircularProgressBox,
	LinearProgressWithLabel,
	/********************************/
	SimpleTogglePanel,
}