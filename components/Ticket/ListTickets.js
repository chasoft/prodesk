/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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

import React, { useEffect, useState } from "react"

import makeStyles from "@mui/styles/makeStyles"
import { Fab, Paper, Typography } from "@mui/material"

//THIRD-PARTY
import { useDispatch, useSelector } from "react-redux"

//PROJECT IMPORT
import AskNow from "../Docs/AskNow"
import { getUiSettings } from "../../redux/selectors"
import { PRIORITY, STATUS_FILTER } from "../../helpers/constants"
import PostListItem, { PostListEmpty } from "../Post/PostListItem"

//ASSETS
import AddIcon from "@mui/icons-material/Add"
import { resetTicketsFilter } from "../../redux/slices/uiSettings"

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		minWidth: 0
	},
	group: {
		minWidth: 0
	},
	header: {
		marginLeft: theme.spacing(3),
		marginTop: "3rem",
		[theme.breakpoints.down("md")]: {
			marginTop: "0.5rem",
		},
	},
	heading: {
		marginTop: theme.spacing(5),
		textAlign: "center",
		fontSize: "2rem",
		lineHeight: "2.5rem",
		color: "#ffffff",
		[theme.breakpoints.down("md")]: {
			marginTop: theme.spacing(3),
			color: "#1a73e8",
			fontSize: "1.5rem",
		}
	},
	fab: {
		position: "fixed",
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	link: {
		cursor: "pointer",
		fontWeight: 500,
		"&:hover": {
			textDecoration: "underline",
		}
	}

}))


const DummyData = [
	{
		docId: 1,
		subject: "Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!",
		excerpt: "Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!",
		link: "/docs/some-docs-i-dont-know",
		metaData: [],
		status: STATUS_FILTER.OPEN,
		priority: PRIORITY.HIGH,
		isPublic: false,
		category: "",
		username: ""
	},
	{
		docId: 2,
		subject: "Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!",
		excerpt: "Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!",
		link: "/docs/some-docs-i434343-dont-know",
		metaData: ["a"],
		status: STATUS_FILTER.CLOSED,
		priority: PRIORITY.NORMAL,
		isPublic: false,
	},
	{
		docId: 3,
		subject: "Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!",
		excerpt: "Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!",
		link: "/docs/some-docs-i-dos24343434343nt-know",
		metaData: ["a"],
		status: STATUS_FILTER.OPEN,
		priority: PRIORITY.LOW,
		isPublic: false,
	},
	{
		docId: 4,
		subject: "Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!",
		excerpt: "Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!",
		link: "/docs/some-docs-i-dodfdfdnt-know",
		metaData: [],
		status: STATUS_FILTER.CLOSED,
		priority: PRIORITY.NORMAL,
		isPublic: true,
	},
	{
		docId: 5,
		subject: "Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!",
		excerpt: "Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!",
		link: "/docs/some-33333docs-i-dont-know",
		metaData: [],
		status: STATUS_FILTER.OPEN,
		priority: PRIORITY.NORMAL,
		isPublic: true,
	},
	{
		docId: 6,
		subject: "Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!",
		excerpt: "Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!",
		link: "/docs/some-docs45444444-i-dont-know",
		metaData: [],
		status: STATUS_FILTER.OPEN,
		priority: PRIORITY.HIGH,
		isPublic: false,
	},
]

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

function ListTickets() {
	const classes = useStyles()
	const { ticketSearchTerm, selectedPriority, selectedStatus } = useSelector(getUiSettings)
	const [filteredTickets, setFilteredTickets] = useState([])

	const dispatch = useDispatch()
	const handleResetSearchCriteria = () => { dispatch(resetTicketsFilter()) }

	useEffect(() => {
		//Only execute the filtering when there is NO search term inputted or 
		//Because, when use type search term, then, search ALL tickets without any restriction
		if (ticketSearchTerm.length < 3) {
			const filteredDB = Object.entries(selectedStatus)
				.filter(_ => { return _[1] === true })	// => ["Open": true, "Closed": true]
				.map(item => item[0])					// => ["Open", "Closed"]
				.map((status) => {
					const finalResult = DummyData
						.filter(item => item.status === status)
						.filter(item => (selectedPriority === PRIORITY.ALL) || (item.priority === selectedPriority))
					return {
						status: status,   // status is type of string
						data: finalResult // data is type of array (of Objects)
					}
				})
				.filter(item => item.data.length > 0)

			setFilteredTickets(filteredDB)

		} else {
			//show all data got from server
			setFilteredTickets([])
		}

	}, [DummyData, ticketSearchTerm, selectedPriority, selectedStatus])

	return (
		<div className={classes.root}>
			<Typography variant="h1" style={{ color: "white", textAlign: "center" }}>All tickets</Typography>

			{
				filteredTickets.length > 0
					?
					filteredTickets.map((item, idx) => {
						return (
							<div key={item.status}>
								<Typography
									variant="h2"
									className={classes.header} style={(idx === 0) ? { color: "white" } : null}
								>
									{item.status}
								</Typography>
								<Paper elevation={2} className={classes.group}>
									{
										item.data.length > 0 ?
											item.data.map((ticket, idx) => {
												return (
													<PostListItem
														key={ticket.docId}
														isFirst={idx === 0} isLast={idx === item.data.length - 1}
														subject={ticket.subject}
														excerpt={ticket.excerpt}
														link={ticket.link}
														metaData={ticket.metaData}
													/>
												)
											})
											: <PostListEmpty message="There are no open tickets." />
									}
								</Paper>
							</div>
						)
					})

					:
					<div className={classes.header}>
						<Typography variant="h2" style={{ color: "white" }}>
							There are no tickets that matched your criteria
						</Typography>
						<Typography variant="body" style={{ color: "white" }}>
							Try again by using other search criteria or click &quot;<span onClick={handleResetSearchCriteria} className={classes.link}>here</span>&quot; to reset.
						</Typography>
					</div>
			}

			<AskNow />
			<Fab color="primary" aria-label="add" className={classes.fab}>
				<AddIcon />
			</Fab>
		</div>
	)
}

export default ListTickets