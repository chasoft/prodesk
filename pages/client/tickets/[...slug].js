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
import Link from "next/link"
import { useRouter } from "next/router"

// MATERIAL-UI
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material"

//THIRD-PARTY
import { useSelector } from "react-redux"

//PROJECT IMPORT
import { getAuth } from "@redux/selectors"
import { getLayout } from "@layout/ClientLayout"
import { REDIRECT_URL, USERGROUP } from "@helpers/constants"
import TicketReplies from "@components/Ticket/TicketReplies"
import TicketContent from "@components/Ticket/TicketContent"
import useUiSettings from "@helpers/useUiSettings"
import TicketActionButtons from "@components/Ticket/TicketCloseReplyButtons"
import { useGetTicketsForUserQuery } from "@redux/slices/firestoreApi"
import IconBreadcrumbs, { BreadcrumbsBox } from "@components/BackEnd/IconBreadcrumbs"

//ASSETS
import HomeIcon from "@mui/icons-material/Home"
import ErrorIcon from "@mui/icons-material/Error"
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket"
import useProfilesGroup from "@helpers/useProfilesGroup"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function SingleTicket() {
	const router = useRouter()
	const { slug } = router.query
	const { currentUser } = useSelector(getAuth)
	//
	const {
		data: tickets = [],
		isLoading: isLoadingTickets
	} = useGetTicketsForUserQuery(currentUser.username)

	const {
		userList: allAdminProfiles = [],
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

	//Note: `tickets` is array of object => [{}]
	const ticket = tickets?.find(i => i.tid === slug[1])

	if (isLoadingTickets || isLoadingAllAdminProfiles) {
		return (
			<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>
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
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>

			<BreadcrumbsBox>
				<IconBreadcrumbs
					icon={null}
					title={ticket?.subject ?? "Ticket not existed"}
					items={[
						{
							icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
							title: "Home",
							url: REDIRECT_URL.CLIENT.INDEX
						},
						{
							icon: <AirplaneTicketIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
							title: "All tickets",
							url: REDIRECT_URL.CLIENT.TICKETS
						}
					]}
				/>
			</BreadcrumbsBox>

			{(!isLoadingTickets && ticket === undefined) ?
				<Box sx={{
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
					justifyContent: "center",
					height: "70%"
				}}>
					<ErrorIcon color="warning" sx={{ fontSize: 80 }} />
					<Typography variant="caption" sx={{ p: 3 }}>Ticket is not existed!</Typography>
					<Link href={REDIRECT_URL.CLIENT.TICKETS} passHref>
						<Button variant="outlined">Go back to All tickets</Button>
					</Link>

				</Box> : null}

			{(!isLoadingTickets && ticket !== undefined) ?
				<>
					<TicketContent
						allAdminProfiles={allAdminProfiles}
						ticket={ticket}
					/>

					<TicketReplies ticket={ticket} />

					<TicketActionButtons
						ticket={ticket}
						allAdminProfiles={allAdminProfiles}
					/>
				</> : null}

		</Container >
	)
}

SingleTicket.getLayout = getLayout

export default SingleTicket