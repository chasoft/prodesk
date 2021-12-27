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
import React, { useState } from "react"
import { Avatar, Box, Button, CircularProgress, List, ListItemAvatar, ListItemText, Divider, Drawer, IconButton, MenuItem, Paper, Tooltip, Typography, ListItemButton } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { every, isEqual, size } from "lodash"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import ConfirmDialog from "@components/common/ConfirmDialog"
import IconBreadcrumbs from "@components/BackEnd/IconBreadcrumbs"
import useMenuContainer from "@components/common/useMenuContainer"
import { LabelEditorDialog } from "@components/Settings/Tickets/Labels"
import AdminTicketFilters, { TICKET_INBOXES_LIST } from "@components/Ticket/AdminTicketFilters"
// import MemoizedAdminTicketListItem from "@components/Ticket/AdminTicketListItem"
import AdminTicketListItem from "@components/Ticket/AdminTicketListItem"

import useProfilesGroup from "@helpers/useProfilesGroup"
import { addNewNotifications } from "@helpers/realtimeApi"
import useFilteredTicketsForAdmin from "@helpers/useFilteredTicketsForAdmin"
import {
	CODE,
	DATE_FORMAT,
	REDIRECT_URL,
	STATUS_FILTER,
	TICKET_INBOXES,
	USERGROUP
} from "@helpers/constants"

import {
	ACTIONS,
	TYPE
} from "@redux/slices/firestoreApiConstants"

import {
	resetTicketFilters,
	setSelectedTickets
} from "@redux/slices/uiSettings"

import {
	useDeleteTicketTempMutation,
	useGetDepartmentsQuery,
	useGetLabelsQuery,
	useGetProfilesQuery,
	useGetTicketsForAdminQuery,
	useUpdateTicketMutation
} from "@redux/slices/firestoreApi"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import HomeIcon from "@mui/icons-material/Home"
import FlagIcon from "@mui/icons-material/Flag"
import LabelIcon from "@mui/icons-material/Label"
import DeleteIcon from "@mui/icons-material/Delete"
import ClearAllIcon from "@mui/icons-material/ClearAll"
import FilterListIcon from "@mui/icons-material/FilterList"
import AssignmentIcon from "@mui/icons-material/Assignment"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function AdminFilterDrawer({ isOpen, handleClose }) {
	return (
		<Drawer
			anchor="right"
			open={isOpen}
			onClose={handleClose}
		>
			<Box
				sx={{ width: 300, height: "100%", display: "flex", flexDirection: "column", alignItems: "space-between" }}
				onClick={handleClose}
				onKeyDown={handleClose}
			>
				<AdminTicketFilters sx={{ p: 2 }} />
			</Box>
		</Drawer>
	)
}
AdminFilterDrawer.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
}

