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

import Link from "next/link"
import PropTypes from "prop-types"
import React, { useCallback, useMemo, useState } from "react"

// MATERIAL-UI
import { alpha } from "@mui/material/styles"
import { Avatar, Checkbox, Box, Chip, IconButton, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import { find, keyBy, size, isFunction, isEqual } from "lodash"
import relativeTime from "dayjs/plugin/relativeTime"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getStaffInCharge } from "@helpers/utils"
import { setRedirect } from "@redux/slices/redirect"
import useGetProfileByUsername from "@helpers/useGetProfileByUsername"
import TicketNoteDialog from "@components/Ticket/TicketNoteDialog"

import {
	DATE_FORMAT,
	EMPTY,
	PRIORITY,
	REDIRECT_URL,
	STATUS_FILTER,
	TICKET_STATUS
} from "@helpers/constants"

import {
	useGetDepartmentsQuery,
	useGetLabelsQuery,
	useUpdateTicketMutation
} from "@redux/slices/firestoreApi"

import {
	setFilteredByDepartment,
	setFilteredByLabel,
	setFilteredByPriority,
	setSelectedStatusRaw,
	setSelectedTickets
} from "@redux/slices/uiSettings"

//ASSETS
import { CheckBoxNewIcon } from "../svgIcon"
import LabelIcon from "@mui/icons-material/Label"
import CloseIcon from "@mui/icons-material/Close"
import PersonIcon from "@mui/icons-material/Person"
import CommentIcon from "@mui/icons-material/Comment"
import ApartmentIcon from "@mui/icons-material/Apartment"
import LowPriorityIcon from "@mui/icons-material/LowPriority"
import PriorityHighIcon from "@mui/icons-material/PriorityHigh"
import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp"

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
	if (isSmallScreen === false)
		return null

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

