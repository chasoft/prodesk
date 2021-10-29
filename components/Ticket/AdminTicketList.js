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
import { Box, Button, CircularProgress, Divider, Drawer, IconButton, MenuItem, Paper, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { size } from "lodash"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import AskNow from "../Docs/AskNow"
import AdminTicketListItem from "./AdminTicketListItem"
import useMenuContainer from "../common/useMenuContainer"
import { LabelEditorDialog } from "../Settings/Tickets/Labels"
import { getUiSettings, getAuth } from "../../redux/selectors"
import useGroupedTickets from "../../helpers/useGroupedTickets"
import { resetTicketsFilter } from "../../redux/slices/uiSettings"
import { useGetLabelsQuery, useGetTicketsForAdminQuery, useUpdateTicketMutation } from "../../redux/slices/firestoreApi"
import IconBreadcrumbs from "./../../components/BackEnd/IconBreadcrumbs"
import AdminTicketFilters, { TICKET_INBOXES_LIST } from "./AdminTicketFilters"
import { REDIRECT_URL, STATUS_FILTER, TICKET_INBOXES } from "../../helpers/constants"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import HomeIcon from "@mui/icons-material/Home"
import FlagIcon from "@mui/icons-material/Flag"
import LabelIcon from "@mui/icons-material/Label"
import DeleteIcon from "@mui/icons-material/Delete"
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
	isOpen: PropTypes.bool,
	handleClose: PropTypes.func
}

const AssignButton = () => {
	const { selectedInbox } = useSelector(getUiSettings)
	const [MenuContainer, open, anchorRef, { handleToggle, handleClose, handleListKeyDown }] = useMenuContainer()
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
				{(selectedInbox !== TICKET_INBOXES.IN_PROGRESS && selectedInbox !== TICKET_INBOXES.MINE) &&
					[
						<MenuItem key="assign-to-myself">Assign to myself</MenuItem>,
						<Divider key="divider" />
					]
				}

				<MenuItem>...</MenuItem>
				<MenuItem>...</MenuItem>
			</MenuContainer>
		</>
	)
}

const StatusButton = () => {
	const [MenuContainer, open, anchorRef, { handleToggle, handleClose, handleListKeyDown }] = useMenuContainer()
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
				{[STATUS_FILTER.OPEN, STATUS_FILTER.PENDING, STATUS_FILTER.REPLIED, STATUS_FILTER.CLOSED].map((item) => (
					<MenuItem
						key={item}
						onClick={() => {

						}}
					>
						{item}
					</MenuItem>
				))}
			</MenuContainer>
		</>
	)
}

const LabelButton = () => {
	const [openNewLableDialog, setOpenNewLableDialog] = useState(false)
	const { data: labels, isLoadingLabels } = useGetLabelsQuery()
	const { data: tickets, isLoadingTickets } = useGetTicketsForAdminQuery()
	const [MenuContainer, open, anchorRef, { handleToggle, handleClose }] = useMenuContainer()
	const { selectedTickets } = useSelector(getUiSettings)
	const [updateTicket] = useUpdateTicketMutation()


	const handleApplyLabel = useCallback(async (labelId) => {
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



		await updateTicket({
			username: "",
			tid: ""
		})
	}, [dispatch, selectedTickets])


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
				{(isLoadingLabels && isLoadingTickets) && <MenuItem>Loading... <CircularProgress size="14" /></MenuItem>}

				{size(labels) &&
					labels.map((label) => (
						<MenuItem
							key={label.lid}
							onClick={handleApplyLabel(label.lid)}
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
							Add new label...
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

const DeleteButton = () => {
	return (
		<Tooltip arrow title="Delete tickets" placement="top">
			<IconButton>
				<DeleteIcon />
			</IconButton>
		</Tooltip>
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function AdminTicketList() {
	const dispatch = useDispatch()
	const [showFilter, setShowFilter] = useState(false)
	const { currentUser } = useSelector(getAuth)
	const { selectedTickets, selectedInbox } = useSelector(getUiSettings)
	const { data: tickets, isLoading } = useGroupedTickets()
	const handleResetSearchCriteria = () => { dispatch(resetTicketsFilter()) }

	const currentInbox = TICKET_INBOXES_LIST.find(i => i.name === selectedInbox)

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
							url: REDIRECT_URL.ADMIN
						}
					]}
				/>

				<Box sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					width: "100%",
					mt: 4
				}}>
					<Box sx={{
						display: "flex",
						alignItems: "center",
						flexGrow: 1
					}}>
						{currentInbox.icon}
						<Typography variant="h1" sx={{ flexGrow: 1, mb: 0 }}>
							{currentInbox.name}
						</Typography>
					</Box>

					{size(selectedTickets)
						? <Box sx={{
							display: "flex",
							flexDirection: { xs: "column", sm: "row" },
							alignItems: "center",
							maxHeight: "40px"
						}}>
							<Typography sx={{ mr: { xs: 0, sm: 1 } }}><b>{size(selectedTickets)}</b> items selected</Typography>
							<div>
								<AssignButton />
								<StatusButton />
								<LabelButton />
								{(currentUser.username === "superadmin" || currentUser.permission.deleteTicket) &&
									<DeleteButton />}
							</div>
						</Box>
						: <Link href={REDIRECT_URL.ADMIN_NEW_TICKETS} passHref>
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
						<Box component="span" onClick={handleResetSearchCriteria} sx={{
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
								<AdminTicketListItem
									key={ticket.tid}
									ticket={ticket}
									isFirst={idx === 0}
									isLast={idx === group[1].length - 1}
								/>
							))}
						</Paper>
					</Box>
				))}

			<AskNow />
		</Box>
	)
}

export default AdminTicketList