function AssignButton({ departments }) {
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const [updateTicket] = useUpdateTicketMutation()

	const selectedTickets = useSelector(s => s.uiSettingsState.selectedTickets, isEqual)
	const filteredByInbox = useSelector(s => s.uiSettingsState.filteredByInbox)

	const {
		userList: allAdminProfiles = [], isLoading: isLoadingAllAdminProfiles
	} = useProfilesGroup([
		USERGROUP.SUPERADMIN.code,
		USERGROUP.ADMIN.code,
		USERGROUP.STAFF.code,
		USERGROUP.AGENT.code
	])

	const {
		data: profiles = [], isLoading: isLoadingProfiles
	} = useGetProfilesQuery()

	const [
		MenuContainer, open, anchorRef, {
			handleToggle, handleClose, handleListKeyDown
		}
	] = useMenuContainer()

	//Only use this button when in UNASSIGNED INBOX
	//If assigned, then, admin must handle directly in a specific ticket
	if (filteredByInbox !== TICKET_INBOXES.UNASSIGNED)
		return null

	//Assign button can be used only when
	//all selected tickets are belong to same department
	const selectedDepartmentId = selectedTickets[0].departmentId
	if (every(
		selectedTickets,
		{ departmentId: selectedDepartmentId }
	) === false) {
		return null
	}

	//get list of staffs who are allow to proccess current department
	//this is "members" which is set at
	//	=> 1. `admin/settings/tickets/department` => members
	//  => 2. `availableForAll`
	const department = departments.find(
		department => department.did === selectedDepartmentId
	) ?? {}

	const profilesByDepartment = profiles.filter(
		profile => department.members.includes(profile.username)
	)

	let availableStaffs = (department?.availableForAll)
		? allAdminProfiles
		: profilesByDepartment

	const handleAssignTicket = async (selectedUsername) => {
		//this is new assignment,
		//for modification, admin/staff must handle directly in a specific ticket
		const affectedTickets = selectedTickets.map(
			(ticket) => ({
				username: ticket.username,
				tid: ticket.tid,
				//we keep track of assignments history
				//that's why we use an array here!
				staffInCharge: [{
					assignor: currentUser.username,
					assignee: selectedUsername,
					assignedDate: dayjs().valueOf()
				}]
			})
		)
		const res = await updateTicket(affectedTickets)

		/*
			Send 2 notifications to
			Assignee - who is the support of the ticket
			Ticket's owners - tell him/her that his/her ticket is initial processing...
		*/
		if (res?.data?.code === CODE.SUCCESS) {

			const invalidatesTags = {
				trigger: currentUser.username,
				tag: [{ type: TYPE.TICKETS, id: "LIST" }],
				target: {
					isForUser: true,
					isForAdmin: false,
				}
			}

			let notisGroup = []

			//Notification for assignee
			notisGroup.push({
				receivers: [selectedUsername],
				notisData: {
					actionType: ACTIONS.NEW_ASSIGNMENT,
					iconURL: currentUser.photoURL,
					title: (selectedTickets.length === 1)
						? "You got new assignment"
						: "You got new assignments",
					description: (selectedTickets.length === 1)
						? selectedTickets[0].subject
						: `${selectedTickets.length} newly opened ticket waiting for your support`,
					link: (selectedTickets.length === 1)
						? selectedTickets[0].slug
						: "/admin/tickets",
				}
			})

			//Notification for users
			selectedTickets.forEach(
				(ticket) => {
					notisGroup.push({
						receivers: [ticket.username],
						notisData: {
							actionType: ACTIONS.UPDATE_TICKET,
							iconURL: currentUser.photoURL,
							title: "Your ticket is initially processing",
							description: ticket.subject,
							link: ticket.slug,
						}
					})
				}
			)
			await addNewNotifications(notisGroup, invalidatesTags)
		}
	}

	const handleAssignToMyself = async () => {
		const affectedTickets = selectedTickets.map(
			(ticket) => ({
				username: ticket.username,
				tid: ticket.tid,
				staffInCharge: [{
					assignor: currentUser.username,
					assignee: currentUser.username,
					assignedDate: dayjs().valueOf()
				}]
			})
		)
		await updateTicket(affectedTickets)

		//Send notification
	}

	return (
		<>
			<Tooltip arrow title="Assign" placement="top">
				<IconButton
					ref={anchorRef}
					onClick={handleToggle}
				>
					<AssignmentIcon />
				</IconButton>
			</Tooltip>
			<MenuContainer
				open={open}
				anchorRef={anchorRef}
				handleClose={handleClose}
				handleListKeyDown={handleListKeyDown}
				placement="bottom-end"
				transformOrigin="right top"
			>
				<MenuItem onClick={handleAssignToMyself}>
					Assign to myself
				</MenuItem>
				<Divider key="divider" />

				{(isLoadingAllAdminProfiles || isLoadingProfiles) &&
					<MenuItem>Loading staffs... <CircularProgress size={20} /></MenuItem>}

				{(!isLoadingAllAdminProfiles && !isLoadingProfiles && availableStaffs.length === 0) &&
					<MenuItem disabled={true}>{"You don't have any staff that can be assigned."}</MenuItem>}

				{(!isLoadingAllAdminProfiles && !isLoadingProfiles && availableStaffs.length > 0) &&
					availableStaffs.map((profile) => <MenuItem key={profile.username} onClick={() => handleAssignTicket(profile.username)}>
						<Avatar
							src={profile.photoURL}
							sx={{ width: 32, height: 32, mr: 2 }} />
						<ListItemText
							primary={profile.displayName}
							secondary={`${profile.username} (${profile.email})`}
							secondaryTypographyProps={{
								fontSize: "0.9rem"
							}} />
					</MenuItem>
					)}
			</MenuContainer>
		</>
	)
}
AssignButton.propTypes = {
	departments: PropTypes.array
}

