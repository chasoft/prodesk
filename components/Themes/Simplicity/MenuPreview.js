/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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

import React from "react"

// MATERIAL-UI
import { Box } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { TopMenu } from "@components/Themes/Simplicity/Blocks/TopMenu"
import { FooterBase } from "@components/Themes/Simplicity/Footer"


//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function TopMenuPreview() {
	return (
		<Box id="TopMenuPreviewWrapper" sx={{
			display: "flex",
			flexGrow: 1,
			flexDirection: { xs: "column", xss: "row" },
			py: 2,
			justifyContent: "center",
		}}>
			<TopMenu isPreview />
		</Box>
	)
}

export function FooterMenuPreview() {
	return (
		<Box sx={{
			display: "flex",
			flexGrow: 1,
			flexDirection: { xs: "column", xss: "row" },
			py: 2,
			justifyContent: "center",
		}}>
			<FooterBase isPreview />
		</Box>
	)
}