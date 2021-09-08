/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║          ProDesk - Your Elegant & Powerful Ticket System          ║ *
 * ╠═══════════════════════════════════════════════════════════════════╣ *
 * ║                                                                   ║ *
 * ║   @author     A. Cao <cao@anh.pw>                                 ║ *
 * ║   @copyright  Chasoft Labs © 2021                                 ║ *
 * ║   @link       https://chasoft.net                                 ║ *
 * ║                                                                   ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║ @license This product is licensed and sold at CodeCanyon.net      ║ *
 * ║ If you have downloaded this from another site or received it from ║ *
 * ║ someone else than me, then you are engaged in an illegal activity.║ *
 * ║ You must delete this software immediately or buy a proper license ║ *
 * ║ from http://codecanyon.net/user/chasoft/portfolio?ref=chasoft.    ║ *
 * ╟───────────────────────────────────────────────────────────────────╢ *
 * ║      THANK YOU AND DON'T HESITATE TO CONTACT ME FOR ANYTHING      ║ *
 * ╚═══════════════════════════════════════════════════════════════════╝ *
 ************************************************************************/

/*****************************************************************
 * FRAMEWORK & THIRD-PARTY IMPORT                                *
 *****************************************************************/

import React from "react"
import Link from "next/link"
import { Container, makeStyles, Paper, Typography } from "@material-ui/core"
import PostListItem from "../Post/PostListItem"

import ArrowForwardIcon from "@material-ui/icons/ArrowForward"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
	},
	paper: {
		marginTop: theme.spacing(8),
		[theme.breakpoints.down("xs")]: {
			marginTop: theme.spacing(3),
		},
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	group: {
		margin: "1.5rem 0",
		[theme.breakpoints.down("xs")]: {
			margin: "1.625rem 0",
		},
		marginBottom: 0
	},
	viewAll: {
		display: "flex",
		alignItems: "center",
		"& > :first-child": {
			marginRight: theme.spacing(1)
		},
		"& > *": {
			color: theme.palette.primary.main
		}
	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const DocGroup = () => {
	const classes = useStyles()
	return (
		<Container maxWidth="md">
			<div className={classes.paper}>
				<div className={classes.root}>

					<Typography variant="h2">Featured posts</Typography>
					<Link href="/" className={classes.viewAll}>
						<div>
							<Typography>View all featured posts</Typography>
							<ArrowForwardIcon fontSize="small" />
						</div>
					</Link>

					<Paper elevation={2} className={classes.group}>
						<PostListItem isFirst={true} />
						<PostListItem />
						<PostListItem isLast={true} />
					</Paper>

				</div>
			</div>
		</Container >
	)
}

export default DocGroup