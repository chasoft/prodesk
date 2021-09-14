import React from "react"
import Link from "next/link"
import { makeStyles } from "@material-ui/core/styles"
import { Typography } from "@material-ui/core"
import PropTypes from "prop-types"
import PriorityHighIcon from "@material-ui/icons/PriorityHigh"

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
	},
	main_shorten: {
		cursor: "pointer",
		"&:hover": {
			background: theme.palette.action.hover
		},
		padding: theme.spacing(2, 3),
		[theme.breakpoints.down("xs")]: {
			padding: theme.spacing(2, 2)
		},
	},
	paper: {
		display: "flex",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
			alignItems: "flex-start",
		},
		// "&:hover > #moreInfo > #extraInfo": {
		// 	visibility: "visible",
		// 	width: "100%",
		// 	opacity: 1,
		// },
	},
	subject: {

	},
	content: {
		minWidth: 0, //this property is important
		[theme.breakpoints.down("xs")]: {
			maxWidth: "100%",
			padding: theme.spacing(1),
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
		},
	},
	content_addon: {
		padding: theme.spacing(3),
	},
	excerpt: {
		[theme.breakpoints.down("xs")]: {
			display: "none"
		},
	},
	state: {
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "center",
		padding: theme.spacing(1, 2, 1, 0),
		[theme.breakpoints.down("xs")]: {
			flexDirection: "row",
			padding: theme.spacing(0, 2, 1)
		}
	},
	state1: {
		textAlign: "center",
		paddingLeft: "0.5rem",
		paddingRight: "0.5rem",
	},
	extraInfo: {
		// visibility: "hidden",
		// width: 0,
		// opacity: 0,
		textAlign: "center"
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
				<div className={`${classes.content} ${classes.content_addon}`} style={{ textAlign: "center" }}>
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

							<div id="content" className={`${classes.content} ${classes.content_addon}`}>
								<Typography variant="h5" className={classes.subject} noWrap>
									{subject}
								</Typography>
								{
									isShort ?
										null
										: <Typography className={classes.excerpt} noWrap>
											{excerpt}
										</Typography>
								}
							</div>

							{
								isShort ?
									null
									: <div id="moreInfo" className={classes.state}>
										{
											metaData.length > 0 ?
												metaData.map(() => {
													return (
														<>
															<div className={classes.state1}>

																<PriorityHighIcon
																	style={{
																		color: "#f44336",
																		width: "1.25rem",
																		height: "1.25rem",
																		border: "1px solid",
																		borderRadius: "50%"
																	}}
																/>

															</div>

															<div id="extraInfo" className={classes.extraInfo}>
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
		</div >
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