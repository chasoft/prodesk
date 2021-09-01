import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Chip, Grid, Typography } from "@material-ui/core"
import PropTypes from "prop-types"

const useStyles = makeStyles((theme) => ({
	border: {
		borderTop: "1px solid",
		borderColor: theme.palette.divider
	},
	main: {
		cursor: "pointer",
		"&:hover": {
			background: theme.palette.action.hover
		},
		padding: theme.spacing(3),
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(1),
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
		},
	},
	paper: {
		display: "flex",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
			alignItems: "flex-start",
			overflow: "hidden",
			textOverflow: "ellipsis",
		},
	},
	content: {
		overflow: "hidden",
		marginRight: theme.spacing(2),
	},
	details: {
		[theme.breakpoints.down("xs")]: {
			display: "none"
		},
	},
	state: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-end",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "row",
		},
	},
	state1: {
		[theme.breakpoints.down("xs")]: {
			marginRight: theme.spacing(2),
		},
	},
	state2: {

	},
	isLast: {
		borderBottomRightRadius: "0.5rem",
		borderBottomLeftRadius: "0.5rem"
	},
	isFirst: {
		borderTopRightRadius: "0.5rem",
		borderTopLeftRadius: "0.5rem"
	}
}))

function PostListItem({ isFirst = false, isLast = false }) {
	const classes = useStyles()

	return (
		<div className={(!isFirst) ? classes.border : null} >
			<div
				className={`${classes.main} ${isFirst ? classes.isFirst : null} ${isLast ? classes.isLast : null}`}
				onClick={() => alert("ok!")}
			>

				<div className={classes.paper}>

					<div className={classes.content}>
						<Typography variant="h5" className={classes.subject} noWrap>
							Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!
						</Typography>
						<Typography className={classes.details} noWrap>
							Hi Pixel Community, We’re very excited to reveal our newest phone, the Pixel 5a with 5G! We’re very excited to reveal our newest phone, the Pixel 5a with 5G!
						</Typography>
					</div>

					<div className={classes.state}>
						<div className={classes.state1}>
							<Chip size="small" label="Closed" onDelete={() => { }} color="secondary" />
						</div>
						<div className={classes.state2}>
							<Typography variant="caption" noWrap>
								0 replies
							</Typography>
						</div>
					</div>

				</div>

			</div>
		</div>
	)
}
PostListItem.propTypes = { isFirst: PropTypes.bool, isLast: PropTypes.bool }

export default PostListItem