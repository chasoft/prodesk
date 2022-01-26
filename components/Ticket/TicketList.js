/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Support System  | 1.0.1     ║ *
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
import { Box, Button, CircularProgress, Drawer, IconButton, Paper, Tooltip, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import AskNow from "@components/Docs/AskNow"
import TicketFilters from "@components/Ticket/TicketFilters"
import TicketListItem from "@components/Ticket/TicketListItem"
import IconBreadcrumbs from "@components/BackEnd/IconBreadcrumbs"

import { EMPTY, REDIRECT_URL } from "@helpers/constants"
import useFilteredTicketsForUser from "@helpers/useFilteredTicketsForUser"

import { resetTicketFilters } from "@redux/slices/uiSettings"

//ASSETS
import HomeIcon from "@mui/icons-material/Home"
import FilterListIcon from "@mui/icons-material/FilterList"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

function FilterDrawer({ isOpen, handleClose }) {
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
	const { data: tickets = EMPTY.ARRAY, isLoading } = useFilteredTicketsForUser()
	const handleResetSearchCriteria = () => { dispatch(resetTicketFilters()) }

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
							url: REDIRECT_URL.CLIENT.INDEX
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

					<Link href={REDIRECT_URL.CLIENT.NEW_TICKETS} passHref>
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