function StatusButton() {
	const dispatch = useDispatch()
	const [updateTicket] = useUpdateTicketMutation()
	const selectedTickets = useSelector(s => s.uiSettingsState.selectedTickets, isEqual)
	const [
		MenuContainer, open, anchorRef, {
			handleToggle, handleClose, handleListKeyDown
		}
	] = useMenuContainer()

	const handleChangeTicketStatus = async (newStatus) => {
		let affectedTickets = []
		selectedTickets.forEach((selectedTicket) => {
			affectedTickets.push({
				username: selectedTicket.username,
				tid: selectedTicket.tid,
				status: newStatus
			})
		})
		await updateTicket(affectedTickets)
		dispatch(setSelectedTickets([]))
	}

	return (
		<>
			<Tooltip arrow title="Change status" placement="top">
				<IconButton
					ref={anchorRef}
					onClick={handleToggle}
				>
					<FlagIcon />
				</IconButton>
			</Tooltip>
			<MenuContainer
				open={open}
				anchorRef={anchorRef}
				handleClose={handleClose}
				handleListKeyDown={handleListKeyDown}
				placement="bottom-end"
				transformOrigin="right top"
			>
				{[
					STATUS_FILTER.OPEN,
					STATUS_FILTER.PENDING,
					STATUS_FILTER.REPLIED,
					STATUS_FILTER.CLOSED
				].map((newStatus) => (
					<MenuItem
						key={newStatus}
						onClick={() => handleChangeTicketStatus(newStatus)}
					>
						{newStatus}
					</MenuItem>
				))}
			</MenuContainer>
		</>
	)
}

function LabelButton() {
	const [updateTicket] = useUpdateTicketMutation()
	const selectedTickets = useSelector(s => s.uiSettingsState.selectedTickets, isEqual)
	const [openNewLableDialog, setOpenNewLableDialog] = useState(false)

	const {
		data: labels, isLoading: isLoadingLabels
	} = useGetLabelsQuery()

	const {
		data: tickets, isLoading: isLoadingTickets
	} = useGetTicketsForAdminQuery(undefined)

	const [
		MenuContainer, open, anchorRef, {
			handleToggle, handleClose
		}
	] = useMenuContainer()

	console.log("LabelButton => tickets", tickets)

	const handleApplyLabel = async (labelId) => {
		let affectedTickets = []
		selectedTickets.forEach((selectedTicket) => {
			if (selectedTicket.labels.indexOf(labelId) !== -1) {
				//by pass this ticket
				return
			}
			affectedTickets.push({
				username: selectedTicket.username,
				tid: selectedTicket.tid,
				labels: [...selectedTicket.labels, labelId].sort()
			})
		})
		if (affectedTickets.length === 0)
			return
		await updateTicket(affectedTickets)
	}

	//hide this button if admin not yet created any label
	if (size(labels) === 0)
		return null

	return (
		<>
			<Tooltip arrow title="Add label" placement="top">
				<IconButton
					ref={anchorRef}
					onClick={handleToggle}
				>
					<LabelIcon />
				</IconButton>
			</Tooltip>

			<MenuContainer
				open={open}
				anchorRef={anchorRef}
				handleClose={handleClose}
				handleListKeyDown={() => { }}
				placement="bottom-end"
				transformOrigin="right top"
			>
				{(isLoadingLabels && isLoadingTickets) && <MenuItem>Loading... <CircularProgress size={16} /></MenuItem>}

				{size(labels) &&
					<MenuItem disabled={true}>
						Select one of labels below
					</MenuItem>}

				{size(labels) &&
					labels.map((label) => (
						<MenuItem
							key={label.lid}
							onClick={() => handleApplyLabel(label.lid)}
						>
							<LabelIcon sx={{ color: label.color }} />&nbsp;<span style={{ color: label.color }}>{label.name}</span>
						</MenuItem>
					))}

				{size(labels) ?
					[
						<Divider key="divider" />,
						<MenuItem
							key="open-add-new-label-dialog"
							onClick={() => { setOpenNewLableDialog(true) }}
						>
							Add/Edit labels...
						</MenuItem>
					]
					: <MenuItem>No pre-defined label</MenuItem>}

			</MenuContainer>

			<LabelEditorDialog
				open={openNewLableDialog}
				handleClose={() => setOpenNewLableDialog(false)} />
		</>
	)
}

