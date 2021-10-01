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
import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

//PROJECT IMPORT

//THIRD-PARTY

//PROJECT IMPORT

//ASSETS
import FlashOnIcon from "@mui/icons-material/FlashOn"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

//TODO: Auto update data onBlur

const CannedRepliesList = ({ data, callback }) => {
	console.log({ data })
	return (
		<List sx={{
			width: "100%",
			bgcolor: "background.paper",
			borderBottomLeftRadius: 8,
			borderBottomRightRadius: 8,
		}}>
			{
				data.map((item) => (

					<ListItemButton key={item.id} onClick={() => callback(item.id)}>
						<ListItemIcon>
							<FlashOnIcon sx={{ flexGrow: 1 }} />
						</ListItemIcon>
						<ListItemText
							primary={item.description}
							secondary="Something to descripte here"
						/>
					</ListItemButton>

				))
			}
		</List>
	)
}

CannedRepliesList.propTypes = {
	data: PropTypes.array,
	callback: PropTypes.func,
}

export default CannedRepliesList