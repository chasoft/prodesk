import React from "react"
import makeStyles from "@mui/styles/makeStyles"
import { Button, IconButton, Container, Grid, Hidden, Typography } from "@mui/material"
import CategoryContent from "./CategoryContent"
import Banner from "../widget/Banner"


const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: "1440px",
		left: 0
	},
	widget: {
		marginTop: "4rem",
		marginLeft: "3rem",
		[theme.breakpoints.down("lg")]: {
			marginLeft: 0,
			marginTop: "3rem",
		}
	}
}))

function Category() {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Container>
				<Grid container>
					<Grid item xs={12} sm={12} md={8} >
						<CategoryContent />
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<div className={classes.widget}>
							<Banner />
						</div>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default Category