function DeleteTicketsButton() {
	const [deleteTicketTemp] = useDeleteTicketTempMutation()
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

	const selectedTickets = useSelector(s => s.uiSettingsState.selectedTickets, isEqual)
	const isSmallScreen = useSelector(s => s.uiSettingsState.isSmallScreen)

	const {
		userList: allUsers, isLoading: isLoadingAllUsers
	} = useProfilesGroup()

	dayjs.extend(relativeTime)

	const handleDeleteTicket = async (confirmed) => {
		if (confirmed === false)
			return

		const affectedTickets = []
		selectedTickets.forEach((selectedTicket) => {
			affectedTickets.push({
				username: selectedTicket.username,
				tid: selectedTicket.tid
			})
		})
		await deleteTicketTemp(affectedTickets)
		console.log("delete tickets clicked")
	}

	return (
		<>
			<Tooltip arrow title="Delete tickets" placement="top">
				<IconButton onClick={() => setOpenConfirmDialog(true)}>
					<DeleteIcon />
				</IconButton>
			</Tooltip>

			<ConfirmDialog
				okButtonText="Delete"
				color="warning"
				open={openConfirmDialog}
				setOpen={setOpenConfirmDialog}
				callback={handleDeleteTicket}
				maxWidth="md"
			>
				<Box sx={{ display: "flex" }}>
					<DeleteIcon color="warning" sx={{
						width: 60,
						height: 60,
						mr: 2,
						display: { xs: "none", sm: "block" }
					}} />

					<Box sx={{
						display: "flex",
						flexDirection: "column",
					}}>
						<Box sx={{
							display: "flex",
							alignItems: "center",
							mb: 2
						}}>
							<DeleteIcon color="warning" sx={{
								width: 60,
								height: 60,
								mr: 2,
								display: { xs: "block", sm: "none" }
							}} />
							<Typography variant="body2" sx={{ lineHeight: isSmallScreen ? 1.5 : 2 }}>
								Are you sure you want to delete following Tickets?
							</Typography>
						</Box>

						{(isLoadingAllUsers) &&
							<Box sx={{
								display: "flex",
								height: "100px",
								width: "100%",
								alignItems: "center",
								justifyContent: "center"
							}}>
								<CircularProgress />
							</Box>}

						{(!isLoadingAllUsers && allUsers.length > 0) &&

							<List sx={{
								width: "100%",
								bgcolor: "background.paper",
								borderLeft: "3px solid transparent",
								borderColor: "warning.main"
							}}>
								{selectedTickets.map((selectedTicket) => {
									const userProfile = allUsers.find(i => i.username === selectedTicket.username)
									return (
										<ListItemButton
											key={selectedTicket.tid}
											alignItems="flex-start"
										>
											<ListItemAvatar>
												<Avatar alt={userProfile.displayName} src={userProfile.photoURL} />
											</ListItemAvatar>
											<ListItemText
												primary={<>
													<Typography variant="h2" sx={{
														mb: 0,
														fontWeight: 500,
														lineHeight: "1.25rem",
														color: "grey.800"
													}}>
														{selectedTicket.subject}
													</Typography>
													<Typography sx={{
														mb: 1.5,
														fontWeight: 500,
														color: "grey.700"
													}}>
														By {userProfile.displayName} at {dayjs(selectedTicket.createdAt).format(DATE_FORMAT.LONG)} ({dayjs(selectedTicket.createdAt).fromNow()})
													</Typography>
												</>}
												secondary={<Typography
													component="span"
													variant="body2"
													color="text.primary"
													sx={{ display: "inline" }}
												>
													{selectedTicket.content.substring(0, 100)}
												</Typography>} />
										</ListItemButton>
									)
								})}
							</List>}
					</Box>
				</Box>
			</ConfirmDialog>
		</>
	)
}

