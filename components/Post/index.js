import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Container, Grid, Typography } from "@material-ui/core"
import PostContent from "./PostContent"
import Replies from "./Replies"


const useStyles = makeStyles((theme) => ({


}))

function Post() {
	const classes = useStyles()
	return (
		<Container maxWidth="md">
			<main className={classes.main}>
				<PostContent />
				<div className={classes.spacer}></div>
				<Replies />
			</main>
		</Container>
	)
}

export default Post