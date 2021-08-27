import React from "react"
import { Container, Grid } from "@material-ui/core"
import ArticleContent from "./ArticleContent"
import ListArticles from "./ListArticles"

function Article() {
	return (
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
	)
}

export default Article