import React from "react"
import { Container, Grid } from "@mui/material"
import ArticleContent from "./ArticleContent"
import ListArticles from "./ListArticles"
import ProBreadcrumbs from "../FrontEnd/ProBreadcrumbs"


function Article() {
	return (
		<Container maxWidth="lg">
			<Grid container>
				<Grid item xs={12} sm={12} md={8} >
					<ProBreadcrumbs />
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