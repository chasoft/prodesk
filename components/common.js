/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║          ProDesk - Your Elegant & Powerful Ticket System          ║ *
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
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

import React, { useState } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core"
import { motion } from "framer-motion"
import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

/*****************************************************************
* LIBRARY IMPORT                                                *
*****************************************************************/

/*****************************************************************
* HELPERS                                                        *
*****************************************************************/

const useStyles = makeStyles((theme) => ({
	avatar: {
		cursor: "pointer",
		border: "1px solid transparent",
		"&:hover": {
			border: "1px solid",
			borderColor: theme.palette.divider,
			borderRadius: "50%"
		}
	}
}))

/*****************************************************************
 * CONTENT                                                       *
 *****************************************************************/

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

export const Logo = ({ theme = "light", height = "30px" }) => {
	return <img src={`/ProDesk-logo-${theme}.png`} height={height} width={height * 5.25} />
}
Logo.propTypes = { theme: PropTypes.string, height: PropTypes.string }

export const SimpleTogglePanel = ({ title, children, isExpanded = false }) => {
	const [expanded, setExpanded] = useState(isExpanded)
	return (
		<div style={{ marginTop: "0.5rem" }}>
			<div
				style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
				onClick={() => setExpanded(p => !p)}
			>
				{expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
				{title}
			</div>
			{/* <Collapse in={expanded} style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
				{children}
			</Collapse> */}

			<motion.div animate={{ opacity: expanded ? 1 : 0 }}>
				{children}
			</motion.div>
		</div>
	)
}
SimpleTogglePanel.propTypes = {
	title: PropTypes.string,
	isExpanded: PropTypes.bool,
	children: PropTypes.any,
}

export const DefaultAvatarPanel = ({ size = 32, callback }) => {
	const classes = useStyles()
	const DefaultAvatarList = [
		{ id: 1, alt: "default avatar", url: "/default-avatar/1.png" },
		{ id: 2, alt: "default avatar", url: "/default-avatar/2.png" },
		{ id: 3, alt: "default avatar", url: "/default-avatar/3.png" },
		{ id: 4, alt: "default avatar", url: "/default-avatar/4.png" },
		{ id: 5, alt: "default avatar", url: "/default-avatar/5.png" },
	]
	return (

		<Grid container spacing={1} alignContent="space-between">
			{
				DefaultAvatarList.map((avatar) => {
					return (
						<Grid item key={avatar.id} onClick={() => callback(avatar.id)} className={classes.avatar}>
							<Avatar alt={avatar.alt} url={avatar.url} style={{ width: size, height: size }} />
						</Grid>
					)
				})
			}
		</Grid>

	)
}
DefaultAvatarPanel.propTypes = { size: PropTypes.number, callback: PropTypes.func }