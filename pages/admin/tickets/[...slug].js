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

import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

// MATERIAL-UI
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material"

//THIRD-PARTY

//PROJECT IMPORT
import { getLayout } from "@layout/AdminLayout"
import useUiSettings from "@helpers/useUiSettings"
import TicketContent from "@components/Ticket/TicketContent"
import { EMPTY, REDIRECT_URL, USERGROUP } from "@helpers/constants"
import TicketReplies from "@components/Ticket/TicketReplies"
import TicketActionButtons from "@components/Ticket/TicketCloseReplyButtons"
import { useGetTicketsForAdminQuery } from "@redux/slices/firestoreApi"
import IconBreadcrumbs, { BreadcrumbsBox } from "@components/BackEnd/IconBreadcrumbs"

//ASSETS
import HomeIcon from "@mui/icons-material/Home"
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket"
import ErrorIcon from "@mui/icons-material/Error"
import useProfilesGroup from "@helpers/useProfilesGroup"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function AdminSingleTicket() {
	const router = useRouter()
	const { slug } = router.query

	const {
		data: tickets = EMPTY.ARRAY,
		isLoading: isLoadingTickets
	} = useGetTicketsForAdminQuery(undefined)

	const {
		userList: allAdminProfiles = EMPTY.ARRAY,
		isLoading: isLoadingAllAdminProfiles
	} = useProfilesGroup([
		USERGROUP.SUPERADMIN.code,
		USERGROUP.ADMIN.code,
		USERGROUP.STAFF.code,
		USERGROUP.AGENT.code
	])

	useUiSettings({
		title: "Title",
		background: {
			backgroundImage: ""
		}
	})

	if (router.isFallback || !slug) return null

	//tickets = {tid: {}, tid: {}}
	const ticket = tickets ? tickets[slug[1]] : undefined

	if (isLoadingTickets || isLoadingAllAdminProfiles) {
		return (
			<Container maxWidth="md" style={{ flexGrow: 1 }}>
				<Box sx={{
					display: "flex",
					height: "70%",
					alignItems: "center",
					justifyContent: "center"
				}}>
					<CircularProgress />
				</Box >
			</Container>
		)
	}

	return (
		<Container maxWidth="md" style={{ flexGrow: 1 }}>

			<BreadcrumbsBox>
				<IconBreadcrumbs
					icon={null}
					title={ticket?.subject ?? "Ticket not existed"}
					items={[
						{
							icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
							title: "Home",
							url: REDIRECT_URL.ADMIN.INDEX
						},
						{
							icon: <AirplaneTicketIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
							title: "Tickets management",
							url: REDIRECT_URL.ADMIN.TICKETS
						}
					]}
				/>
			</BreadcrumbsBox>

			{(isLoadingTickets === false && ticket === undefined)
				? <Box sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "center",
					height: "70%"
				}}>
					<ErrorIcon color="warning" sx={{ fontSize: 80 }} />
					<Typography variant="caption" sx={{ p: 3 }}>
						Ticket is not existed!
					</Typography>
					<Link href={REDIRECT_URL.ADMIN.TICKETS} passHref>
						<Button variant="outlined">Go back to All tickets</Button>
					</Link>
				</Box>
				: null}

			{(isLoadingTickets === false && ticket !== undefined)
				? <>
					<TicketContent
						allAdminProfiles={allAdminProfiles}
						ticket={ticket}
					/>
					<TicketReplies ticket={ticket} />
					<TicketActionButtons
						allAdminProfiles={allAdminProfiles}
						ticket={ticket}
					/>
				</>
				: null}

		</Container>
	)
}

AdminSingleTicket.getLayout = getLayout

export default AdminSingleTicket