import React from "react"
import makeStyles from "@mui/styles/makeStyles"
import { Container, Grid, Box, } from "@mui/material"
import PostContent from "./PostContent"
import Replies from "./Replies"
import HistoryTimeline from "./HistoryTimeline"


const useStyles = makeStyles((theme) => ({
	root: {
		// maxWidth: "1440px",
		// left: 0
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
						{/* <nav className={classes.nav}>
							<Button color="primary" startIcon={<ArrowBackOutlinedIcon />}>Back</Button>
						</nav> */}

						<main className={classes.main}>
							<PostContent />
							<div className={classes.spacer}></div>
							<Replies />
						</main>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<Box sx={{ display: { xs: "none", md: "block" } }}>
							<HistoryTimeline />
						</Box>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default Post