import React from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Link from "@material-ui/core/Link"


const useStyles = makeStyles((theme) => ({
	footer: {
		marginTop: "auto",
		padding: theme.spacing(4),
		fontFamily: "\"Google Sans\", Roboto, sans-serif"
	},
}))

export default function Footer() {
	const classes = useStyles()
	return (
		<footer className={classes.footer}>
			<Container align="center">
				<Typography color="textSecondary">
					{"Copyright © "}
					{new Date().getFullYear()}
					{" - "}
					<Link color="inherit" href="https://chasoft.net/">
						Chasoft Labs
					</Link>
				</Typography>
			</Container>
		</footer>
	)
}