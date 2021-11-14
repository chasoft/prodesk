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
import { Avatar, Box, Button, CircularProgress, List, ListItemAvatar, ListItemText, Divider, Drawer, IconButton, MenuItem, Paper, Tooltip, Typography, ListItemButton, ListItemIcon } from "@mui/material"

//THIRD-PARTY
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { every, filter, size } from "lodash"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import useProfiles from "../../helpers/useProfiles"
import ConfirmDialog from "../common/ConfirmDialog"
import MemoizedAdminTicketListItem from "./AdminTicketListItem"
import useMenuContainer from "../common/useMenuContainer"
import { LabelEditorDialog } from "../Settings/Tickets/Labels"
import { getUiSettings, getAuth } from "../../redux/selectors"
import useFilteredTicketsForAdmin from "../../helpers/useFilteredTicketsForAdmin"
import IconBreadcrumbs from "./../../components/BackEnd/IconBreadcrumbs"
import AdminTicketFilters, { TICKET_INBOXES_LIST } from "./AdminTicketFilters"
import { resetTicketFilters, setSelectedTickets } from "../../redux/slices/uiSettings"
import { DATE_FORMAT, PERMISSIONS_LEVELS, REDIRECT_URL, STATUS_FILTER, TICKET_INBOXES } from "../../helpers/constants"
import { useDeleteTicketTempMutation, useGetLabelsQuery, useGetTicketsForAdminQuery, useUpdateTicketMutation } from "../../redux/slices/firestoreApi"

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

