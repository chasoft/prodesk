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
import { List, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { DATE_FORMAT } from "@helpers/constants"
import { setSelectedCrid } from "@redux/slices/uiSettings"

//ASSETS
import Battery30Icon from "@mui/icons-material/Battery30"
import BatteryFullIcon from "@mui/icons-material/BatteryFull"

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const CannedRepliesList = ({ cannedReplies }) => {
	dayjs.extend(relativeTime)
	const dispatch = useDispatch()
	return (
		<List sx={{
			width: "100%",
			bgcolor: "background.paper",
			borderBottomLeftRadius: 8,
			borderBottomRightRadius: 8,
		}}>
			{cannedReplies?.map((cannedReply) => (

				<ListItemButton
					key={cannedReply.crid}
					onClick={() => dispatch(setSelectedCrid(cannedReply.crid))}
				>
					<ListItemIcon>
						{cannedReply.full
							? <Tooltip arrow title="Full canned-reply" placement="top">
								<BatteryFullIcon sx={{ flexGrow: 1, fill: (theme) => theme.palette.primary.light }} />
							</Tooltip>
							: <Tooltip arrow title="Partial canned-reply" placement="top">
								<Battery30Icon sx={{ flexGrow: 1, fill: (theme) => theme.palette.info.light }} />
							</Tooltip>}
					</ListItemIcon>
					<ListItemText
						primary={cannedReply.description}
						secondary={
							<>
								{cannedReply.content.substring(0, 70)}
								<span style={{
									display: "block",
									marginTop: "6px",
									fontSize: "0.75rem"
								}}>
									Updated at {dayjs(cannedReply.createdAt).format(DATE_FORMAT.LONG)}&nbsp;
									<span style={{ fontStyle: "italic" }}>({dayjs(cannedReply.updatedAt).fromNow()})</span>
								</span>
							</>
						}
						primaryTypographyProps={{
							variant: "h4",
							marginBottom: "0"
						}}
						secondaryTypographyProps={{
							variant: "body1"
						}}
					/>
				</ListItemButton>

			))
			}
		</List>
	)
}

CannedRepliesList.propTypes = {
	cannedReplies: PropTypes.array,
	callback: PropTypes.func,
}

export default CannedRepliesList