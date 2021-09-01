import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(4, 8),
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing(1),
		},
	},
	content: {
		display: "flex",
		flexDirection: "row",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
		}
	},
	item: {
		display: "flex",
		textAlign: "left",
		alignItems: "center",
		marginRight: "1.5rem",
		[theme.breakpoints.down("sm")]: {
			flexDirection: "column",
			textAlign: "center",
			padding: "1.115rem 0",
			marginRight: 0,
		}
	},
	buttons: {
		display: "flex",
		alignItems: "middle",
		[theme.breakpoints.down("sm")]: {
			justifyContent: "center"
		},
		"& > :first-child": {
			marginRight: "0.5rem"
		},
		"&>button": {
			width: theme.spacing(11)
		}
	}
}))
function HelpfulSurvey() {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<div className={classes.item}>
					<Typography style={{ fontWeight: 700 }}>
						Was this helpful?
					</Typography>
				</div>
				<div className={`${classes.buttons}`}>
					<Button variant="outlined">Yes</Button>
					<Button variant="outlined">No</Button>
				</div>
			</div>
		</div>
	)
}

export default HelpfulSurvey