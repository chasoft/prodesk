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
import { Box, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getStaffInCharge } from "@helpers/utils"
import { setRedirect } from "@redux/slices/redirect"

import {
	DATE_FORMAT,
	PRIORITY,
	REDIRECT_URL
} from "@helpers/constants"

import {
	TicketCategory,
	TicketCreatedBy,
	TicketDepartment,
	TicketReplyCount,
	TicketStatus,
	TicketUser
} from "@components/Ticket/AdminTicketListItem"

//ASSETS
import LowPriorityIcon from "@mui/icons-material/LowPriority"
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"
import { isEqual } from "lodash"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export function UserTicketListEmpty({ message }) {
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

export function UserTicketListItemShorten({ subject, link }) {
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
		</Box>
	)
}
UserTicketListItemShorten.propTypes = { subject: PropTypes.string, link: PropTypes.string }

function TicketDateTimeSmallScreen({ ticket }) {
	dayjs.extend(relativeTime)

	const isSmallScreen = useSelector(s => s.uiSettingsState.isSmallScreen)
	//Hide at bigScreen
	if (!isSmallScreen)
		return null

	return (
		<Box sx={{ display: "flex", flexDirection: { xs: "column" } }}>
			<Box sx={{ display: "flex" }}>
				<Typography>
					Created&nbsp;
					<Box component="span" sx={{ fontWeight: 500 }}>
						{dayjs(ticket.createdAt).fromNow()}
					</Box>
					&nbsp;by&nbsp;
					<Box component="span" sx={{ fontStyle: "italic" }}>
						{dayjs(ticket.createdAt).format(DATE_FORMAT.LONG)}
					</Box>
				</Typography>
			</Box>

			{(ticket.updatedAt !== ticket.createdAt) &&
				<Box sx={{ display: "flex" }}>
					<Typography>
						Updated&nbsp;
						<Box component="span" sx={{ fontWeight: 500 }}>
							{dayjs(ticket.updatedAt).fromNow()}
						</Box>
						&nbsp;by&nbsp;
						<Box component="span" sx={{ fontStyle: "italic" }}>
							{dayjs(ticket.updatedAt).format(DATE_FORMAT.LONG)}
						</Box>
					</Typography>
				</Box>}
		</Box>
	)
}
TicketDateTimeSmallScreen.propTypes = { ticket: PropTypes.object }

function TicketDateTime({ ticket }) {
	dayjs.extend(relativeTime)

	const isSmallScreen = useSelector(s => s.uiSettingsState.isSmallScreen)
	//Hide at smallScreen
	if (isSmallScreen)
		return null

	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-end",
			justifyContent: "center",
			mr: 2
		}}>
			<Box sx={{ display: "flex" }}>
				<Tooltip arrow title={dayjs(ticket.createdAt).format(DATE_FORMAT.LONG)} placement="left">
					<Typography>
						Created&nbsp;
						<Box component="span" sx={{ fontWeight: 500, whiteSpace: "nowrap" }}>
							{dayjs(ticket.createdAt).fromNow()}
						</Box>
					</Typography>
				</Tooltip>
			</Box>

			{(ticket.updatedAt !== ticket.createdAt) &&
				<Box sx={{ display: "flex", mt: 0.5 }}>
					<Tooltip arrow title={dayjs(ticket.updatedAt).format(DATE_FORMAT.LONG)} placement="left">
						<Typography>
							Updated&nbsp;
							<Box component="span" sx={{ fontWeight: 500, whiteSpace: "nowrap" }}>
								{dayjs(ticket.updatedAt).fromNow()}
							</Box>
						</Typography>
					</Tooltip>
				</Box>}

			{(ticket.createdBy !== ticket.username) &&
				<Typography>by {ticket.createdBy}</Typography>}

		</Box>
	)
}
TicketDateTime.propTypes = { ticket: PropTypes.object }


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketListItem({ ticket, isFirst = false, isLast = false }) {
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const dispatch = useDispatch()
	const isSmallScreen = useSelector(s => s.uiSettingsState.isSmallScreen)

	const latestStaffInCharge = getStaffInCharge(ticket.staffInCharge)

	return (
		<Box
			sx={{
				borderTop: isFirst ? 0 : "1px solid",
				borderColor: "divider",
				display: "block"
			}}
		>
			<Box
				onClick={() => {
					dispatch(setRedirect(`${REDIRECT_URL.CLIENT.TICKETS}/${ticket.slug}`))
				}}
				sx={{
					display: "flex",
					"&:hover": {
						backgroundColor: "action.hover",
						cursor: "pointer"
					},
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
							fontSize: "1.15rem",
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
							<TicketStatus
								status={ticket.status}
							/>
							<TicketDepartment
								departmentId={ticket.departmentId}
							/>
							<TicketCategory
								departmentId={ticket.departmentId}
								category={ticket.category}
								subCategory={ticket.subCategory}
							/>
							{(ticket.createdBy !== ticket.username && isSmallScreen) &&
								<TicketCreatedBy
									createdBy={ticket.createdBy}
								/>}
							<TicketReplyCount
								count={ticket.replyCount}
							/>

							{latestStaffInCharge.assignee &&
								<TicketUser
									username={latestStaffInCharge.assignee}
									title={(currentUser.username === latestStaffInCharge.assignee) ? "Ticket Supporter (it's you)" : "Ticket Supporter"}
								/>}

						</Box>

						<TicketDateTimeSmallScreen ticket={ticket} />
					</Box>

				</Box>

				<TicketDateTime ticket={ticket} />

			</Box>

		</Box >
	)
}
TicketListItem.propTypes = {
	ticket: PropTypes.object,
	isFirst: PropTypes.bool,
	isLast: PropTypes.bool,
}

export default TicketListItem