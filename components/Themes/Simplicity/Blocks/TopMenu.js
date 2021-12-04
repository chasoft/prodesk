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

//MATERIAL-UI
import { Box } from "@mui/material"

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function TopMenu() {
	return (
		<Box id="user-nav" component="nav" sx={{
			display: { xs: "none", md: "block" },
			"&>ul": {
				display: "flex",
				listStyle: "none",
				margin: "0",
				padding: "0"
			},
			"&>ul>li": {
				padding: "0 0",
				position: "relative"
			},
			"&>ul>li>a:not(:only-child):after": {
				content: "url(\"/themes/simplicity/menu-arrow.svg\")",
				display: "inline-block",
				marginLeft: "6px",
				verticalAlign: "text-top"
			},
			"&>ul>li:hover": {
				"&>.sub-menu": {
					display: "flex",
					flexDirection: "column"
				}
			},
			"&>ul>li>a": {
				border: "0",
				color: "#000000",
				display: "inline-block",
				fontSize: "18px",
				fontWeight: "500",
				padding: "16px 16px",
				width: "auto",
				letterSpacing: "0.03em"
			},
			"&>ul>li>.sub-menu": {
				backgroundColor: "#fff",
				border: "3px solid #000",
				display: "none",
				position: "absolute",
				marginBottom: "16px",
				maxHeight: "calc(100vh - 156px) !important",
				overflowY: "auto",
				padding: "8px 0",
				top: "46px",
				whiteSpace: "pre-wrap",
				width: "max-content",
				zIndex: "9999"
			},
			"&>ul>li>.sub-menu>li": {
				display: "block",
				padding: "12px 22px"
			},
			"&>ul>li>.sub-menu>li>a": {
				border: "0",
				color: "#000000",
				display: "inline-block",
				fontSize: "18px",
				fontWeight: "400",
				width: "auto",
				letterSpacing: "0.03em"
			},
			"&>ul>li>.sub-menu>li>a:hover": {
				textDecoration: "underline",
				textDecorationThickness: "3px",
				textUnderlineOffset: "5px"
			}
		}}>
			<ul>
				<li>
					<Link href="/">
						<a href="just-a-placeholder">Getting Started</a>
					</Link>
					<ul className="sub-menu">
						<li>
							<Link href="/">
								<a href="just-a-placeholder">What&apos;s new?</a>
							</Link>
						</li>
						<li>
							<Link href="/">
								<a href="just-a-placeholder">Setup Figma</a>
							</Link>
						</li>
						<li>
							<Link href="/">
								<a href="just-a-placeholder">Files and Projects</a>
							</Link>
						</li>
					</ul>
				</li>


				<li>
					<Link href="/">
						<a href="just-a-placeholder">Figma design</a>
					</Link>
					<ul className="sub-menu">
						<li>
							<Link href="/">
								<a href="just-a-placeholder">Subcat 1 - book 2</a>
							</Link>
						</li>
						<li>
							<Link href="/">
								<a href="just-a-placeholder">Subcat 2 - book 2</a>
							</Link>
						</li>
						<li>
							<Link href="/">
								<a href="just-a-placeholder">Subcat 3 - book 2</a>
							</Link>
						</li>
					</ul>
				</li>

			</ul>

		</Box>
	)
}