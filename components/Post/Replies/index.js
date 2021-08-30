import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Reply from "./Reply"
import { Paper } from "@material-ui/core"


const useStyles = makeStyles((theme) => ({
	main: {
		// border: "1px solid",
		// borderRadius: "0.5rem",
		margin: "2.625rem 0 0",
		// borderColor: theme.palette.divider,
		[theme.breakpoints.down("xs")]: {
			margin: "1.625rem 0 0",
		},
	}
}))

function Replies() {
	const classes = useStyles()
	return (
		<Paper elevation={2} className={classes.main}>
			<Reply isFirst={true} />
			<Reply />
			<Reply />
			<Reply />
			<Reply />
		</Paper>
	)
}

export default Replies