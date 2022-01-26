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
import { Box, Paper, Typography } from "@mui/material"

//THIRD-PARTY


//PROJECT IMPORT


//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function DocumentEditorNoActiveDocId() {
	return (
		<Box id="no-document-space" sx={{
			display: "flex",
			flexDirection: "column",
			backgroundColor: "#FFF",
			flexGrow: 1,
			px: 5, py: 4,
			zIndex: 10
		}}>

			<Box sx={{ mt: 6 }}>
				<Typography sx={{
					textTransform: "uppercase",
					color: "grey.500",
					fontWeight: "bold",
					mb: 3
				}}>
					OR GET STARTED WITH A TEMPLATE
				</Typography>

				<Paper
					elevation={0}
					sx={{
						p: 3,
						border: "1px solid transparent",
						borderColor: "divider",
						cursor: "pointer",
						"&:hover": {
							border: "1px solid",
							borderColor: "primary.main",
							"& > p": {
								color: "grey.900"
							}
						}
					}}
				>

					<Box sx={{
						display: "flex",
						alignItems: "center",
						mb: 1,
						"&>svg": {
							mr: 1
						}
					}}>
						<Typography sx={{ fontWeight: 500 }}>template.name</Typography>
					</Box>

					<Typography sx={{
						color: "grey.500",
						fontSize: "0.75rem"
					}}>
						template.description
					</Typography>

				</Paper>


			</Box>


		</Box>
	)
}
// DocumentEditor.propTypes = { children: PropTypes.node }

export default DocumentEditorNoActiveDocId