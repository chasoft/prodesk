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
import { makeStyles, Paper, Typography } from "@material-ui/core"
import PostListItemShorten from "../Post/PostListItemShorten"

import ArrowForwardIcon from "@material-ui/icons/ArrowForward"

/*****************************************************************
 * LIBRARY IMPORT                                                *
 *****************************************************************/

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1),
		[theme.breakpoints.down("xs")]: {
			marginLeft: theme.spacing(0),
			marginRight: theme.spacing(0),
		},
	},
	// content: {
	// 	padding: theme.spacing(8),
	// 	[theme.breakpoints.down("xs")]: {
	// 		padding: theme.spacing(3),
	// 	},
	// },
	docHeading: {
		padding: theme.spacing(2, 3),
		fontFamily: "\"Google Sans\", Roboto, sans-serif",
		fontSize: "1rem",
		fontWeight: 500,
		lineHeight: "1.25rem"
	},
	docFooter: {
		padding: theme.spacing(2, 3)
	},
	viewAll: {
		display: "flex",
		alignItems: "center",
		"& > :first-child": {
			marginRight: theme.spacing(1)
		},
		"& > *": {
			color: theme.palette.primary.main
		},
		borderTop: "1px solid",
		borderColor: theme.palette.divider,
	}
}))

/*****************************************************************
 * MAIN RENDER                                                   *
 *****************************************************************/

const DocItem = () => {
	const classes = useStyles()
	return (

		<Paper elevation={1}>

			<div className={classes.docHeading}>Device Performace</div>
			<PostListItemShorten />
			<PostListItemShorten />
			<PostListItemShorten />

			<div className={`${classes.viewAll} ${classes.docFooter}`}>
				<Link href="/">
					<div>
						<Typography>View all post</Typography>
						<ArrowForwardIcon fontSize="small" />
					</div>
				</Link>
			</div>

		</Paper>


	)
}

export default DocItem