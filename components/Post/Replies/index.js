import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Reply from "./Reply"


const useStyles = makeStyles((theme) => ({
	main: {
		border: "1px solid",
		borderRadius: "0.5rem",
		margin: "2.625rem 0 0",
		borderColor: theme.palette.divider,
		[theme.breakpoints.down("xs")]: {
			margin: "1.625rem 0 0",
		},
	}
}))

function Replies() {
	const classes = useStyles()
	return (
		<main className={classes.main}>
			<Reply isFirst={true} />
			<Reply />
			<Reply />
			<Reply />
			<Reply />
		</main>
	)
}

export default Replies