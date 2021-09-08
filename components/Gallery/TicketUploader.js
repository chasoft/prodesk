import React from "react"
import { Button, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	removeBtn: {
		color: theme.palette.error.dark,
		paddingLeft: theme.spacing(1),
		cursor: "pointer",
		"&:hover": {
			textDecoration: "underline"
		}
	},
}))

function TicketUploader() {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Button>Upload</Button>
			<ol>
				<li>
					file adsfujfldsa.png
					<Typography variant="caption"> (0.5 MB)</Typography>
					<Typography variant="button" className={classes.removeBtn}>remove</Typography>
				</li>
				<li>file adsfldksajfldsa.png <Typography variant="button" className={classes.removeBtn}>remove</Typography></li>
				<li>file jfldsa.png <Typography variant="button" className={classes.removeBtn}>remove</Typography></li>
				<li>file adsfldkjksajfldsa.png <Typography variant="button" className={classes.removeBtn}>remove</Typography></li>
				<li>file adsajfldsa.png <Typography variant="button" className={classes.removeBtn}>remove</Typography></li>
			</ol>
		</div>
	)
}

export default TicketUploader