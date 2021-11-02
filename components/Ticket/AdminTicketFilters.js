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
import { Badge, Box, Button, ToggleButton, Tooltip, ToggleButtonGroup, FormControl, FormControlLabel, FormGroup, MenuItem, Select, Typography, Checkbox } from "@mui/material"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getUiSettings } from "../../redux/selectors"
import { PRIORITY, TICKET_STATUS, TICKET_INBOXES } from "../../helpers/constants"
import { setSelectedPriority, setSelectedStatus, setSelectedInbox, resetTicketsFilter } from "../../redux/slices/uiSettings"

//ASSETS
// import SearchIcon from "@mui/icons-material/Search"
import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp"
import { CheckBoxNewIcon } from "../svgIcon"
import WhatshotIcon from "@mui/icons-material/Whatshot"
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn"
import AssignmentIcon from "@mui/icons-material/Assignment"
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const FilterCheckbox = (props) => (
	<Checkbox
		sx={{
			padding: "0.25rem",
			marginLeft: "0.25rem"
		}}
		color="primary"
		icon={<CheckBoxOutlineBlankSharpIcon />}
		checkedIcon={<CheckBoxNewIcon />}
		{...props}
	/>
)

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
			sx={{ display: "flex", mt: 2 }}
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

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function AdminTicketFilters({ sx }) {
	const dispatch = useDispatch()
	const { /*ticketSearchTerm,*/ selectedPriority, selectedStatus } = useSelector(getUiSettings)

	const handleSelectTicketStatus = (e) => {
		dispatch(setSelectedStatus({ [e.target.name]: e.target.checked }))
	}

	const statusCount = useMemo(() => Object.entries(selectedStatus).reduce(
		(count, current) => count + (current[1] ? 1 : 0), 0
	), [selectedStatus])

	return (
		<Box sx={sx}>
			<Box sx={{ display: "flex", alignItems: "center", my: 1 }} >
				<Typography variant="h4" style={{ flexGrow: 1, fontWeight: 500 }}>
					Ticket Filters
				</Typography>
				<Button
					size="small"
					variant="outlined"
					onClick={(e) => {
						e.stopPropagation()
						dispatch(resetTicketsFilter())
					}}
				>
					Reset
				</Button>
			</Box>

			<Box>

				<FilterTicketInbox />

				<Typography sx={{ fontWeight: 500, my: 1 }}>Status</Typography>
				<FormGroup>
					<FormControlLabel
						control={
							<FilterCheckbox
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
						label="All"
					/>
					<FormControlLabel
						control={
							<FilterCheckbox
								checked={selectedStatus[TICKET_STATUS.OPEN]}
								onChange={handleSelectTicketStatus}
								name={TICKET_STATUS.OPEN}
							/>
						}
						label="Open"
					/>
					<FormControlLabel
						control={
							<FilterCheckbox
								name={TICKET_STATUS.PENDING}
								onChange={handleSelectTicketStatus}
								checked={selectedStatus[TICKET_STATUS.PENDING]}
							/>
						}
						label="Pending"
					/>
					<FormControlLabel
						control={
							<FilterCheckbox
								name={TICKET_STATUS.REPLIED}
								onChange={handleSelectTicketStatus}
								checked={selectedStatus[TICKET_STATUS.REPLIED]}
							/>
						}
						label="Replied"
					/>
					<FormControlLabel
						control={
							<FilterCheckbox
								name={TICKET_STATUS.CLOSED}
								onChange={handleSelectTicketStatus}
								checked={selectedStatus[TICKET_STATUS.CLOSED]}
							/>
						}
						label="Closed"
					/>
				</FormGroup>

			</Box>

			<Box>
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
						onChange={(e) => { dispatch(setSelectedPriority(e.target.value)) }}
					>
						{Object.entries(PRIORITY).map((item) => {
							return <MenuItem key={item[1]} value={item[1]}>{item[1]}</MenuItem>
						})}
					</Select>
				</FormControl>
			</Box>

			{/* <Box>
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
						onChange={(e) => { dispatch(setTicketSearchTerm(e.target.value)) }}

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
			</Box> */}

		</Box >
	)
}
AdminTicketFilters.propTypes = {
	sx: PropTypes.object
}

export default AdminTicketFilters