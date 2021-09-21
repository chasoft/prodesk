/*************************************************************************
 * ╔═══════════════════════════════════════════════════════════════════╗ *
 * ║     ProDesk - Your Elegant & Powerful Ticket/Docs/Blog System     ║ *
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
 * IMPORTING                                                     *
 *****************************************************************/

import React from "react"
import { Typography } from "@mui/material"

import makeStyles from "@mui/styles/makeStyles"

//PROJECT IMPORT

/*****************************************************************
 * INIT                                                          *
 *****************************************************************/

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(1, 1, 1, 8),
		[theme.breakpoints.down("md")]: {
			marginLeft: theme.spacing(0),
		},
	}
}))

/*****************************************************************
 * EXPORT DEFAULT                                                *
 *****************************************************************/

const ReplyNotice = () => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Typography variant="caption" color="textSecondary">Last edited 6 hr ago</Typography>
		</div>
	)
}

export default ReplyNotice