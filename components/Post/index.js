import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, IconButton, Container, Grid, Hidden, Typography } from "@material-ui/core"
import PostContent from "./PostContent"
import Replies from "./Replies"
import HistoryTimeline from "./HistoryTimeline"

import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined"


const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: "1440px",
		left: 0
	},
	nav: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		"& > button": {
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3),
		},
	}
}))

function Post() {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Container>
				<Grid container>
					<Grid item xs={12} sm={12} md={8} >
						<nav className={classes.nav}>
							<Button color="primary" startIcon={<ArrowBackOutlinedIcon />}>Back</Button>
						</nav>

						<main className={classes.main}>
							<PostContent />
							<div className={classes.spacer}></div>
							<Replies />
						</main>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<Hidden xsDown={true}>
							<HistoryTimeline />
						</Hidden>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default Post