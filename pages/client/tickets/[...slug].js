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
import { useRouter } from "next/router"
import Link from "next/link"

// MATERIAL-UI
import { Box, CircularProgress, Container } from "@mui/material"

//THIRD-PARTY
import { filter, size } from "lodash"
import { useDeepCompareEffect } from "react-use"
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import { getAuth } from "../../../redux/selectors"
import { getLayout } from "../../../layout/ClientLayout"
import useUiSettings from "../../../helpers/useUiSettings"
import { setTicketId } from "../../../redux/slices/uiSettings"
import TicketContent from "../../../components/Ticket/TicketContent"
import TicketReplies from "../../../components/Ticket/TicketReplies"
import { useGetTicketsQuery } from "../../../redux/slices/firestoreApi"
import IconBreadcrumbs from "../../../components/BackEnd/IconBreadcrumbs"

//ASSETS
import HomeIcon from "@mui/icons-material/Home"
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/


/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

function SingleTicket() {
	const router = useRouter()
	const { slug } = router.query
	const dispatch = useDispatch()
	const { currentUser } = useSelector(getAuth)
	//
	const { data: tickets, isLoading } = useGetTicketsQuery(currentUser.username)

	useUiSettings({
		title: "Title",
		background: {
			backgroundImage: ""
		}
	})

	useEffect(() => {
		if (size(slug)) dispatch(setTicketId(slug[1]))
		console.log(slug)
	}, [dispatch, slug])

	//fix bug when nagivate to other page
	if (!slug) return null

	//Note: ticket is array of object => [{}]
	const ticket = filter(tickets ?? [], { tid: slug[1] })

	return (
		<Container maxWidth="md" style={{ minHeight: "calc(100vh - 150px)" }}>

			<Box sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "flex-start",
				pl: { xs: 0, sm: 3 },
				pt: { xs: 3, sm: 4, md: 6, lg: 8 },
				pb: 2
			}}>
				<IconBreadcrumbs
					icon={null}
					title={size(ticket) ? ticket[0].subject : <CircularProgress size="20" />}
					items={[
						{
							icon: <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
							title: "Home",
							url: "/client"
						},
						{
							icon: <AirplaneTicketIcon sx={{ mr: 0.5 }} fontSize="inherit" />,
							title: "All tickets",
							url: "/client/tickets"
						}
					]}
				/>
			</Box>

			{isLoading &&
				<Box sx={{ display: "flex", height: "70%", alignItems: "center", justifyContent: "center" }}>
					<CircularProgress />
				</Box>}

			{(!isLoading && !size(ticket)) ?
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
					Ticket is not existed! Go back to <Link href="/client/tickets">All tickets</Link>
				</Box> : null}

			{(!isLoading && size(ticket)) ?
				<>
					<TicketContent ticket={ticket[0]} />
					<TicketReplies />
				</> : null}

		</Container >
	)
}

SingleTicket.getLayout = getLayout

export default SingleTicket