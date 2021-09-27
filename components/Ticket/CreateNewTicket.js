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

/*****************************************************************
 * IMPORTING                                                     *
 *****************************************************************/

import React from "react"

// MATERIAL-UI
import { Box, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import TicketStepper from "./TicketStepper"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function CreateNewTicket() {
	return (
		<Box sx={{ display: "flex" }}>

			<Box sx={{ flexGrow: 1 }}>
				<Box sx={{
					p: 4, pb: 1,
					pl: { xs: 2, md: 4 },
					color: "#FFF"
				}}>
					<Typography variant="h1">
						Open New Ticket
					</Typography>
				</Box>

				<div style={{
					backgroundColor: "white",
					borderTopLeftRadius: "0.5rem",
					borderTopRightRadius: "0.5rem"
				}}>

					<Box sx={{
						border: { xs: 0, md: "1px solid" },
						borderColor: { md: "divider" },
						borderRadius: { xs: 0, md: "0.5rem" },
					}}>

						<Box sx={{
							px: { xs: 2, md: 4 },
							pt: { xs: 3, md: 4 },
							pb: { xs: 2, md: 4 }
						}}>
							<Typography variant="body2">
								Post your question and get answer from our dedicated staffs
							</Typography>
						</Box>

						<Box sx={{
							px: { xs: 2, md: 4 },
							pb: 2
						}}>
							<TicketStepper />
						</Box>
					</Box>

				</div>
			</Box>

			<Box
				sx={{
					display: { xs: "none", md: "flex" },
					flexDirection: "column",
					ml: 3, mt: 10,
					px: 3,
					backgroundColor: "#FFF",
					borderRadius: "0.5rem",
					width: "250px",
					position: "sticky",
					top: "80px"
				}}
			>
				Widget Goes here!
			</Box>

		</Box>
	)
}

export default CreateNewTicket