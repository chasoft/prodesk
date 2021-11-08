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

import PropTypes from "prop-types"
import React, { useMemo } from "react"
import { Badge, Box, Button, CircularProgress, FormControl, FormControlLabel, FormGroup, InputAdornment, MenuItem, OutlinedInput, Select, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { size } from "lodash"
import PerfectScrollbar from "react-perfect-scrollbar"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import CustomCheckbox from "../common/CustomCheckbox"
import { getUiSettings } from "../../redux/selectors"
import { useGetDepartmentsQuery, useGetLabelsQuery, useRefetchTicketMutation } from "../../redux/slices/firestoreApi"
import { PRIORITY, TICKET_STATUS, TICKET_INBOXES, STATUS_FILTER } from "../../helpers/constants"
import { setSelectedPriority, setSelectedStatus, setSelectedInbox, resetTicketsFilter, setTicketSearchTerm, setSelectedLabel, setSelectedDepartment } from "../../redux/slices/uiSettings"

//ASSETS
import LabelIcon from "@mui/icons-material/Label"
import SearchIcon from "@mui/icons-material/Search"
import WhatshotIcon from "@mui/icons-material/Whatshot"
import AssignmentIcon from "@mui/icons-material/Assignment"
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

export const TICKET_INBOXES_LIST = [
	{
		name: TICKET_INBOXES.IN_PROGRESS,
		title: "Tickets in progress",
		icon: <WhatshotIcon />,
		color: "primary"
	},
	{
		name: TICKET_INBOXES.MINE,
		title: "My assigned tickets",
		icon: <AssignmentTurnedInIcon />,
		color: "warning"
	},
	{
		name: TICKET_INBOXES.ASSIGNED,
		title: "Assigned tickets",
		icon: <AssignmentIcon />,
		color: "secondary"
	},
	{
		name: TICKET_INBOXES.UNASSIGNED,
		title: "Unassigned tickets",
		icon: <AssignmentLateIcon />,
		color: "info"
	}
]

const FilterTicketInbox = () => {
	const { selectedInbox } = useSelector(getUiSettings)
	const dispatch = useDispatch()
	const handleChangeInbox = (e, selectedInbox) => {
		if (selectedInbox) {
			dispatch(setSelectedInbox(selectedInbox))
		}
	}
	return (
		<ToggleButtonGroup
			exclusive
			size="small"
			color="primary"
			value={selectedInbox}
			onChange={handleChangeInbox}
			sx={{ display: "flex", mt: 2, mb: 3 }}
		>
			{TICKET_INBOXES_LIST.map((item) => {
				return (
					<ToggleButton
						key={item.name}
						value={item.name}
						sx={{ flexGrow: 1 }}
					>
						<Badge badgeContent={4} color={item.color}>
							<Tooltip arrow title={item.title} placement="top">
								{item.icon}
							</Tooltip>
						</Badge>
					</ToggleButton>
				)
			})}
		</ToggleButtonGroup>
	)
}

const FilterTicketDepartments = () => {
	const dispatch = useDispatch()
	const { selectedDepartment } = useSelector(getUiSettings)
	const { data: departments, isLoading: isLoadingDepartments } = useGetDepartmentsQuery(undefined)
	return (
		<Box onClick={(e) => e.stopPropagation()}>
			<Typography sx={{ fontWeight: 500, mt: 3, mb: 1 }}>Department</Typography>
			<FormControl fullWidth sx={{
				border: "1px solid #ced4da",
				borderRadius: "0.25rem"
			}}>
				<Select
					sx={{
						"&&": { pl: 1, color: "primary.main" }
					}}
					value={selectedDepartment}
					onChange={(e) => {
						dispatch(setSelectedDepartment(e.target.value))
					}}
				>

					{isLoadingDepartments &&
						<MenuItem value={STATUS_FILTER.ANY}>
							Loading... <CircularProgress size={18} />
						</MenuItem>}

					{size(departments) &&
						<MenuItem value={STATUS_FILTER.ANY}>
							{STATUS_FILTER.ANY}
						</MenuItem>}

					{(isLoadingDepartments === false) &&
						departments.map((department) => (
							<MenuItem key={department.did} value={department.did}>
								{department.department}
							</MenuItem>
						))}
				</Select>
			</FormControl>
		</Box>
	)
}

const FilterTicketPriorities = () => {
	const dispatch = useDispatch()
	const { selectedPriority } = useSelector(getUiSettings)
	return (
		<Box onClick={(e) => e.stopPropagation()}>
			<Typography sx={{ fontWeight: 500, mt: 3, mb: 1 }}>Priority</Typography>
			<FormControl fullWidth sx={{
				border: "1px solid #ced4da",
				borderRadius: "0.25rem"
			}}>
				<Select
					sx={{
						"&&": {
							pl: 1,
							color: "primary.main"
						}
					}}
					value={selectedPriority}
					onChange={(e) => {
						dispatch(setSelectedPriority(e.target.value))
					}}
				>
					{Object.entries(PRIORITY).map((item) => {
						return <MenuItem key={item[1]} value={item[1]}>{item[1]}</MenuItem>
					})}
				</Select>
			</FormControl>
		</Box>
	)
}

const FilterTicketLabels = () => {
	const dispatch = useDispatch()
	const { selectedLabel } = useSelector(getUiSettings)
	const { data: labels, isLoading: isLoadingTickets } = useGetLabelsQuery()

	if (size(labels) === 0 || isLoadingTickets) return null

	// const labelSettings = keyBy(labels, "lid")

	return (
		<Box onClick={(e) => e.stopPropagation()}>
			<Typography sx={{ fontWeight: 500, mt: 3, mb: 1 }}>Labels</Typography>
			<FormControl fullWidth sx={{
				border: "1px solid #ced4da",
				borderRadius: "0.25rem",
			}}>
				<Select
					sx={{
						"&&": { pl: 1, color: "primary.main" },
						".MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
							display: "flex", alignItems: "center"
						}
					}}
					value={selectedLabel}
					onChange={(e) => {
						dispatch(setSelectedLabel(e.target.value))
					}}
				>
					{size(labels) &&
						<MenuItem value={STATUS_FILTER.ANY}>
							{STATUS_FILTER.ANY}
						</MenuItem>}

					{size(labels) &&
						labels.map((label) => (
							<MenuItem
								key={label.lid}
								value={label.lid}
								sx={{ display: "flex", alignItems: "center" }}
							>
								<LabelIcon sx={{ color: label.color }} />&nbsp;<span style={{ color: label.color }}>{label.name}</span>
							</MenuItem>
						))}
				</Select>
			</FormControl>
		</Box>
	)
}

