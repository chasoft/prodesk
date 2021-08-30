import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Link, Paper, Typography } from "@material-ui/core"
import PostListItem from "../Post/PostListItem"

// import HelpfulSurvey from "./HelpfulSurvey"


const useStyles = makeStyles((theme) => ({
	group: {
		margin: "1.5rem 0 0",
		[theme.breakpoints.down("xs")]: {
			margin: "1.625rem 0 0",
		},
	},
	header: {
		marginLeft: theme.spacing(3),
		marginTop: "3rem",
	}
}))

function DashboardContent() {
	const classes = useStyles()
	return (
		<>
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
		</>
	)
}

export default DashboardContent