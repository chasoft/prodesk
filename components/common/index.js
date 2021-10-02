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
import { styled } from "@mui/material/styles"
import { Avatar, Box, Grid, Typography } from "@mui/material"

//THIRD-PARTY
import { motion } from "framer-motion"

//PROJECT IMPORT

//ASSETS
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

/*****************************************************************
 * CONTENT                                                       *
 *****************************************************************/

export function LearnMoreAdvancedTextEditor({ text, linkText }) {
	const innerText = text ?? "If you are not familiar with our advanced text editor, learn more"
	const innerLinkText = linkText ?? "here"
	return (
		<Typography variant="caption" sx={{
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

export function Copyright({ title = null, url = null }) {
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

export const ForgotPasswordLink = () => {
	return <Typography><Link href="/forgot-password">Forgot password?</Link></Typography>
}

export const LoginLink = () => {
	return <Typography>Already a member? <Link href="/login">Log in</Link></Typography>
}

export const SignUpLink = () => {
	return <Typography>Not yet a member? <Link href="/signup">Sign up</Link></Typography>
}

export const Logo = ({ isSmall = false, theme = "light", height = "30px" }) => {
	if (isSmall) {
		return (
			<Link href="/">
				<img
					src={`/ProDesk-logo-${theme}-square.png`}
					height={height} width={height}
					style={{ cursor: "pointer" }}
					alt="Logo of ProDesk"
				/>
			</Link>
		)
	}

	return (
		<Link href="/">
			<img
				src={`/ProDesk-logo-${theme}.png`}
				height={height} width={Math.round(height * 5.25).toString()}
				style={{ cursor: "pointer" }}
				alt="Logo of ProDesk"
			/>
		</Link>
	)
}
Logo.propTypes = { isSmall: PropTypes.bool, theme: PropTypes.string, height: PropTypes.string }

export const SimpleTogglePanel = ({ title, children, isExpanded = false }) => {
	const [expanded, setExpanded] = useState(isExpanded)
	return (
		<Box sx={{ marginTop: "0.5rem" }}>
			<Box
				sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
				onClick={() => setExpanded(p => !p)}
			>
				{expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
				{title}
			</Box>

			<motion.div animate={{ opacity: expanded ? 1 : 0 }}>
				{children}
			</motion.div>
		</Box>
	)
}
SimpleTogglePanel.propTypes = {
	title: PropTypes.string,
	isExpanded: PropTypes.bool,
	children: PropTypes.any,
}

export const AvatarStyle = styled((props) => <Avatar {...props} />)(({ theme }) => ({
	cursor: "pointer",
	border: "1px solid transparent",
	"&:hover": {
		border: "1px solid",
		borderColor: theme.palette.divider,
		borderRadius: "50%"
	}
}))

export const DefaultAvatarPanel = ({ size = 32, callback, defaultAvatar }) => {
	const DefaultAvatarList = [
		{ id: 1, alt: "default avatar", url: "/default-avatar/1.png" },
		{ id: 2, alt: "default avatar", url: "/default-avatar/2.png" },
		{ id: 3, alt: "default avatar", url: "/default-avatar/3.png" },
		{ id: 4, alt: "default avatar", url: "/default-avatar/4.png" },
		{ id: 5, alt: "default avatar", url: "/default-avatar/5.png" },
	]

	return (

		<Grid container spacing={1} alignContent="space-between">
			<Grid item onClick={() => callback(defaultAvatar)}>
				<AvatarStyle alt="defaultAvatar" url={defaultAvatar} sx={{ width: size, height: size }} />
			</Grid>
			{
				DefaultAvatarList.map((avatar) => {
					return (
						<Grid item key={avatar.id} onClick={() => callback(avatar.url)}>
							<AvatarStyle alt={avatar.alt} url={avatar.url} sx={{ width: size, height: size }} />
						</Grid>
					)
				})
			}
		</Grid>

	)
}
DefaultAvatarPanel.propTypes = { size: PropTypes.number, callback: PropTypes.func, defaultAvatar: PropTypes.string }