const FilterTicketHasWord = () => {
	const dispatch = useDispatch()
	const { ticketSearchTerm } = useSelector(getUiSettings)
	return (
		<Box onClick={(e) => e.stopPropagation()}>
			<Typography sx={{ fontWeight: 500, mt: 3, mb: 1 }}>Has word</Typography>
			<FormControl variant="outlined">
				<OutlinedInput
					placeholder="Type keywords"
					endAdornment={
						<InputAdornment position="end">
							<SearchIcon fontSize="small" />
						</InputAdornment>
					}
					aria-describedby="ticket-search-term"
					margin="dense"
					value={ticketSearchTerm}
					onChange={(e) => {
						dispatch(setTicketSearchTerm(e.target.value))
					}}

					sx={{
						root: {
							input: {
								padding: "8px 14px"
							}
						},
						"&.MuiInputAdornment-root .MuiSvgIcon-root": {
							color: "text.secondary"
						},
						"&:hover .MuiInputAdornment-root .MuiSvgIcon-root": {
							color: "text.primary"
						},
						"&.Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root": {
							color: "primary.main"
						}
					}}
				/>
			</FormControl>
		</Box>
	)
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function AdminTicketFilters({ sx }) {
	const dispatch = useDispatch()
	const { selectedStatus } = useSelector(getUiSettings)
	const [refetchTicket] = useRefetchTicketMutation()

	const handleSelectTicketStatus = (e) => {
		dispatch(setSelectedStatus({ [e.target.name]: e.target.checked }))
	}

	const handleResetAndRefresh = async (e) => {
		e.stopPropagation()
		await refetchTicket()
		//TODO: Remove this force refetch when finished implementing Notification system
		dispatch(resetTicketsFilter())
	}

	const statusCount = useMemo(() => Object.entries(selectedStatus).reduce(
		(count, current) => count + (current[1] ? 1 : 0), 0
	), [selectedStatus])

	return (
		<PerfectScrollbar component="div">
			<Box sx={sx}>
				<Box sx={{ display: "flex", alignItems: "center", my: 1 }} >
					<Typography variant="h4" style={{ flexGrow: 1, fontWeight: 500 }}>
						Ticket Filters
					</Typography>
					<Button
						size="small"
						variant="outlined"
						onClick={handleResetAndRefresh}
					>
						Reset
					</Button>
				</Box>

				<Box onClick={(e) => e.stopPropagation()}>

					<FilterTicketInbox />

					<Typography sx={{ fontWeight: 500, my: 1 }}>Status</Typography>
					<FormGroup>
						<FormControlLabel
							control={
								<CustomCheckbox
									checked={statusCount === 4}
									indeterminate={(statusCount > 0) && (statusCount < 4)}
									onChange={() => {
										if (statusCount < 4)
											dispatch(setSelectedStatus({
												[TICKET_STATUS.OPEN]: true,
												[TICKET_STATUS.PENDING]: true,
												[TICKET_STATUS.REPLIED]: true,
												[TICKET_STATUS.CLOSED]: true
											}))
										else
											dispatch(setSelectedStatus({
												[TICKET_STATUS.OPEN]: false,
												[TICKET_STATUS.PENDING]: false,
												[TICKET_STATUS.REPLIED]: false,
												[TICKET_STATUS.CLOSED]: false
											}))
									}}
								/>
							}
							label={STATUS_FILTER.ANY}
						/>
						<FormControlLabel
							control={
								<CustomCheckbox
									checked={selectedStatus[TICKET_STATUS.OPEN]}
									onChange={handleSelectTicketStatus}
									name={TICKET_STATUS.OPEN}
								/>
							}
							label={STATUS_FILTER.OPEN}
						/>
						<FormControlLabel
							control={
								<CustomCheckbox
									name={TICKET_STATUS.PENDING}
									onChange={handleSelectTicketStatus}
									checked={selectedStatus[TICKET_STATUS.PENDING]}
								/>
							}
							label={STATUS_FILTER.PENDING}
						/>
						<FormControlLabel
							control={
								<CustomCheckbox
									name={TICKET_STATUS.REPLIED}
									onChange={handleSelectTicketStatus}
									checked={selectedStatus[TICKET_STATUS.REPLIED]}
								/>
							}
							label={STATUS_FILTER.REPLIED}
						/>
						<FormControlLabel
							control={
								<CustomCheckbox
									name={TICKET_STATUS.CLOSED}
									onChange={handleSelectTicketStatus}
									checked={selectedStatus[TICKET_STATUS.CLOSED]}
								/>
							}
							label={STATUS_FILTER.CLOSED}
						/>
					</FormGroup>

				</Box>

				<FilterTicketDepartments />

				<FilterTicketPriorities />

				<FilterTicketLabels />

				{/* <FilterTicketHasWord /> */}

			</Box>
		</PerfectScrollbar>
	)
}
AdminTicketFilters.propTypes = {
	sx: PropTypes.object
}

export default AdminTicketFilters