const AdminFilterDrawer = ({ isOpen, handleClose }) => {
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

const AssignButton = ({ assignor }) => {
	const { filteredByInbox, selectedTickets } = useSelector(getUiSettings)
	const { staffList, isLoadingStaffList } = useProfiles()
	const [MenuContainer, open, anchorRef, { handleToggle, handleClose, handleListKeyDown }] = useMenuContainer()
	const [updateTicket] = useUpdateTicketMutation()

	//Only use this button when in UNASSIGNED INBOX
	//If assigned, then, admin must handle directly in a specific ticket
	if (filteredByInbox !== TICKET_INBOXES.UNASSIGNED) return null
	const selectedDepartmentId = selectedTickets[0].department
	if (every(selectedTickets, { department: selectedDepartmentId }) === false) return null

	const availableStaffs = filter(staffList, (i) => i.departments[selectedDepartmentId] > PERMISSIONS_LEVELS.VIEWER) ?? []

	const handleAssignTicket = async (selectedUsername) => {
		//this is new assignment,
		//for modification, admin/staff must handle directly in a specific ticket
		const affectedTickets = selectedTickets.map(i => ({
			username: i.username,
			tid: i.tid,
			//we keep track of assignments history
			//that's why we use an array here!
			staffInCharge: [{
				assignor: assignor,
				assignee: selectedUsername,
				assignedDate: dayjs().valueOf()
			}]
		}))
		await updateTicket(affectedTickets)
	}

	const handleAssignToMyself = async () => {
		const affectedTickets = selectedTickets.map(i => ({
			username: i.username,
			tid: i.tid,
			staffInCharge: [{
				assignor: assignor,
				assignee: assignor,
				assignedDate: dayjs().valueOf()
			}]
		}))
		await updateTicket(affectedTickets)
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
				</MenuItem>,
				<Divider key="divider" />
				{ /*
					Liệt kê các user có thẩm quyền xử lý ticket
					chứ ko phải staff nào cũng assign được!
					 */}

				{isLoadingStaffList &&
					<MenuItem>Loading staffs... <CircularProgress size={20} /></MenuItem>}

				{(!isLoadingStaffList && availableStaffs.length === 0) &&
					<MenuItem disabled={true}>{"You don't have any staff"}</MenuItem>}

				{(!isLoadingStaffList && availableStaffs.length > 0) &&
					availableStaffs.map((staff) =>
						<MenuItem key={staff.username} onClick={() => handleAssignTicket(staff.username)}>
							<ListItemIcon>
								<Avatar src={staff.photoURL} />
							</ListItemIcon>
							<ListItemText>{staff.displayName}</ListItemText>
							<Typography variant="body2" color="text.secondary">
								{staff.username} - {staff.email}
							</Typography>
						</MenuItem>
					)}
			</MenuContainer>
		</>
	)
}
AssignButton.propTypes = { assignor: PropTypes.string }

const StatusButton = () => {
	const [MenuContainer, open, anchorRef, { handleToggle, handleClose, handleListKeyDown }] = useMenuContainer()
	const { selectedTickets } = useSelector(getUiSettings)
	const [updateTicket] = useUpdateTicketMutation()

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
				]
					.map((newStatus) => (
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

const LabelButton = () => {
	const [openNewLableDialog, setOpenNewLableDialog] = useState(false)
	const { data: labels, isLoading: isLoadingLabels } = useGetLabelsQuery()
	const { data: tickets, isLoading: isLoadingTickets } = useGetTicketsForAdminQuery(undefined)
	const [MenuContainer, open, anchorRef, { handleToggle, handleClose }] = useMenuContainer()
	const { selectedTickets } = useSelector(getUiSettings)
	const [updateTicket] = useUpdateTicketMutation()

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
		if (affectedTickets.length === 0) return
		await updateTicket(affectedTickets)
	}

	//hide this button if admin not yet created any label
	if (size(labels) === 0) return null

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
				{(isLoadingLabels && isLoadingTickets) && <MenuItem>Loading...</MenuItem>}

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
				handleClose={() => setOpenNewLableDialog(false)}
			/>
		</>
	)
}

const DeleteTicketsButton = () => {
	const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
	const { selectedTickets, isSmallScreen } = useSelector(getUiSettings)
	const { userList, isLoading: isLoadingUserList } = useProfiles()
	const [deleteTicketTemp] = useDeleteTicketTempMutation()

	dayjs.extend(relativeTime)

	const handleDeleteTicket = async (confirmed) => {
		if (confirmed === false) return

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
				<Box sx={{
					display: "flex",
				}}>
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

						{(isLoadingUserList) &&
							<Box sx={{
								display: "flex",
								height: "100px",
								width: "100%",
								alignItems: "center",
								justifyContent: "center"
							}}>
								<CircularProgress />
							</Box>}

						{(!isLoadingUserList) &&

							<List sx={{
								width: "100%",
								bgcolor: "background.paper",
								borderLeft: "3px solid transparent",
								borderColor: "warning.main"
							}}>
								{selectedTickets.map((selectedTicket) => {
									const userProfile = userList.find(i => i.username === selectedTicket.username)
									return (
										<ListItemButton
											key={selectedTicket.tid}
											alignItems="flex-start"
										>
											<ListItemAvatar>
												<Avatar alt={userProfile.displayName} src={userProfile.photoURL} />
											</ListItemAvatar>
											<ListItemText
												primary={
													<>
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
													</>
												}
												secondary={
													<Typography
														component="span"
														variant="body2"
														color="text.primary"
														sx={{ display: "inline" }}
													>
														{selectedTicket.content.substring(0, 100)}
													</Typography>
												}
											/>
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

const ClearSelectedTicketsButton = () => {
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
	const { currentUser } = useSelector(getAuth)
	const [showFilter, setShowFilter] = useState(false)
	const { selectedTickets, filteredByInbox } = useSelector(getUiSettings)

	const { data: tickets, isLoading } = useFilteredTicketsForAdmin()

	const currentInbox = TICKET_INBOXES_LIST.find(i => i.name === filteredByInbox)

	console.log("AdminTicketList rendering", tickets)

	if (isLoading) {
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
								<AssignButton assignor={currentUser.username} />
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

			{(tickets.length > 0) &&
				tickets.map((group) => (
					<Box key={group[0]} sx={{ mb: 4 }}>

						<Paper elevation={2} >
							{group[1].map((ticket, idx) => (
								<MemoizedAdminTicketListItem
									key={ticket.tid}
									ticket={ticket}
									isFirst={idx === 0}
									isLast={idx === group[1].length - 1}
								/>
							))}
						</Paper>
					</Box>
				))}
		</Box>
	)
}

export default AdminTicketList