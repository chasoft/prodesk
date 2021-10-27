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
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { batch as reduxBatch, useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { DATE_FORMAT, PRIORITY, REDIRECT_URL } from "../../helpers/constants"
import { setRedirect } from "../../redux/slices/redirect"
import { setTicketId } from "../../redux/slices/uiSettings"

//ASSETS
import ApartmentIcon from "@mui/icons-material/Apartment"
import LowPriorityIcon from "@mui/icons-material/LowPriority"
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"
import { getUiSettings } from "../../redux/selectors"
import { StatusChip } from "./TicketContent"

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


const TicketDateTime = ({ ticket }) => {
	dayjs.extend(relativeTime)
	return (
		<Box sx={{
			display: "flex",
			flexDirection: { xs: "column" },
			alignItems: { xs: "initial", md: "center" },
			justifyContent: "center",
			mr: 2
		}}>
			<Box sx={{ display: "flex" }}>
				<Typography noWrap sx={{ ml: { xs: 0, sm: 0.5 } }}>
					Created at {dayjs(ticket.createdAt).format(DATE_FORMAT.LONG)} &nbsp;
				</Typography>
				<Typography noWrap sx={{ fontStyle: "italic", color: "grey.500" }}>
					({dayjs(ticket.createdAt).fromNow()})
				</Typography>
			</Box>

			{(ticket.updatedAt !== ticket.createdAt) &&
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Typography noWrap sx={{ ml: { xs: 0, sm: 0.5 } }}>
						Updated at {dayjs(ticket.updatedAt).format(DATE_FORMAT.LONG)} &nbsp;
					</Typography>
					<Typography noWrap sx={{ fontStyle: "italic", color: "grey.500" }}>
						({dayjs(ticket.updatedAt).fromNow()})
					</Typography>
				</Box>}
		</Box>
	)
}
TicketDateTime.propTypes = { ticket: PropTypes.object }


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketListItem({ ticket, isFirst = false, isLast = false }) {
	const dispatch = useDispatch()
	const { isSmallScreen } = useSelector(getUiSettings)
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
						dispatch(setRedirect(`${REDIRECT_URL.TICKETS}/${ticket.slug}`))
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
					flexGrow: 1,
					ml: 1
				}}>

					<Typography
						variant="subtitle2"
						sx={{
							display: "flex",
							alignItems: "center",
							pt: 3, px: { xs: 1, sm: 3 }
						}}
					>
						{ticket.priority === PRIORITY.LOW &&
							<Tooltip arrow title="Low priority" placement="left">
								<LowPriorityIcon color="disabled" sx={{ mr: 0.5 }} />
							</Tooltip>
						}
						{ticket.priority === PRIORITY.HIGH &&
							<Tooltip arrow title="High priority" placement="left">
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
						pt: 1, px: { xs: 1, sm: 3 }, pb: 3,
						"& > *": {
							mr: 0.5,
							mt: { xs: 0.5, sm: 0 }
						}
					}}>

						<Box>
							<StatusChip status={ticket.status} />

							<Tooltip arrow title="Department" placement="bottom">
								<Chip
									size="small"
									label={ticket.department}
									avatar={<ApartmentIcon />}
									sx={{ mr: 1, mb: 1 }}
								/>
							</Tooltip>

							<Tooltip arrow title="Category" placement="bottom">
								{ticket.category &&
									<Chip
										size="small"
										sx={{ mr: 1, mb: 1 }}
										label={ticket.category + (ticket?.subCategory ? ("/" + ticket.subCategory) : "")}
									/>}
							</Tooltip>

							<Chip
								size="small"
								avatar={<Avatar sx={{ bgcolor: "primary.light" }}>{ticket.replyCount}</Avatar>}
								label="replies"
								variant="outlined"
								sx={{
									mb: 1,
									".MuiChip-avatar": { color: "#FFF", fontWeight: 700 },
								}}
							/>
						</Box>

						{isSmallScreen && <TicketDateTime ticket={ticket} />}
					</Box>

				</Box>
				{!isSmallScreen && <TicketDateTime ticket={ticket} />}

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