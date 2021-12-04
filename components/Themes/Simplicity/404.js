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
import SimplicityLayout from "@components/Themes/Simplicity/layout"
import { SectionCallOut } from "@components/Themes/Simplicity/Blocks/SectionCallOut"
import { SectionCategoryBlocks } from "@components/Themes/Simplicity/Blocks/SectionCategoryBlocks"
import { SectionHero } from "@components/Themes/Simplicity/Blocks/SectionHero"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ThemeSimplicity404() {
	return (
		<SimplicityLayout>
			<Box sx={{
				"&>*,.wrap": {
					gridColumn: 2
				}
			}}>

				<SectionHero>
					<Typography variant="h1" sx={{
						margin: "64px auto",
						fontSize: { xs: "35px", md: "45px", lg: "50px" },
						lineHeight: { xs: "45px", md: "60px", lg: "70px" },
						textAlign: "center"
					}}>
						The page you are looking for can’t be found.<br /> Try searching for something else!
					</Typography>
				</SectionHero>

				<SectionCallOut />

				<SectionCategoryBlocks />

			</Box>
		</SimplicityLayout>
	)
}

export default ThemeSimplicity404