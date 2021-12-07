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
import PropTypes from "prop-types"

//MATERIAL-UI
import { Box } from "@mui/material"

//PROJECT IMPORT
import { FrontSearchBox } from "@components/Themes/Simplicity/Blocks/FrontSearchBox"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function SectionHero({ children }) {
	return (
		<Box component="section" sx={{
			backgroundColor: "#FFFFFF",
			backgroundPosition: "center",
			backgroundSize: "cover",
			width: "100%",
			minHeight: "55vh",
			position: "relative",
			padding: "9vh 0 0 0",
			display: "flex",
			flexDirection: "column",
			marginBottom: "40px"
		}}>
			<Box id="here-inner" sx={{
				position: "relative",
				maxWidth: "1009px",
				margin: "0 auto"
			}}>
				{children}
			</Box>

			<FrontSearchBox />

		</Box>
	)
}
SectionHero.propTypes = {
	children: PropTypes.node.isRequired,
}