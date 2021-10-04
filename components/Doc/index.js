import React from "react"
import { Container, Grid } from "@mui/material"
import DocContent from "./DocContent"
import ListDocs from "./ListDocs"
import ProBreadcrumbs from "../FrontEnd/ProBreadcrumbs"


function Doc() {
	return (
		<Container maxWidth="lg">
			<Grid container>
				<Grid item xs={12} sm={12} md={8} >
					<ProBreadcrumbs />
					<DocContent />
				</Grid>
				<Grid item xs={12} sm={12} md={4} >
					<ListDocs />
				</Grid>
			</Grid>
		</Container>
	)
}

export default Doc