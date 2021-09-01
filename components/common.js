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
import { Grid, Link, Typography } from "@material-ui/core"

import ExpandLessIcon from "@material-ui/icons/ExpandLess"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

/*****************************************************************
* LIBRARY IMPORT                                                *
*****************************************************************/

/*****************************************************************
 * CONTENT                                                       *
 *****************************************************************/

export function Copyright({ title = null, url = null }) {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
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

export const SignInLink = () => {
	return <Typography>Already a member? <Link href="/login">Log in</Link></Typography>
}

export const SignUpLink = () => {
	return <Typography>Not yet a member? <Link href="/signup">Sign up</Link></Typography>
}

export const Logo = ({ height = "30px" }) => {
	return <img src="/ProDesk-logo.png" height={height} width={height * 5.25} />
}
Logo.propTypes = { height: PropTypes.string, width: PropTypes.string }


export const MyAvatar = ({ size = "32px", url = "/img/default-avatar.png" }) => {
	return (
		<>
			<div style={{
				display: "block",
				position: "relative",
				backgroundImage: `url("${url}")`,
				width: { size },
				height: { size },
				backgroundSize: "cover",
				backgroundPosition: "top center",
				borderRadius: "50%",
			}}>
				<img src={url} alt="" height={size} width={size} style={{ visibility: "hidden" }} />
			</div>
		</>
	)

}
MyAvatar.propTypes = { size: PropTypes.string, url: PropTypes.string }


export const SimpleTogglePanel = ({ title, children, isExpanded = false }) => {
	const [expanded, setExpanded] = useState(isExpanded)
	return (
		<div>
			<div
				style={{ display: "flex", alignItems: "center" }}
				onClick={() => setExpanded(p => !p)}
			>
				{expanded ? <ExpandMoreIcon /> : <ExpandLessIcon />}
				{title}
			</div>
			<div style={{ display: expanded ? "block" : "none", paddingLeft: "24px" }}>
				{children}
			</div>
		</div>
	)
}
SimpleTogglePanel.propTypes = {
	title: PropTypes.string,
	isExpanded: PropTypes.bool,
	children: PropTypes.any,
}


export const DefaultAvatarPanel = ({ size = "16px" }) => {
	const DefaultAvatarList = [
		{ alt: "default avatar", url: "/default-avatar/1.png" },
		{ alt: "default avatar", url: "/default-avatar/2.png" },
		{ alt: "default avatar", url: "/default-avatar/3.png" },
		{ alt: "default avatar", url: "/default-avatar/4.png" },
		{ alt: "default avatar", url: "/default-avatar/5.png" },
		{ alt: "default avatar", url: "/default-avatar/6.png" },
		{ alt: "default avatar", url: "/default-avatar/7.png" },
		{ alt: "default avatar", url: "/default-avatar/8.png" },
		{ alt: "default avatar", url: "/default-avatar/9.png" },
		{ alt: "default avatar", url: "/default-avatar/10.png" }
	]
	return (
		<Grid container spacing={2} style={{ width: "350px" }}>
			{
				DefaultAvatarList.map((avatar, idx) => {
					return (
						<Grid item key={idx}>
							<MyAvatar size={size} url={avatar.url} />
						</Grid>
					)
				})
			}
		</Grid>
	)
}
DefaultAvatarPanel.propTypes = { size: PropTypes.string }