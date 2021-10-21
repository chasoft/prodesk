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
import Link from "next/link"
import PropTypes from "prop-types"

// MATERIAL-UI
import { Avatar, Box, Chip, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { batch as reduxBatch, useDispatch } from "react-redux"

//PROJECT IMPORT
import { PRIORITY } from "../../helpers/constants"
import { setRedirect } from "../../redux/slices/redirect"
import { setTicketId } from "../../redux/slices/uiSettings"

//ASSETS
import ApartmentIcon from "@mui/icons-material/Apartment"
import LowPriorityIcon from "@mui/icons-material/LowPriority"
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const UserTicketListEmpty = ({ message }) => {
	return (
		<Box
			sx={{
				borderRadius: "0.5rem",
				"&:hover": { backgroundColor: "action.hover" },
			}}
		>
			<Typography
				sx={{
					p: 3,
					minWidth: { xs: "none", md: 0 /*this property is important*/ },
				}}
			>
				{message}
			</Typography>
		</Box>
	)
}
UserTicketListEmpty.propTypes = { message: PropTypes.string }

export const UserTicketListItemShorten = ({ subject, link }) => {
	return (
		<Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
			<Link href={link} passHref>
				<a href="just-a-placeholder">
					<Box
						sx={{
							cursor: "pointer",
							"&:hover": { backgroundColor: "action.hover" },
							px: { xs: 2, md: 3 },
							py: 2,
							// minWidth: 0, /*this property is important*/
						}}
					>
						<Typography noWrap>{subject}</Typography>
					</Box>
				</a>
			</Link>
		</Box >
	)
}
UserTicketListItemShorten.propTypes = { subject: PropTypes.string, link: PropTypes.string }

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketListItem({ ticket, isFirst = false, isLast = false }) {
	const dispatch = useDispatch()
	return (
		<Box
			sx={{
				borderTop: isFirst ? 0 : "1px solid",
				borderColor: "divider",
			}}
		>
			<Box
				onClick={() => {
					reduxBatch(() => {
						dispatch(setTicketId(ticket.tid))
						dispatch(setRedirect(`/client/tickets/${ticket.slug}`))
					})
				}}
				sx={{
					display: "flex",
					"&:hover": { backgroundColor: "action.hover", cursor: "pointer" },
					borderTopLeftRadius: isFirst ? "0.5rem" : 0,
					borderTopRightRadius: isFirst ? "0.5rem" : 0,
					borderBottomLeftRadius: isLast ? "0.5rem" : 0,
					borderBottomRightRadius: isLast ? "0.5rem" : 0,
				}}
			>

				<Box sx={{
					display: "flex",
					flexDirection: "column",
					flexGrow: 1
				}}>

					<Typography
						variant="subtitle2"
						sx={{
							display: "flex",
							alignItems: "center",
							pt: 3, px: 3
						}}
					>
						{ticket.priority === PRIORITY.LOW &&
							<Tooltip title="Low priority" placement="left">
								<LowPriorityIcon color="disabled" sx={{ mr: 0.5 }} />
							</Tooltip>
						}
						{ticket.priority === PRIORITY.HIGH &&
							<Tooltip title="High priority" placement="left">
								<PriorityHighIcon color="warning" />
							</Tooltip>
						}
						{ticket.subject}
					</Typography>

					<Box sx={{
						display: "flex",
						alignItems: "center",
						flexWrap: "wrap",
						borderBottomLeftRadius: "0.5rem",
						borderBottomRightRadius: "0.5rem",
						pt: 1, px: 3, pb: 3,
						"& > *": {
							mr: 0.5,
							mt: { xs: 0.5, sm: 0 }
						}
					}}>

						<Tooltip title="Department" placement="bottom">
							<Chip
								size="small"
								label="Sales"
								avatar={<ApartmentIcon />}
							/>
						</Tooltip>

						<Tooltip title="Category" placement="bottom">
							<Chip
								size="small"
								label="Hosting/Wordpress"
							/>
						</Tooltip>

					</Box>

				</Box>

				<Box sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					px: 3
				}}>
					<Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
						<Typography noWrap sx={{ fontStyle: "italic", color: "grey.500" }}>
							(25 days ago)
						</Typography>
						<Typography noWrap sx={{ ml: { xs: 0, sm: 0.5 } }}>
							20-Oct-2021
						</Typography>
					</Box>
					<Chip
						size="small"
						avatar={<Avatar>2</Avatar>}
						label="replies"
						variant="outlined"
						sx={{
							mt: 0.5,
							".MuiChip-avatar": { color: "#FFF", fontWeight: 700 },
						}}
					/>
				</Box>

			</Box>

		</Box>
	)
}
TicketListItem.propTypes = {
	ticket: PropTypes.object,
	isFirst: PropTypes.bool,
	isLast: PropTypes.bool,
}

export default TicketListItem