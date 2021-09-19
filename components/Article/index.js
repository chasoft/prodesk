import React from "react"
import { Container, Grid } from "@mui/material"
import ArticleContent from "./ArticleContent"
import ListArticles from "./ListArticles"
import makeStyles from "@mui/styles/makeStyles"

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: "1440px",
		left: 0
	}
}))

function Article() {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Container>
				<Grid container>
					<Grid item xs={12} sm={12} md={8} >
						<ArticleContent />
					</Grid>
					<Grid item xs={12} sm={12} md={4} >
						<ListArticles />
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default Article