function TicketDateTime({ ticket }) {

	dayjs.extend(relativeTime)

	const isSmallScreen = useSelector(s => s.uiSettingsState.isSmallScreen)
	if (isSmallScreen)
		return null

	return (
		<Box
			id="date-time"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-end",
				justifyContent: "center",
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

export function TicketLabels({ ticket, callback, sx }) {
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const { data, isLoading } = useGetLabelsQuery()
	const [updateTicket] = useUpdateTicketMutation()

	//Do not show lables for ticket's owner
	//Ticket feature is used for admin to manage ticket only, not used for user
	if (currentUser.username === ticket.username)
		return null

	//Nothing to show
	if (size(ticket.labels) === 0 || isLoading)
		return null

	const labelSettings = keyBy(data, "lid")

	const removeLabelFromTicket = async (labelId) => {
		const newLabelArray = ticket.labels.filter(i => i !== labelId)
		await updateTicket([{
			username: ticket.username,
			tid: ticket.tid,
			labels: newLabelArray
		}])
	}

	return (
		<Box sx={{ display: "flex", mr: 1, mb: 0.5, ...sx }}>
			{ticket.labels.map((labelId) => (
				<Box
					component="span"
					key={labelId}
					sx={{
						display: "flex",
						alignItems: "center",
						pl: 0.5, mr: 0.5,
						borderRadius: "6px",
						"&>#removeLabel": {
							display: "none",
							fontSize: "1.2em",
							cursor: "pointer",
							mx: 1,
							fill: (theme) => alpha("#000", theme.palette.action.activatedOpacity),
							":hover": {
								fill: (theme) => theme.palette.warning.main,
								fontSize: "1.5em",
							}
						},
						":hover": {
							backgroundColor: (theme) => alpha(labelSettings[labelId]?.color ?? "#FF7F7F", theme.palette.action.activatedOpacity),
							"&>#removeLabel": {
								display: "inline-block",
							}
						}
					}}
					onClick={(e) => {
						if (isFunction(callback))
							callback(e, labelId)
					}}
				>
					<LabelIcon sx={{ color: labelSettings[labelId]?.color ?? "#FF7F7F", mr: 0.5 }} />
					<Typography sx={{ color: labelSettings[labelId]?.color ?? "#FF7F7F" }}>
						{labelSettings[labelId]?.name ?? "label deleted"}
					</Typography>
					<Tooltip arrow title="Remove this label" placement="top">
						<CloseIcon
							id="removeLabel"
							onClick={(e) => {
								e.stopPropagation()
								removeLabelFromTicket(labelId)
							}} />
					</Tooltip>
				</Box>
			))}
		</Box>
	)
}
TicketLabels.propTypes = {
	ticket: PropTypes.object,
	callback: PropTypes.func,
	sx: PropTypes.object
}

export function TicketStatus({ status, sx }) {
	const dispatch = useDispatch()
	const chipColor = {
		[STATUS_FILTER.OPEN]: {
			color: "primary",
			description: "Newly created ticket"
		},
		[STATUS_FILTER.PENDING]: {
			color: "warning",
			description: "Waiting for support"
		},
		[STATUS_FILTER.REPLIED]: {
			color: "success",
			description: "Waiting for ticket's owner feedback"
		},
		[STATUS_FILTER.CLOSED]: {
			color: "secondary",
			description: "Done"
		}
	}
	return (
		<Tooltip arrow title={chipColor[status].description} placement="top">
			<Chip
				size="small"
				label={status}
				color={chipColor[status].color}
				sx={{ mr: 1, mb: 0.5, ...sx }}
				onClick={(e) => {
					e.stopPropagation()
					dispatch(setSelectedStatusRaw({
						[TICKET_STATUS.OPEN]: false,
						[TICKET_STATUS.PENDING]: false,
						[TICKET_STATUS.REPLIED]: false,
						[TICKET_STATUS.CLOSED]: false,
						[status]: true
					}))
				}} />
		</Tooltip>
	)
}
TicketStatus.propTypes = {
	status: PropTypes.string.isRequired,
	sx: PropTypes.object,
}

export function TicketPriority({ priority, sx, callback }) {
	if (priority === PRIORITY.NORMAL)
		return null
	return (
		<Box
			sx={{ mr: 0.5, mb: 0.5, ...sx }}
			onClick={(e) => {
				e.stopPropagation()
				if (isFunction(callback))
					callback()
			}}
		>
			{priority === PRIORITY.LOW &&
				<Tooltip arrow title="Low priority" placement="top">
					<IconButton size="small" sx={{ cursor: isFunction(callback) ? "pointer" : "default" }}>
						<LowPriorityIcon color="disabled" />
					</IconButton>
				</Tooltip>}

			{priority === PRIORITY.HIGH &&
				<Tooltip arrow title="High priority" placement="top">
					<IconButton size="small" sx={{ cursor: isFunction(callback) ? "pointer" : "default" }}>
						<PriorityHighIcon color="warning" />
					</IconButton>
				</Tooltip>}
		</Box>
	)
}
TicketPriority.propTypes = {
	priority: PropTypes.string.isRequired,
	sx: PropTypes.object,
	callback: PropTypes.func
}

export function TicketDepartment({ departmentId }) {
	const dispatch = useDispatch()
	const { data: departments, isLoading } = useGetDepartmentsQuery()

	if (isLoading || size(departments) === 0)
		return null

	const department = departments.find(
		department => department.did === departmentId
	)?.name ?? "<Empty>"

	return (
		<Tooltip arrow title="Department" placement="top">
			<Chip
				size="small"
				label={department}
				avatar={<ApartmentIcon />}
				sx={{ mr: 1, mb: 0.5 }}
				onClick={(e) => {
					e.stopPropagation()
					dispatch(setFilteredByDepartment(departmentId))
				}} />
		</Tooltip>
	)
}
TicketDepartment.propTypes = {
	departmentId: PropTypes.string.isRequired,
}

export function TicketCategory({ departmentId, category, subCategory }) {
	const dispatch = useDispatch()
	if (!category)
		return null
	const subText = subCategory
		? ("/" + subCategory)
		: ""
	return (
		<Tooltip arrow title="Category" placement="top">
			<Chip
				size="small"
				label={category + subText}
				sx={{ mr: 1, mb: 0.5 }}
				onClick={(e) => {
					e.stopPropagation()
					dispatch(setFilteredByDepartment(departmentId))
				}} />
		</Tooltip>
	)
}
TicketCategory.propTypes = {
	departmentId: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	subCategory: PropTypes.string,
}

export function TicketReplyCount({ count }) {
	return (
		<Chip
			size="small"
			avatar={<Avatar>{count}</Avatar>}
			label="replies"
			variant="outlined"
			color="primary"
			sx={{ mb: 0.5 }}
			onClick={(e) => e.stopPropagation()} />
	)
}
TicketReplyCount.propTypes = {
	count: PropTypes.number
}

export function TicketUser({ username, title = "Ticket's Owner" }) {
	const dispatch = useDispatch()
	const profile = useGetProfileByUsername(username)

	if (!profile)
		return null

	return (
		<Tooltip
			arrow
			placement="top"
			title={<>{title} <br /> {profile.email}</>}
		>
			<Chip
				size="small"
				avatar={<Avatar src={profile.photoURL}></Avatar>}
				label={profile.displayName}
				variant="outlined"
				sx={{
					mb: 0.5,
					mx: 0.5,
					".MuiChip-avatar": { color: "#FFF", fontWeight: 700 }
				}}
				onClick={(e) => {
					e.stopPropagation()
					dispatch(setRedirect(REDIRECT_URL.ADMIN.USERS + "/" + username))
				}} />
		</Tooltip>
	)
}
TicketUser.propTypes = {
	username: PropTypes.string,
	title: PropTypes.node,
}

export function TicketNote({ ticket }) {

	const [openNoteDialog, setOpenNoteDialog] = useState(false)

	const {
		data: departments = EMPTY.ARRAY, isLoading: isLoadingDepartments
	} = useGetDepartmentsQuery(undefined)

	if (isLoadingDepartments)
		return null

	return (
		<>
			<Tooltip
				arrow
				placement="top"
				title={(ticket?.note?.content)
					? ticket?.note?.content.substring(0, 500)
					: "Note is empty"}
			>
				<Chip
					size="small"
					avatar={<CommentIcon sx={{
						fill: (theme) => theme.palette.success.main,
						...((!ticket?.note?.content) ? { fill: "grey" } : {})
					}} />}
					label="Note"
					variant="outlined"
					color={(ticket?.note?.content) ? "success" : "default"}
					sx={{ mb: 0.5, mx: 0.5 }}
					onClick={(e) => {
						e.stopPropagation()
						setOpenNoteDialog(true)

						/* Đang làm dang dỡ chỗ này!!!  */
					}} />
			</Tooltip>

			<TicketNoteDialog
				ticket={ticket}
				departments={departments}
				open={openNoteDialog}
				setOpen={setOpenNoteDialog} />
		</>
	)
}
TicketNote.propTypes = {
	ticket: PropTypes.object,
}

export function TicketCreatedBy({ createdBy }) {
	const dispatch = useDispatch()
	return (
		<Tooltip
			arrow
			placement="top"
			title={<span>This ticket is created<br /> by {createdBy}</span>}
		>
			<Chip
				size="small"
				avatar={<PersonIcon color="success" />}
				label={createdBy}
				variant="outlined"
				color="success"
				sx={{ mr: 1, mb: 0.5 }}
				onClick={(e) => {
					e.stopPropagation()
					dispatch(setRedirect(REDIRECT_URL.ADMIN.USERS + "/" + createdBy))
				}} />
		</Tooltip>
	)
}
TicketCreatedBy.propTypes = {
	createdBy: PropTypes.string.isRequired
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function AdminTicketListItem({ ticket, isFirst = false, isLast = false }) {
	const dispatch = useDispatch()
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)

	const selectedTickets = useSelector(s => s.uiSettingsState.selectedTickets, isEqual)

	const handleSelectTicket = useCallback((event, ticketItem) => {
		const idArray = selectedTickets.map(i => i.tid)
		const selectedIndex = idArray.indexOf(ticketItem.tid)

		let newSelected = []

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selectedTickets, ticketItem)
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
		return find(selectedTickets, { tid: ticket.tid }) ? true : false
	}, [selectedTickets, ticket.tid])

	const latestStaffInCharge = getStaffInCharge(ticket.staffInCharge)

	console.log("AdminTicketListItem", ticket.tid)

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
					dispatch(setRedirect(`${REDIRECT_URL.ADMIN.TICKETS}/${ticket.slug}`))
				}}
				sx={{
					display: "flex",
					"&>#ticket-selector": { display: { xs: "block", sm: isSelected ? "block" : "none" } },
					"&>#date-time": { marginRight: isSelected ? "-16px" : "30px" },
					"&:hover": {
						cursor: "pointer",
						backgroundColor:
							isSelected
								? (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
								: "action.hover",
						transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
						"&>#ticket-selector": { display: "block" },
						"&>#date-time": { marginRight: "-16px" }
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
						variant="h2"
						sx={{
							display: "flex",
							alignItems: "center",
							fontWeight: 500,
							fontSize: "1.15rem",
							mb: 0,
							pt: 3, px: { xs: 1, sm: 3 }
						}}
					>
						<TicketPriority
							priority={ticket.priority}
							callback={() => {
								dispatch(setFilteredByPriority(ticket.priority))
							}}
						/>
						<TicketLabels
							ticket={ticket}
							callback={(e, labelId) => {
								e.stopPropagation()
								dispatch(setFilteredByLabel(labelId))
							}}
						/>
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

						<Box sx={{
							display: "flex",
							alignItems: "center",
							flexWrap: "wrap"
						}}>
							<TicketStatus status={ticket.status} />
							<TicketDepartment departmentId={ticket.departmentId} />

							<TicketCategory
								departmentId={ticket.departmentId}
								category={ticket.category}
								subCategory={ticket.subCategory}
							/>

							<TicketReplyCount count={ticket.replyCount} />
							<TicketUser username={ticket.username} />

							{(ticket.createdBy !== ticket.username) &&
								<TicketCreatedBy
									createdBy={ticket.createdBy}
								/>}

							{latestStaffInCharge.assignee &&
								<TicketUser
									username={latestStaffInCharge.assignee}
									title={
										(currentUser.username === latestStaffInCharge.assignee)
											? "Ticket Supporter (it's you)"
											: "Ticket Supporter"
									}
								/>}

							<TicketNote ticket={ticket} />

						</Box>

						<TicketDateTimeSmallScreen ticket={ticket} />
					</Box>

				</Box>

				<TicketDateTime ticket={ticket} />

				<Box
					id="ticket-selector"
					sx={{ float: "right" }}
					onClick={(e) => e.stopPropagation()}
				>
					<Checkbox
						checked={isSelected}
						onChange={(e) => { handleSelectTicket(e, ticket) }}
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

// const MemoizedAdminTicketListItem = React.memo(AdminTicketListItem)

export default AdminTicketListItem