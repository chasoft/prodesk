import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Grid, Typography } from "@material-ui/core"
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
		padding: theme.spacing(2),
		paddingLeft: theme.spacing(8),
		paddingRight: theme.spacing(8),
		[theme.breakpoints.down("xs")]: {
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