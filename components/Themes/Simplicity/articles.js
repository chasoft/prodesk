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

import React, { useState } from "react"
import Link from "next/link"
import PropTypes from "prop-types"

//MATERIAL-UI
import { useTheme } from "@mui/material/styles"
import { Box, Breadcrumbs, Typography } from "@mui/material"

//PROJECT IMPORT
import SimplicityLayout from "@components/Themes/Simplicity/layout"
import { CustomButtonContained } from "@components/Themes/Simplicity/Buttons/Contained"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const BreadcrumbsBox = () => {
	return (
		<Breadcrumbs aria-label="breadcrumb">
			<Link underline="hover" href="/">
				MUI
			</Link>
			<Link
				underline="hover"
				href="/getting-started/installation/"
			>
				Core
			</Link>
			<Typography color="text.primary">Breadcrumbs</Typography>
		</Breadcrumbs>
	)
}

const Article = () => {
	return (
		<Box id="article" sx={{
			flex: { xs: "1 0 auto", mdd: "1 0 32%" },
			minWidth: { xs: 0, mdd: "400px" },
			marginRight: { xs: 0, mdd: "66px" },
			"& *>a": { color: "primary.main" },
			"& *>h1, h2, h3": { fontWeight: 700 }
		}}>

			<Box component="nav" sx={{
				marginBottom: "24px"
			}}>
				<BreadcrumbsBox />
			</Box>

			<Box component="header">
				<Typography variant="h1" sx={{
					flexBasis: "100%",
					fontSize: { xs: "24px", sm: "32px" },
					lineHeight: { xs: "28px", sm: "36px" },
					marginBottom: "24x"
				}}>
					Import Sketch files
				</Typography>
			</Box>

			<Box id="article-info">

			</Box>


			<Box component="footer">
				<Box id="article-votes" sx={{
					padding: "0 0 10px",
					textAlign: "center",
					marginTop: "100px",
					marginBottom: "100px"
				}}>
					<Box component="span" sx={{
						color: "#282828",
						fontSize: "18px",
						lineHeight: "19px",
						fontWeight: "500"
					}}>
						Was this article helpful?
					</Box>
					<Box id="article-votes-controls" sx={{
						marginTop: "20px",
						"&button": {
							background: "#fff",
							margin: "10px 5px",
							minWidth: "125px",
							width: "auto",
							padding: "2px 16px",
							border: "2px solid #000",
							borderRadius: "8px"
						},
						"&button:hover": {
							backgroundColor: "#efefef"
						}
					}}>
						<CustomButtonContained variant="outlined">
							Yes, thanks!
						</CustomButtonContained>
						<CustomButtonContained variant="outlined">
							Not really
						</CustomButtonContained>
					</Box>

				</Box>

			</Box>

		</Box>
	)
}

const SideBarFloatButton = ({ handleShowFloatButton }) => {
	return (
		<Typography
			variant="h3"
			onClick={() => handleShowFloatButton(p => !p)}
			sx={{
				display: { xs: "block", mdd: "none" },
				cursor: "pointer",
				fontSize: "1em",
				position: "relative",
				fontWeight: "500",
				borderWidth: "2px 0 2px 2px",
				borderStyle: "solid",
				borderColor: "#000",
				padding: "6px 10px",
				borderRadius: "4px 0 0 4px",
				backgroundColor: "#fff"
			}}>
			...
		</Typography>
	)
}
SideBarFloatButton.propTypes = {
	handleShowFloatButton: PropTypes.func.isRequired
}

const SideBarContent = ({ showFloatButton }) => {
	const theme = useTheme()
	return (
		<Box component="ol" sx={{
			listStyle: "none",
			display: showFloatButton ? "block" : "none",
			marginTop: "0",
			paddingLeft: "0px",
			[theme.breakpoints.down("mdd")]: {
				position: "fixed",
				right: "35px",
				zIndex: "1",
				top: "230px",
				maxWidth: "331px",
				border: "solid 2px #000",
				backgroundColor: "#fff",
				padding: "15px",
				margin: "0 0 0 20px",
				maxHeight: "50vh",
				overflow: "scroll"
			}
		}}>

			{[
				{ id: 1, title: "book1" },
				{ id: 2, title: "book2" },
				{ id: 2, title: "book3" },
			].map(item => {
				return (
					<li
						key={item.id}
					>
						{item.title}
					</li>

				)
			})}

		</Box>
	)
}
SideBarContent.propTypes = {
	showFloatButton: PropTypes.bool,
}

const ArticleSideBar = () => {
	const theme = useTheme()
	const [showFloatButton, setShowFloatButton] = useState(false)
	return (
		<Box component="section" id="collapsible-sidebar" sx={{
			flex: 1,
			marginLeft: "0px",
			position: "sticky",
			right: "0",
			top: "230px",
			zIndex: "9",
			padding: 0,
			[theme.breakpoints.up("mdd")]: {
				position: "sticky",
				right: "auto",
				top: "172px",
				zIndex: "0",
			},
		}}>

			<Box component="section" sx={{
				flex: { xs: 1, mdd: "0 0 20%" },
				margin: "0",
				zIndex: "1",
				maxHeight: { xs: "45px", mdd: "none" }

			}}>

				<Box id="article-toc" sx={{
					[theme.breakpoints.down("mdd")]: {
						position: "fixed",
						right: "0",
						top: "230px"
					}
				}}>
					<SideBarFloatButton handleShowFloatButton={setShowFloatButton} />

					<SideBarContent showFloatButton={showFloatButton} />
				</Box>

			</Box>

		</Box>
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const ThemeSimplicityArticles = () => {
	return (
		<SimplicityLayout>

			<Box id="article-content-area" sx={{
				display: "flex",
				flexDirection: { xs: "column", mdd: "row-reverse" }
			}}>

				<ArticleSideBar />

				<Article />

			</Box>

		</SimplicityLayout >
	)
}

export default ThemeSimplicityArticles