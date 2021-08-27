import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import HelpfulSurvey from "./HelpfulSurvey"


const useStyles = makeStyles((theme) => ({
	main: {
		border: "1px solid",
		borderRadius: "0.5rem",
		borderColor: theme.palette.divider,
		margin: "2.625rem 0 0"
	},
	content: {
		padding: theme.spacing(8),
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(3),
		},
	},
	spacer: {
		borderTop: "1px solid",
		borderColor: theme.palette.divider
	}
}))

function ArticleContent() {
	const classes = useStyles()
	return (
		<main className={classes.main}>
			<div className={classes.content}>
				<Typography>
					Article Content
				</Typography>
			</div>
			<div className={classes.spacer}></div>
			<HelpfulSurvey />
		</main>
	)
}

export default ArticleContent