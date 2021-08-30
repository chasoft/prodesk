import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Container, Grid, Hidden, Typography } from "@material-ui/core"
import PostContent from "./PostContent"
import Replies from "./Replies"
import HistoryTimeline from "./HistoryTimeline"


const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: "1440px",
		left: 0
	}
}))

function Post() {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Container>
				<Grid container>
					<Grid item xs={12} sm={12} md={8} >
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