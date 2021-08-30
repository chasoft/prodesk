import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: theme.spacing(8),
		paddingRight: theme.spacing(8),
		paddingBottom: theme.spacing(2),
		paddingTop: theme.spacing(2),
		backgroundColor: "#F8F9FA",
		borderBottomLeftRadius: "0.5rem",
		borderBottomRightRadius: "0.5rem",
		[theme.breakpoints.down("xs")]: {
			paddingLeft: theme.spacing(3),
			paddingRight: theme.spacing(3),
			paddingBottom: theme.spacing(1),
			paddingTop: theme.spacing(1),
		},
		borderTop: "1px solid",
		borderTopColor: theme.palette.divider
	}
}))
function FooterNotice() {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Typography variant="caption">
				Community content may not be verified or up-to-date. Learn more.
			</Typography>
		</div>
	)
}

export default FooterNotice