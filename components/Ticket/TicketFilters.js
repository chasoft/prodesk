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
import React from "react"
import { Box, Button, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch } from "react-redux"

//PROJECT IMPORT
import { GROUPBY } from "@helpers/constants"
import { resetTicketFilters } from "@redux/slices/uiSettings"

import {
	FilterTicketDepartments,
	FilterTicketGroupBy,
	FilterTicketHasWord,
	FilterTicketPriorities,
	FilterTicketStatus
} from "@components/Ticket/AdminTicketFilters"

//ASSETS

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function TicketFilters({ sx }) {
	const dispatch = useDispatch()

	const handleResetAndRefresh = async (e) => {
		e.stopPropagation()
		dispatch(resetTicketFilters())
	}

	return (
		<Box sx={sx}>

			<Box sx={{ display: "flex", alignItems: "center", my: 1 }} >
				<Typography variant="h4" style={{ flexGrow: 1, fontWeight: 500 }}>
					Filter
				</Typography>
				<Button
					size="small"
					variant="outlined"
					onClick={handleResetAndRefresh}
				>
					Reset
				</Button>
			</Box>

			<FilterTicketGroupBy groupBy={[
				GROUPBY.DEPARTMENT,
				GROUPBY.STATUS,
				GROUPBY.PRIORITY
			]} />

			<Box onClick={(e) => e.stopPropagation()}>
				<FilterTicketStatus />
			</Box>

			<FilterTicketPriorities />

			<FilterTicketDepartments />

			<FilterTicketHasWord />

		</Box >
	)
}
TicketFilters.propTypes = {
	sx: PropTypes.object
}

export default TicketFilters