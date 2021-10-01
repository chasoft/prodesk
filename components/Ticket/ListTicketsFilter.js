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

import withStyles from "@mui/styles/withStyles"
import { Box, Button, FormControl, FormControlLabel, FormGroup, MenuItem, Select, Typography, Checkbox, OutlinedInput, InputAdornment, SvgIcon } from "@mui/material"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getUiSettings } from "./../../redux/selectors"
import { PRIORITY, TICKET_STATUS } from "./../../helpers/constants"

//ASSETS
import SearchIcon from "@mui/icons-material/Search"
import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp"
import { resetTicketsFilter, setSelectedPriority, setSelectedStatus, setTicketSearchTerm } from "./../../redux/slices/uiSettings"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const FilterCheckbox0 = withStyles({
	root: {
		padding: "0.25rem",
		marginLeft: "0.25rem"
	},
})(Checkbox)

function CheckBoxNewIcon(props) {
	return (
		<SvgIcon {...props}>
			<path d="M3,3v18h18V3H3z M19,8v11H5v-7V5h14V8z" />
			<polygon points="10,14.2 6.4,10.6 5,12 10,17 19,8 17.6,6.6 " />
		</SvgIcon>
	)
}

const FilterCheckbox = (props) => (
	<FilterCheckbox0
		{...props}
		color="primary"
		icon={<CheckBoxOutlineBlankSharpIcon />}
		checkedIcon={<CheckBoxNewIcon />}
	/>
)



/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ListTicketsFilter() {
	const dispatch = useDispatch()
	const { ticketSearchTerm, selectedPriority, selectedStatus } = useSelector(getUiSettings)

	const handleSelectTicketStatus = (e) => {
		dispatch(setSelectedStatus({ [e.target.name]: e.target.checked }))
	}

	return (
		<Box
			sx={{
				display: { xs: "none", md: "flex" },
				flexDirection: "column",
				mt: "124px",
				ml: 3, px: 3,
				backgroundColor: "#FFF",
				borderRadius: "0.5rem",
				width: "250px",
				position: "sticky",
				top: "80px"
			}}
		>

			<Box sx={{ display: "flex", alignItems: "center", my: 1 }} >
				<Typography style={{ flexGrow: 1, fontWeight: 500 }}>
					Filter
				</Typography>
				<Button
					style={{ fontSize: "0.9rem" }}
					onClick={() => { dispatch(resetTicketsFilter()) }}
				>
					Reset
				</Button>
			</Box>

			<Box>
				<Typography sx={{ fontWeight: 500, my: 1 }}>Status</Typography>
				<FormGroup>
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
				<FormControl fullWidth
					sx={{
						border: "1px solid #ced4da",
						borderRadius: "0.25rem"
					}}
				>
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
						{
							Object.entries(PRIORITY).map((item) => {
								return <MenuItem key={item[1]} value={item[1]}>{item[1]}</MenuItem>
							})
						}
					</Select>
				</FormControl>
			</Box>

			<Box>
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
			</Box>

		</Box >
	)
}

export default ListTicketsFilter