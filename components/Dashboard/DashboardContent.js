import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Fab, Link, Paper, Typography } from "@material-ui/core"
import PostListItem from "../Post/PostListItem"
import AskNow from "./../Docs/AskNow"
import AddIcon from "@material-ui/icons/Add"

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

//TODO: Float button - design the position
function DashboardContent() {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Typography className={classes.heading}>Browse the Support Desk</Typography>
			<div>
				<Typography variant="h4" className={classes.header}>Open</Typography>
				<Paper elevation={2} className={classes.group}>
					<PostListItem isFirst={true} />
					<PostListItem />
					<PostListItem isLast={true} />
				</Paper>
			</div>
			<div>
				<Typography variant="h4" className={classes.header}>Closed</Typography>
				<Paper elevation={2} className={classes.group}>
					<PostListItem isFirst={true} />
					<PostListItem />
					<PostListItem isLast={true} />
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