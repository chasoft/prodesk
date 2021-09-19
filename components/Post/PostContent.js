import React from "react"
import makeStyles from "@mui/styles/makeStyles"
import { Grid, Typography } from "@mui/material"
import FooterNotice from "./FooterNotice"
import ThreadMessageHeader from "./ThreadMessageHeader"
import ThreadMessagePayload from "./ThreadMessagePayload"
import ThreadMessageDetails from "./ThreadMessageDetails"


const useStyles = makeStyles((theme) => ({
	main: {
		border: "1px solid",
		borderRadius: "0.5rem",
		borderColor: theme.palette.divider,
		// margin: "2.625rem 0 0"
	},
	heading: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	content: {
		padding: theme.spacing(8),
		[theme.breakpoints.down("md")]: {
			padding: theme.spacing(3),
		},
		backgroundColor: "white",
		borderTopLeftRadius: "8px",
		borderTopRightRadius: "8px",
	},

}))

function PostContent() {
	const classes = useStyles()
	return (
		<main className={classes.main}>
			<div className={classes.content}>
				<ThreadMessageHeader />

				<Typography variant="h1" className={classes.heading}>
					Heading of the post
				</Typography>

				<ThreadMessagePayload />
				<ThreadMessageDetails />
			</div>
			<FooterNotice />
		</main>
	)
}

export default PostContent