function ClearSelectedTicketsButton() {
	const dispatch = useDispatch()
	return (
		<Tooltip arrow title="Unselect all tickets" placement="top">
			<IconButton
				onClick={() => {
					dispatch(setSelectedTickets([]))
				}}
			>
				<ClearAllIcon />
			</IconButton>
		</Tooltip>
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function AdminTicketList() {
	const dispatch = useDispatch()
	const currentUser = useSelector(s => s.authState.currentUser, isEqual)
	const [showFilter, setShowFilter] = useState(false)

	const {
		data: departments,
		isLoading: isLoadingDepartments
	} = useGetDepartmentsQuery()

	const selectedTickets = useSelector(s => s.uiSettingsState.selectedTickets, isEqual)
	const filteredByInbox = useSelector(s => s.uiSettingsState.filteredByInbox)

	const {
		data: tickets = [],
		counter,
		isLoading: isLoadingTickets
	} = useFilteredTicketsForAdmin()

	const currentInbox = TICKET_INBOXES_LIST.find(i => i.name === filteredByInbox)

	console.log("AdminTicketList rendering", tickets)

	if (isLoadingTickets || isLoadingDepartments) {
		return (
			<Box sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "70%"
			}}>
				<CircularProgress />
			</Box>
		)
	}

	return (
		<Box sx={{
			display: "flex",
			flexDirection: "column",
			minWidth: 0,
		}}>

			<Box sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				pl: { xs: 0, sm: 3 },
				pt: { xs: 3, sm: 6, md: 8, lg: 10 },
				pb: 2
			}}>
				<IconBreadcrumbs
					icon={null}
					title="Tickets managment"
					items={[
						{
							icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
							title: "Home",
							url: REDIRECT_URL.ADMIN.INDEX
						}
					]}
				/>

				<Box sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%",
					mt: 4,
				}}>
					<Box sx={{
						display: "flex",
						alignItems: "center",
						flexGrow: 1,
						ml: { xs: 0, sm: -3 }
					}}>
						{currentInbox.icon}
						<Typography variant="h1" sx={{ flexGrow: 1, mb: 0, ml: 0.5 }}>
							{currentInbox.name}
						</Typography>
					</Box>

					{(selectedTickets.length > 0)
						? <Box sx={{
							display: "flex",
							flexDirection: { xs: "column", sm: "row" },
							alignItems: "center",
							maxHeight: "40px"
						}}>
							<Typography sx={{ mr: { xs: 0, sm: 1 } }}><b>{selectedTickets.length}</b> items selected</Typography>
							<div>
								<AssignButton
									departments={departments}
								/>
								<StatusButton />
								<LabelButton />
								{(currentUser.username === "superadmin" || currentUser.permissions.deleteTicket) &&
									<DeleteTicketsButton />}
								<ClearSelectedTicketsButton />
							</div>
						</Box>
						: <Link href={REDIRECT_URL.ADMIN.NEW_TICKETS} passHref>
							<span>
								<Button variant="outlined" sx={{ display: { xs: "none", sm: "block" } }}>
									New ticket
								</Button>
								<Tooltip arrow title="Add new ticket" placement="top">
									<IconButton sx={{ display: { xs: "block", sm: "none" } }}>
										<AddIcon fontSize="medium" />
									</IconButton>
								</Tooltip>
							</span>
						</Link>}

					<Tooltip arrow title="Filters" placement="top">
						<IconButton
							onClick={() => { setShowFilter(true) }}
							sx={{ display: { xs: "flex", md: "none" }, mb: 1, ml: 1 }}
						>
							<FilterListIcon fontSize="medium" color="primary" />
						</IconButton>
					</Tooltip>

					<AdminFilterDrawer
						isOpen={showFilter}
						handleClose={() => setShowFilter(false)}
					/>
				</Box>


			</Box>

			{(tickets.length === 0) &&
				<Box sx={{ ml: 3, mt: "0.5rem" }}>

					<Typography variant="h2">
						There are no tickets that matched your criteria
					</Typography>

					<Typography variant="body">
						Try again by using other search criteria or click &quot;
						<Box component="span" onClick={() => { dispatch(resetTicketFilters()) }} sx={{
							cursor: "pointer",
							fontWeight: 500,
							"&:hover": { textDecoration: "underline" }
						}}>
							here
						</Box>
						&quot; to reset.
					</Typography>
				</Box>}

			{(tickets.length > 0)
				? tickets.map((group) => (
					<Box key={group[0]} sx={{ mb: 4 }}>

						<Paper elevation={2} >
							{group[1].map((ticket, idx) => (
								<AdminTicketListItem
									key={ticket.tid}
									ticket={ticket}
									isFirst={idx === 0}
									isLast={idx === group[1].length - 1}
								/>
							))}
						</Paper>

					</Box>
				)) : null}

			{(counter > 0)
				? <Typography>
					{`Total ${counter} ${counter === 1 ? "ticket is" : "tickets are"} listed.`}
				</Typography>
				: null}
		</Box>
	)
}

export default AdminTicketList