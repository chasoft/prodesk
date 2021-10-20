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

import React, { useEffect } from "react"
import useUiSettings from "./../../../helpers/useUiSettings"

// MATERIAL-UI
import { Box, Container, Typography } from "@mui/material"

//THIRD-PARTY
import { batch as reduxBatch, useDispatch } from "react-redux"
import TicketStepper from "../../../components/Ticket/Create/NewTicketStepper"

//PROJECT IMPORT
import { getLayout } from "./../../../layout/ClientLayout"
import { resetNewTicket } from "../../../redux/slices/newTicket"
import { setEditorData } from "../../../redux/slices/textEditor"
import IconBreadcrumbs from "../../../components/BackEnd/IconBreadcrumbs"

//ASSETS
import HomeIcon from "@mui/icons-material/Home"
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function NewTicket() {

	const dispatch = useDispatch()

	useUiSettings({
		title: "Open New Ticket",
		background: {
			backgroundImage: "",
		}
	})

	useEffect(() => {
		reduxBatch(() => {
			dispatch(resetNewTicket())
			dispatch(setEditorData(""))
		})
	}, [dispatch])

	return (
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>

			<Box sx={{ display: "flex" }}>

				<Box sx={{ flexGrow: 1 }}>

					<Box sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-start",
						px: { xs: 2, md: 4 },
						pt: { xs: 3, sm: 6, md: 8, lg: 10 },
						pb: { xs: 2, sm: 4, md: 6 }
					}}>
						<IconBreadcrumbs
							icon={null}
							title="New ticket"
							items={[
								{
									icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
									title: "Home",
									url: "/client"
								}
							]}
						/>
						<Typography variant="h1" sx={{ fontWeight: 500, mt: 4 }}>
							Open New Ticket
						</Typography>
						<Typography variant="body2">
							Post your question and get answer from our dedicated staffs
						</Typography>
					</Box>

					<Box sx={{
						px: { xs: 2, md: 4 },
						pb: 2
					}}>
						<TicketStepper />
					</Box>

				</Box>
			</Box>

		</Container>
	)
}

NewTicket.getLayout = getLayout

export default NewTicket