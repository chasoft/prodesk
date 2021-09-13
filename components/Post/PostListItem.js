import React from "react"
import Link from "next/link"
import { makeStyles } from "@material-ui/core/styles"
import { Chip, Typography } from "@material-ui/core"
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
	main_shorten: {
		cursor: "pointer",
		"&:hover": {
			background: theme.palette.action.hover
		},
		padding: theme.spacing(2, 3),
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(1, 2)
		},
	},
	paper: {
		display: "flex",
		// width: "calc(100% - 200px)",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
			// alignItems: "flex-start",
			// overflow: "hidden",
			textOverflow: "ellipsis",
		},
	},
	subject: {
		// textOverflow: "ellipsis"
	},
	content: {
		marginRight: theme.spacing(2),
	},
	excerpt: {
		// textOverflow: "ellipsis",
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


export const PostListEmpty = ({ message }) => {
	const classes = useStyles()
	return (
		<div
			className={`${classes.main} ${classes.isFirst} ${classes.isLast}`}
			style={{ cursor: "default" }}
		>
			<div className={classes.paper}>
				<div className={classes.content} style={{ textAlign: "center" }}>
					<Typography>{message}</Typography>
				</div>
			</div>
		</div>
	)
}
PostListEmpty.propTypes = { message: PropTypes.string }


export const PostListItemShorten = ({ subject, link }) => {
	const classes = useStyles()
	return (
		<div className={classes.border}>
			<Link href={link}>
				<a>
					<div className={classes.main_shorten}>

						<div className={classes.paper}>
							<div className={classes.content}>
								<Typography noWrap>{subject}</Typography>
							</div>
						</div>

					</div>
				</a>
			</Link>
		</div>
	)
}
PostListItemShorten.propTypes = { subject: PropTypes.string, link: PropTypes.string }


function PostListItem({ subject, excerpt, link, metaData, isFirst = false, isLast = false, isShort = false }) {
	const classes = useStyles()
	return (
		<div className={(!isFirst) ? classes.border : ""} >
			<Link href={link}>
				<a>
					<div className={`${classes.main} ${isFirst ? classes.isFirst : ""} ${isLast ? classes.isLast : ""}`}>

						<div className={classes.paper}>

							<div className={classes.content}>
								<Typography variant="h5" className={classes.subject}>
									{subject}
								</Typography>
								{
									isShort ?
										null
										: <Typography className={classes.excerpt}>
											{excerpt}
										</Typography>
								}
							</div>

							{
								isShort ?
									null
									: <div className={classes.state}>
										{
											metaData.length > 0 ?
												metaData.map(() => {
													return (
														<>
															<div className={classes.state1}>
																<Chip size="small" label="Closed" onDelete={() => { }} color="secondary" />
															</div>
															<div className={classes.state2}>
																<Typography variant="caption" noWrap>
																	0 replies
																</Typography>
															</div>
														</>
													)
												})
												: null
										}
									</div>
							}

						</div>
					</div>
				</a>
			</Link>
		</div>
	)
}
PostListItem.propTypes = {
	subject: PropTypes.string,
	excerpt: PropTypes.string,
	link: PropTypes.string,
	metaData: PropTypes.array, //array of Objects
	isFirst: PropTypes.bool, isLast: PropTypes.bool,
	isShort: PropTypes.bool
}

export default PostListItem