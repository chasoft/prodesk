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
import React, { useRef, useState } from "react"
import { Box, Button, CircularProgress, Drawer, IconButton, Paper, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { usePrevious } from "react-use"
import { useDispatch, useSelector } from "react-redux"
import { isEqual, sortBy, reverse, groupBy, filter } from "lodash"

//PROJECT IMPORT
import AskNow from "../Docs/AskNow"
import TicketFilters from "./TicketFilters"
import TicketListItem from "./TicketListItem"
import { getAuth, getUiSettings } from "../../redux/selectors"
import { PRIORITY, REDIRECT_URL } from "../../helpers/constants"
import { resetTicketsFilter } from "../../redux/slices/uiSettings"
import { useGetTicketsQuery } from "../../redux/slices/firestoreApi"
import IconBreadcrumbs from "./../../components/BackEnd/IconBreadcrumbs"

//ASSETS
import HomeIcon from "@mui/icons-material/Home"
import FilterListIcon from "@mui/icons-material/FilterList"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useGetTickets = () => {
	const { currentUser } = useSelector(getAuth)
	const { data: tickets, isLoading } = useGetTicketsQuery(currentUser.username)
	const { ticketSearchTerm, selectedPriority, selectedStatus } = useSelector(getUiSettings)

	const _Status = Object.entries(selectedStatus).filter(i => i[1] === true).map(i => i[0])

	const prevTickets = usePrevious(tickets)
	const prevSearchTerm = usePrevious(ticketSearchTerm)
	const prevPriority = usePrevious(selectedPriority)
	const prevStatus = usePrevious(_Status)
	//we use useRef here because, later we change the value
	//and, this hook will not be re-render,
	const filteredTickets = useRef()

	if (isLoading) { return ({ data: [], isLoading: true }) }


	console.log("tickets", tickets)

	if (!isEqual(prevTickets, tickets) ||
		!isEqual(prevSearchTerm, ticketSearchTerm) ||
		!isEqual(prevPriority, selectedPriority) ||
		!isEqual(prevStatus, selectedStatus)) {

		//filter by priority
		let filtered = tickets
		if (selectedPriority !== PRIORITY.ALL) {
			filtered = filter(tickets, { priority: selectedPriority })
		}

		//filter by status
		filtered = filter(filtered, (i) => _Status.includes(i.status))
		//sort the list - descensing by `createdAt`
		const sortedDocs = reverse(sortBy(filtered, ["updatedAt"]))
		//group by status
		const groupByStatus = groupBy(sortedDocs, (i) => i.status)

		filteredTickets.current = Object.entries(groupByStatus)
	}

	return ({ data: filteredTickets.current, isLoading: false })
}

const FilterDrawer = ({ isOpen, handleClose }) => {
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
				<TicketFilters sx={{ p: 2 }} />
			</Box>
		</Drawer>
	)
}
FilterDrawer.propTypes = {
	isOpen: PropTypes.bool,
	handleClose: PropTypes.func
}

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketList() {
	const dispatch = useDispatch()
	const [showFilter, setShowFilter] = useState(false)
	const { data: tickets, isLoading } = useGetTickets()
	const handleResetSearchCriteria = () => { dispatch(resetTicketsFilter()) }

	if (isLoading) {
		return (
			<Box sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%"
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
					title="All tickets"
					items={[
						{
							icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
							title: "Home",
							url: REDIRECT_URL.CLIENT
						}
					]}
				/>
				<Box sx={{
					display: "flex",
					justifyContent: "center",
					width: "100%",
					mt: 4
				}}>
					<Typography variant="h1" sx={{ flexGrow: 1 }}>
						All tickets
					</Typography>

					<Link href={REDIRECT_URL.NEW_TICKETS} passHref>
						<Button variant="contained" sx={{ mb: 1 }}>
							New ticket
						</Button>
					</Link>

					<Tooltip arrow title="Filters" placement="top">
						<IconButton
							onClick={() => { setShowFilter(true) }}
							sx={{ display: { xs: "flex", md: "none" }, mb: 1, ml: 1 }}
						>
							<FilterListIcon fontSize="medium" color="primary" />
						</IconButton>
					</Tooltip>

					<FilterDrawer
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
								<TicketListItem
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

export default TicketList