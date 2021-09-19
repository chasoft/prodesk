import React from "react"
import makeStyles from "@mui/styles/makeStyles"
import { Button, Typography } from "@mui/material"

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2, 8),
		backgroundColor: "#F8F9FA",
		borderBottomLeftRadius: "0.5rem",
		borderBottomRightRadius: "0.5rem",
		[theme.breakpoints.down("md")]: {
			padding: theme.spacing(1, 3)
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