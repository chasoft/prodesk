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
import { Box, Typography } from "@mui/material"

//PROJECT IMPORT
import SimplicityLayout from "@components/Themes/Simplicity/layout"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ThemeSimplicitySections() {
	return (
		<SimplicityLayout>

			<Box id="category-content" sx={{
				padding: { xs: "20", xss: "32px", md: "48px" },
				marginTop: { xs: "-50px", smm: 0 },
				"& #article-item > a": {
					color: "primary.main"
				},
				"& #article-item > a:hover": {
					textDecoration: "underline"
				}
			}}>
				<Box component="header">
					<Typography variant="h1" sx={{
						fontWeight: 700,
						margin: "10px 0 32px 0",
						fontSize: "32px",
						lineHeight: "48px"
					}}>
						Get started
					</Typography>


					<Typography>
						Category description here Category description here Category description here Category description here Category description here Category description here Category description here
					</Typography>


				</Box>

				<Box component="ul" sx={{
					listStyle: "none",
					margin: "0",
					padding: "0"
				}}>

					<Box component="li" id="sub-category" sx={{
						flex: "0 0 45%",
						marginBottom: { xs: "40px", lgg: "78px" },
						paddingTop: "10px"
					}}>
						<Typography variant="h2" sx={{
							marginBottom: "24px",
							marginTop: "24px",
							fontSize: "24px",
							fontWeight: 700,
							"&>a": {
								borderBottom: "3px solid transparent",
								paddingBottom: "2px"
							}
						}}>
							<Link href="/" passHref>
								<a href="just-a-placeholder">
									{"What's new?"}
								</a>
							</Link>
						</Typography>
						<Box component="ul" id="articles-list" sx={{
							listStyle: "none",
							margin: "0",
							padding: "0",
							display: "flex",
							flexWrap: "wrap",
							paddingBottom: "10px",
							"&>li": {
								flex: "1 0 390px",
								maxWidth: "100%",
								marginBottom: "15px"
							},
							"&>li>a": {
								fontSize: "16px",
								lineHeight: "140%"
							}
						}}>
							<li id="article-item">
								<Link href="/" passHref>
									<a href="just-a-placeholder">
										Beta features
									</a>
								</Link>
							</li>
							<li id="article-item">
								<Link href="/" passHref>
									<a href="just-a-placeholder">
										{"What's new from Config 2021?"}
									</a>
								</Link>
							</li>
						</Box>
					</Box>

					<li id="sub-category">
						<Typography variant="h2" sx={{
							marginBottom: "12px",
							marginTop: "24px",
							fontSize: "24px",
							fontWeight: 700,
							"&>a": {
								borderBottom: "3px solid transparent",
								paddingBottom: "2px"
							}
						}}>
							<Link href="/" passHref>
								<a href="just-a-placeholder">
									Setup Figma
								</a>
							</Link>
						</Typography>

						<Typography>
							SubCategory description here Category description here Category description here Category description here Category description here Category description here Category description here
						</Typography>

						<Box component="ul" id="articles-list" sx={{
							listStyle: "none",
							margin: "0",
							padding: "0",
							display: "flex",
							flexWrap: "wrap",
							paddingTop: "12px",
							paddingBottom: "10px",
							"&>li": {
								flex: "1 0 390px",
								maxWidth: "100%",
								marginBottom: "21px"
							},
							"&>li>a": {
								fontSize: "16px",
								lineHeight: "140%"
							}
						}}>
							<li id="article-item">
								<Link href="/" passHref>
									<a href="just-a-placeholder">
										{"Change Figma's language using Google Chrome"}
									</a>
								</Link>
							</li>
							<li id="article-item">
								<Link href="/" passHref>
									<a href="just-a-placeholder">
										Create a Figma account
									</a>
								</Link>
							</li>
							<li id="article-item">
								<Link href="/" passHref>
									<a href="just-a-placeholder">
										Figma browser requirements
									</a>
								</Link>
							</li>
							<li id="article-item">
								<Link href="/" passHref>
									<a href="just-a-placeholder">
										Configure your browser for Figma
									</a>
								</Link>
							</li>
							<li id="article-item">
								<Link href="/" passHref>
									<a href="just-a-placeholder">
										Use shortcuts and quick actions
									</a>
								</Link>
							</li>
							<li id="article-item">
								<Link href="/" passHref>
									<a href="just-a-placeholder">
										Can I work offline with Figma?
									</a>
								</Link>
							</li>
						</Box>
					</li>


				</Box>


			</Box>




		</SimplicityLayout>
	)
}

export default ThemeSimplicitySections