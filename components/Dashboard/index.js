import React from "react"
import { Container, Grid } from "@material-ui/core"
import DashboardContent from "./DashboardContent"
import Filters from "./Filters"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
	root: {
		// maxWidth: "1440px",
		// left: 0
	}
}))

function Dashboard() {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Container>
				<Grid container>
					<Grid item xs={12} sm={12} md={8} >
						<DashboardContent />
					</Grid>
					<Grid item xs={12} sm={12} md={4} >
						<Filters />
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default Dashboard