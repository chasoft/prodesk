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

import React, { useState } from "react"
import { PropTypes } from "prop-types"

import withStyles from "@mui/styles/withStyles"
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, FormControl, FormControlLabel, FormGroup, MenuItem, Select, Typography, Checkbox, OutlinedInput, InputAdornment, SvgIcon } from "@mui/material"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getUiSettings } from "../../redux/selectors"
import { PRIORITY, TICKET_STATUS } from "../../helpers/constants"

//ASSETS
import SearchIcon from "@mui/icons-material/Search"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import CheckBoxOutlineBlankSharpIcon from "@mui/icons-material/CheckBoxOutlineBlankSharp"
import { resetTicketsFilter, setSelectedPriority, setSelectedStatus, setTicketSearchTerm } from "../../redux/slices/uiSettings"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const FilterCategory = withStyles({
	root: {
		margin: 0,
		width: "12rem",
		padding: "0 0.75rem 0.75rem",
		boxShadow: "none",
		borderRadius: "0.5rem",
		"&:before": {
			display: "none",
		},
		"&&": {
			marginBottom: "1rem",
		}
	}
})(Accordion)

const FilterSummary = withStyles((theme) => ({
	root: {
		padding: 0,
		paddingTop: "0.25rem",
		minHeight: 0
	},
	content: {
		"&&": {
			margin: 0
		},
	},
	expandIcon: {
		padding: "4px",
		marginRight: 0,
		color: theme.palette.primary.main
	}
}))(AccordionSummary)

const FilterDetails = withStyles({
	root: {
		padding: 0,
	}
})(AccordionDetails)

const FilterSelect = withStyles((theme) => ({
	root: {
		"&&": {
			paddingLeft: "10px",
			color: theme.palette.primary.main
		}
	}
}))(Select)


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

const FilterFrame = ({ title, children }) => {
	const [open, setOpen] = useState(true)

	const handleOpen = () => { setOpen(p => !p) }

	return (
		<FilterCategory expanded={open} onChange={handleOpen}>
			<FilterSummary
				expandIcon={<ExpandMoreIcon fontSize="small" />}
				aria-controls="a-collapsible-panel"
				id="a-collapsible-panel"
			>
				<Typography style={{ fontWeight: 500 }}>{title}</Typography>
			</FilterSummary>
			<FilterDetails>
				{children}
			</FilterDetails>
		</FilterCategory >
	)
}
FilterFrame.propTypes = { title: PropTypes.string, children: PropTypes.any }

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function ListTicketsFilter() {
	const dispatch = useDispatch()
	const { scrollTop, ticketSearchTerm, selectedPriority, selectedStatus } = useSelector(getUiSettings)

	const handleSelectTicketStatus = (e) => {
		dispatch(setSelectedStatus({ [e.target.name]: e.target.checked }))
	}

	return (
		<Box
			sx={{
				margin: "5rem 0 0 2rem",
				width: "12rem",
				display: "flex",
				flexDirection: "column",
			}}
		>

			<div style={{ position: "fixed" }}>
				<div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }} >
					<Typography style={{ flexGrow: 1, fontWeight: 500, color: (scrollTop > 150) ? "#000" : "#FFF" }}>
						Filter
					</Typography>
					<Button
						style={{ fontSize: "0.9rem" }} color={(scrollTop > 150) ? "primary" : "inherit"}
						onClick={() => { dispatch(resetTicketsFilter()) }}
					>
						Reset
					</Button>
				</div>

				<FilterFrame title="Status">
					<FormControl component="fieldset">
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
					</FormControl>
				</FilterFrame>

				<FilterFrame title="Priority">
					<FormControl fullWidth
						sx={{
							border: "1px solid #ced4da",
							borderRadius: "0.25rem"
						}}
					>
						<FilterSelect
							MenuProps={{
								anchorOrigin: { vertical: "bottom", horizontal: "left" },
								getContentAnchorEl: null
							}}
							disableUnderline={true}
							value={selectedPriority}
							onChange={(e) => { dispatch(setSelectedPriority(e.target.value)) }}
						>
							{
								Object.entries(PRIORITY).map((item) => {
									return <MenuItem key={item[1]} value={item[1]}>{item[1]}</MenuItem>
								})
							}
						</FilterSelect>
					</FormControl>
				</FilterFrame>

				<FilterFrame title="Has words">
					<FormControl variant="outlined">
						<OutlinedInput
							placeholder="Type keywords"
							endAdornment={
								<InputAdornment position="end">
									<SearchIcon fontSize="small" />
								</InputAdornment>
							}
							aria-describedby="ticket-search-term"
							labelWidth={0}
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
				</FilterFrame>
			</div>
			{/* the empty block below is used to fixed the bug when setting position of theFilter to fixed */}
			<div style={{ width: "200px" }}></div>
		</Box >
	)
}

export default ListTicketsFilter