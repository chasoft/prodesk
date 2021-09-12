import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Link from "next/link"
import { Fab, Paper, Typography } from "@material-ui/core"
import PostListItem from "../Post/PostListItem"
import AskNow from "./../Docs/AskNow"
import AddIcon from "@material-ui/icons/Add"
import { STATUS_FILTER } from "../../helpers/constants"

// import HelpfulSurvey from "./HelpfulSurvey"


const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
	},
	group: {
		margin: "1.5rem 0 2rem",
		[theme.breakpoints.down("xs")]: {
			margin: "1.625rem 0 2rem",
		},
	},
	header: {
		marginLeft: theme.spacing(3),
		marginTop: "1rem",
		[theme.breakpoints.down("xs")]: {
			marginTop: "0.5rem",
		},
	},
	heading: {
		marginTop: theme.spacing(5),
		textAlign: "center",
		fontSize: "2rem",
		lineHeight: "2.5rem",
		color: theme.palette.primary.main,
		[theme.breakpoints.down("xs")]: {
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

}))


const DummyData = [
	{
		docId: 1,
		subject: "Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!",
		excerpt: "Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!",
		link: "/docs/some-docs-i-dont-know",
		metaData: [],
		status: STATUS_FILTER.OPEN
	},
	{
		docId: 2,
		subject: "Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!",
		excerpt: "Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!",
		link: "/docs/some-docs-i-dont-know",
		metaData: [],
		status: STATUS_FILTER.CLOSED
	},
	{
		docId: 3,
		subject: "Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!",
		excerpt: "Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!",
		link: "/docs/some-docs-i-dont-know",
		metaData: [],
		status: STATUS_FILTER.OPEN
	},
	{
		docId: 4,
		subject: "Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!",
		excerpt: "Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!",
		link: "/docs/some-docs-i-dont-know",
		metaData: [],
		status: STATUS_FILTER.CLOSED
	},
	{
		docId: 5,
		subject: "Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!",
		excerpt: "Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!",
		link: "/docs/some-docs-i-dont-know",
		metaData: [],
		status: STATUS_FILTER.OPEN
	},
	{
		docId: 6,
		subject: "Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!",
		excerpt: "Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!",
		link: "/docs/some-docs-i-dont-know",
		metaData: [],
		status: STATUS_FILTER.OPEN
	},
]

function DashboardContent() {
	const classes = useStyles()
	const [openTickets, setOpenTickets] = useState([])
	const [closedTickets, setClosedTickets] = useState([])
	const [pendingTickets, setPendingTickets] = useState([])

	useEffect(() => {
		setOpenTickets(DummyData.filter(item => item.status === STATUS_FILTER.OPEN))
		setClosedTickets(DummyData.filter(item => item.status === STATUS_FILTER.CLOSED))
		setPendingTickets(DummyData.filter(item => item.status === STATUS_FILTER.PENDING))
	}, [DummyData])

	return (
		<div className={classes.root}>
			<Typography className={classes.heading}>Browse the Support Desk</Typography>
			<div>
				<Typography variant="h1" className={classes.header} style={{ color: "white" }}>Open</Typography>
				<Paper elevation={2} className={classes.group}>
					{
						openTickets.length > 0 ?
							openTickets.map((item, idx) => {
								return (
									<PostListItem
										key={item.docId}
										isFirst={idx === 0} isLast={idx === openTickets.length - 1}
										subject={item.subject}
										excerpt={item.excerpt}
										link={item.link}
										metaData={item.metaData}
									/>
								)
							})
							: <PostListItem />
					}
				</Paper>
			</div>
			<div>
				<Typography variant="h1" className={classes.header}>Closed</Typography>
				<Paper elevation={2} className={classes.group}>
					{
						closedTickets.length > 0 ?
							closedTickets.map((item, idx) => {
								return (
									<PostListItem
										key={item.docId}
										isFirst={idx === 0} isLast={idx === closedTickets.length - 1}
										subject={item.subject}
										excerpt={item.excerpt}
										link={item.link}
										metaData={item.metaData}
									/>
								)
							})
							: <PostListItem emptyMessage="There are no closed tickets." />
					}
				</Paper>
			</div>

			<div>
				<Typography variant="h1" className={classes.header}>Pending</Typography>
				<Paper elevation={2} className={classes.group}>
					{
						pendingTickets.length > 0 ?
							pendingTickets.map((item, idx) => {
								return (
									<PostListItem
										key={item.docId}
										isFirst={idx === 0} isLast={idx === pendingTickets.length - 1}
										subject={item.subject}
										excerpt={item.excerpt}
										link={item.link}
										metaData={item.metaData}
									/>
								)
							})
							: <PostListItem emptyMessage="There are no pending tickets." />
					}
				</Paper>
			</div>

			<AskNow />
			<Fab color="primary" aria-label="add" className={classes.fab}>
				<AddIcon />
			</Fab>
		</div>
	)
}

export default DashboardContent