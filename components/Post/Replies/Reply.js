import React from "react"
import makeStyles from "@mui/styles/makeStyles"
import { Grid, Typography } from "@mui/material"
import ReplyHeader from "./ReplyHeader"
import ReplyPayload from "./ReplyPayload"
import ReplyNotice from "./ReplyNotice"
import PropTypes from "prop-types"


const useStyles = makeStyles((theme) => ({
	border: {
		borderTop: "1px solid",
		borderColor: theme.palette.divider
	},
	content: {
		padding: theme.spacing(2, 8),
		[theme.breakpoints.down("md")]: {
			padding: theme.spacing(3),
		},
	}
}))

function Reply({ isFirst = false }) {
	const classes = useStyles()

	return (
		<div className={(!isFirst) ? classes.border : null}>
			<main className={classes.content}>
				<ReplyHeader />
				<ReplyPayload />
				<ReplyNotice />
			</main>
		</div>
	)
}
Reply.propTypes = { isFirst: PropTypes.bool }

export default Reply