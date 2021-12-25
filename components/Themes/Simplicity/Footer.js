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

import React, { useMemo, useRef } from "react"
import Link from "next/link"
import PropTypes from "prop-types"

//MATERIAL-UI
import { useTheme } from "@mui/material/styles"
import { orderBy } from "lodash"
import { Avatar, Box, Container, Typography } from "@mui/material"

//PROJECT IMPORT
import useAppSettings from "@helpers/useAppSettings"
import { COLUMN_TYPE } from "@components/Settings/MenuSettings"

import {
	APP_SETTINGS,
} from "@helpers/constants"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function FooterLinks({ column }) {
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
				{column.label}
			</Typography>
			<ul>
				{orderBy(column.children, ["order"]).map(item => {
					return (
						<li key={item.id} >
							<Link href={item.slug} passHref>
								<a href="just-a-placeholder" className="aniLink">{item.label}</a>
							</Link>
						</li>
					)
				})}
			</ul>
		</Box>
	)
}
FooterLinks.propTypes = {
	column: PropTypes.object.isRequired,
}

function LogoAndSocial({ column }) {
	const theme = useTheme()
	return (
		<Box
			id="logo-and-social"
			sx={{
				marginRight: { xs: 0, md: 5 },
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
						marginBottom: "0px",
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
					<img
						style={{
							maxWidth: column?.maxWidth ?? "200px"
						}}
						alt="Footer logo"
						src={column?.logoUrl ? column.logoUrl : "/img/no-image.png"}
					/>
				</a>
			</Link>

			{column.description ?
				<Typography sx={{
					pt: 2,
					pb: { xs: 2, md: 0 },
					fontSize: "0.9rem",
					textAlign: "justify"
				}}>
					{column.description}
				</Typography> : null}

			<ul>
				{orderBy(column.children, ["order"]).map((social) => (
					<li key={social.id}>
						<Link href={social.slug} passHref>
							<Box component="a" href="just-a-placeholder" sx={{
								display: "flex",
								alignItems: "center",
								marginLeft: { xs: "0.35rem", sm: "1.2rem", md: 0 }
							}}>
								<Avatar
									variant="square"
									src={social?.logoUrl ? social.logoUrl : "/img/no-image.png"}
									sx={{
										width: 28,
										height: 28,
										mr: 1,
										"& >img": {
											objectFit: "contain"
										}
									}} />
								<span>{social.label}</span>
							</Box>
						</Link>
					</li>
				))}
			</ul>
		</Box>
	)
}
LogoAndSocial.propTypes = {
	column: PropTypes.object.isRequired,
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
	const sortedList = useRef([])

	const {
		data: { footerMenu = {} },
		isLoading: isLoadingFooterMenu
	} = useAppSettings(null, APP_SETTINGS.footerMenu)

	sortedList.current = useMemo(() => {
		return orderBy(footerMenu, ["order"])
	}, [footerMenu])

	if (isLoadingFooterMenu) return null

	return (
		<Box component="footer" sx={{
			display: "grid",
			gridColumn: 2,
			...(isPreview
				? {}
				: { margin: "64px 0 112px" }
			),
			gridTemplateColumns: {
				xs: "repeat(2, 1fr)",
				md: `repeat(${sortedList.current.length}, 1fr)`
			},
			gridGap: "48px",
			justifyContent: "space-between"
		}}>
			{sortedList.current.map(column => {

				if (column.type === COLUMN_TYPE.LINK)
					return (
						<FooterLinks
							key={column.id}
							column={column}
						/>
					)

				if (column.type === COLUMN_TYPE.IMAGE)
					return (
						<LogoAndSocial
							key={column.id}
							column={column}
						/>
					)
			})}
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
