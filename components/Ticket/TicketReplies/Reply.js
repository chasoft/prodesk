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
import PropTypes from "prop-types"

// MATERIAL-UI
import { Avatar, Box, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ReplyItem({ isFirst = false }) {
	return (
		<Box sx={{
			px: { xs: 3, md: 3 },
			py: { xs: 3, md: 4 },
			...(!isFirst && { borderTop: "1px solid", borderColor: "divider" }),
			display: "flex",
			flexDirection: { xs: "column", sm: "row" }
		}}>

			<Box sx={{
				display: "flex",
				flexDirection: { xs: "row", sm: "column" },
				alignItems: "center",
				justifyContent: { xs: "space-between", sm: "flex-start" }
			}}>

				<Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
					<Avatar alt="Remy Sharp" src="/default-avatar/1.png" />

					<Typography variant="caption" sx={{
						whiteSpace: "nowrap",
						display: { xs: "block", sm: "none" },
						mx: 2,
						flexGrow: 1
					}}>
						Camille V.
					</Typography>

					<Box sx={{
						display: { xs: "flex", sm: "none" },
						alignItems: "flex-end",
					}}>
						<Typography>10-Oct-2021</Typography>
						<Typography sx={{ fontStyle: "italic" }}>(10 days ago)</Typography>
					</Box>
				</Box>
			</Box>

			<Box>

				<Box sx={{
					my: { xs: 2, sm: 0 },
					ml: { xs: 0, sm: 3 },
					"&>p": { lineHeight: "1.5rem" }
				}}>
					<Typography variant="body1" >
						The 5a is the first Pixel that does not use CDMA service at all, so for Verizon the line needs to be configured as a CDMAless device.This is a fairly known issue with Verizon Tech support so you should be able to get it resolved quickly.They may not have known that regarding the Pixel 5A since there really isnt a ton of information ahead of the full release.
					</Typography>
				</Box>

				<Typography
					variant="caption" color="textSecondary"
					sx={{
						my: 1,
						ml: { xs: 0, sm: 3 }
					}}
				>
					Last edited 6 hr ago
				</Typography>

			</Box>
		</Box >
	)
}
ReplyItem.propTypes = { isFirst: PropTypes.bool }

export default ReplyItem