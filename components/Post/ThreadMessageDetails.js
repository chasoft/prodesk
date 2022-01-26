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
import { Avatar, Box, Chip, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import FaceIcon from "@mui/icons-material/Face"
import DoneIcon from "@mui/icons-material/Done"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const ThreadMessageDetails = () => {
	return (
		<Box sx={{ mt: 2 }}>
			<Typography style={{ fontWeight: "500" }}>Details</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-start",
					flexWrap: "wrap",
					"& > *": {
						margin: 0.5,
					},
				}}
			>
				<Chip size="small" avatar={<Avatar>M</Avatar>} label="Clickable" onClick={() => { }} />
				<Chip size="small" label="Deletable Primary" onDelete={() => { }} color="primary" />
				<Chip
					size="small"
					icon={<FaceIcon />}
					label="Clickable Deletable"
				// onClick={handleClick}
				// onDelete={handleDelete}
				/>
				<Chip
					size="small"
					icon={<FaceIcon />}
					label="Primary Clickable"
					clickable
					color="primary"
					// onDelete={handleDelete}
					deleteIcon={<DoneIcon />}
				/>
			</Box>
		</Box>
	)
}

export default ThreadMessageDetails