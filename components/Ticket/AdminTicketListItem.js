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

import React, { useCallback, useMemo } from "react"
import Link from "next/link"
import PropTypes from "prop-types"

// MATERIAL-UI
import { alpha } from "@mui/material/styles"
import { Avatar, Checkbox, Box, Chip, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { StatusChip } from "./TicketContent"
import { getUiSettings } from "../../redux/selectors"
import { setRedirect } from "../../redux/slices/redirect"
import { setSelectedTickets } from "../../redux/slices/uiSettings"
import { DATE_FORMAT, PRIORITY, REDIRECT_URL } from "../../helpers/constants"

//ASSETS
import ApartmentIcon from "@mui/icons-material/Apartment"
import LowPriorityIcon from "@mui/icons-material/LowPriority"
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"
import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp"
import { CheckBoxNewIcon } from "../svgIcon"

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

const TicketDateTimeSmallScreen = ({ ticket }) => {
	dayjs.extend(relativeTime)

	const { isSmallScreen } = useSelector(getUiSettings)
	//Hide at bigScreen
	if (!isSmallScreen) return null

	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
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

const TicketDateTime = ({ ticket }) => {
	dayjs.extend(relativeTime)

	const { isSmallScreen } = useSelector(getUiSettings)
	//Hide at smallScreen
	if (isSmallScreen) return null

	return (
		<Box
			id="date-time"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-end",
				justifyContent: "center",
				mr: 2
			}}
		>
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
		</Box>
	)
}
TicketDateTime.propTypes = { ticket: PropTypes.object }


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function AdminTicketListItem({ ticket, isFirst = false, isLast = false }) {
	const dispatch = useDispatch()
	const { selectedTickets } = useSelector(getUiSettings)

	const handleSelectTicket = useCallback((event, ticketId) => {
		const selectedIndex = selectedTickets.indexOf(ticketId)
		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selectedTickets, ticketId)
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selectedTickets.slice(1))
		} else if (selectedIndex === selectedTickets.length - 1) {
			newSelected = newSelected.concat(selectedTickets.slice(0, -1))
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selectedTickets.slice(0, selectedIndex),
				selectedTickets.slice(selectedIndex + 1),
			)
		}

		dispatch(setSelectedTickets(newSelected))
	}, [dispatch, selectedTickets])

	const isSelected = useMemo(() => {
		console.log("executed isSelected " + ticket.tid)
		return selectedTickets.indexOf(ticket.tid) !== -1
	}, [selectedTickets, ticket.tid])

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
					dispatch(setRedirect(`${REDIRECT_URL.ADMIN_TICKETS}/${ticket.slug}`))
				}}
				sx={{
					display: "flex",
					"&>#ticket-selector": { display: { xs: "block", sm: "none" } },
					"&:hover": {
						cursor: "pointer",
						backgroundColor: isSelected
							? (theme) =>
								alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
							: "action.hover",
						transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
						"&>#ticket-selector": { display: "block" },
						"&>#date-time": { marginRight: "-1.875rem" }
					},
					borderTopLeftRadius: isFirst ? "0.5rem" : 0,
					borderTopRightRadius: isFirst ? "0.5rem" : 0,
					borderBottomLeftRadius: isLast ? "0.5rem" : 0,
					borderBottomRightRadius: isLast ? "0.5rem" : 0,
					...(isSelected &&
					{
						backgroundColor: (theme) =>
							alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
					})
				}}
			>
				<Box sx={{
					display: "flex",
					flexDirection: "column",
					flexGrow: 1,
					ml: 1,
					mr: -4
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

						<TicketDateTimeSmallScreen ticket={ticket} />
					</Box>

				</Box>

				<TicketDateTime ticket={ticket} />


				<Box
					id="ticket-selector"
					onClick={(e) => e.stopPropagation()}
					sx={{ float: "right" }}
				>
					<Checkbox
						checked={isSelected}
						onChange={(e) => handleSelectTicket(e, ticket.tid)}
						icon={<CheckBoxOutlineBlankSharpIcon />}
						checkedIcon={<CheckBoxNewIcon />}
					/>
				</Box>

			</Box>

		</Box >
	)
}
AdminTicketListItem.propTypes = {
	ticket: PropTypes.object,
	isFirst: PropTypes.bool,
	isLast: PropTypes.bool,
}

export default React.memo(AdminTicketListItem)