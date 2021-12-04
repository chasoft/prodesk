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

//MATERIAL-UI
import { Box, Typography } from "@mui/material"

//PROJECT IMPORT
import { CustomContainer } from "@components/Themes/Simplicity/Blocks/CustomContainer"
import { CustomButtonContained } from "@components/Themes/Simplicity/Buttons/Contained"
import { CustomButtonOutlined } from "@components/Themes/Simplicity/Buttons/Outlined"

/*****************************************************************
 * CUSTOM COMPONENTS                                             *
 *****************************************************************/


/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function SectionCallOut() {
	return (
		<Box component="section" sx={{
			margin: "24px 0 80px 0"
		}}>
			<CustomContainer>
				<Box id="callout-inner" sx={{
					backgroundColor: "rgb(162, 89, 255)",
					outline: "none",
					backgroundImage: { xs: "", xss: "url(//theme.zdassets.com/theme_assets/9325143/421fc1fc882a9ace8270807bce4c4d081115b299.svg)" },
					backgroundPosition: { xs: "bottom right -240px", md: "bottom right" },
					backgroundRepeat: "no-repeat",
					borderRadius: "8px",
					color: "white",
					display: "flex",
					flexDirection: "row",
					height: "500px",
					overflow: "hidden",
					width: "100%"
				}}>
					<Box id="callout-text" sx={{
						display: "inline-flex",
						flexDirection: "column",
						flexWrap: "wrap",
						margin: "auto 0px auto 8%"
					}}>
						<Typography variant="h2" sx={{
							color: "white",
							cursor: "default",
							flexBasis: "100%",
							fontFamily: "Whyte-ink",
							fontSize: { xs: "60px", sm: "80px" },
							lineHeight: { xs: "72px", sm: "96px" },
							fontWeight: "bold",
							marginBottom: "40px",
							marginTop: "0px"
						}}>
							Welcome to<br />FigJam
						</Typography>
						<Box id="callout-buttons" sx={{
							display: "flex",
							flexDirection: { xs: "column", md: "row" },
							width: "fit-content"
						}}>
							<CustomButtonContained sx={{
								marginRight: { xs: 0, md: 2 },
								marginBottom: { xs: 2, md: 0 },
								width: "fit-content"
							}}>
								Learn more
							</CustomButtonContained>

							<CustomButtonOutlined sx={{
								width: "fit-content"
							}}>
								Join the discussions
							</CustomButtonOutlined>
						</Box>
					</Box>
				</Box>
			</CustomContainer>
		</Box>

	)
}