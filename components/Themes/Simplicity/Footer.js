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

import React from "react"
import Link from "next/link"
import PropTypes from "prop-types"

//MATERIAL-UI
import { useTheme } from "@mui/material/styles"
import { Box, Container, Typography } from "@mui/material"

//PROJECT IMPORT
import { Logo } from "@components/common"

//ASSETS
import GoogleIcon from "@mui/icons-material/Google"


/*****************************************************************
 * DUMMYDATA                                                     *
 *****************************************************************/

const footerLink1 = {
	title: "Use cases",
	links: [
		{
			name: "UX design",
			url: "https://chasoft.net"
		}, {
			name: "UI design",
			url: "https://chasoft.net"
		},
		{
			name: "Prototyping",
			url: "https://chasoft.net"
		},
		{
			name: "Graphic design",
			url: "https://chasoft.net"
		},
		{
			name: "Wireframing",
			url: "https://chasoft.net"
		},
		{
			name: "Brainstorming",
			url: "https://chasoft.net"
		},
		{
			name: "Template",
			url: "https://chasoft.net"
		}
	]
}

const socialLinks = [
	{
		name: "Twitter",
		url: "https://twitter.com",
		logo: {
			light: "",
			dark: ""
		}
	},
	{
		name: "Youtube",
		url: "https://twitter.com",
		logo: {
			light: "",
			dark: ""
		}
	},
	{
		name: "Instagram",
		url: "https://twitter.com",
		logo: {
			light: "",
			dark: ""
		}
	},
	{
		name: "Facebook",
		url: "https://twitter.com",
		logo: {
			light: "",
			dark: ""
		}
	}
]

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function FooterLinks({ linkGroup }) {
	return (
		<Box id="footer-links" sx={{
			"&>ul": {
				listStyle: "none",
				padding: "0",
				margin: "0",
				marginTop: "28px"
			},
			"&>ul>li>a": {
				marginBottom: "16px",
				lineHeight: "2.25em"
			},
		}}>
			<Typography variant="h4">
				{linkGroup.title}
			</Typography>
			<ul>
				{linkGroup.links.map((link, idx) => (
					<li key={idx}>
						<Link href={link.url} passHref>
							<a href="just-a-placeholder">{link.name}</a>
						</Link>
					</li>
				))}
			</ul>
		</Box>
	)
}
FooterLinks.propTypes = {
	linkGroup: PropTypes.object.isRequired,
}

function LogoAndSocial({ socialLinks }) {
	const theme = useTheme()
	return (
		<Box
			id="logo-and-social"
			sx={{
				"&>ul": {
					listStyle: "none",
					padding: "0",
					margin: "0",
					marginTop: "28px"
				},
				"&>ul>li>a": {
					marginBottom: "16px"
				},
				[theme.breakpoints.down("md")]: {
					display: "flex",
					WebkitBoxPack: "justify",
					justifyContent: "space-between",
					WebkitBoxAlign: "center",
					alignItems: "center",
					flexWrap: "wrap",
					gridColumn: "1 / -1",
					"& > ul": {
						alignItems: "baseline",
						display: "inline-flex",
						listStyle: "none",
						padding: 0,
						margin: 0,
					},
					"&>ul>li>a": {
						marginBottom: "0px"
					},
					marginTop: "28px",
				},
				[theme.breakpoints.down("sm")]: {
					"&>ul>li>a>span": {
						display: "none"
					}
				},
			}}
		>
			<Link href="/">
				<a href="just-a-placeholder">
					<Logo height="25px" />
				</a>
			</Link>

			<ul>
				{socialLinks.map((social, idx) => (
					<li key={idx}>
						<Link href={social.url}>
							<a href="just-a-placeholder" style={{
								display: "flex",
								alignItems: "center",
								marginLeft: "1.25rem"
							}}>
								<GoogleIcon sx={{ fontSize: 20, mr: 1 }} />
								<span>{social.name}</span>
							</a>
						</Link>
					</li>
				))}
			</ul>
		</Box>
	)
}
LogoAndSocial.propTypes = {
	socialLinks: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function FooterWrapper({ children }) {
	return (
		<Container id="wrap" sx={{
			marginTop: "auto",
			padding: { xs: "32px", md: "48px" }
		}}>
			{children}
		</Container>
	)
}
FooterWrapper.propTypes = {
	children: PropTypes.node.isRequired,
}

export function FooterBase({ isPreview = false }) {
	return (
		<Box component="footer" sx={{
			display: "grid",
			gridColumn: 2,
			...(isPreview
				? {}
				: { margin: "64px 0 112px" }
			),
			gridTemplateColumns: {
				xs: "repeat(1, 1fr)",
				md: "repeat(4, 1fr)"
			},
			gridGap: "48px",
			justifyContent: "space-between"
		}}>
			<LogoAndSocial socialLinks={socialLinks} />

			<FooterLinks linkGroup={footerLink1} />
			<FooterLinks linkGroup={footerLink1} />
			<LogoAndSocial socialLinks={socialLinks} />

		</Box>
	)
}
FooterBase.propTypes = {
	isPreview: PropTypes.bool
}

export function Footer() {
	return (
		<FooterWrapper>
			<FooterBase />
		</FooterWrapper>
	)
}
