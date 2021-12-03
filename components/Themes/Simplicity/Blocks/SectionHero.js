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
import { Box, InputBase, Paper } from "@mui/material"

//PROJECT IMPORT
import { SearchButton } from "@components/Themes/Simplicity/Buttons/Search"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const SectionHero = ({ children }) => {
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
			<Box id="search-wrapper" sx={{
				display: "flex",
				alignItems: "center",
				position: "relative",
				justifyContent: "center",
				marginTop: "0",
				width: "100%",
			}}>
				<Box
					component="form"
					onSubmit={(e) => {
						e.preventDefault()
						console.log("Submitted")
					}}
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						width: { xs: "100%", md: "670px" },
						maxWidth: "670px",
					}}
				>
					<Paper sx={{
						padding: 1.5,
						flexGrow: 1,
						marginBottom: { xs: 2, md: 0 },
						border: "3px solid #000000",
						borderTopLeftRadius: "10px",
						borderBottomLeftRadius: "10px",
						borderBottomRightRadius: 0,
						borderTopRightRadius: 0,
					}}>
						<InputBase
							placeholder="Describe your issue"
							inputProps={{ "aria-label": "search documentation" }}
							sx={{
								width: "100%",
								fontSize: "1.2em",
							}}
						/>
					</Paper>
					<SearchButton
						type="submit"
						value="Search"
					>
						Search
					</SearchButton>

				</Box>
			</Box>
		</Box>
	)
}
SectionHero.propTypes = {
	children: PropTypes.node.isRequired,
}