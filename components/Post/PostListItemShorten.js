import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"



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
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
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
		},
	},
	content: {
		marginRight: theme.spacing(2),
		overflow: "hidden",
	},
	subject: {

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
	}
}))

function PostListItemShorten() {
	const classes = useStyles()

	return (
		<div className={classes.border}>
			<div
				className={classes.main}
				onClick={() => alert("ok!")}
			>

				<div className={classes.paper}>

					<div className={classes.content}>
						<Typography className={classes.subject} noWrap>
							Introducing the Pixel 5a with 5G to reveal our newest phone, the Pixel 5a with 5G!
						</Typography>
					</div>

				</div>

			</div>
		</div>
	)
}

export default PostListItemShorten